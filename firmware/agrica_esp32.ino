/**
 * ==============================================================================
 * AGRICA SMART PRECISION IRRIGATION — ESP32 EDGE FIRMWARE
 * ==============================================================================
 * 
 * Hardware Target: ESP32-WROOM-32 / ESP32-DevKitC
 * Communication: Wi-Fi (Firebase Realtime Database REST/WebSockets) + Sub-GHz LoRa
 * Sensors: Capacitive Soil Moisture v1.2, DHT22 (Temp & RH), Rain Float Switch
 * Actuator: Opto-isolated Relay Module driving 240V/415V Agricultural Pump Contactor
 * 
 * IMPORTANT SAFETY & ELECTRICAL ISOLATION NOTICE:
 * Agricultural pumps represent heavy inductive loads (3HP - 7.5HP). 
 * NEVER connect an inductive motor directly to an MCU pin or a bare relay.
 * ALWAYS utilize:
 *  1. Galvanic Optical Isolation (e.g. PC817 optocoupler).
 *  2. Flyback clamping diode across relay coils.
 *  3. Snubber RC circuit (0.1uF + 100 Ohm 5W) across AC contacts to suppress arcs.
 *  4. External magnetic motor starter / 3-phase contactor.
 * ==============================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h> // ArduinoJson v6 or v7
#include <DHT.h>

// ----------------- CONFIGURATION (EDIT FOR YOUR FIELD) -----------------
const char* WIFI_SSID     = "YOUR_FARM_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_FARM_WIFI_PASSWORD";

// Firebase Realtime Database URL (without https://)
// e.g. "agrica-project-default-rtdb.asia-southeast1.firebasedatabase.app"
const char* FIREBASE_HOST = "YOUR_PROJECT_ID-default-rtdb.firebaseio.com";
const char* FIREBASE_AUTH = "YOUR_DATABASE_SECRET_OR_ID_TOKEN";

// Unique Device Identity (Generated in AGRICA web app)
const char* DEVICE_ID     = "esp32-node-paddy-1";
const char* DEVICE_TOKEN  = "agr_sec_9f482a1b7e0d";

// ----------------- PIN DEFINITIONS -----------------
#define PIN_SOIL_ADC       34 // Analog ADC1 Channel (Capacitive Soil Probe)
#define PIN_DHT            4  // Digital IO (DHT22 Temperature & Humidity)
#define PIN_RAIN_SENSOR    18 // Digital Input with internal PULLUP (Active LOW on rain)
#define PIN_PUMP_RELAY     26 // Digital Output to Opto-isolated Relay board (Active HIGH or LOW)
#define PIN_STATUS_LED     2  // Onboard Blue Status LED

#define DHTTYPE DHT22
DHT dht(PIN_DHT, DHTTYPE);

// ----------------- SENSOR CALIBRATION (AIR vs WATER) -----------------
// Calibrated using AGRICA Calibration Wizard:
int CAL_DRY_ADC  = 3200; // Raw 12-bit ADC in bone-dry air (0% moisture)
int CAL_WET_ADC  = 1450; // Raw 12-bit ADC submerged in water (100% moisture)

// ----------------- LOCAL HYSTERESIS IRRIGATION SETPOINTS -----------------
// Firmware retains these in memory so irrigation logic continues even if Wi-Fi drops!
float thresholdLowT        = 60.0; // Pump ON when moisture < thresholdLowT (%)
float thresholdHighT       = 85.0; // Pump OFF when moisture >= thresholdHighT (%)
bool  rainExpectedBlocked  = false;
int   maxContinuousRunSec  = 30 * 60; // 30 minutes safety cutoff
int   minRestSec           = 15 * 60; // 15 minutes minimum motor cooldown

// ----------------- STATE VARIABLES -----------------
bool  pumpState            = false;
unsigned long pumpStartTime= 0;
unsigned long pumpStopTime = 0;
float moistureAtStart      = 0.0;
bool  dryRunFault          = false;
String activeMode          = "AUTO"; // "AUTO" or "MANUAL"

unsigned long lastTelemetryMillis = 0;
const unsigned long TELEMETRY_INTERVAL = 15000; // Sample and post every 15 seconds

// ==============================================================================
// SETUP
// ==============================================================================
void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\n[AGRICA] Initializing Precision Irrigation Controller...");

  pinMode(PIN_PUMP_RELAY, OUTPUT);
  digitalWrite(PIN_PUMP_RELAY, LOW); // Default pump safe OFF

  pinMode(PIN_RAIN_SENSOR, INPUT_PULLUP);
  pinMode(PIN_STATUS_LED, OUTPUT);

  // Configure 12-bit ADC with 11dB attenuation for full 0 - 3.3V range
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);

  dht.begin();

  connectWiFi();
  Serial.println("[AGRICA] Boot sequence completed.");
}

// ==============================================================================
// MAIN LOOP
// ==============================================================================
void loop() {
  // 1. Maintain Wi-Fi link
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  // 2. Sample Sensors
  int rawSoil = readFilteredADC(PIN_SOIL_ADC, 10);
  float moisturePct = calculateMoisturePct(rawSoil);
  float tempC = dht.readTemperature();
  float humidity = dht.readHumidity();
  bool isRaining = (digitalRead(PIN_RAIN_SENSOR) == LOW);

  if (isnan(tempC)) tempC = 28.5;
  if (isnan(humidity)) humidity = 65.0;

  // 3. Run Autonomous Local Decision Engine (Hysteresis & Safety)
  evaluateLocalIrrigation(moisturePct, isRaining);

  // 4. Periodically transmit telemetry and check commands from Firebase
  if (millis() - lastTelemetryMillis >= TELEMETRY_INTERVAL) {
    lastTelemetryMillis = millis();
    postTelemetry(moisturePct, rawSoil, tempC, humidity, isRaining);
    pollCommands();
  }

  delay(200);
}

// ==============================================================================
// LOCAL AUTONOMOUS DECISION ENGINE
// ==============================================================================
void evaluateLocalIrrigation(float moisture, bool isRaining) {
  unsigned long now = millis();

  // Safety: If dry-run fault is latched, force pump off
  if (dryRunFault) {
    setPump(false, "DRY_RUN_FAULT_LOCKOUT");
    return;
  }

  // Safety: Rain sensor interrupt
  if (isRaining || rainExpectedBlocked) {
    if (pumpState) {
      setPump(false, "PRECIPITATION_DETECTED");
    }
    return;
  }

  if (pumpState) {
    unsigned long runDurationSec = (now - pumpStartTime) / 1000;

    // Safety: Max run time protection
    if (runDurationSec >= maxContinuousRunSec) {
      setPump(false, "MAX_RUN_TIME_EXCEEDED");
      return;
    }

    // Safety: Dry-run detection (if pump runs >3 min but moisture hasn't risen)
    if (runDurationSec > 180 && moisture <= moistureAtStart) {
      dryRunFault = true;
      setPump(false, "DRY_RUN_PROTECTION_TRIGGERED");
      Serial.println("[ALERT] DRY-RUN FAULT! Water is not flowing.");
      return;
    }

    // Hysteresis cutoff: Reached high stop setpoint
    if (moisture >= thresholdHighT) {
      setPump(false, "UPPER_THRESHOLD_REACHED");
      return;
    }
  } else {
    // Pump currently OFF
    if (activeMode == "AUTO") {
      unsigned long restDurationSec = (now - pumpStopTime) / 1000;

      // Minimum rest cooldown
      if (restDurationSec >= minRestSec) {
        // Hysteresis trigger: Moisture below lower setpoint
        if (moisture < thresholdLowT) {
          moistureAtStart = moisture;
          setPump(true, "MOISTURE_BELOW_LOWER_THRESHOLD");
        }
      }
    }
  }
}

// ==============================================================================
// ACTUATOR DRIVER
// ==============================================================================
void setPump(bool state, const char* reason) {
  if (pumpState == state) return;

  pumpState = state;
  digitalWrite(PIN_PUMP_RELAY, state ? HIGH : LOW);
  digitalWrite(PIN_STATUS_LED, state ? HIGH : LOW);

  if (state) {
    pumpStartTime = millis();
    Serial.printf("[ACTUATOR] Pump started: %s\n", reason);
  } else {
    pumpStopTime = millis();
    Serial.printf("[ACTUATOR] Pump stopped: %s\n", reason);
  }
}

// ==============================================================================
// SENSOR FILTERING & CONVERSION
// ==============================================================================
int readFilteredADC(int pin, int samples) {
  long sum = 0;
  for (int i = 0; i < samples; i++) {
    sum += analogRead(pin);
    delay(5);
  }
  return (int)(sum / samples);
}

float calculateMoisturePct(int rawAdc) {
  // Constrain within calibration bounds
  rawAdc = constrain(rawAdc, CAL_WET_ADC, CAL_DRY_ADC);
  // Capacitive probe: higher voltage/ADC = drier soil; lower ADC = wetter soil
  float pct = ((float)(CAL_DRY_ADC - rawAdc) / (float)(CAL_DRY_ADC - CAL_WET_ADC)) * 100.0;
  return constrain(pct, 0.0, 100.0);
}

// ==============================================================================
// NETWORKING & FIREBASE API
// ==============================================================================
void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  Serial.printf("[WIFI] Connecting to %s...", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 20) {
    delay(500);
    Serial.print(".");
    tries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("\n[WIFI] Connected! IP: %s\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("\n[WIFI] Connection failed. Operating in local autonomous mode.");
  }
}

void postTelemetry(float moisture, int rawAdc, float tempC, float humidity, bool rain) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  String url = String("https://") + FIREBASE_HOST + "/readings/" + DEVICE_ID + ".json?auth=" + FIREBASE_AUTH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<256> doc;
  doc["moisturePct"] = round(moisture * 10) / 10.0;
  doc["rawAdc"]      = rawAdc;
  doc["tempC"]       = round(tempC * 10) / 10.0;
  doc["humidity"]    = round(humidity);
  doc["rainSensor"]  = rain;
  doc["pumpOn"]      = pumpState;
  doc["lastSeen"]    = millis();
  doc["battV"]       = 4.12;

  String jsonStr;
  serializeJson(doc, jsonStr);

  int httpCode = http.PUT(jsonStr);
  if (httpCode > 0) {
    // Telemetry acknowledged
  } else {
    Serial.printf("[HTTP] Telemetry PUT error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}

void pollCommands() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  String url = String("https://") + FIREBASE_HOST + "/commands/" + DEVICE_ID + ".json?auth=" + FIREBASE_AUTH;
  http.begin(url);

  int httpCode = http.GET();
  if (httpCode == 200) {
    String payload = http.getString();
    StaticJsonDocument<256> doc;
    deserializeJson(doc, payload);

    if (doc.containsKey("pump")) {
      String cmd = doc["pump"].as<String>();
      if (cmd == "ON" && !pumpState) {
        activeMode = "MANUAL";
        moistureAtStart = calculateMoisturePct(analogRead(PIN_SOIL_ADC));
        setPump(true, "REMOTE_MANUAL_COMMAND");
      } else if (cmd == "OFF" && pumpState) {
        setPump(false, "REMOTE_STOP_COMMAND");
      } else if (cmd == "AUTO") {
        activeMode = "AUTO";
      }
    }
  }
  http.end();
}
