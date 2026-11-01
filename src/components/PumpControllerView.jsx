import React, { useState } from "react";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  BorewellPumpHouseEngraving,
  SoilStratigraphyEngraving
} from "./HalftoneSVGs";
import {
  IconPumpImpeller,
  IconRainCloud,
  IconWaterDrop,
  IconSoilProbe,
  IconWheat
} from "./AlmanacIcons";

export const PumpControllerView = ({
  fields = [],
  activeFieldId,
  setActiveFieldId,
  onTogglePump,
  onUpdateThreshold,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  // Selected Field
  const field = fields.find((f) => f.id === activeFieldId) || fields[0] || {};
  const live = field.live || {};
  const isPumpOn = live.pumpOn;
  const moisture = live.moisture ?? 42;
  const lowT = field.config?.lowT || 45;
  const highT = field.config?.highT || 75;

  // Controller State
  const [controllerMode, setControllerMode] = useState(field.config?.mode || "AUTO");
  const [simulatedRain, setSimulatedRain] = useState(false);
  const [sliderT, setSliderT] = useState(lowT);
  const [terminalLogs, setTerminalLogs] = useState([
    { time: "00:01:14", msg: "ESP32 Node #01 connected via LoRa SX1276. FreeRTOS task initialized.", highlight: false },
    { time: "00:01:18", msg: `Dynamic threshold verified: Turn ON when M < ${lowT}%, Cut-off when M >= ${highT}%.`, highlight: false },
    { time: "00:03:42", msg: `ADC probe voltage sampled: 2.14V -> Normalized VWC: ${moisture}%.`, highlight: false },
    { time: "00:04:10", msg: "Relay actuator energized. Main pump active (32.4 L/min flow).", highlight: true },
    { time: "00:06:55", msg: "Open-Meteo sync: zero precipitation in immediate 4-hour window.", highlight: false },
  ]);

  const isOptimal = moisture >= lowT && moisture < highT;
  const isDeficit = moisture < lowT;

  const handleSliderChange = (newVal) => {
    setSliderT(newVal);
    onUpdateThreshold(field.id, newVal, Math.min(newVal + 25, 92));

    const timeStr = new Date().toTimeString().split(" ")[0];
    setTerminalLogs((prev) => [
      { time: timeStr, msg: `User recalibrated threshold T: ${newVal}%. Cut-off level set to ${Math.min(newVal + 25, 92)}%.`, highlight: true },
      ...prev.slice(0, 20),
    ]);
  };

  const handleSimulateRainToggle = () => {
    const nextRain = !simulatedRain;
    setSimulatedRain(nextRain);

    const timeStr = new Date().toTimeString().split(" ")[0];
    setTerminalLogs((prev) => [
      {
        time: timeStr,
        msg: nextRain
          ? "CRITICAL: Simulated precipitation detected! Pump relay locked out."
          : "Precipitation cleared. Controller resumed regular hysteresis schedule.",
        highlight: true,
      },
      ...prev.slice(0, 20),
    ]);
  };

  const handlePumpClick = () => {
    onTogglePump(field);
    const willTurnOn = !isPumpOn;
    const timeStr = new Date().toTimeString().split(" ")[0];
    setTerminalLogs((prev) => [
      {
        time: timeStr,
        msg: willTurnOn
          ? `User manual command: Pump relay ENERGIZED (${field.flowRateLpm || 32.4} L/min flow).`
          : "User manual command: Pump relay DE-ENERGIZED.",
        highlight: true,
      },
      ...prev.slice(0, 20),
    ]);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 animate-fadeIn">
      {/* Plate 2.1 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 2.1"
        title="Borewell Motor Actuator & Delivery Manifold"
        subtitle="In-situ electromechanical pump shed, pressure gauge & hydraulic flume"
        defaultExpanded={false}
      >
        <BorewellPumpHouseEngraving />
      </PageArtworkHeader>

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#16130F]/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3E5B34] animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/60">
              FIELD & IRRIGATION CONTROLLER · SECTION 1.10
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#16130F]">
            Pump Actuator & <span className="italic text-[#3E5B34]">Soil Cockpit</span>
          </h1>
        </div>

        {/* Field Selector Pill */}
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs uppercase font-bold text-[#16130F]/70">
            Active Plot:
          </label>
          <select
            value={field.id}
            onChange={(e) => setActiveFieldId(e.target.value)}
            className="bg-[#FAF4E2] border-2 border-[#16130F] font-mono text-xs rounded-full px-3 py-1.5 font-bold cursor-pointer focus:outline-none"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cockpit, Pump Relay, Rain Avoidance, Thresholds */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mode Tabs (Automated, Manual Override, ML-Driven) */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl p-2.5 flex items-center justify-around font-mono text-xs uppercase font-bold">
            {[
              { id: "AUTO", label: "Automated Threshold Mode" },
              { id: "MANUAL", label: "Manual Override" },
              { id: "ML", label: "ML-Driven Adaptive" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setControllerMode(m.id)}
                className={`flex-1 py-2 rounded-xl transition-all text-center ${
                  controllerMode === m.id
                    ? "bg-[#0E0C0B] text-[#FBF6E6] shadow-sm"
                    : "text-[#16130F]/60 hover:text-[#16130F]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Soil Moisture Cockpit Panel (from irrigation.html) */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-72 sm:w-80 h-auto pointer-events-none opacity-[0.07] select-none">
              <BorewellPumpHouseEngraving />
            </div>
            {/* Circular Dial Gauge */}
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FBF6E6] border-8 flex flex-col items-center justify-center flex-shrink-0 shadow-md transition-colors relative z-10 ${
                isDeficit
                  ? "border-[#D98B6F] text-[#D98B6F]"
                  : "border-[#3E5B34] text-[#16130F]"
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold leading-none">
                {moisture}%
              </div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#16130F]/60 mt-1">
                VWC LEVEL
              </div>
            </div>

            {/* Cockpit Meta */}
            <div className="space-y-2 text-center sm:text-left flex-1 relative z-10">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                SOIL DIELECTRIC PERMITTIVITY
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16130F]">
                {field.name}
              </h3>
              <p className="font-sans text-xs text-[#16130F]/75">
                Target envelope for {field.cropLabel || field.crop}: keep between {lowT}% and {highT}%.
              </p>

              {/* Status Badge */}
              <div className="pt-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase border ${
                    isDeficit
                      ? "bg-[#D98B6F]/20 text-[#D98B6F] border-[#D98B6F]"
                      : "bg-[#A8BE86]/30 text-[#3E5B34] border-[#3E5B34]/30"
                  }`}
                >
                  {isDeficit
                    ? "DEFICIT: MOISTURE CRITICAL"
                    : isOptimal
                    ? "OPTIMAL: HYDRATION SECURE"
                    : "SATURATED: ROOT ENVELOPE FULL"}
                </span>
              </div>
            </div>
          </div>

          {/* Pump Actuation Card (from irrigation.html) */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-72 h-auto pointer-events-none opacity-[0.06] select-none">
              <BorewellPumpHouseEngraving />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#16130F]/15 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <IconPumpImpeller className="w-10 h-10 text-[#3E5B34]" isSpinning={isPumpOn} />
                <div>
                  <div className="font-serif font-bold text-lg text-[#16130F]">
                    Main Agricultural Pump Relay
                  </div>
                  <div className="font-mono text-xs text-[#16130F]/70">
                    Status:{" "}
                    <strong className={isPumpOn ? "text-[#3E5B34]" : "text-[#D98B6F]"}>
                      {isPumpOn ? "ENERGIZED (RUNNING)" : "DE-ENERGIZED (STANDBY)"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Flow Rate Chip */}
              <div className="bg-[#FBF6E6] border border-[#16130F]/20 px-3 py-1.5 rounded-xl font-mono text-center">
                <span className="text-[8px] text-[#16130F]/60 block uppercase">DISCHARGE FLOW</span>
                <span className="font-bold text-[#16130F] text-sm">
                  {isPumpOn ? `${field.flowRateLpm || 32.4} L/min` : "0.0 L/min"}
                </span>
              </div>
            </div>

            {/* Pump Toggle Button */}
            <button
              onClick={handlePumpClick}
              disabled={simulatedRain}
              className={`w-full py-3.5 rounded-full font-mono text-xs uppercase font-bold tracking-wider transition-all border-2 relative z-10 ${
                simulatedRain
                  ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed"
                  : isPumpOn
                  ? "bg-[#D98B6F] text-[#FBF6E6] border-[#16130F] hover:bg-[#c5795e]"
                  : "bg-[#0E0C0B] text-[#FBF6E6] border-[#0E0C0B] hover:bg-[#3E5B34]"
              }`}
            >
              {simulatedRain
                ? "PUMP LOCKED (RAIN ACTIVE)"
                : isPumpOn
                ? "TURN PUMP OFF (DISENGAGE RELAY)"
                : "TURN PUMP ON (ENERGIZE RELAY)"}
            </button>
          </div>

          {/* Rain Avoidance Notice Box (from irrigation.html) */}
          <div
            className={`border-2 border-[#16130F] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm ${
              simulatedRain ? "bg-[#9FA9EE]/30" : "bg-[#FBF6E6]"
            }`}
          >
            <div className="flex items-center gap-3">
              <IconRainCloud className="w-8 h-8 text-[#9FA9EE] flex-shrink-0" />
              <div>
                <div className="font-serif font-bold text-sm text-[#16130F]">
                  Precipitation Avoidance Lockout
                </div>
                <div className="font-mono text-xs text-[#16130F]/70">
                  {simulatedRain
                    ? "Active precipitation detected. Pump relay locked to prevent waterlogging."
                    : "Zero precipitation forecasted. Normal irrigation logic engaged."}
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateRainToggle}
              className="px-3 py-1.5 rounded-full border border-[#16130F] font-mono text-[10px] uppercase font-bold bg-white hover:bg-[#16130F] hover:text-white transition-colors flex-shrink-0"
            >
              {simulatedRain ? "Clear Rain" : "Simulate Rain Event"}
            </button>
          </div>

          {/* Dynamic Threshold Slider Box (from irrigation.html) */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#16130F]/15 pb-2">
              <span className="font-bold text-[#16130F] uppercase">
                Dynamic Trigger Threshold (T):
              </span>
              <span className="bg-[#A8BE86]/40 text-[#3E5B34] font-bold px-2 py-0.5 rounded text-sm">
                {sliderT}%
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="75"
              value={sliderT}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2.5 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#3E5B34]"
            />

            <div className="flex justify-between text-[10px] text-[#16130F]/60">
              <span>MIN SETPOINT: 20%</span>
              <span className="text-[#3E5B34] font-bold">
                AUTO CUT-OFF LEVEL: {Math.min(sliderT + 25, 92)}%
              </span>
              <span>MAX: 75%</span>
            </div>

            <p className="font-sans text-[11px] text-[#16130F]/70 pt-1 leading-relaxed">
              Hysteresis rule: Pump automatically starts when moisture falls below <strong>{sliderT}%</strong>, and turns off when moisture recovers to <strong>{Math.min(sliderT + 25, 92)}%</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Console Terminal Activity Log & Soil Cross-section */}
        <div className="lg:col-span-5 space-y-6">
          {/* Animated Soil Cross-section Panel */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-60 h-auto pointer-events-none opacity-[0.06] select-none">
              <SoilStratigraphyEngraving />
            </div>
            <div className="flex justify-between items-center font-mono text-[9px] uppercase font-bold text-[#16130F]/70 border-b border-[#16130F]/15 pb-2 relative z-10">
              <span>RHIZOSPHERE STRATA</span>
              <span className="text-[#3E5B34]">VWC: {moisture}%</span>
            </div>

            <div className="h-48 bg-[#FAF4E2] border-2 border-[#16130F] rounded-2xl relative overflow-hidden shadow-inner z-10">
              <div className="absolute inset-0 bg-[#D98B6F]/30" />
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#A9C8EC]/85 border-t-2 border-[#16130F] transition-all duration-700 p-2 flex flex-col justify-between"
                style={{ height: `${moisture}%` }}
              >
                <span className="font-mono text-[9px] font-bold text-[#16130F]">
                  WETTING FRONT
                </span>
                {isPumpOn && (
                  <span className="font-mono text-[9px] font-bold text-[#3E5B34] animate-pulse flex items-center gap-1">
                    <IconWaterDrop className="w-3 h-3 text-[#3E5B34]" />
                    DISCHARGING WATER...
                  </span>
                )}
              </div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2">
                <IconWheat className="w-6 h-6 text-[#3E5B34]" />
              </div>
              <div
                className="absolute left-0 right-0 border-b border-dashed border-[#D98B6F] flex justify-end pr-2"
                style={{ bottom: `${lowT}%` }}
              >
                <span className="font-mono text-[8px] bg-white px-1 border border-[#D98B6F]">
                  T: {lowT}%
                </span>
              </div>
            </div>
          </div>

          {/* Vintage Activity Log Terminal (from irrigation.html) */}
          <div className="bg-[#111827] border-2 border-[#16130F] rounded-3xl p-5 shadow-lg space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                <span className="text-gray-400 text-xs font-bold uppercase ml-1">
                  AGRICA Console Terminal
                </span>
              </div>
              <span className="text-emerald-400 text-[10px] animate-pulse">● LIVE LORA STREAM</span>
            </div>

            {/* Terminal Entries */}
            <div className="space-y-2 max-h-80 overflow-y-auto text-xs text-gray-300 pr-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed border-b border-gray-800 pb-1.5">
                  <span className="text-emerald-400 font-bold mr-2">[{log.time}]</span>
                  <span className={log.highlight ? "text-yellow-300 font-bold" : "text-gray-300"}>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-800 flex justify-between text-[10px] text-gray-500">
              <span>BAUD: 115200</span>
              <span>BUFFER: 256 BYTES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
