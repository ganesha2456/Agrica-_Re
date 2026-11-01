/**
 * AGRICA Smart Precision Irrigation Logic Engine
 * Shared evaluation logic used across simulator, web app, and documented for ESP32 firmware.
 */

export const CROP_SOIL_PROFILES = {
  crops: {
    paddy: { name: "Paddy (Rice)", defaultLowT: 65, defaultHighT: 85, waterReqMmPerDay: 7.5, rootDepthCm: 25 },
    wheat: { name: "Wheat", defaultLowT: 38, defaultHighT: 60, waterReqMmPerDay: 4.2, rootDepthCm: 40 },
    sugarcane: { name: "Sugarcane", defaultLowT: 50, defaultHighT: 75, waterReqMmPerDay: 6.8, rootDepthCm: 50 },
    cotton: { name: "Cotton", defaultLowT: 32, defaultHighT: 55, waterReqMmPerDay: 4.0, rootDepthCm: 60 },
    vegetables: { name: "Vegetables", defaultLowT: 45, defaultHighT: 70, waterReqMmPerDay: 5.0, rootDepthCm: 20 },
    custom: { name: "Custom Crop", defaultLowT: 40, defaultHighT: 70, waterReqMmPerDay: 5.0, rootDepthCm: 30 },
  },
  soils: {
    sandy: { name: "Sandy Soil", offsetLow: -6, offsetHigh: -5, drainFactor: 1.6, capacityPct: 15 },
    loamy: { name: "Loamy Soil", offsetLow: 0, offsetHigh: 0, drainFactor: 1.0, capacityPct: 30 },
    clay: { name: "Clay Soil", offsetLow: +8, offsetHigh: +6, drainFactor: 0.6, capacityPct: 45 },
  },
};

/**
 * Computes default thresholds based on crop and soil profile.
 */
export function getDefaultThresholds(cropKey = "paddy", soilKey = "loamy") {
  const crop = CROP_SOIL_PROFILES.crops[cropKey] || CROP_SOIL_PROFILES.crops.custom;
  const soil = CROP_SOIL_PROFILES.soils[soilKey] || CROP_SOIL_PROFILES.soils.loamy;

  const lowT = Math.max(15, Math.min(80, crop.defaultLowT + soil.offsetLow));
  const highT = Math.max(lowT + 10, Math.min(95, crop.defaultHighT + soil.offsetHigh));

  return { lowT, highT };
}

/**
 * Evaluates irrigation decision for a field.
 *
 * @param {Object} params
 * @param {number} params.moisture - Current soil moisture VWC percentage (0-100)
 * @param {boolean} params.currentPumpState - Whether pump is currently running
 * @param {number} params.pumpRunSeconds - Seconds pump has been running continuously
 * @param {number} params.pumpRestSeconds - Seconds pump has rested since last shutoff
 * @param {number} params.moistureAtPumpStart - Soil moisture recorded when pump started
 * @param {Object} params.config - Field configuration { lowT, highT, rainBlockPct, maxRunMin, minRestMin, mode }
 * @param {Object} params.weather - Current weather forecast { rainProbPct, recentRainMm }
 * @param {boolean} params.hardwareRainSensor - Direct binary rain sensor reading (true = raining)
 *
 * @returns {Object} { pumpOn: boolean, reason: string, status: 'ON'|'OFF'|'BLOCKED_RAIN'|'FAULT'|'RESTING', alert: string|null }
 */
export function evaluateIrrigationDecision({
  moisture,
  currentPumpState = false,
  pumpRunSeconds = 0,
  pumpRestSeconds = 9999,
  moistureAtPumpStart = moisture,
  config = {},
  weather = { rainProbPct: 0, recentRainMm: 0 },
  hardwareRainSensor = false,
}) {
  const lowT = config.lowT ?? 40;
  const highT = config.highT ?? 70;
  const rainBlockPct = config.rainBlockPct ?? 60;
  const maxRunSec = (config.maxRunMin ?? 30) * 60;
  const minRestSec = (config.minRestMin ?? 15) * 60;
  const mode = config.mode || "AUTO";

  // 1. Check Rain Block (Forecast probability or direct rain sensor)
  const isRainBlocked =
    hardwareRainSensor ||
    (weather.rainProbPct && weather.rainProbPct >= rainBlockPct) ||
    (weather.recentRainMm && weather.recentRainMm > 2.0);

  if (isRainBlocked) {
    return {
      pumpOn: false,
      status: "BLOCKED_RAIN",
      reason: hardwareRainSensor
        ? "Rain sensor detected active precipitation"
        : `Rain expected (${weather.rainProbPct}% probability ≥ ${rainBlockPct}% threshold)`,
      alert: isRainBlocked && currentPumpState ? "Irrigation suspended: precipitation expected." : null,
    };
  }

  // 2. Dry-Run Protection & Safety Checks (when pump is running)
  if (currentPumpState) {
    // Safety check A: Max Continuous Run Time Exceeded
    if (pumpRunSeconds >= maxRunSec) {
      return {
        pumpOn: false,
        status: "OFF",
        reason: `Max continuous run time reached (${config.maxRunMin || 30} min limit)`,
        alert: "Pump auto-stopped: safety runtime limit reached.",
      };
    }

    // Safety check B: Dry-run protection
    // If pump has run for > 3 minutes and moisture has not risen by at least 1%
    if (pumpRunSeconds > 180 && moisture <= moistureAtPumpStart) {
      return {
        pumpOn: false,
        status: "FAULT",
        reason: "Dry-run fault: pump running but soil moisture did not rise (pipe blocked or well dry)",
        alert: "CRITICAL: Dry-run protection triggered! Check borewell and pipe lines.",
      };
    }

    // Hysteresis Stop Level: Moisture reached upper cutoff
    if (moisture >= highT) {
      return {
        pumpOn: false,
        status: "OFF",
        reason: `Upper stop level reached (${moisture}% ≥ ${highT}%)`,
        alert: "Irrigation completed: root zone adequately replenished.",
      };
    }

    // Still running and within safe envelope
    return {
      pumpOn: true,
      status: "ON",
      reason: `Irrigating: moisture at ${moisture}% (target: ${highT}%)`,
      alert: null,
    };
  }

  // 3. Pump is currently OFF: evaluate whether to trigger ON
  if (mode === "AUTO") {
    // Safety: Minimum rest period between consecutive runs
    if (pumpRestSeconds < minRestSec) {
      return {
        pumpOn: false,
        status: "RESTING",
        reason: `Resting pump: ${Math.round((minRestSec - pumpRestSeconds) / 60)} min remaining in cooldown`,
        alert: null,
      };
    }

    // Hysteresis Start Level: Moisture dropped below lower threshold T
    if (moisture < lowT) {
      return {
        pumpOn: true,
        status: "ON",
        reason: `Moisture below threshold (${moisture}% < ${lowT}%)`,
        alert: `Irrigation started: soil moisture fell below ${lowT}%.`,
      };
    }

    return {
      pumpOn: false,
      status: "OFF",
      reason: `Moisture adequate (${moisture}% ≥ ${lowT}%)`,
      alert: null,
    };
  }

  // Manual / Scheduled fallback when pump is off
  return {
    pumpOn: false,
    status: "OFF",
    reason: `Mode is ${mode} (awaiting command or schedule)`,
    alert: null,
  };
}
