import React, { useState } from "react";
import { getDefaultThresholds } from "../utils/irrigationEngine";
import { getTranslation } from "../utils/i18n";

export const NewFieldModal = ({
  isOpen,
  onClose,
  onAddField,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  const [name, setName] = useState("");
  const [crop, setCrop] = useState("paddy");
  const [soil, setSoil] = useState("clay");
  const [areaM2, setAreaM2] = useState(4047);
  const [lat, setLat] = useState(20.296);
  const [lng, setLng] = useState(85.824);
  const [geoLocating, setGeoLocating] = useState(false);

  if (!isOpen) return null;

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
        alert(`Location acquisition failed: ${err.message}`);
        setGeoLocating(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const thresholds = getDefaultThresholds(crop, soil);

    const newField = {
      id: `field-${crop}-${Math.random().toString(36).substring(2, 6)}`,
      name: name || `Field · ${crop.toUpperCase()}`,
      crop,
      soil,
      areaM2: Number(areaM2),
      lat: Number(lat),
      lng: Number(lng),
      deviceId: `esp32-node-${Math.random().toString(36).substring(2, 6)}`,
      config: {
        lowT: thresholds.lowT,
        highT: thresholds.highT,
        rainBlockPct: 60,
        maxRunMin: 30,
        minRestMin: 15,
        mode: "AUTO",
      },
      schedule: {
        enabled: false,
        startTime: "06:00",
        durationMin: 20,
        days: ["Daily"],
      },
      live: {
        moisture: thresholds.lowT + 5,
        rawAdc: 2400,
        tempC: 30,
        humidity: 65,
        rainSensor: false,
        pumpOn: false,
        pumpRunSeconds: 0,
        pumpRestSeconds: 3600,
        lastSeen: Date.now(),
        status: "OFF",
        reason: "Initial baseline established",
      },
    };

    onAddField(newField);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#16130F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="border-b border-[#16130F]/15 pb-3">
          <span className="font-mono text-[10px] uppercase font-bold text-[#3E5B34]">
            FIELD REGISTER
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#16130F]">
            Add New Field Block
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase font-bold block mb-1">
              Field Identifier / Label:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Field 4 · Sugarcane Plot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-xs uppercase font-bold block mb-1">
                Crop Variety:
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs cursor-pointer"
              >
                <option value="paddy">Paddy (Rice)</option>
                <option value="wheat">Wheat</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="cotton">Cotton</option>
                <option value="vegetables">Vegetables</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs uppercase font-bold block mb-1">
                Soil Stratum:
              </label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs cursor-pointer"
              >
                <option value="clay">Clay (Slow drainage)</option>
                <option value="loamy">Loamy (Balanced)</option>
                <option value="sandy">Sandy (Fast drain)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs uppercase font-bold block mb-1">
              Cultivated Area (m²):
            </label>
            <input
              type="number"
              value={areaM2}
              onChange={(e) => setAreaM2(Number(e.target.value))}
              className="w-full bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
            />
            <span className="font-mono text-[9px] text-[#16130F]/60">
              ~{(areaM2 / 4046.86).toFixed(2)} Acres
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-mono text-xs uppercase font-bold">
                GPS Coordinates (for Open-Meteo Weather):
              </label>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="font-mono text-[10px] text-[#3E5B34] underline"
              >
                {geoLocating ? "Acquiring..." : "📍 Use My Location"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="bg-white border border-[#16130F]/30 rounded-lg p-2 font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#16130F]/15">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs uppercase text-[#16130F]/70"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase hover:bg-[#3E5B34]"
            >
              Create Field Block →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
