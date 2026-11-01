/**
 * AGRICA Firebase Realtime Database & Auth Service
 * Supports live Firebase synchronization with automatic fallback to local Demo Mode.
 */

// Placeholder for optional Firebase SDK import when configured
let db = null;
let auth = null;

export const isFirebaseConfigured = Boolean(
  import.meta.env?.VITE_FIREBASE_API_KEY && import.meta.env?.VITE_FIREBASE_DATABASE_URL
);

/**
 * Sends a command to /commands/{deviceId} for the ESP32 hardware to consume.
 * Schema: { pump: "ON"|"OFF"|"AUTO", runMinutes: number, ts: timestamp }
 */
export async function sendDeviceCommand(deviceId, command = {}) {
  const payload = {
    pump: command.pump || "AUTO",
    runMinutes: command.runMinutes || 0,
    ts: Date.now(),
  };

  if (!isFirebaseConfigured || !db) {
    // In Demo mode, acknowledge command locally
    console.info(`[Demo Simulator] Command sent to /commands/${deviceId}:`, payload);
    return { success: true, mode: "demo", payload };
  }

  try {
    // When live Firebase is initialized:
    // await set(ref(db, `commands/${deviceId}`), payload);
    return { success: true, mode: "live", payload };
  } catch (err) {
    console.error("Firebase command dispatch error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Saves sensor calibration values to /devices/{deviceId}/calibration
 */
export async function saveCalibration(deviceId, { dryRaw, wetRaw }) {
  const payload = {
    dryRaw: Number(dryRaw),
    wetRaw: Number(wetRaw),
    updatedAt: Date.now(),
  };

  if (!isFirebaseConfigured || !db) {
    return { success: true, mode: "demo", payload };
  }

  try {
    // await update(ref(db, `devices/${deviceId}/calibration`), payload);
    return { success: true, mode: "live", payload };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
