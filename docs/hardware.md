# AGRICA Hardware Wiring & Field Deployment Specification

> Pinout configuration, galvanic optical isolation, and sensor calibration guide for pairing physical ESP32 and LoRa nodes with the AGRICA platform.

---

## ⚡️ ESP32 Pin Mapping Table

| Component | Pin Type | ESP32 GPIO | Description / Operational Notes |
| :--- | :--- | :--- | :--- |
| **Capacitive Soil Probe v1.2** | Analog In | **GPIO 34 (ADC1)** | 3.3V power, analog output. Use ADC1 (ADC2 is disabled during Wi-Fi). |
| **DHT22 / SHT31 (Air Temp & RH)** | Digital IO | **GPIO 4** | 3.3V power, 10k pull-up resistor between VCC and Data pin. |
| **Tipping Rain Gauge / Float** | Digital In | **GPIO 18** | Connected with `INPUT_PULLUP`. Pulls LOW when bucket tips or floats. |
| **Opto-isolated Relay Driver** | Digital Out | **GPIO 26** | Drives input of PC817 optocoupler. Active HIGH switches coil contact. |
| **Status / Heartbeat LED** | Digital Out | **GPIO 2** | Flashes on sensor read; solid ON when pump relay energized. |
| **SX1276 LoRa SPI (SCK)** | SPI Clock | **GPIO 18** *(or 5)* | Sub-GHz telemetry clock. |
| **SX1276 LoRa SPI (MISO)** | SPI MISO | **GPIO 19** | Sub-GHz radio data out. |
| **SX1276 LoRa SPI (MOSI)** | SPI MOSI | **GPIO 27** | Sub-GHz radio data in. |
| **SX1276 LoRa SPI (NSS / CS)** | SPI Chip Select | **GPIO 5** | Sub-GHz slave select. |

---

## 🛡 Mandatory Electrical & Galvanic Isolation

Agricultural induction pumps (3 HP to 7.5 HP) draw enormous inrush currents (5x–7x running amps) and generate massive inductive kickback voltage spikes when switched off.

```text
[ESP32 GPIO 26] ───(330Ω)───> [PC817 Optocoupler]
                                      │
                         (Galvanic Air Gap Isolation)
                                      │
[Separate 12V DC Supply] ───> [Transistor Driver + 12V Relay Coil]
                                      │  ▲
                                      └──┴── (1N4007 Flyback Diode)
                                      │
                         [Relay Contacts (COM / NO)]
                                      │
                     [RC Snubber: 0.1µF 630V + 100Ω 5W]
                                      │
         [Magnetic Starter / 3-Phase Pump Contactor (415V AC)]
```

### Critical Field Assembly Rules:
1. **Never share grounds**: The 12V relay coil ground and the ESP32 3.3V ground must remain completely isolated via the optocoupler's optical barrier.
2. **Flyback Diode**: Solder a 1N4007 diode reverse-biased across the relay coil terminals to sink back-EMF spikes.
3. **RC Snubber**: Place an RC snubber network in parallel across the relay mechanical contacts to prevent contact pitting and high-frequency EMI noise.
4. **IP67 Enclosure**: Enclose the ESP32, battery, and relay in a UV-stabilized waterproof junction box with silicone cable glands.

---

## 💧 Two-Point Soil Sensor Calibration

Soil sensors vary depending on salinity and soil composition. Calibrate each probe using the AGRICA **Sensor Calibration Wizard** on the Devices tab:

1. **Air Calibration (`CAL_DRY_ADC`)**:
   - Hold the clean probe in dry air (0% moisture).
   - Record the raw 12-bit ADC reading (typically `3100 – 3300`).
2. **Water Calibration (`CAL_WET_ADC`)**:
   - Submerge the probe blade into clean water up to the marked line (do not submerge the electronics!).
   - Record the raw 12-bit ADC reading (typically `1400 – 1550`).
3. **Firmware Formula**:
   $$\text{Moisture \%} = \frac{\text{CAL\_DRY\_ADC} - \text{Raw ADC}}{\text{CAL\_DRY\_ADC} - \text{CAL\_WET\_ADC}} \times 100$$
