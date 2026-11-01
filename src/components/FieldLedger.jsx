import React, { useState, useEffect } from "react";
import { content } from "../data/content";

export const FieldLedger = () => {
  const [activeTab, setActiveTab] = useState("logic");

  // Simulator State
  const [moisture, setMoisture] = useState(38);
  const [lowerThreshold, setLowerThreshold] = useState(40);
  const [upperStop, setUpperStop] = useState(70);
  const [rainExpected, setRainExpected] = useState(false);
  const [pumpState, setPumpState] = useState(false);

  // Selected Crop & Soil
  const [selectedCrop, setSelectedCrop] = useState(content.fieldLedger.crops[0]);
  const [selectedSoil, setSelectedSoil] = useState(content.fieldLedger.soils[1]);

  // IoT Field Type Toggle
  const [networkMode, setNetworkMode] = useState("lora"); // "wifi" or "lora"

  // Live Chart History
  const [history, setHistory] = useState([35, 36, 37, 36, 37, 38, 38, 39, 38]);

  // Update threshold when Crop or Soil changes
  useEffect(() => {
    const adjustedLower = selectedCrop.lowerT + selectedSoil.modifier;
    const adjustedUpper = selectedCrop.upperT + selectedSoil.modifier;
    setLowerThreshold(Math.max(15, Math.min(85, adjustedLower)));
    setUpperStop(Math.max(adjustedLower + 15, Math.min(95, adjustedUpper)));
  }, [selectedCrop, selectedSoil]);

  // Hysteresis Control Logic Runner
  useEffect(() => {
    if (rainExpected) {
      setPumpState(false);
      return;
    }

    if (moisture < lowerThreshold) {
      setPumpState(true);
    } else if (moisture >= upperStop) {
      setPumpState(false);
    }
  }, [moisture, lowerThreshold, upperStop, rainExpected]);

  // Update history buffer as moisture moves
  useEffect(() => {
    setHistory((prev) => [...prev.slice(-14), moisture]);
  }, [moisture]);

  // Calculate dynamic ML output mock predictions
  const mlWaterReq = Math.max(0, Math.round((upperStop - moisture) * 1.8));
  const mlProb = rainExpected ? 8 : moisture < lowerThreshold ? 94 : Math.max(5, Math.round(100 - moisture));

  return (
    <section id="ledger" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#D98B6F] font-semibold mb-2">
            {content.fieldLedger.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#16130F] tracking-tight">
            {content.fieldLedger.headlineLead}{" "}
            <span className="italic text-[#D98B6F]">{content.fieldLedger.headlineEmphasis}</span>
          </h2>
          <p className="font-mono text-xs tracking-wider uppercase text-[#16130F]/60 mt-3">
            {content.fieldLedger.subheading}
          </p>
        </div>

        {/* Big Clay-Coloured Ledger Folder Container */}
        <div className="max-w-6xl mx-auto bg-[#D98B6F] rounded-3xl p-4 sm:p-7 md:p-8 border-4 border-[#16130F] shadow-2xl">
          {/* 4 Colored Folder Tabs on Top */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {content.fieldLedger.tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-t-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 border-t-2 border-x-2 border-[#16130F] flex items-center gap-2 ${
                    isActive
                      ? "bg-[#FBF6E6] text-[#16130F] font-bold shadow-md -mb-[2px] z-10"
                      : "bg-[#c5795e] text-[#FBF6E6] hover:bg-[#b56d53]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[9px] opacity-75 font-normal">[{tab.tag}]</span>
                </button>
              );
            })}
          </div>

          {/* Ledger Interior Body (Cream Paper Sheet) */}
          <div className="bg-[#FBF6E6] rounded-2xl rounded-tl-none border-2 border-[#16130F] p-5 sm:p-8 shadow-inner">
            {/* 1. CONTROL LOGIC TAB */}
            {activeTab === "logic" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-[#16130F]/15 pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#3E5B34] font-bold">
                      HYSTERESIS CLOSED-LOOP STATE MACHINE
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                      Interactive Irrigation Controller Simulator
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold uppercase border ${
                        pumpState
                          ? "bg-[#3E5B34] text-[#FBF6E6] border-[#16130F] animate-pulse"
                          : "bg-[#FAF4E2] text-[#16130F]/70 border-[#16130F]/30"
                      }`}
                    >
                      PUMP STATUS: {pumpState ? "ON (RUNNING)" : "OFF (STANDBY)"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Sliders & Controls */}
                  <div className="lg:col-span-6 space-y-6 bg-[#FAF4E2] p-5 sm:p-6 rounded-2xl border border-[#16130F]/20">
                    {/* Soil Moisture Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F]">
                          Current Soil Moisture (VWC):
                        </label>
                        <span className="font-mono text-sm font-bold bg-[#16130F] text-[#FBF6E6] px-2.5 py-0.5 rounded">
                          {moisture}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={moisture}
                        onChange={(e) => setMoisture(Number(e.target.value))}
                        className="w-full h-2.5 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#D98B6F]"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-[#16130F]/60 mt-1">
                        <span>0% DRY WILTING</span>
                        <span>50% OPTIMAL</span>
                        <span>100% SATURATED</span>
                      </div>
                    </div>

                    {/* Lower Threshold T Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#3E5B34]">
                          Lower Threshold T (Trigger Level):
                        </label>
                        <span className="font-mono text-xs font-bold bg-[#A8BE86] text-[#16130F] px-2 py-0.5 rounded border border-[#16130F]/30">
                          {lowerThreshold}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="70"
                        value={lowerThreshold}
                        onChange={(e) => setLowerThreshold(Number(e.target.value))}
                        className="w-full h-2 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#3E5B34]"
                      />
                      <p className="text-[10px] font-mono text-[#16130F]/60 mt-1">
                        Pump engages when soil moisture falls below this setpoint.
                      </p>
                    </div>

                    {/* Upper Stop Level Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#D98B6F]">
                          Upper Stop Level (Cutoff):
                        </label>
                        <span className="font-mono text-xs font-bold bg-[#D98B6F] text-[#FBF6E6] px-2 py-0.5 rounded border border-[#16130F]/30">
                          {upperStop}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={lowerThreshold + 5}
                        max="90"
                        value={upperStop}
                        onChange={(e) => setUpperStop(Number(e.target.value))}
                        className="w-full h-2 bg-[#16130F]/20 rounded-lg appearance-none cursor-pointer accent-[#16130F]"
                      />
                      <p className="text-[10px] font-mono text-[#16130F]/60 mt-1">
                        Pump disengages when soil moisture reaches this capacity level.
                      </p>
                    </div>

                    {/* Rain Expected Toggle */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#16130F]/15">
                      <div>
                        <div className="font-mono text-xs font-bold uppercase text-[#16130F]">
                          Rain Expected / Precipitation Lockout
                        </div>
                        <div className="text-[10px] font-mono text-[#16130F]/60">
                          Precipitation sensor or forecast API interrupt
                        </div>
                      </div>
                      <button
                        onClick={() => setRainExpected(!rainExpected)}
                        className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border transition-colors ${
                          rainExpected
                            ? "bg-[#9FA9EE] text-[#16130F] font-bold border-[#16130F]"
                            : "bg-[#FBF6E6] text-[#16130F]/70 border-[#16130F]/30"
                        }`}
                      >
                        {rainExpected ? "🌧 RAIN DETECTED (LOCKED)" : "☀️ NO RAIN"}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: White Live Dashboard Card */}
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border-2 border-[#16130F] shadow-md space-y-6">
                    <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#16130F]">
                        ESP32 TELEMETRY & SOIL CROSS-SECTION
                      </span>
                      <span className="font-mono text-[9px] bg-[#A8BE86]/30 px-2 py-0.5 rounded text-[#3E5B34]">
                        CYCLE FREQUENCY: 1 Hz
                      </span>
                    </div>

                    {/* Visual Soil Wetting Animation */}
                    <div className="relative h-32 w-full rounded-xl border border-[#16130F] overflow-hidden bg-[#FAF4E2]">
                      {/* Topsoil Background */}
                      <div className="absolute inset-0 bg-[#D98B6F]/30" />
                      
                      {/* Water Level rising based on moisture */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[#A9C8EC]/75 transition-all duration-300 border-t-2 border-[#16130F]"
                        style={{ height: `${moisture}%` }}
                      >
                        <div className="p-2 font-mono text-[10px] text-[#16130F] font-bold">
                          WETTING FRONT · VWC: {moisture}%
                        </div>
                      </div>

                      {/* Plant Roots Overlay */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                        <span className="text-xl">🌱</span>
                        <div className="w-[1.5px] h-14 bg-[#3E5B34]" />
                      </div>

                      {/* Lower Threshold Marker Line */}
                      <div
                        className="absolute left-0 right-0 border-b border-dashed border-[#16130F] z-10 flex justify-end pr-2"
                        style={{ bottom: `${lowerThreshold}%` }}
                      >
                        <span className="font-mono text-[8px] bg-white px-1 border border-[#16130F] rounded">
                          LOWER T: {lowerThreshold}%
                        </span>
                      </div>
                    </div>

                    {/* Live SVG Moisture vs Time Chart */}
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#16130F]/70 mb-2">
                        REAL-TIME MOISTURE DRIFT HISTORY:
                      </div>
                      <div className="h-20 w-full bg-[#FAF4E2] rounded-lg border border-[#16130F]/20 p-2 flex items-end justify-between gap-1">
                        {history.map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-[#D98B6F] rounded-t-sm transition-all duration-200"
                              style={{ height: `${(val / 100) * 55}px` }}
                            />
                            <span className="font-mono text-[7px] text-[#16130F]/50 mt-1">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hysteresis Diagnostic Note */}
                    <div className="p-3 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15 font-mono text-xs text-[#16130F]/80">
                      <strong>STATE EVALUATION:</strong>{" "}
                      {rainExpected
                        ? "Rain forecasted. Pump forced OFF regardless of moisture."
                        : moisture < lowerThreshold
                        ? `Moisture (${moisture}%) < Threshold (${lowerThreshold}%). Relay ENERGIZED.`
                        : moisture >= upperStop
                        ? `Moisture reached Cutoff (${upperStop}%). Pump STOPPED.`
                        : `Moisture within deadband (${lowerThreshold}% - ${upperStop}%). Pump maintains ${pumpState ? "ON" : "OFF"}.`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CROP & SOIL MATRIX TAB */}
            {activeTab === "crop" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-[#16130F]/15 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#3E5B34] font-bold">
                    AGRONOMIC DYNAMIC THRESHOLD MATRIX
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                    Crop Evapotranspiration & Soil Infiltration Parameters
                  </h3>
                  <p className="text-xs font-sans text-[#16130F]/70 mt-1">
                    Selecting a crop and soil texture dynamically recalibrates threshold setpoint <strong>T</strong> in the simulator. Values are illustrative for tropical agricultural zones.
                  </p>
                </div>

                {/* Crop Selection Cards */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] mb-3">
                    1. Select Crop Variety:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {content.fieldLedger.crops.map((crop) => {
                      const isSelected = selectedCrop.id === crop.id;
                      return (
                        <div
                          key={crop.id}
                          onClick={() => setSelectedCrop(crop)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? "bg-[#FAF4E2] border-[#D98B6F] shadow-md ring-2 ring-[#D98B6F]/30"
                              : "bg-white border-[#16130F]/20 hover:border-[#16130F]"
                          }`}
                        >
                          <div className="text-2xl mb-1">{crop.icon}</div>
                          <div className="font-serif font-bold text-base text-[#16130F]">
                            {crop.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#D98B6F] mt-1">
                            Set T: {crop.lowerT}% – {crop.upperT}%
                          </div>
                          <div className="font-mono text-[9px] text-[#16130F]/60 mt-1">
                            {crop.waterReq}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Soil Texture Cards */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] mb-3">
                    2. Select Soil Stratum:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {content.fieldLedger.soils.map((soil) => {
                      const isSelected = selectedSoil.id === soil.id;
                      return (
                        <div
                          key={soil.id}
                          onClick={() => setSelectedSoil(soil)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? "bg-[#FAF4E2] border-[#3E5B34] shadow-md ring-2 ring-[#3E5B34]/30"
                              : "bg-white border-[#16130F]/20 hover:border-[#16130F]"
                          }`}
                        >
                          <div className="font-serif font-bold text-base text-[#16130F]">
                            {soil.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#3E5B34] mt-1 font-bold">
                            Hold: {soil.holdingCapacity}
                          </div>
                          <div className="font-mono text-[10px] text-[#16130F]/70 mt-1">
                            Drain: {soil.drainRate}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Configuration Summary Box */}
                <div className="p-4 bg-[#FAF4E2] rounded-2xl border border-[#16130F]/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[#3E5B34] font-bold">
                      ACTIVE FORMULA SYNTHESIS
                    </div>
                    <div className="font-serif text-lg text-[#16130F]">
                      Threshold T for {selectedCrop.name} on {selectedSoil.name} ={" "}
                      <strong className="text-[#D98B6F]">{lowerThreshold}%</strong> (Cutoff: {upperStop}%)
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("logic")}
                    className="px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34] transition-colors"
                  >
                    Test In Simulator →
                  </button>
                </div>
              </div>
            )}

            {/* 3. IOT & LORA ARCHITECTURE TAB */}
            {activeTab === "iot" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-[#16130F]/15 pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#3E5B34] font-bold">
                      TELEMETRY DISPATCH & PROPAGATION
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                      Physical Architecture: Field Sensors to Master Relay
                    </h3>
                  </div>

                  {/* Wi-Fi vs LoRa Toggle */}
                  <div className="flex items-center gap-2 bg-[#FAF4E2] p-1 rounded-full border border-[#16130F]/20">
                    <button
                      onClick={() => setNetworkMode("wifi")}
                      className={`px-3 py-1 rounded-full font-mono text-xs uppercase transition-colors ${
                        networkMode === "wifi" ? "bg-[#16130F] text-[#FBF6E6] font-bold" : "text-[#16130F]/70"
                      }`}
                    >
                      Wi-Fi (Perimeter &lt;100m)
                    </button>
                    <button
                      onClick={() => setNetworkMode("lora")}
                      className={`px-3 py-1 rounded-full font-mono text-xs uppercase transition-colors ${
                        networkMode === "lora" ? "bg-[#16130F] text-[#FBF6E6] font-bold" : "text-[#16130F]/70"
                      }`}
                    >
                      LoRa Sub-GHz (&lt;10km)
                    </button>
                  </div>
                </div>

                {/* Animated Pipeline Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.fieldLedger.iotNodes.map((node) => (
                    <div
                      key={node.step}
                      className="p-5 bg-white rounded-xl border border-[#16130F]/20 shadow-sm space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#D98B6F] bg-[#D98B6F]/15 px-2 py-0.5 rounded">
                          STAGE {node.step}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#A8BE86]" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#16130F]">
                        {node.name}
                      </h4>
                      <p className="font-mono text-xs text-[#16130F]/75 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Network Mode Status Banner */}
                <div className="p-4 bg-[#FAF4E2] rounded-xl border border-[#16130F]/20 font-mono text-xs text-[#16130F] flex items-center justify-between">
                  <span>
                    <strong>ACTIVE TOPOLOGY:</strong>{" "}
                    {networkMode === "wifi"
                      ? "802.11 b/g/n Star Topology · High Bandwidth · 100m Line of Sight"
                      : "SX1262 LoRaWAN · 868MHz Sub-GHz · +22dBm High Link Budget · 8.5km Penetration through foliage"}
                  </span>
                  <span className="text-[#3E5B34] font-bold">LINK INTEGRITY: 99.4%</span>
                </div>
              </div>
            )}

            {/* 4. ML (PLANNED) PREDICTIVE TAB */}
            {activeTab === "ml" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-[#16130F]/15 pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#D98B6F] text-[#FBF6E6] font-mono text-[9px] font-bold uppercase tracking-wider">
                        PLANNED UPGRADE · ROADMAP Q3
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#16130F] mt-1">
                      Adaptive Evapotranspiration Edge Regression
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#3E5B34] bg-[#A8BE86]/30 px-3 py-1 rounded-full border border-[#3E5B34]/20">
                    TFLITE MICRO INFERENCE
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Feature Weights Table */}
                  <div className="lg:col-span-7 bg-[#FAF4E2] p-5 rounded-2xl border border-[#16130F]/20 space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F]">
                      Feature Ingestion Vector (8 Sensor Dimensions):
                    </h4>
                    <div className="space-y-2">
                      {content.fieldLedger.mlFeatures.map((feat) => (
                        <div
                          key={feat.name}
                          className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#16130F]/10 text-xs font-mono"
                        >
                          <span className="text-[#16130F]">{feat.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-[#16130F]/50">[{feat.type}]</span>
                            <span className="font-bold text-[#3E5B34]">w={feat.weight}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Predictive Model Output Dashboard */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#16130F] shadow-md space-y-6">
                    <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] border-b border-[#16130F]/15 pb-3">
                      EDGE INFERENCE SYNTHESIS
                    </div>

                    <div className="space-y-4">
                      {/* Output 1: Recommendation */}
                      <div className="p-3 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                          RECOMMENDED ACTION
                        </div>
                        <div className="font-serif text-lg font-bold text-[#16130F] mt-0.5">
                          {rainExpected
                            ? "Suppress Irrigation (Rain Imminent)"
                            : moisture < lowerThreshold
                            ? "Irrigate Immediate Cycle"
                            : "Withhold Pump (Soil Stored)"}
                        </div>
                      </div>

                      {/* Output 2: Expected Water Volume */}
                      <div className="p-3 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                          ESTIMATED DEFICIT VOLUME
                        </div>
                        <div className="font-serif text-2xl font-bold text-[#D98B6F] mt-0.5">
                          {mlWaterReq} <span className="text-sm font-sans font-normal text-[#16130F]">L / m²</span>
                        </div>
                      </div>

                      {/* Output 3: Probability */}
                      <div className="p-3 bg-[#FAF4E2] rounded-xl border border-[#16130F]/15">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#16130F]/60">
                          IRRIGATION PROBABILITY INDEX
                        </div>
                        <div className="font-serif text-2xl font-bold text-[#3E5B34] mt-0.5">
                          {mlProb}%
                        </div>
                        <div className="w-full bg-[#16130F]/10 h-2 rounded-full overflow-hidden mt-2">
                          <div
                            className="bg-[#3E5B34] h-full transition-all duration-300"
                            style={{ width: `${mlProb}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
