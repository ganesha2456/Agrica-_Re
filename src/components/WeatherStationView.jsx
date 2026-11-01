import React, { useState } from "react";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  MeteorologyObservatoryEngraving
} from "./HalftoneSVGs";
import {
  IconRainCloud,
  IconSun
} from "./AlmanacIcons";

export const WeatherStationView = ({
  weatherData = null,
  onNavigate,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  const [cityInput, setCityInput] = useState("Bhubaneswar");
  const [currentWeather, setCurrentWeather] = useState({
    name: "Bhubaneswar, Odisha",
    temp: 31.4,
    humidity: 72,
    wind: 14,
    pressure: 1012,
    desc: "HUMID & PARTLY CLOUDY",
    rainProb: 25,
    isRain: false,
  });
  const [isSearching, setIsSearching] = useState(false);

  const fallbackCities = {
    bhubaneswar: { name: "Bhubaneswar, Odisha", temp: 31.4, humidity: 72, wind: 14, pressure: 1012, desc: "HUMID & PARTLY CLOUDY", rainProb: 25, isRain: false },
    delhi: { name: "New Delhi, India", temp: 34.0, humidity: 45, wind: 18, pressure: 1010, desc: "SUNNY & DRY", rainProb: 10, isRain: false },
    mumbai: { name: "Mumbai, Maharashtra", temp: 29.5, humidity: 88, wind: 24, pressure: 1008, desc: "MODERATE RAIN SHOWERS", rainProb: 85, isRain: true },
    punjab: { name: "Ludhiana, Punjab", temp: 32.2, humidity: 52, wind: 12, pressure: 1014, desc: "CLEAR FARM CANOPY", rainProb: 15, isRain: false },
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setIsSearching(true);
    try {
      // Try geocoding city through open-meteo geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        const place = geoData.results[0];
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,surface_pressure&hourly=precipitation_probability&forecast_days=1&timezone=auto`
        );
        const wData = await weatherRes.json();
        const cur = wData.current || {};
        const maxProb = wData.hourly?.precipitation_probability?.length
          ? Math.max(...wData.hourly.precipitation_probability.slice(0, 24))
          : 20;

        setCurrentWeather({
          name: `${place.name}, ${place.country || ""}`,
          temp: Math.round((cur.temperature_2m ?? 30) * 10) / 10,
          humidity: Math.round(cur.relative_humidity_2m ?? 65),
          wind: Math.round(cur.wind_speed_10m ?? 14),
          pressure: Math.round(cur.surface_pressure ?? 1012),
          desc: maxProb >= 50 ? "RAIN EXPECTED / THUNDERSTORMS" : "FAIR & AGRO-NOMINAL",
          rainProb: maxProb,
          isRain: maxProb >= 50 || (cur.precipitation ?? 0) > 0.1,
        });
      } else {
        throw new Error("City not found in geocoder");
      }
    } catch {
      // Offline fallback lookup
      const key = cityInput.toLowerCase().trim();
      const mock = fallbackCities[key] || {
        name: cityInput,
        temp: 30.5,
        humidity: 64,
        wind: 15,
        pressure: 1012,
        desc: /rain/i.test(cityInput) ? "PRECIPITATION SHOWERS" : "PARTLY CLOUDY",
        rainProb: /rain/i.test(cityInput) ? 80 : 20,
        isRain: /rain/i.test(cityInput),
      };
      setCurrentWeather(mock);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto animate-fadeIn">
      {/* Plate 5.3 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 5.3"
        title="Agricultural Meteorology & Rain Observatory"
        subtitle="Atmospheric weather vane, rain gauge cylinder & wind velocity anemometer"
        defaultExpanded={false}
      >
        <MeteorologyObservatoryEngraving />
      </PageArtworkHeader>

      {/* Header */}
      <div className="border-b border-[#16130F]/15 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#16130F]">
          Weather & Rain Station · <span className="italic text-[#9FA9EE]">Meteorology</span>
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
          HYPERLOCAL AGRICULTURAL ATMOSPHERIC OBSERVATORY
        </p>
      </div>

      {/* City Search Bar (from weather.html) */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search farm city or district (e.g. Bhubaneswar, Delhi, Mumbai, Punjab)..."
          className="flex-1 bg-[#FAF4E2] border-2 border-[#16130F] rounded-full px-5 py-3 font-mono text-xs focus:outline-none focus:bg-white"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold hover:bg-[#3E5B34] transition-colors"
        >
          {isSearching ? "Searching..." : "Search Station"}
        </button>
      </form>

      {/* Main Clean Weather Card (from weather.html) */}
      <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-96 h-auto pointer-events-none opacity-[0.06] select-none">
          <MeteorologyObservatoryEngraving />
        </div>
        {/* Weather Hero Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#16130F]/15 pb-6 relative z-10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#3E5B34] font-bold">
              OBSERVATION STATION
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#16130F]">
              {currentWeather.name}
            </h2>
            <div className="font-mono text-xs font-bold text-[#D98B6F] mt-1 tracking-wider uppercase">
              {currentWeather.desc}
            </div>
          </div>

          <div className="text-right sm:text-right">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#16130F] leading-none">
              {currentWeather.temp}°C
            </div>
            <div className="font-mono text-[10px] text-[#16130F]/60 mt-1 uppercase">
              AMBIENT SURFACE TEMPERATURE
            </div>
          </div>
        </div>

        {/* 4 Metric Cells Grid (from weather.html) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
          <div className="p-4 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/20">
            <span className="text-[9px] text-[#16130F]/60 block uppercase">HUMIDITY</span>
            <span className="font-serif text-2xl font-bold text-[#16130F]">
              {currentWeather.humidity}%
            </span>
          </div>

          <div className="p-4 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/20">
            <span className="text-[9px] text-[#16130F]/60 block uppercase">WIND VELOCITY</span>
            <span className="font-serif text-2xl font-bold text-[#16130F]">
              {currentWeather.wind} <span className="text-xs font-mono font-normal">km/h</span>
            </span>
          </div>

          <div className="p-4 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/20">
            <span className="text-[9px] text-[#16130F]/60 block uppercase">BAROMETRIC PRESSURE</span>
            <span className="font-serif text-2xl font-bold text-[#16130F]">
              {currentWeather.pressure} <span className="text-xs font-mono font-normal">hPa</span>
            </span>
          </div>

          <div className="p-4 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/20">
            <span className="text-[9px] text-[#16130F]/60 block uppercase">RAIN PROBABILITY</span>
            <span className={`font-serif text-2xl font-bold ${currentWeather.rainProb >= 50 ? "text-[#9FA9EE]" : "text-[#3E5B34]"}`}>
              {currentWeather.rainProb}%
            </span>
          </div>
        </div>

        {/* Automatic Pump Coordination Banner */}
        <div
          className={`p-4 rounded-2xl border-2 border-[#16130F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            currentWeather.isRain ? "bg-[#9FA9EE]/30" : "bg-[#FBF6E6]"
          }`}
        >
          <div className="flex items-center gap-3">
            {currentWeather.isRain ? (
              <IconRainCloud className="w-8 h-8 text-[#9FA9EE] flex-shrink-0" />
            ) : (
              <IconSun className="w-8 h-8 text-[#E7B94A] flex-shrink-0" />
            )}
            <div>
              <div className="font-serif font-bold text-sm text-[#16130F]">
                {currentWeather.isRain
                  ? "Precipitation Lockout Activated"
                  : "Zero Rain Predicted — Irrigation Scheduled As Needed"}
              </div>
              <div className="font-mono text-xs text-[#16130F]/70">
                {currentWeather.isRain
                  ? "All autonomous field pump relays will pause to avoid waterlogging and electricity waste."
                  : "Field pumps are authorized to run when soil moisture drops below calibrated setpoints."}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("controller")}
            className="px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase flex-shrink-0 hover:bg-[#3E5B34] transition-colors"
          >
            Open Controller →
          </button>
        </div>
      </div>
    </div>
  );
};
