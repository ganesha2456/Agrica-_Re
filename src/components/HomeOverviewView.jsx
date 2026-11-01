import React, { useState } from "react";
import { getTranslation } from "../utils/i18n";
import {
  IconWaterDrop,
  IconPumpImpeller,
  IconSoilProbe,
  IconRainCloud,
  IconWheat,
} from "./AlmanacIcons";

export const HomeOverviewView = ({
  fields = [],
  onNavigate,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);
  const [viewMode, setViewMode] = useState("almanac"); // "almanac" | "natural"

  const totalAreaM2 = fields.reduce((sum, f) => sum + (f.areaM2 || 0), 0);
  const activePumps = fields.filter((f) => f.live?.pumpOn).length;

  return (
    <div className="space-y-8 pb-20 md:pb-12 animate-fadeIn">
      {/* In-Situ Sprinkler & Furrow Irrigation Plate (Editorial Almanac Finish) */}
      <div className="w-full bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-4 sm:p-6 shadow-md space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b-2 border-[#16130F]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E5B34] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#3E5B34] font-bold">
              PLATE 1.4 &bull; IN-SITU ROTARY SPRINKLER & FURROW IRRIGATION
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase text-[#16130F]/60">
              PRINT FINISH:
            </span>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "almanac" ? "natural" : "almanac")}
              className="px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase border border-[#16130F] bg-[#FBF6E6] hover:bg-[#16130F] hover:text-[#FBF6E6] transition-colors"
            >
              {viewMode === "almanac" ? "🖨️ ALMANAC PRINT LOOK" : "📷 NATURAL PHOTO"}
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border-2 border-[#16130F] bg-[#16130F] group select-none">
          <img
            src="/irrigation_field.png"
            alt="Agricultural Furrow Sprinkler Irrigation"
            className={`w-full max-h-[460px] object-cover transition-all duration-500 ${
              viewMode === "almanac"
                ? "filter sepia-[0.18] contrast-[1.12] brightness-[0.98] saturate-[0.92]"
                : "filter-none"
            }`}
          />

          {viewMode === "almanac" && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25"
              style={{
                backgroundImage: "radial-gradient(circle, #16130F 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            />
          )}

          <div className="absolute top-3 left-3 bg-[#FAF4E2]/95 backdrop-blur border border-[#16130F] px-3 py-1.5 rounded-full font-mono text-[10px] font-bold text-[#16130F] shadow">
            <span className="text-[#3E5B34]">●</span> RELAY: ENERGIZED &bull; 32.4 L/MIN
          </div>

          <div className="absolute top-3 right-3 bg-[#FAF4E2]/95 backdrop-blur border border-[#16130F] px-3 py-1.5 rounded-full font-mono text-[10px] font-bold text-[#16130F] shadow">
            <span className="text-[#A9C8EC]">●</span> ROTARY SPRAY ARCS &bull; 4.8M RADIUS
          </div>

          <div className="absolute bottom-3 left-3 bg-[#FAF4E2]/95 backdrop-blur border border-[#16130F] px-3 py-1.5 rounded-full font-mono text-[10px] font-bold text-[#16130F] shadow">
            <span className="text-[#D98B6F]">●</span> FURROW INFILTRATION &bull; PLOT #1
          </div>

          <div className="absolute bottom-3 right-3 hidden sm:block bg-[#FAF4E2]/95 backdrop-blur border border-[#16130F] px-3 py-1.5 rounded-full font-mono text-[10px] font-bold text-[#16130F] shadow">
            CLOSED-LOOP HYSTERESIS ACTIVE
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1 font-mono text-xs">
          <div className="font-serif text-base text-[#16130F] leading-snug">
            Rotary misting nozzles discharging over furrow crop rows &bull;{" "}
            <span className="italic text-[#3E5B34]">direct infiltration to root-depth 15–25 cm</span>
          </div>
          <div className="text-[10px] text-[#16130F]/60 uppercase tracking-wider flex-shrink-0">
            EXP-PLOT 1 &bull; BOREWELL MOTOR RELAY #01 &bull; IN-SITU TELEMETRY
          </div>
        </div>
      </div>
      {/* Editorial Headline Hero Banner */}
      <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#16130F]/20 bg-[#FBF6E6]">
            <span className="w-2 h-2 rounded-full bg-[#3E5B34]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/70 font-semibold">
              PRECISION ROOT-ZONE WATER MANAGEMENT · REV 2.4
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#16130F] leading-tight tracking-tight">
            Agrica Smart <span className="italic text-[#3E5B34]">Irrigation Cockpit</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#16130F]/80 leading-relaxed">
            Automate agricultural water pumps using measured field soil conditions, track real-time root-zone moisture, and prevent over-irrigation with weather-aware intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("controller")}
              className="px-6 py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase tracking-wider hover:bg-[#3E5B34] transition-colors shadow-sm"
            >
              Launch Pump Controller →
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-6 py-2.5 rounded-full border border-[#16130F] font-mono text-xs uppercase tracking-wider hover:bg-[#16130F]/5 transition-colors"
            >
              Open Multi-Field Cockpit
            </button>
          </div>
        </div>

        {/* Top-right subtle seal badge */}
        <div className="hidden lg:flex absolute top-8 right-8 flex-col items-center justify-center w-28 h-28 rounded-full border border-dashed border-[#16130F]/40 p-2 text-center font-mono">
          <span className="text-xl">🌾</span>
          <span className="text-[8px] font-bold tracking-widest text-[#3E5B34] uppercase mt-1">
            AGRONOMIC
          </span>
          <span className="text-[7px] text-[#16130F]/60">STANDARD</span>
        </div>
      </div>

      {/* 4 Value Proposition Pillars (from home.html) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "35% - 50% Water Saved",
            desc: "Operates pumps only when soil moisture is below the calibrated threshold.",
            icon: <IconWaterDrop className="w-6 h-6 text-[#A9C8EC]" />,
          },
          {
            title: "Automated Pump Relay",
            desc: "Instant manual toggle and autonomous dynamic threshold control via LoRa/Wi-Fi.",
            icon: <IconPumpImpeller className="w-6 h-6 text-[#3E5B34]" />,
          },
          {
            title: "Continuous Soil Telemetry",
            desc: "Real-time capacitive root-zone sensor data stream at 60-second intervals.",
            icon: <IconSoilProbe className="w-6 h-6 text-[#D98B6F]" />,
          },
          {
            title: "Rainfall Bypass Lockout",
            desc: "Automatically pauses irrigation cycles when rainfall is forecasted.",
            icon: <IconRainCloud className="w-6 h-6 text-[#9FA9EE]" />,
          },
        ].map((pillar) => (
          <div
            key={pillar.title}
            className="p-5 bg-[#FAF4E2] rounded-2xl border-2 border-[#16130F] shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-[#FBF6E6] border border-[#16130F]/20 flex items-center justify-center">{pillar.icon}</span>
              <span className="w-2 h-2 rounded-full bg-[#A8BE86]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#16130F]">
                {pillar.title}
              </h3>
              <p className="font-sans text-xs text-[#16130F]/75 leading-relaxed mt-1">
                {pillar.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Integrated Farm Management Tools (Module Cards from home.html) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-3">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-[#3E5B34]">
              INTEGRATED FARM MANAGEMENT TOOLS
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#16130F]">
              Agricultural Control Modules
            </h2>
          </div>
          <span className="font-mono text-xs text-[#16130F]/60">
            {fields.length} Active Plots Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Pump Controller */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#A9C8EC]/40 text-[#16130F] font-bold">
                  RELAY ACTUATOR
                </span>
                <span className="font-mono text-[10px] text-[#3E5B34] font-bold">
                  {activePumps > 0 ? "PUMP ACTIVE" : "STANDBY"}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Field & Irrigation Controller
              </h3>
              <p className="font-sans text-xs text-[#16130F]/80 leading-relaxed">
                Control field water pumps with a single click. Switch between automated threshold mode and manual override with live sensor simulation and console logs.
              </p>
            </div>

            <button
              onClick={() => onNavigate("controller")}
              className="w-full py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
            >
              Launch Controller →
            </button>
          </div>

          {/* Card 2: Multi-Field Dashboard */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#A8BE86]/40 text-[#3E5B34] font-bold">
                  TELEMETRY COCKPIT
                </span>
                <span className="font-mono text-[10px] text-[#16130F]/60">
                  TOTAL AREA: {(totalAreaM2 / 4047).toFixed(1)} ACRES
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Multi-Field Cockpit Dashboard
              </h3>
              <p className="font-sans text-xs text-[#16130F]/80 leading-relaxed">
                Observe moisture levels, soil temperatures, and pump states across all registered agricultural plots in real time with quick-action toggles.
              </p>
            </div>

            <button
              onClick={() => onNavigate("dashboard")}
              className="w-full py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
            >
              Open Live Cockpit →
            </button>
          </div>

          {/* Card 3: Weather Station */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#9FA9EE]/40 text-[#16130F] font-bold">
                  WEATHER STATION
                </span>
                <span className="font-mono text-[10px] text-[#3E5B34] font-bold">
                  OPEN-METEO SYNC
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Weather & Precipitation Station
              </h3>
              <p className="font-sans text-xs text-[#16130F]/80 leading-relaxed">
                Check hyperlocal temperature, relative humidity, wind speed, barometric pressure, and 48-hour rainfall probabilities to safeguard against waterlogging.
              </p>
            </div>

            <button
              onClick={() => onNavigate("weather")}
              className="w-full py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
            >
              Inspect Weather Station →
            </button>
          </div>

          {/* Card 4: Agronomist Support */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#D98B6F]/30 text-[#D98B6F] font-bold">
                  EXPERT HELPDESK
                </span>
                <span className="font-mono text-[10px] text-[#16130F]/60">
                  TOLL-FREE 1800-419-AGRICA
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                Agronomist Dispatch & Support
              </h3>
              <p className="font-sans text-xs text-[#16130F]/80 leading-relaxed">
                Connect directly with regional Krishi Vigyan Kendra agronomists, soil hydrologists, and emergency pump relay electrical technicians.
              </p>
            </div>

            <button
              onClick={() => onNavigate("contact")}
              className="w-full py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
            >
              Contact Agronomist Desk →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
