import React, { useState } from "react";
import { getTranslation } from "../utils/i18n";

export const FieldDetailView = ({
  field,
  events = [],
  history = [],
  language = "en",
  onBack,
  onUpdateConfig,
  onTogglePumpManual,
}) => {
  const t = (key) => getTranslation(language, key);

  const [activeRange, setActiveRange] = useState("24h");
  const [manualDuration, setManualDuration] = useState(20);
  const [activeMode, setActiveMode] = useState(field?.config?.mode || "AUTO");

  if (!field) return null;

  const live = field.live || {};
  const isPumpOn = live.pumpOn;
  const lowT = field.config?.lowT || 40;
  const highT = field.config?.highT || 70;
  const moisture = live.moisture ?? 42;

  // Filter events for this specific field
  const fieldEvents = events.filter((e) => e.fieldId === field.id);

  // Export Events to CSV
  const handleExportCSV = () => {
    const headers = "Event ID,Start Time,Stop Time,Duration (sec),Reason,Estimated Litres\n";
    const rows = fieldEvents
      .map(
        (e) =>
          `"${e.id}","${e.start}","${e.stop || ""}","${e.durationSec || 0}","${e.reason || ""}","${e.litresEst || 0}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `agrica_${field.id}_irrigation_log.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleModeChange = (newMode) => {
    setActiveMode(newMode);
    onUpdateConfig(field.id, { ...field.config, mode: newMode });
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-fadeIn">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#16130F]/70 hover:text-[#16130F]"
        >
          <span>←</span>
          <span>{t("dashboard")}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#FAF4E2] border border-[#16130F]/20">
            GPS: {field.lat?.toFixed(3)}°N, {field.lng?.toFixed(3)}°E
          </span>
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#A8BE86]/30 text-[#3E5B34] font-bold">
            {field.areaM2} m²
          </span>
        </div>
      </div>

      {/* Field Title Headline */}
      <div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-bold">
          {field.crop} · {field.soil}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16130F]">
          {field.name}
        </h1>
      </div>

      {/* Main Grid: Animated Soil Cross-Section & Live Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Large Animated Soil Cross-Section */}
        <div className="lg:col-span-5 bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#16130F]">
              RHIZOSPHERE SOIL STRATA
            </span>
            <span className="font-mono text-[9px] text-[#3E5B34] font-bold">
              ROOT ZONE: 30 CM
            </span>
          </div>

          {/* Cross Section Box with Water Level Animation */}
          <div className="relative h-64 w-full rounded-2xl border-2 border-[#16130F] overflow-hidden bg-[#FAF4E2] shadow-inner">
            {/* Topsoil Earth Background */}
            <div className="absolute inset-0 bg-[#D98B6F]/30" />

            {/* Rising Water Level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-[#A9C8EC]/85 border-t-2 border-[#16130F] transition-all duration-700 flex flex-col justify-between p-3"
              style={{ height: `${moisture}%` }}
            >
              <div className="flex justify-between font-mono text-[10px] text-[#16130F] font-bold">
                <span>WETTING FRONT</span>
                <span>{moisture}% VWC</span>
              </div>
              {isPumpOn && (
                <div className="text-[10px] font-mono text-[#3E5B34] font-bold animate-pulse">
                  💧 INFILTRATING ROOT ZONE...
                </div>
              )}
            </div>

            {/* Organic Crop Shoot on Top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-3xl">🌱</span>
              <div className="w-[2px] h-20 bg-[#3E5B34]" />
              <div className="w-16 h-[1.5px] bg-[#3E5B34]/60" />
            </div>

            {/* Setpoint Threshold Line T */}
            <div
              className="absolute left-0 right-0 border-b-2 border-dashed border-[#D98B6F] flex justify-end pr-2 z-10"
              style={{ bottom: `${lowT}%` }}
            >
              <span className="font-mono text-[9px] bg-white border border-[#D98B6F] px-1.5 rounded text-[#D98B6F] font-bold">
                TRIGGER T: {lowT}%
              </span>
            </div>

            {/* Setpoint Cutoff Line */}
            <div
              className="absolute left-0 right-0 border-b-2 border-dashed border-[#3E5B34] flex justify-start pl-2 z-10"
              style={{ bottom: `${highT}%` }}
            >
              <span className="font-mono text-[9px] bg-white border border-[#3E5B34] px-1.5 rounded text-[#3E5B34] font-bold">
                STOP LEVEL: {highT}%
              </span>
            </div>
          </div>

          <div className="font-mono text-xs text-[#16130F]/75 bg-[#FBF6E6] p-3 rounded-xl border border-[#16130F]/15">
            <strong>CURRENT EVALUATION:</strong> {live.reason || "Moisture within normal limits."}
          </div>
        </div>

        {/* Right: Line Chart & Pump Mode Controller */}
        <div className="lg:col-span-7 space-y-6">
          {/* Moisture vs Time Trend Chart */}
          <div className="bg-white border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#16130F]/15 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#16130F]/60">
                  HYDROLOGIC HISTORICAL RECORD
                </span>
                <h3 className="font-serif text-lg font-bold text-[#16130F]">
                  Soil Moisture Over Time
                </h3>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center gap-1 bg-[#FAF4E2] p-1 rounded-full border border-[#16130F]/20">
                {["1h", "24h", "7d"].map((rng) => (
                  <button
                    key={rng}
                    onClick={() => setActiveRange(rng)}
                    className={`px-3 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold transition-colors ${
                      activeRange === rng
                        ? "bg-[#16130F] text-[#FBF6E6]"
                        : "text-[#16130F]/60 hover:text-[#16130F]"
                    }`}
                  >
                    {rng}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div className="h-44 w-full bg-[#FAF4E2] rounded-xl border border-[#16130F]/15 p-3 flex items-end justify-between gap-1 relative overflow-hidden">
              {/* Threshold guidelines */}
              <div
                className="absolute left-0 right-0 border-b border-dashed border-[#D98B6F]/60 z-0 pointer-events-none"
                style={{ bottom: `${lowT}%` }}
              />
              <div
                className="absolute left-0 right-0 border-b border-dashed border-[#3E5B34]/60 z-0 pointer-events-none"
                style={{ bottom: `${highT}%` }}
              />

              {history.map((pt, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center relative z-10 group">
                  <div
                    className={`w-full rounded-t-sm transition-all ${
                      pt.pumpOn ? "bg-[#3E5B34]" : "bg-[#D98B6F]"
                    }`}
                    style={{ height: `${Math.min(100, Math.max(10, pt.moisture))}%` }}
                  />
                  {idx % 4 === 0 && (
                    <span className="font-mono text-[7px] text-[#16130F]/50 mt-1 whitespace-nowrap">
                      {pt.timeLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] text-[#16130F]/60">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#D98B6F] rounded-full inline-block" />
                SOIL MOISTURE %
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#3E5B34] rounded-full inline-block" />
                PUMP RUNNING EVENT
              </span>
            </div>
          </div>

          {/* Pump Control Panel with 3 Modes */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#3E5B34]">
                  ACTUATION & DISPATCH
                </span>
                <h3 className="font-serif text-xl font-bold text-[#16130F]">
                  Pump Control Panel
                </h3>
              </div>

              {/* Mode Selector Tabs */}
              <div className="flex items-center gap-1 bg-[#FBF6E6] p-1 rounded-full border border-[#16130F]/20">
                {["AUTO", "MANUAL", "SCHEDULE"].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold transition-colors ${
                      activeMode === m
                        ? "bg-[#0E0C0B] text-[#FBF6E6]"
                        : "text-[#16130F]/60 hover:text-[#16130F]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode 1: AUTO Mode Details */}
            {activeMode === "AUTO" && (
              <div className="p-4 bg-[#FBF6E6] rounded-xl border border-[#16130F]/15 font-mono text-xs space-y-2">
                <div className="font-bold text-[#3E5B34]">
                  AUTONOMOUS HYSTERESIS CONTROL ACTIVE
                </div>
                <p className="text-[#16130F]/80">
                  The irrigation engine starts the pump when moisture falls below {lowT}%, runs until {highT}% is reached, and automatically suppresses irrigation if rain is forecast.
                </p>
              </div>
            )}

            {/* Mode 2: MANUAL Mode with optional Timer */}
            {activeMode === "MANUAL" && (
              <div className="p-4 bg-[#FBF6E6] rounded-xl border border-[#16130F]/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#16130F]">
                    {t("runMinutes")}:
                  </span>
                  <div className="flex items-center gap-2">
                    {[10, 20, 30, 45].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setManualDuration(mins)}
                        className={`px-2.5 py-1 rounded font-mono text-xs border ${
                          manualDuration === mins
                            ? "bg-[#16130F] text-[#FBF6E6] border-[#16130F]"
                            : "bg-white text-[#16130F] border-[#16130F]/20"
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onTogglePumpManual(field, manualDuration)}
                  className={`w-full py-3 rounded-full font-mono text-xs uppercase font-bold tracking-wider transition-colors border ${
                    isPumpOn
                      ? "bg-[#D98B6F] text-[#FBF6E6] border-[#16130F] hover:bg-[#c4775d]"
                      : "bg-[#0E0C0B] text-[#FBF6E6] border-[#0E0C0B] hover:bg-[#3E5B34]"
                  }`}
                >
                  {isPumpOn ? t("turnOff") : `${t("turnOn")} (${manualDuration} MIN)`}
                </button>
              </div>
            )}

            {/* Mode 3: SCHEDULE Mode */}
            {activeMode === "SCHEDULE" && (
              <div className="p-4 bg-[#FBF6E6] rounded-xl border border-[#16130F]/15 font-mono text-xs space-y-3">
                <div className="font-bold text-[#16130F]">
                  TIME-WINDOW IRRIGATION SCHEDULE
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Window: 06:00 AM – 06:20 AM</span>
                  <span className="bg-[#A8BE86]/40 px-2 py-0.5 rounded font-bold text-[#3E5B34]">
                    ACTIVE (MON, WED, FRI)
                  </span>
                </div>
                <p className="text-[10px] text-[#16130F]/60">
                  Note: Even during scheduled windows, pump run is blocked if soil is already wet (&gt; {highT}%) or rain is predicted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Irrigation Log Table with CSV Export */}
      <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#16130F]/15 pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#3E5B34]">
              HISTORICAL ACTUATION LOG
            </span>
            <h3 className="font-serif text-xl font-bold text-[#16130F]">
              {t("eventsLog")}
            </h3>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-1.5 rounded-full bg-[#FBF6E6] border border-[#16130F] font-mono text-xs uppercase hover:bg-[#16130F] hover:text-[#FBF6E6] transition-colors"
          >
            {t("exportCsv")} ↓
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#16130F]/20 text-[#16130F]/60 text-[9px] uppercase">
                <th className="py-2 pr-4">Event Start</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2 pr-4">Trigger / Reason</th>
                <th className="py-2 text-right">Est. Litres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#16130F]/10">
              {fieldEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#FBF6E6]">
                  <td className="py-2.5 pr-4 text-[#16130F]">
                    {new Date(evt.start).toLocaleDateString()} · {new Date(evt.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="py-2.5 pr-4 text-[#16130F]/80">
                    {Math.round((evt.durationSec || 0) / 60)} min
                  </td>
                  <td className="py-2.5 pr-4 text-[#16130F]/80">
                    {evt.reason}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#3E5B34]">
                    {evt.litresEst?.toLocaleString()} L
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
