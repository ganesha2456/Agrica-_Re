/**
 * AGRICA Seed Data — Enhanced from Original Agrica System
 * Initial fields, devices, telemetry history, activity logs, and default farmer accounts.
 */

export const DEFAULT_USERS = [
  {
    name: "Ramesh Farmer",
    email: "ramesh@agrica.org",
    role: "Lead Agriculturist",
    location: "Odisha Agro-Zone 4",
    avatar: "👨‍🌾",
  },
  {
    name: "Anita Sharma",
    email: "anita@agrica.org",
    role: "Agronomy Specialist",
    location: "Punjab Wheat Block",
    avatar: "👩‍🌾",
  },
];

export const INITIAL_FIELDS = [
  {
    id: "field-paddy-01",
    fieldNo: 1,
    name: "Field 1 · Paddy block",
    crop: "paddy",
    cropLabel: "Paddy (Rice)",
    soil: "clay",
    soilLabel: "Clay Soil",
    areaM2: 4047, // 1 acre
    areaAcres: 1.0,
    lat: 20.2961,
    lng: 85.8245,
    deviceId: "esp32-node-paddy-1",
    flowRateLpm: 32.4, // Litres per minute
    config: {
      lowT: 60,
      highT: 85,
      rainBlockPct: 60,
      maxRunMin: 35,
      minRestMin: 20,
      mode: "AUTO", // AUTO, MANUAL, SCHEDULE
    },
    schedule: {
      enabled: false,
      startTime: "06:00",
      durationMin: 20,
      days: ["Mon", "Wed", "Fri"],
    },
    live: {
      moisture: 42,
      rawAdc: 2420,
      tempC: 30.5,
      humidity: 68,
      rainSensor: false,
      pumpOn: false,
      pumpRunSeconds: 0,
      pumpRestSeconds: 1400,
      lastSeen: Date.now() - 25000,
      status: "OFF",
      reason: "Moisture adequate",
    },
  },
  {
    id: "field-vegetable-02",
    fieldNo: 2,
    name: "Field 2 · Vegetable Nursery",
    crop: "vegetables",
    cropLabel: "Vegetables & Greens",
    soil: "loamy",
    soilLabel: "Loamy Soil",
    areaM2: 2023, // 0.5 acre
    areaAcres: 0.5,
    lat: 20.3012,
    lng: 85.8315,
    deviceId: "esp32-node-veg-2",
    flowRateLpm: 18.0,
    config: {
      lowT: 45,
      highT: 70,
      rainBlockPct: 55,
      maxRunMin: 20,
      minRestMin: 15,
      mode: "AUTO",
    },
    schedule: {
      enabled: true,
      startTime: "07:30",
      durationMin: 15,
      days: ["Daily"],
    },
    live: {
      moisture: 38,
      rawAdc: 2710,
      tempC: 32.0,
      humidity: 58,
      rainSensor: false,
      pumpOn: true,
      pumpRunSeconds: 420,
      pumpRestSeconds: 0,
      lastSeen: Date.now() - 15000,
      status: "ON",
      reason: "Moisture below threshold (38% < 45%)",
    },
  },
  {
    id: "field-wheat-03",
    fieldNo: 3,
    name: "Field 3 · North Wheat Ridge",
    crop: "wheat",
    cropLabel: "Wheat Variety HD-2967",
    soil: "sandy",
    soilLabel: "Sandy Loam",
    areaM2: 8094, // 2 acres
    areaAcres: 2.0,
    lat: 20.2885,
    lng: 85.819,
    deviceId: "esp32-node-wheat-3",
    flowRateLpm: 45.0,
    config: {
      lowT: 32,
      highT: 55,
      rainBlockPct: 65,
      maxRunMin: 45,
      minRestMin: 30,
      mode: "MANUAL",
    },
    schedule: {
      enabled: false,
      startTime: "18:00",
      durationMin: 30,
      days: ["Tue", "Sat"],
    },
    live: {
      moisture: 48,
      rawAdc: 2280,
      tempC: 29.0,
      humidity: 62,
      rainSensor: false,
      pumpOn: false,
      pumpRunSeconds: 0,
      pumpRestSeconds: 8400,
      lastSeen: Date.now() - 85000,
      status: "OFF",
      reason: "Manual mode standby",
    },
  },
];

