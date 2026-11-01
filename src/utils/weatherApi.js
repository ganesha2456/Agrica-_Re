/**
 * Open-Meteo Weather API Integration
 * Free, high-accuracy agricultural weather forecasts with no API key needed.
 */

export async function fetchFieldWeather(lat = 20.2961, lng = 85.8245) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation&forecast_days=3&timezone=auto`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);

    const data = await res.json();
    const current = data.current || {};
    const hourly = data.hourly || {};

    // Get maximum rain probability over the next 24 hours
    const next24hProbs = (hourly.precipitation_probability || []).slice(0, 24);
    const maxRainProb24h = next24hProbs.length ? Math.max(...next24hProbs) : 0;

    // Get expected rainfall total over next 48 hours
    const next48hPrecip = (hourly.precipitation || []).slice(0, 48);
    const sumRain48hMm = next48hPrecip.reduce((acc, v) => acc + (v || 0), 0);

    // Build 6-hour interval forecast strip
    const forecastStrip = [];
    const times = hourly.time || [];
    for (let i = 0; i < Math.min(times.length, 48); i += 4) {
      forecastStrip.push({
        time: times[i],
        hourLabel: new Date(times[i]).toLocaleTimeString([], { hour: "numeric" }),
        tempC: Math.round(hourly.temperature_2m[i] ?? 28),
        rainProbPct: hourly.precipitation_probability[i] ?? 0,
        rainMm: hourly.precipitation[i] ?? 0,
      });
    }

    return {
      success: true,
      current: {
        tempC: Math.round(current.temperature_2m ?? 31),
        humidity: Math.round(current.relative_humidity_2m ?? 64),
        precipMm: current.precipitation ?? 0,
        isRaining: (current.precipitation ?? 0) > 0.1 || (current.rain ?? 0) > 0.1,
        weatherCode: current.weather_code ?? 0,
      },
      forecast: {
        maxRainProb24h,
        sumRain48hMm: Math.round(sumRain48hMm * 10) / 10,
        strip: forecastStrip,
      },
      source: "Open-Meteo Live API",
    };
  } catch (err) {
    // Graceful offline fallback
    return {
      success: false,
      current: {
        tempC: 31,
        humidity: 62,
        precipMm: 0,
        isRaining: false,
        weatherCode: 1,
      },
      forecast: {
        maxRainProb24h: 25,
        sumRain48hMm: 1.2,
        strip: [
          { hourLabel: "Now", tempC: 31, rainProbPct: 10, rainMm: 0 },
          { hourLabel: "+4h", tempC: 33, rainProbPct: 15, rainMm: 0 },
          { hourLabel: "+8h", tempC: 29, rainProbPct: 35, rainMm: 0.2 },
          { hourLabel: "+12h", tempC: 26, rainProbPct: 20, rainMm: 0 },
          { hourLabel: "+16h", tempC: 28, rainProbPct: 10, rainMm: 0 },
          { hourLabel: "+24h", tempC: 32, rainProbPct: 25, rainMm: 0.5 },
        ],
      },
      source: "Offline Simulation",
      error: err.message,
    };
  }
}
