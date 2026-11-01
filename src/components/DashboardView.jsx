import React from "react";
import { getTranslation } from "../utils/i18n";

export const DashboardView = ({
  fields = [],
  weatherData = null,
  language = "en",
  onSelectField,
  onTogglePumpManual,
  onOpenNewField,
}) => {
  const t = (key) => getTranslation(language, key);

  // Check if any field has rain block
  const rainExpected = weatherData?.forecast?.maxRainProb24h >= 60;

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Weather Forecast & Rain-Pause Alert Banner */}
      {rainExpected && (
        <div className="bg-[#9FA9EE]/30 border-2 border-[#16130F] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🌧</span>
            <div>
              <div className="font-serif font-bold text-base text-[#16130F]">
                {t("rainExpected")}
              </div>
              <div className="font-mono text-xs text-[#16130F]/75">
                {weatherData?.forecast?.maxRainProb24h}% rain probability in next 24h · Total: {weatherData?.forecast?.sumRain48hMm} mm
              </div>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider bg-[#FBF6E6] border border-[#16130F] px-2.5 py-1 rounded-full font-bold">
            AUTO-PAUSE
          </span>
        </div>
      )}

      {/* Field Overview Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#16130F]">
            Field blocks · <span className="italic text-[#3E5B34]">Live telemetry</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
            {fields.length} MONITORED UNITS · REAL-TIME REFRESH
          </p>
        </div>

        <button
          onClick={onOpenNewField}
          className="md:hidden px-3 py-1.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase"
        >
          + {t("newField")}
        </button>
      </div>

      {/* Grid of Field Cards (Mobile-first) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map((field) => {
          const live = field.live || {};
          const isPumpRunning = live.pumpOn;
          const isOffline = Date.now() - (live.lastSeen || 0) > 300000; // > 5 minutes
          const lowT = field.config?.lowT || 40;
          const highT = field.config?.highT || 70;
          const moisture = live.moisture ?? 40;

          // Compute gauge status
          const isCriticalDry = moisture < lowT - 10;
          const isAdequate = moisture >= lowT && moisture < highT;

          return (
            <div
              key={field.id}
              className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-[#16130F]/15 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3E5B34]" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                      {field.crop} · {field.soil}
                    </span>
                  </div>
                  <h2
                    onClick={() => onSelectField(field)}
                    className="font-serif text-xl font-bold text-[#16130F] hover:text-[#3E5B34] cursor-pointer mt-0.5"
                  >
                    {field.name}
                  </h2>
                </div>

                {/* Device Online / Offline Badge */}
                <div
                  className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider border ${
                    isOffline
                      ? "bg-[#D98B6F]/20 text-[#D98B6F] border-[#D98B6F]"
                      : "bg-[#A8BE86]/30 text-[#3E5B34] border-[#3E5B34]/30"
                  }`}
                  title={`Last signal: ${Math.round((Date.now() - live.lastSeen) / 1000)}s ago`}
                >
                  {isOffline ? `⚠️ ${t("offline")}` : `● ${t("online")}`}
                </div>
              </div>

              {/* Moisture Gauge with Lower Threshold & Upper Stop Marks */}
              <div
                onClick={() => onSelectField(field)}
                className="py-4 cursor-pointer"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#16130F]">
                    {t("soilMoisture")}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-serif text-3xl sm:text-4xl font-bold ${
                        isCriticalDry ? "text-[#D98B6F]" : "text-[#16130F]"
                      }`}
                    >
                      {moisture}%
                    </span>
                    <span className="font-mono text-[10px] text-[#16130F]/60">VWC</span>
                  </div>
                </div>

                {/* Visual Bar Gauge with Markers */}
                <div className="relative w-full h-4 bg-[#16130F]/10 rounded-full overflow-hidden border border-[#16130F]/30">
                  {/* Moisture Fill */}
                  <div
                    className={`h-full transition-all duration-500 ${
                      moisture < lowT ? "bg-[#D98B6F]" : "bg-[#A9C8EC]"
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, moisture))}%` }}
                  />

                  {/* Marker: Lower Threshold T */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[#16130F] z-10"
                    style={{ left: `${lowT}%` }}
                    title={`Trigger threshold T: ${lowT}%`}
                  />

                  {/* Marker: Upper Stop Level */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[#3E5B34] z-10"
                    style={{ left: `${highT}%` }}
                    title={`Upper cutoff: ${highT}%`}
                  />
                </div>

                {/* Gauge Legend */}
                <div className="flex justify-between font-mono text-[8px] text-[#16130F]/60 mt-1.5">
                  <span>0%</span>
                  <span className="text-[#D98B6F] font-bold">TRIGGER: {lowT}%</span>
                  <span className="text-[#3E5B34] font-bold">STOP: {highT}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Live Environmental Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#16130F]/10 font-mono text-center">
                <div className="p-1.5 bg-[#FBF6E6] rounded border border-[#16130F]/10">
                  <div className="text-[8px] text-[#16130F]/60">AIR TEMP</div>
                  <div className="text-xs font-bold text-[#16130F]">{live.tempC ?? 30}°C</div>
                </div>
                <div className="p-1.5 bg-[#FBF6E6] rounded border border-[#16130F]/10">
                  <div className="text-[8px] text-[#16130F]/60">HUMIDITY</div>
                  <div className="text-xs font-bold text-[#16130F]">{live.humidity ?? 65}%</div>
                </div>
                <div className="p-1.5 bg-[#FBF6E6] rounded border border-[#16130F]/10">
                  <div className="text-[8px] text-[#16130F]/60">RAIN PROB</div>
                  <div className="text-xs font-bold text-[#16130F]">
                    {weatherData?.forecast?.maxRainProb24h ?? 15}%
                  </div>
                </div>
              </div>

              {/* Pump Status & One-Tap Manual Button */}
              <div className="pt-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Spinning Pump Icon when ON */}
                  <span
                    className={`text-xl ${isPumpRunning ? "animate-spin inline-block text-[#3E5B34]" : "text-[#16130F]/40"}`}
                  >
                    ⚙️
                  </span>
                  <div>
                    <div
                      className={`font-mono text-[10px] font-bold tracking-wider uppercase ${
                        live.status === "FAULT"
                          ? "text-[#D98B6F]"
                          : isPumpRunning
                          ? "text-[#3E5B34]"
                          : "text-[#16130F]/70"
                      }`}
                    >
                      {live.status === "FAULT"
                        ? t("pumpFault")
                        : live.status === "BLOCKED_RAIN"
                        ? t("pumpBlocked")
                        : isPumpRunning
                        ? t("pumpOn")
                        : t("pumpOff")}
                    </div>
                    <div className="font-mono text-[8px] text-[#16130F]/50">
                      MODE: {field.config?.mode || "AUTO"}
                    </div>
                  </div>
                </div>

                {/* One-Tap Pump Toggle Button */}
                <button
                  onClick={() => onTogglePumpManual(field)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    isPumpRunning
                      ? "bg-[#D98B6F] text-[#FBF6E6] border-[#16130F] hover:bg-[#c4775d]"
                      : "bg-[#0E0C0B] text-[#FBF6E6] border-[#0E0C0B] hover:bg-[#3E5B34]"
                  }`}
                >
                  {isPumpRunning ? "STOP" : "PUMP ON"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
