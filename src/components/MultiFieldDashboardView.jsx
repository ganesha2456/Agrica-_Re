import React from "react";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  CadastralSurveyEngraving
} from "./HalftoneSVGs";
import {
  IconSurveyGrid,
  IconWaterDrop,
  IconSoilProbe,
  IconPumpImpeller
} from "./AlmanacIcons";

export const MultiFieldDashboardView = ({
  fields = [],
  onSelectField,
  onTogglePump,
  onOpenNewField,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  // Compute live aggregates
  const activePlotsCount = fields.length;
  const activePumpsCount = fields.filter((f) => f.live?.pumpOn).length;
  const avgMoisture =
    Math.round(
      (fields.reduce((sum, f) => sum + (f.live?.moisture || 40), 0) /
        (fields.length || 1)) *
        10
    ) / 10;
  const totalWaterSaved = 1420 + activePumpsCount * 12;

  return (
    <div className="space-y-6 pb-20 md:pb-12 animate-fadeIn">
      {/* Plate 3.0 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 3.0"
        title="Cadastral Telemetry Survey & Terraces"
        subtitle="Multi-plot elevation contours, irrigation canals & LoRa mesh transmission"
        defaultExpanded={false}
      >
        <CadastralSurveyEngraving />
      </PageArtworkHeader>

      {/* Top Header Bar with Pulse Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#16130F]/15 pb-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#16130F]">
            Live Field Cockpit · <span className="italic text-[#3E5B34]">Multi-plot grid</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
            DISTRIBUTED CAPACITIVE TELEMETRY & SUB-GHZ RECEPTION
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF4E2] border border-[#3E5B34] font-mono text-xs text-[#3E5B34] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#3E5B34] animate-ping" />
            <span>Real-time Stream (Active)</span>
          </div>

          <button
            onClick={onOpenNewField}
            className="px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
          >
            + Register Plot
          </button>
        </div>
      </div>

      {/* 4 Metric Stat Cards Row (from workspace2.html) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Monitored Plots */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm space-y-1 font-mono">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#16130F]/60 font-bold">
            <span>MONITORED PLOTS</span>
            <IconSurveyGrid className="w-4 h-4 text-[#3E5B34]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#16130F]">
            {activePlotsCount} <span className="text-sm font-sans font-normal text-[#16130F]/70">Zones</span>
          </div>
          <div className="text-[10px] text-[#3E5B34] font-bold">
            100% Nodes Online & Reporting
          </div>
        </div>

        {/* Card 2: Cumulative Water Conserved */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm space-y-1 font-mono">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#16130F]/60 font-bold">
            <span>CUMULATIVE WATER CONSERVED</span>
            <IconWaterDrop className="w-4 h-4 text-[#A9C8EC]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#3E5B34]">
            {totalWaterSaved.toLocaleString()} <span className="text-sm font-sans font-normal text-[#16130F]/70">L</span>
          </div>
          <div className="text-[10px] text-[#3E5B34] font-bold">
            ~38% Savings vs. Flood Schedule
          </div>
        </div>

        {/* Card 3: Average Soil Moisture */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm space-y-1 font-mono">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#16130F]/60 font-bold">
            <span>MEAN ROOT-ZONE MOISTURE</span>
            <IconSoilProbe className="w-4 h-4 text-[#D98B6F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#16130F]">
            {avgMoisture}% <span className="text-sm font-sans font-normal text-[#16130F]/70">VWC</span>
          </div>
          <div className="text-[10px] text-[#16130F]/60">
            Across 3.5 Total Farm Acres
          </div>
        </div>

        {/* Card 4: Active Relay Status */}
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-5 shadow-sm space-y-1 font-mono">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#16130F]/60 font-bold">
            <span>ACTIVE RELAY STATUS</span>
            <IconPumpImpeller className="w-4 h-4 text-[#D98B6F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#D98B6F]">
            {activePumpsCount} <span className="text-sm font-sans font-normal text-[#16130F]/70">Running</span>
          </div>
          <div className="text-[10px] text-[#16130F]/60">
            {activePlotsCount - activePumpsCount} Standby (Satisfied)
          </div>
        </div>
      </div>

      {/* Multi-Field Cards Grid (from workspace2.html) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => {
          const live = field.live || {};
          const isPumpRunning = live.pumpOn;
          const lowT = field.config?.lowT || 40;
          const highT = field.config?.highT || 70;
          const moisture = live.moisture ?? 42;
          const isWarning = moisture < lowT;

          return (
            <div
              key={field.id}
              className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-60 h-auto pointer-events-none opacity-[0.05] select-none">
                <CadastralSurveyEngraving />
              </div>
              {/* Field Header */}
              <div className="flex items-start justify-between border-b border-[#16130F]/15 pb-3 relative z-10">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                    PLOT #{field.fieldNo || 1} · {field.cropLabel || field.crop}
                  </div>
                  <h3
                    onClick={() => onSelectField(field)}
                    className="font-serif text-2xl font-bold text-[#16130F] hover:text-[#3E5B34] cursor-pointer mt-0.5"
                  >
                    {field.name}
                  </h3>
                  <div className="font-mono text-[10px] text-[#16130F]/70 mt-0.5">
                    {field.soilLabel || field.soil} · {field.areaAcres || 1.0} Acres
                  </div>
                </div>

                <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded-full bg-[#A8BE86]/30 text-[#3E5B34] font-bold border border-[#3E5B34]/30">
                  {field.deviceId}
                </span>
              </div>

              {/* Dial Row (from workspace2.html) */}
              <div
                onClick={() => onSelectField(field)}
                className="flex items-center gap-5 bg-[#FBF6E6] p-4 rounded-2xl border border-[#16130F]/15 cursor-pointer"
              >
                {/* Circular Dial */}
                <div
                  className={`w-20 h-20 rounded-full bg-white border-4 flex flex-col items-center justify-center flex-shrink-0 shadow-sm ${
                    isWarning
                      ? "border-[#D98B6F] text-[#D98B6F]"
                      : "border-[#3E5B34] text-[#16130F]"
                  }`}
                >
                  <div className="font-serif text-2xl font-bold leading-none">
                    {moisture}%
                  </div>
                  <div className="font-mono text-[8px] text-[#16130F]/60 uppercase">
                    VWC
                  </div>
                </div>

                {/* Telemetry Meta Strip */}
                <div className="flex-1 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#16130F]/60">AIR TEMP:</span>
                    <span className="font-bold text-[#16130F]">{live.tempC ?? 30}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#16130F]/60">HUMIDITY:</span>
                    <span className="font-bold text-[#16130F]">{live.humidity ?? 65}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#16130F]/60">TARGET (T):</span>
                    <span className="font-bold text-[#3E5B34]">{lowT}% – {highT}%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Strip with Pump Tag & Direct Toggle */}
              <div className="pt-3 border-t border-[#16130F]/15 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <IconPumpImpeller className="w-5 h-5 text-[#3E5B34]" isSpinning={isPumpRunning} />
                  <span
                    className={`font-mono text-[10px] font-bold uppercase ${
                      isPumpRunning ? "text-[#3E5B34]" : "text-[#16130F]/60"
                    }`}
                  >
                    {isPumpRunning ? "RELAY ON" : "RELAY OFF"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTogglePump(field)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold border transition-colors ${
                      isPumpRunning
                        ? "bg-[#D98B6F] text-[#FBF6E6] border-[#16130F]"
                        : "bg-[#0E0C0B] text-[#FBF6E6] border-[#0E0C0B] hover:bg-[#3E5B34]"
                    }`}
                  >
                    {isPumpRunning ? "Stop" : "Pump On"}
                  </button>

                  <button
                    onClick={() => onSelectField(field)}
                    className="font-mono text-xs text-[#3E5B34] hover:underline font-bold"
                  >
                    Inspect →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
