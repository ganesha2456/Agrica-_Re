import React, { useState } from "react";
import { getDefaultThresholds } from "../utils/irrigationEngine";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  SoilStratigraphyEngraving
} from "./HalftoneSVGs";
import {
  IconPaddy,
  IconWheat,
  IconSugarcane,
  IconCotton,
  IconVegetables,
  IconMaize,
  IconSoilProbe,
  IconWaterDrop
} from "./AlmanacIcons";

export const FieldRegistryView = ({
  fields = [],
  onAddField,
  onSelectField,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  // Form State
  const [fieldName, setFieldName] = useState("");
  const [crop, setCrop] = useState("paddy");
  const [soil, setSoil] = useState("clay");
  const [areaAcres, setAreaAcres] = useState(1.5);
  const [method, setMethod] = useState("drip");
  const [lowT, setLowT] = useState(60);
  const [highT, setHighT] = useState(85);
  const [rainBlock, setRainBlock] = useState(60);
  const [maxRunMin, setMaxRunMin] = useState(30);
  const [minRestMin, setMinRestMin] = useState(15);
  const [lat, setLat] = useState(20.2961);
  const [lng, setLng] = useState(85.8245);
  const [geoLocating, setGeoLocating] = useState(false);
  const [flowRateLpm, setFlowRateLpm] = useState(32.4);

  // Auto-update default thresholds when crop or soil changes
  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
    const defaults = getDefaultThresholds(newCrop, soil);
    setLowT(defaults.lowT);
    setHighT(defaults.highT);
  };

  const handleSoilChange = (newSoil) => {
    setSoil(newSoil);
    const defaults = getDefaultThresholds(crop, newSoil);
    setLowT(defaults.lowT);
    setHighT(defaults.highT);
  };

  // Acquire GPS Location
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(Number(pos.coords.latitude.toFixed(4)));
        setLng(Number(pos.coords.longitude.toFixed(4)));
        setGeoLocating(false);
      },
      (err) => {
        alert(`Location detection failed: ${err.message}`);
        setGeoLocating(false);
      }
    );
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const cropLabels = {
      paddy: "Paddy (Rice)",
      wheat: "Wheat HD-2967",
      sugarcane: "Sugarcane Cane-Block",
      cotton: "Cotton Fiber Plot",
      vegetables: "Vegetables & Greens",
      maize: "Maize / Corn",
      custom: "Custom Crop Variety",
    };

    const soilLabels = {
      clay: "Clay Soil (High retention)",
      loamy: "Loamy Soil (Optimal)",
      sandy: "Sandy Soil (Fast drainage)",
    };

    const newFieldObj = {
      id: `field-${crop}-${Date.now().toString(36)}`,
      fieldNo: fields.length + 1,
      name: fieldName.trim() || `Field ${fields.length + 1} · ${cropLabels[crop] || crop}`,
      crop,
      cropLabel: cropLabels[crop] || crop,
      soil,
      soilLabel: soilLabels[soil] || soil,
      areaAcres: Number(areaAcres),
      areaM2: Math.round(Number(areaAcres) * 4046.86),
      method,
      lat: Number(lat),
      lng: Number(lng),
      deviceId: `esp32-node-${crop}-${Math.random().toString(36).substring(2, 6)}`,
      flowRateLpm: Number(flowRateLpm),
      config: {
        lowT: Number(lowT),
        highT: Number(highT),
        rainBlockPct: Number(rainBlock),
        maxRunMin: Number(maxRunMin),
        minRestMin: Number(minRestMin),
        mode: "AUTO",
      },
      schedule: {
        enabled: false,
        startTime: "06:00",
        durationMin: 20,
        days: ["Daily"],
      },
      live: {
        moisture: lowT + 8,
        rawAdc: 2400,
        tempC: 30.5,
        humidity: 64,
        rainSensor: false,
        pumpOn: false,
        pumpRunSeconds: 0,
        pumpRestSeconds: 1800,
        lastSeen: Date.now(),
        status: "OFF",
        reason: "Initial baseline moisture recorded",
      },
    };

    onAddField(newFieldObj);
    alert(`Plot "${newFieldObj.name}" successfully registered and linked to the live telemetry stream!`);
    setFieldName("");
  };

  return (
    <div className="space-y-8 pb-24 md:pb-14 max-w-5xl mx-auto animate-fadeIn">
      {/* Plate 4.2 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 4.2"
        title="Root-Zone Pedology & Calibration Strata"
        subtitle="Botanical root penetration, soil moisture horizons & capacitive probe"
        defaultExpanded={false}
      >
        <SoilStratigraphyEngraving />
      </PageArtworkHeader>

      {/* Editorial Header */}
      <div className="border-b-2 border-[#16130F]/20 pb-5">
        <span className="font-mono text-xs uppercase tracking-widest text-[#3E5B34] font-bold">
          AGRONOMIC REGISTRATION PORTAL · SECTION 1.8
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#16130F] mt-1">
          Field & Plot Registry · <span className="italic text-[#D98B6F]">Crop Parameters</span>
        </h1>
        <p className="font-sans text-base text-[#16130F]/80 mt-2 max-w-2xl leading-relaxed">
          Configure new agricultural plots by defining crop phenology, soil retention capacity, irrigation methods, and dynamic threshold trigger envelopes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comprehensive Registration Form */}
        <div className="lg:col-span-8 bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-9 shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-96 h-auto pointer-events-none opacity-[0.06] select-none">
            <SoilStratigraphyEngraving />
          </div>
          <div className="border-b border-[#16130F]/15 pb-3 relative z-10">
            <h2 className="font-serif text-2xl font-bold text-[#16130F]">
              Register New Agricultural Plot
            </h2>
            <p className="font-mono text-xs text-[#16130F]/65 mt-0.5">
              ALL SETTINGS DIRECTLY DRIVE THE EMBEDDED ESP32 IRRIGATION LOGIC
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* 1. Field Name */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] block mb-1.5">
                1. Field / Plot Identifier:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Field 4 · Sugarcane Plot (South Canal)"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none focus:border-[#16130F]"
              />
            </div>

            {/* 2. Crop Type Cards */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] block mb-2">
                2. Select Crop Variety (Calibrates Depletion Tolerance):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "paddy", name: "Paddy (Rice)", icon: <IconPaddy className="w-7 h-7 text-[#3E5B34]" />, desc: "High water; saturated root zone" },
                  { id: "wheat", name: "Wheat", icon: <IconWheat className="w-7 h-7 text-[#E7B94A]" />, desc: "Moderate water; avoid crown waterlogging" },
                  { id: "sugarcane", name: "Sugarcane", icon: <IconSugarcane className="w-7 h-7 text-[#3E5B34]" />, desc: "High & frequent root demand" },
                  { id: "cotton", name: "Cotton", icon: <IconCotton className="w-7 h-7 text-[#A9C8EC]" />, desc: "Deep taproot; high drainage" },
                  { id: "vegetables", name: "Vegetables", icon: <IconVegetables className="w-7 h-7 text-[#3E5B34]" />, desc: "Frequent shallow irrigation" },
                  { id: "maize", name: "Maize / Corn", icon: <IconMaize className="w-7 h-7 text-[#E7B94A]" />, desc: "Balanced moisture envelope" },
                ].map((c) => {
                  const isSelected = crop === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => handleCropChange(c.id)}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "bg-[#FBF6E6] border-[#3E5B34] ring-2 ring-[#3E5B34]/30 shadow-sm"
                          : "bg-white border-[#16130F]/20 hover:border-[#16130F]"
                      }`}
                    >
                      <div className="mb-2">{c.icon}</div>
                      <div className="font-serif font-bold text-base text-[#16130F]">{c.name}</div>
                      <div className="font-mono text-[9px] text-[#16130F]/60 mt-0.5 leading-tight">{c.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Soil Stratum */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] block mb-2">
                3. Soil Texture & Retention Class:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "clay", name: "Clay Soil", holding: "High (45%)", rate: "Slow infiltration", icon: <IconSoilProbe className="w-6 h-6 text-[#D98B6F]" /> },
                  { id: "loamy", name: "Loamy Soil", holding: "Optimal (30%)", rate: "Balanced percolation", icon: <IconWheat className="w-6 h-6 text-[#3E5B34]" /> },
                  { id: "sandy", name: "Sandy Soil", holding: "Low (15%)", rate: "Rapid drain / leaching", icon: <IconWaterDrop className="w-6 h-6 text-[#A9C8EC]" /> },
                ].map((s) => {
                  const isSelected = soil === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSoilChange(s.id)}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "bg-[#FBF6E6] border-[#D98B6F] ring-2 ring-[#D98B6F]/40 shadow-sm"
                          : "bg-white border-[#16130F]/20 hover:border-[#16130F]"
                      }`}
                    >
                      <div className="mb-2">{s.icon}</div>
                      <div className="font-serif font-bold text-base text-[#16130F]">{s.name}</div>
                      <div className="font-mono text-[10px] text-[#3E5B34] font-bold mt-1">Capacity: {s.holding}</div>
                      <div className="font-mono text-[9px] text-[#16130F]/60">{s.rate}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Area & Irrigation Distribution Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] block mb-1">
                  Cultivated Area (Acres):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-2.5 font-mono text-sm focus:outline-none"
                />
                <span className="font-mono text-[10px] text-[#16130F]/60 mt-1 block">
                  = {Math.round(areaAcres * 4046.86)} m² surface
                </span>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider font-bold text-[#16130F] block mb-1">
                  Irrigation Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs cursor-pointer focus:outline-none"
                >
                  <option value="drip">Drip Irrigation (Micro-emitters, 1.8 L/h)</option>
                  <option value="sprinkler">Overhead Sprinkler Arc (25 PSI)</option>
                  <option value="furrow">Surface Furrow / Canal Infiltration</option>
                  <option value="flood">Submersible Borewell Direct Flood</option>
                </select>
              </div>
            </div>

            {/* 5. Dynamic Threshold Sliders */}
            <div className="p-4 bg-[#FBF6E6] rounded-2xl border-2 border-[#16130F]/20 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#16130F]/15 pb-2">
                <span className="font-bold text-[#16130F] uppercase">
                  Lower Trigger Threshold T (Turn Pump ON):
                </span>
                <span className="bg-[#D98B6F] text-white font-bold px-2.5 py-0.5 rounded text-sm">
                  {lowT}% VWC
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="75"
                value={lowT}
                onChange={(e) => setLowT(Number(e.target.value))}
                className="w-full accent-[#D98B6F]"
              />

              <div className="flex justify-between items-center border-b border-[#16130F]/15 pb-2">
                <span className="font-bold text-[#3E5B34] uppercase">
                  Upper Cut-Off Level (Turn Pump OFF):
                </span>
                <span className="bg-[#3E5B34] text-white font-bold px-2.5 py-0.5 rounded text-sm">
                  {highT}% VWC
                </span>
              </div>
              <input
                type="range"
                min={lowT + 5}
                max="95"
                value={highT}
                onChange={(e) => setHighT(Number(e.target.value))}
                className="w-full accent-[#3E5B34]"
              />
            </div>

            {/* 6. GPS Location & Safety Limits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div>
                <label className="font-bold block mb-1">Precipitation Lockout:</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="40"
                    max="90"
                    value={rainBlock}
                    onChange={(e) => setRainBlock(Number(e.target.value))}
                    className="w-full bg-white border border-[#16130F]/30 p-2 rounded-lg"
                  />
                  <span>%</span>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Max Run Runtime:</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="10"
                    max="60"
                    value={maxRunMin}
                    onChange={(e) => setMaxRunMin(Number(e.target.value))}
                    className="w-full bg-white border border-[#16130F]/30 p-2 rounded-lg"
                  />
                  <span>min</span>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Discharge Flow:</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.5"
                    value={flowRateLpm}
                    onChange={(e) => setFlowRateLpm(Number(e.target.value))}
                    className="w-full bg-white border border-[#16130F]/30 p-2 rounded-lg"
                  />
                  <span>L/min</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex justify-between items-center mb-1 font-mono text-xs">
                <label className="font-bold uppercase">Field GPS Coordinates:</label>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="text-[#3E5B34] font-bold underline"
                >
                  {geoLocating ? "Acquiring GPS..." : "📍 Use My Current Location"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Latitude"
                  value={lat}
                  onChange={(e) => setLat(Number(e.target.value))}
                  className="bg-white border border-[#16130F]/30 rounded-lg p-2"
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Longitude"
                  value={lng}
                  onChange={(e) => setLng(Number(e.target.value))}
                  className="bg-white border border-[#16130F]/30 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold tracking-widest hover:bg-[#3E5B34] transition-colors shadow-md"
            >
              Save & Register Agricultural Plot →
            </button>
          </form>
        </div>

        {/* Right Column: Existing Plots Roster & Crop Guidance */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-[#16130F]/15 pb-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#3E5B34] font-bold">
                HOLDINGS ROSTER
              </span>
              <h3 className="font-serif text-xl font-bold text-[#16130F]">
                Active Field Holdings ({fields.length})
              </h3>
            </div>

            <div className="space-y-3">
              {fields.map((f) => (
                <div
                  key={f.id}
                  onClick={() => onSelectField(f)}
                  className="p-3.5 bg-[#FBF6E6] border border-[#16130F]/20 rounded-2xl hover:border-[#16130F] cursor-pointer transition-all space-y-1"
                >
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className="text-[#3E5B34] font-bold">PLOT #{f.fieldNo || 1}</span>
                    <span className="bg-[#FAF4E2] px-2 py-0.5 rounded border border-[#16130F]/20">
                      {f.live?.moisture ?? 42}% VWC
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#16130F]">
                    {f.name}
                  </h4>
                  <div className="font-mono text-[10px] text-[#16130F]/60">
                    {f.cropLabel || f.crop} · {f.soilLabel || f.soil} · {f.areaAcres || 1.0} Ac
                  </div>
                  <div className="font-mono text-[9px] text-[#D98B6F] font-bold">
                    Threshold T: {f.config?.lowT}% | Cutoff: {f.config?.highT}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agronomic Guidance Note */}
          <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 shadow-sm font-mono text-xs space-y-2">
            <span className="font-bold text-[#3E5B34]">CALIBRATION ADVICE:</span>
            <p className="text-[#16130F]/80 leading-relaxed text-[11px]">
              Clay soils store more capillary water and should have higher thresholds ($60\% - 85\%$). Sandy soils drain within hours and require frequent pulses with lower limits ($30\% - 55\%$).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
