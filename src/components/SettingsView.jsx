import React from "react";
import { getTranslation } from "../utils/i18n";
import { isFirebaseConfigured } from "../services/firebase";

export const SettingsView = ({
  language = "en",
  setLanguage,
  units = "L",
  setUnits,
  rainBlockThreshold = 60,
  setRainBlockThreshold,
  maxRunLimit = 30,
  setMaxRunLimit,
}) => {
  const t = (key) => getTranslation(language, key);

  return (
    <div className="space-y-6 pb-20 md:pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#16130F]/15 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#16130F]">
          System Settings · <span className="italic text-[#3E5B34]">Configuration</span>
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
          LOCALIZATION · AUTOMATION SAFETY LIMITS · TELEMETRY UNITS
        </p>
      </div>

      <div className="space-y-5">
        {/* 1. Language & Units */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#16130F] border-b border-[#16130F]/15 pb-2">
            Language & Agronomic Units
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                Display Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs cursor-pointer"
              >
                <option value="en">English (Almanac Standard)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                Volume Metrics:
              </label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs cursor-pointer"
              >
                <option value="L">Litres (L)</option>
                <option value="m3">Cubic Metres (m³)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Automation Safety Controls */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#16130F] border-b border-[#16130F]/15 pb-2">
            Automated Pump Safety Limits
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono text-xs uppercase font-bold text-[#16130F]">
                  Precipitation Lockout Threshold:
                </label>
                <span className="font-mono text-xs font-bold bg-[#A8BE86]/40 px-2 py-0.5 rounded text-[#3E5B34]">
                  {rainBlockThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={rainBlockThreshold}
                onChange={(e) => setRainBlockThreshold(Number(e.target.value))}
                className="w-full h-2 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#3E5B34]"
              />
              <p className="font-sans text-[11px] text-[#16130F]/65 mt-1">
                Irrigation is suspended if rainfall forecast probability exceeds this percentage.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono text-xs uppercase font-bold text-[#16130F]">
                  Maximum Continuous Pump Run Time:
                </label>
                <span className="font-mono text-xs font-bold bg-[#D98B6F]/30 px-2 py-0.5 rounded text-[#D98B6F]">
                  {maxRunLimit} min
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={maxRunLimit}
                onChange={(e) => setMaxRunLimit(Number(e.target.value))}
                className="w-full h-2 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#D98B6F]"
              />
              <p className="font-sans text-[11px] text-[#16130F]/65 mt-1">
                Hard safety cutoff prevents pump motor burnout if sensor fails to register water rise.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Firebase & Cloud Connectivity Status */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-3 font-mono text-xs">
          <h2 className="font-serif text-xl font-bold text-[#16130F] border-b border-[#16130F]/15 pb-2">
            Cloud Sync & Database Engine
          </h2>

          <div className="flex items-center justify-between py-1">
            <span>BACKEND STATUS:</span>
            <span className={`px-2.5 py-0.5 rounded font-bold uppercase ${
              isFirebaseConfigured ? "bg-[#3E5B34] text-white" : "bg-[#D98B6F]/20 text-[#D98B6F]"
            }`}>
              {isFirebaseConfigured ? "CONNECTED TO FIREBASE" : "DEMO SIMULATOR RUNNING"}
            </span>
          </div>

          <p className="font-sans text-xs text-[#16130F]/75 leading-relaxed">
            In Demo mode, AGRICA simulates continuous physical soil moisture dynamics (drying during hot daylight hours, rapid wetting upon relay closure, and rain jumps) with zero external credentials. To bind to real hardware, configure your Firebase Realtime Database in <code>.env</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
