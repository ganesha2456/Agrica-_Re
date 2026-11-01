import React, { useState } from "react";
import { getTranslation } from "../utils/i18n";

export const DevicesView = ({
  devices = [],
  fields = [],
  language = "en",
  onAddDevice,
  onSaveCalibration,
}) => {
  const t = (key) => getTranslation(language, key);

  const [showAddModal, setShowAddModal] = useState(false);
  const [calibratingDevice, setCalibratingDevice] = useState(null);

  // New Device Form State
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceField, setNewDeviceField] = useState(fields[0]?.id || "");
  const [newDeviceType, setNewDeviceType] = useState("Wi-Fi + LoRa Gateway");

  // Calibration Form State
  const [dryAdc, setDryAdc] = useState(3200);
  const [wetAdc, setWetAdc] = useState(1450);

  // Newly generated token state for Add Device
  const [generatedCreds, setGeneratedCreds] = useState(null);

  const handleCreateDevice = (e) => {
    e.preventDefault();
    const id = `esp32-node-${Math.random().toString(36).substring(2, 7)}`;
    const token = `agr_sec_${Math.random().toString(36).substring(2, 12)}`;

    const device = {
      id,
      name: newDeviceName || "New ESP32 Node",
      fieldId: newDeviceField,
      type: newDeviceType,
      token,
      battV: 4.15,
      rssi: -65,
      fw: "v2.4.1-ota",
      lastSeen: Date.now(),
      calibration: { dryRaw: 3200, wetRaw: 1450 },
    };

    onAddDevice(device);
    setGeneratedCreds({ id, token });
  };

  const handleApplyCalibration = () => {
    if (!calibratingDevice) return;
    onSaveCalibration(calibratingDevice.id, { dryRaw: dryAdc, wetRaw: wetAdc });
    setCalibratingDevice(null);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#16130F]/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#16130F]">
            Devices & LoRa Nodes · <span className="italic text-[#3E5B34]">Hardware mesh</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
            {devices.length} REGISTERED MICROCONTROLLERS & GATEWAYS
          </p>
        </div>

        <button
          onClick={() => {
            setGeneratedCreds(null);
            setShowAddModal(true);
          }}
          className="px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
        >
          + {t("addDevice")}
        </button>
      </div>

      {/* Devices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {devices.map((dev) => {
          const assignedField = fields.find((f) => f.id === dev.fieldId);
          const isOffline = Date.now() - (dev.lastSeen || 0) > 300000;

          return (
            <div
              key={dev.id}
              className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-2.5">
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#FBF6E6] border border-[#16130F]/20 font-bold">
                    {dev.type}
                  </span>
                  <span
                    className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      isOffline ? "bg-[#D98B6F]/20 text-[#D98B6F]" : "bg-[#A8BE86]/30 text-[#3E5B34]"
                    }`}
                  >
                    {isOffline ? t("offline") : t("online")}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif text-lg font-bold text-[#16130F]">
                    {dev.name}
                  </h3>
                  <div className="font-mono text-xs text-[#3E5B34] font-semibold">
                    Field: {assignedField?.name || "Unassigned"}
                  </div>
                  <div className="font-mono text-[10px] text-[#16130F]/60 mt-1">
                    ID: {dev.id} · FW: {dev.fw}
                  </div>
                </div>
              </div>

              {/* Hardware Telemetry Strip */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-[#FBF6E6] p-3 rounded-xl border border-[#16130F]/15">
                <div>
                  <span className="text-[9px] text-[#16130F]/60 block uppercase">BATTERY / SOLAR</span>
                  <span className="font-bold text-[#16130F]">{dev.battV} V</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#16130F]/60 block uppercase">SIGNAL (RSSI)</span>
                  <span className="font-bold text-[#16130F]">{dev.rssi} dBm</span>
                </div>
              </div>

              {/* Calibration Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#16130F]/60">
                  Dry: {dev.calibration?.dryRaw} | Wet: {dev.calibration?.wetRaw}
                </span>

                <button
                  onClick={() => {
                    setCalibratingDevice(dev);
                    setDryAdc(dev.calibration?.dryRaw || 3200);
                    setWetAdc(dev.calibration?.wetRaw || 1450);
                  }}
                  className="px-3 py-1.5 rounded-full border border-[#16130F] bg-white font-mono text-[10px] uppercase font-bold hover:bg-[#16130F] hover:text-white transition-colors"
                >
                  {t("calibrate")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensor Calibration Wizard Modal */}
      {calibratingDevice && (
        <div className="fixed inset-0 z-50 bg-[#16130F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fadeIn">
            <div className="border-b border-[#16130F]/15 pb-3">
              <span className="font-mono text-[10px] uppercase font-bold text-[#3E5B34]">
                TWO-POINT DIELECTRIC CONVERSION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Sensor Calibration Wizard
              </h3>
              <p className="font-sans text-xs text-[#16130F]/70 mt-1">
                Calibrate <strong>{calibratingDevice.name}</strong> to match your local soil salinity and probe tolerances.
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1: Dry Air ADC */}
              <div className="p-4 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15 space-y-1">
                <label className="font-mono text-xs font-bold text-[#16130F] block">
                  1. Bone-Dry Air Reading (0% Moisture):
                </label>
                <p className="text-[10px] font-sans text-[#16130F]/60">
                  Hold probe in dry air, away from hands.
                </p>
                <input
                  type="number"
                  value={dryAdc}
                  onChange={(e) => setDryAdc(Number(e.target.value))}
                  className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-sm"
                />
              </div>

              {/* Step 2: Wet Water ADC */}
              <div className="p-4 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15 space-y-1">
                <label className="font-mono text-xs font-bold text-[#16130F] block">
                  2. Submerged Water Reading (100% Moisture):
                </label>
                <p className="text-[10px] font-sans text-[#16130F]/60">
                  Submerge probe blade in a cup of water up to the stop line.
                </p>
                <input
                  type="number"
                  value={wetAdc}
                  onChange={(e) => setWetAdc(Number(e.target.value))}
                  className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-sm"
                />
              </div>

              <div className="font-mono text-[10px] text-[#16130F]/70 bg-white p-2.5 rounded border border-[#16130F]/15">
                Formula: VWC% = ((Dry - ADC) / (Dry - Wet)) × 100
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCalibratingDevice(null)}
                className="px-4 py-2 font-mono text-xs uppercase text-[#16130F]/70 hover:text-[#16130F]"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleApplyCalibration}
                className="px-5 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34]"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal with Firmware Config Snippet */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#16130F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="border-b border-[#16130F]/15 pb-3">
              <span className="font-mono text-[10px] uppercase font-bold text-[#3E5B34]">
                MICROCONTROLLER PROVISIONING
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Provision New Field Node
              </h3>
            </div>

            {!generatedCreds ? (
              <form onSubmit={handleCreateDevice} className="space-y-4">
                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Node Name / Identifier:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paddy Gateway West"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Assign to Field Block:
                  </label>
                  <select
                    value={newDeviceField}
                    onChange={(e) => setNewDeviceField(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
                  >
                    {fields.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Radio / Uplink Interface:
                  </label>
                  <select
                    value={newDeviceType}
                    onChange={(e) => setNewDeviceType(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
                  >
                    <option value="Wi-Fi + LoRa Gateway">Wi-Fi + LoRa Gateway</option>
                    <option value="LoRa Sub-GHz (868MHz)">LoRa Sub-GHz (868MHz)</option>
                    <option value="LoRa Sub-GHz (915MHz)">LoRa Sub-GHz (915MHz)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 font-mono text-xs uppercase text-[#16130F]/70"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34]"
                  >
                    Generate Credentials →
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-[#A8BE86]/20 border border-[#3E5B34] rounded-xl font-mono text-xs text-[#3E5B34] font-bold">
                  ✓ Node Registered Successfully!
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#16130F]/80">
                    Paste these constants into your <strong>agrica_esp32.ino</strong> firmware:
                  </div>

                  <pre className="p-3 bg-[#0E0C0B] text-[#FBF6E6] rounded-xl font-mono text-[11px] overflow-x-auto selection:bg-[#D98B6F]">
{`const char* DEVICE_ID    = "${generatedCreds.id}";
const char* DEVICE_TOKEN = "${generatedCreds.token}";`}
                  </pre>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
