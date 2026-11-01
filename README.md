# AGRICA — Smart Precision Irrigation Web Application

> **AGRICA** is a working, mobile-first smart-irrigation web application designed for farmers. It monitors field dielectric sensors in real time, automates 3-phase agricultural pumps using hysteresis and weather lookaheads, tracks water consumption history, and delivers predictive agronomic recommendations.

---

## 🌾 Core Features (Every Screen Does Real Work)

1. **Live Dashboard (Home Screen)**
   - Live grid of field cards with soil moisture gauges (`% VWC`), lower trigger thresholds $T$, and upper stop levels.
   - Real-time environmental indicators: air temperature, relative humidity, rain probability.
   - Pump status indicator (`ON`, `OFF`, `BLOCKED BY RAIN`, `FAULT`) with an animated spinning pump icon when actively running.
   - Online/offline device indicator based on last-seen timestamp (alert if offline $> 5\text{ min}$).
   - One-tap manual pump toggle button.
   - Dynamic weather alert banner from Open-Meteo when rain is expected.

2. **Field Detail Screen**
   - **Large animated soil cross-section** visualizing rhizosphere root depth (30 cm) and live water level filling.
   - Historical moisture-over-time trend line chart with dashed setpoint guidelines.
   - Three pump control modes:
     - `AUTO`: Pure hysteresis decision engine ($M < T$ turns ON, $M \ge \text{cutoff}$ turns OFF).
     - `MANUAL`: One-tap run with configurable timer (10, 20, 30, 45 minutes).
     - `SCHEDULE`: Time window irrigation (e.g., 06:00–06:20 AM), automatically suppressed if soil is already moist or rain is forecast.
   - Historical irrigation log table and **CSV export** for farm record-keeping.

3. **Autonomous Irrigation Engine (`src/utils/irrigationEngine.js`)**
   - Hysteresis logic prevents rapid relay cycling.
   - Rain lockout suppresses pump when rain forecast $\ge 60\%$ or rain sensor trips.
   - Safety cutoffs: maximum continuous runtime (default 30 min), minimum rest cooldown between runs.
   - **Dry-run fault protection**: stops the pump and triggers an alarm if the motor runs for 3 minutes without a corresponding rise in soil moisture.

4. **Devices & LoRa Nodes**
   - Device inventory displaying battery/solar voltage ($V$), RSSI signal strength ($-64\text{ dBm}$), and firmware version.
   - **Add Node Provisioning Flow**: Generates unique node IDs and secret tokens with copy-paste code snippets for the ESP32.
   - **Sensor Calibration Wizard**: Two-point air/water raw ADC calibration ($0\% - 100\%$) stored per device.

5. **Insights & ML Layer**
   - Real-time depletion velocity calculation ($\sim 2.4\%/\text{hr}$) based on ambient temperature and humidity.
   - Time to trigger estimation: hours remaining until lower threshold is reached.
   - Projected water requirement ($L$) calculated across field acreage.
   - Weekly resource audit: total litres pumped, pump run hours, and percentage water saved versus a fixed schedule baseline.
   - **ML Training Dataset Export (CSV)** for edge TensorFlow Lite Micro regression models.

6. **Settings & Multilingual Support**
   - Units toggle ($L$ / $m^3$).
   - Language selector: **English**, **हिन्दी (Hindi)**, and **ଓଡ଼ିଆ (Odia)**.
   - Configurable precipitation lockout threshold and runtime safety limits.

7. **Simulator Mode (No Hardware Required)**
   - Operates in Demo Simulator mode by default. Generates continuous soil physics (evapotranspiration drying in heat, rapid wetting upon relay closure, and rain jumps) so the entire platform can be demonstrated out of the box.

---

## ⚡️ Quick Instant Test (Zero Setup)

You can launch and test the full application immediately in any browser without needing Node.js or Firebase:

1. Open Windows Explorer and navigate to:
   ```text
   D:\Projects\CS\Agrica 2\
   ```
2. Double-click **`preview.html`** to open it in Chrome, Edge, or Firefox.
3. Every feature works live: the 3-second simulator updates gauges, the pump turns on/off, the soil cross-section fills with water, and alerts fire!

---

## 🚀 Development & Build Workflow

When working with Node.js:

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Build for production (PWA static bundle in dist/)
npm run build
```

---

## 🔌 Firebase Realtime Database Integration

AGRICA connects to Firebase Realtime Database for live telemetry. Configure `.env` in the project root:

```env
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="agrica-core.firebaseapp.com"
VITE_FIREBASE_DATABASE_URL="https://agrica-core-default-rtdb.firebaseio.com"
VITE_FIREBASE_PROJECT_ID="agrica-core"
```

### Data Contract:
- `/users/{uid}/fields/{fieldId}`: `{ name, crop, soil, lat, lng, areaM2, config: { lowT, highT, rainBlockPct, maxRunMin, mode } }`
- `/devices/{deviceId}`: `{ fieldId, ownerUid, type, token, calibration: { dryRaw, wetRaw }, lastSeen, fw, rssi, battV }`
- `/readings/{deviceId}/{timestamp}`: `{ moisturePct, rawAdc, tempC, humidity, rainSensor, pumpOn }`
- `/commands/{deviceId}`: `{ pump: "ON"|"OFF"|"AUTO", runMinutes, ts }`
- `/events/{fieldId}/{id}`: `{ start, stop, durationSec, reason, litresEst }`

Security rules are pre-configured in [database.rules.json](file:///D:/Projects/CS/Agrica%202/database.rules.json).

---

## 🛠 ESP32 Firmware & Hardware Wiring

- **ESP32 Sketch**: [firmware/agrica_esp32.ino](file:///D:/Projects/CS/Agrica%202/firmware/agrica_esp32.ino)
  - Reads capacitive probe on ADC1 (`GPIO 34`) and DHT22 on `GPIO 4`.
  - Runs autonomous hysteresis logic locally (uninterrupted pump management even during Wi-Fi disconnects).
  - Posts readings to Firebase `/readings/{deviceId}`.
  - Listens to `/commands/{deviceId}` to drive the pump relay on `GPIO 26`.
- **Hardware Wiring & Opto-Isolation Guide**: [docs/hardware.md](file:///D:/Projects/CS/Agrica%202/docs/hardware.md)
  - Complete pinout table, PC817 optocoupler schematic, 1N4007 flyback diode protection, and RC snubber guidelines for 3-phase agricultural pumps.

---

## 🌐 Deploy to Vercel or Firebase Hosting

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

---

## 📜 License
© 2026 AGRICA Precision Husbandry Platform. Designed with the humility of the soil and the rigour of modern engineering.