export const INITIAL_DEVICES = [
  {
    id: "esp32-node-paddy-1",
    name: "Paddy Block Gateway Node",
    fieldId: "field-paddy-01",
    type: "Wi-Fi + LoRa Gateway",
    token: "agr_sec_9f482a1b7e0d",
    battV: 4.12,
    rssi: -64,
    fw: "v2.4.1-ota",
    lastSeen: Date.now() - 25000,
    calibration: { dryRaw: 3200, wetRaw: 1450 },
  },
  {
    id: "esp32-node-veg-2",
    name: "Nursery Solar LoRa Node",
    fieldId: "field-vegetable-02",
    type: "LoRa Sub-GHz (868MHz)",
    token: "agr_sec_33c99a80fa4e",
    battV: 3.88,
    rssi: -78,
    fw: "v2.4.1-ota",
    lastSeen: Date.now() - 15000,
    calibration: { dryRaw: 3150, wetRaw: 1420 },
  },
  {
    id: "esp32-node-wheat-3",
    name: "Wheat Sector Remote Node",
    fieldId: "field-wheat-03",
    type: "LoRa Sub-GHz (868MHz)",
    token: "agr_sec_8d172e98ca22",
    battV: 3.95,
    rssi: -82,
    fw: "v2.3.8-ota",
    lastSeen: Date.now() - 85000,
    calibration: { dryRaw: 3250, wetRaw: 1510 },
  },
];

export const INITIAL_EVENTS = [
  {
    id: "evt-01",
    fieldId: "field-paddy-01",
    start: new Date(Date.now() - 86400000 * 2).toISOString(),
    stop: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
    durationSec: 1800,
    reason: "Moisture below threshold (58% < 60%)",
    litresEst: 3600,
  },
  {
    id: "evt-02",
    fieldId: "field-paddy-01",
    start: new Date(Date.now() - 86400000).toISOString(),
    stop: new Date(Date.now() - 86400000 + 1500000).toISOString(),
    durationSec: 1500,
    reason: "Moisture below threshold (56% < 60%)",
    litresEst: 3000,
  },
  {
    id: "evt-03",
    fieldId: "field-vegetable-02",
    start: new Date(Date.now() - 14400000).toISOString(),
    stop: new Date(Date.now() - 14400000 + 900000).toISOString(),
    durationSec: 900,
    reason: "Scheduled morning window",
    litresEst: 1350,
  },
  {
    id: "evt-04",
    fieldId: "field-wheat-03",
    start: new Date(Date.now() - 43200000).toISOString(),
    stop: new Date(Date.now() - 43200000 + 1200000).toISOString(),
    durationSec: 1200,
    reason: "Manual one-tap run (20 min)",
    litresEst: 2800,
  },
];

export const INITIAL_TERMINAL_LOGS = [
  { time: "00:01:14", msg: "ESP32 Node #01 connected via LoRa SX1276. FreeRTOS task initialized.", highlight: false },
  { time: "00:01:18", msg: "Dynamic threshold verified: Turn ON when M < 60%, Cut-off when M >= 85%.", highlight: false },
  { time: "00:03:42", msg: "ADC probe voltage sampled: 2.14V -> Normalized VWC: 42.0%.", highlight: false },
  { time: "00:04:10", msg: "Relay actuator energized. Main pump active (32.4 L/min flow).", highlight: true },
  { time: "00:06:55", msg: "Open-Meteo sync: zero precipitation in immediate 4-hour window.", highlight: false },
];

export const AGRONOMY_CONTACT_DESK = {
  hotline: "+91 (0674) 259-8821",
  tollFree: "1800-419-AGRICA",
  email: "field-support@agrica.internal",
  dispatchOffice: "Regional Ag-Telemetry Hub, Plot 14, Infocity Road, Bhubaneswar, Odisha 751024",
  officers: [
    { name: "Dr. P. K. Mohapatra", role: "Senior Soil Hydrologist", phone: "+91 94370 12890" },
    { name: "Er. Sourav Nayak", role: "IoT Hardware & Relay Support", phone: "+91 98610 54321" },
  ],
};
