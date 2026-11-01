import React, { useState, useEffect } from "react";
import {
  INITIAL_FIELDS,
  INITIAL_DEVICES,
  INITIAL_EVENTS,
  DEFAULT_USERS,
  generateInitialHistory,
} from "./data/seedData";
import { evaluateIrrigationDecision } from "./utils/irrigationEngine";
import { fetchFieldWeather } from "./utils/weatherApi";
import { HeaderNav } from "./components/HeaderNav";
import { HomeOverviewView } from "./components/HomeOverviewView";
import { PumpControllerView } from "./components/PumpControllerView";
import { MultiFieldDashboardView } from "./components/MultiFieldDashboardView";
import { FieldDetailView } from "./components/FieldDetailView";
import { WeatherStationView } from "./components/WeatherStationView";
import { DevicesView } from "./components/DevicesView";
import { InsightsView } from "./components/InsightsView";
import { ContactSupportView } from "./components/ContactSupportView";
import { SettingsView } from "./components/SettingsView";
import { AlertsDrawer } from "./components/AlertsDrawer";
import { NewFieldModal } from "./components/NewFieldModal";
import { AuthModal } from "./components/AuthModal";

export default function App() {
  // Global App State
  const [activeTab, setActiveTab] = useState("home"); // home, controller, dashboard, weather, devices, insights, contact, settings
  const [selectedField, setSelectedField] = useState(null);
  const [demoMode, setDemoMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [units, setUnits] = useState("L");
  const [rainBlockThreshold, setRainBlockThreshold] = useState(60);
  const [maxRunLimit, setMaxRunLimit] = useState(30);

  // Modals & Drawers
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isNewFieldOpen, setIsNewFieldOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // User Session Management (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("agrica_current_user");
      return stored ? JSON.parse(stored) : DEFAULT_USERS[0];
    } catch {
      return DEFAULT_USERS[0];
    }
  });

  // Data Store
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [alerts, setAlerts] = useState([
    {
      id: "alt-01",
      type: "TELEMETRY",
      severity: "info",
      title: "Agrica Mesh Initialized",
      message: "Continuous sensor loop active in Demo Simulator mode.",
      timestamp: Date.now() - 300000,
    },
  ]);

  // Weather State
  const [weatherData, setWeatherData] = useState(null);

  // History buffer for Field Detail chart
  const [history, setHistory] = useState(() =>
    generateInitialHistory(42, 40, 70)
  );

  // Fetch Open-Meteo Weather on Mount
  useEffect(() => {
    async function loadWeather() {
      const primary = fields[0];
      const data = await fetchFieldWeather(primary?.lat, primary?.lng);
      setWeatherData(data);
    }
    loadWeather();
    const weatherTimer = setInterval(loadWeather, 600000); // 10 min refresh
    return () => clearInterval(weatherTimer);
  }, []);

  // ---------------------------------------------------------------------------
  // 3-SECOND REALISTIC SIMULATION LOOP
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const simInterval = setInterval(() => {
      setFields((prevFields) => {
        return prevFields.map((field) => {
          const live = { ...field.live };
          const config = field.config || {};
          const isPumpRunning = live.pumpOn;

          if (isPumpRunning) {
            // Moisture rises while pump is discharging water
            live.moisture = Math.min(95, Math.round((live.moisture + 1.8) * 10) / 10);
            live.pumpRunSeconds = (live.pumpRunSeconds || 0) + 3;
            live.pumpRestSeconds = 0;
          } else {
            // Natural root-zone evapotranspiration drying
            const dryingRate = 0.25;
            live.moisture = Math.max(12, Math.round((live.moisture - dryingRate) * 10) / 10);
            live.pumpRunSeconds = 0;
            live.pumpRestSeconds = (live.pumpRestSeconds || 0) + 3;
          }

          live.lastSeen = Date.now();

          // Evaluate autonomous hysteresis decision
          const decision = evaluateIrrigationDecision({
            moisture: live.moisture,
            currentPumpState: isPumpRunning,
            pumpRunSeconds: live.pumpRunSeconds,
            pumpRestSeconds: live.pumpRestSeconds,
            config: {
              ...config,
              rainBlockPct: rainBlockThreshold,
              maxRunMin: maxRunLimit,
            },
            weather: {
              rainProbPct: weatherData?.forecast?.maxRainProb24h ?? 15,
              recentRainMm: weatherData?.current?.precipMm ?? 0,
            },
            hardwareRainSensor: live.rainSensor || false,
          });

          if (config.mode === "AUTO") {
            if (!isPumpRunning && decision.pumpOn) {
              live.pumpOn = true;
              live.status = "ON";
              live.reason = decision.reason;
              triggerAlert("PUMP RELAY ENERGIZED", `${field.name}: ${decision.reason}`, "info");
            } else if (isPumpRunning && !decision.pumpOn) {
              live.pumpOn = false;
              live.status = decision.status;
              live.reason = decision.reason;

              // Log event
              const newEvt = {
                id: `evt-${Date.now()}`,
                fieldId: field.id,
                start: new Date(Date.now() - (live.pumpRunSeconds || 30) * 1000).toISOString(),
                stop: new Date().toISOString(),
                durationSec: live.pumpRunSeconds || 30,
                reason: decision.reason,
                litresEst: Math.round(((live.pumpRunSeconds || 30) / 60) * (field.flowRateLpm || 32.4)),
              };
              setEvents((prev) => [newEvt, ...prev]);

              if (decision.alert) {
                triggerAlert("PUMP SHUTOFF", decision.alert, decision.status === "FAULT" ? "critical" : "info");
              }
            } else {
              live.status = decision.status;
              live.reason = decision.reason;
            }
          }

          return { ...field, live };
        });
      });
    }, 3000);

    return () => clearInterval(simInterval);
  }, [rainBlockThreshold, maxRunLimit, weatherData]);

  // Helper to trigger system alerts
  const triggerAlert = (title, message, severity = "info") => {
    setAlerts((prev) => [
      {
        id: `alt-${Date.now()}-${Math.random()}`,
        type: "IRRIGATION",
        severity,
        title,
        message,
        timestamp: Date.now(),
      },
      ...prev.slice(0, 20),
    ]);
  };

  // One-Tap Manual Pump Toggle
  const handleTogglePumpManual = (field, durationMinutes = 20) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id === field.id) {
          const willTurnOn = !f.live?.pumpOn;
          const live = {
            ...f.live,
            pumpOn: willTurnOn,
            status: willTurnOn ? "ON" : "OFF",
            reason: willTurnOn
              ? `Manual command: run for ${durationMinutes} min`
              : "Manual command: stopped by user",
            pumpRunSeconds: 0,
          };

          if (!willTurnOn && f.live?.pumpOn) {
            const newEvt = {
              id: `evt-${Date.now()}`,
              fieldId: f.id,
              start: new Date(Date.now() - (f.live?.pumpRunSeconds || 60) * 1000).toISOString(),
              stop: new Date().toISOString(),
              durationSec: f.live?.pumpRunSeconds || 60,
              reason: "Manual stop command",
              litresEst: Math.round(((f.live?.pumpRunSeconds || 60) / 60) * (field.flowRateLpm || 32.4)),
            };
            setEvents((prevEvents) => [newEvt, ...prevEvents]);
          }

          triggerAlert(
            willTurnOn ? "MANUAL OVERRIDE: PUMP STARTED" : "MANUAL OVERRIDE: PUMP STOPPED",
            `${field.name} relay switched ${willTurnOn ? "ON" : "OFF"}.`,
            "info"
          );

          return { ...f, live };
        }
        return f;
      })
    );
  };

  // Recalibrate dynamic threshold
  const handleUpdateThreshold = (fieldId, lowT, highT) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, config: { ...f.config, lowT, highT } } : f))
    );
  };

  // User Login / Logout
  const handleLogin = (user, remember) => {
    setCurrentUser(user);
    if (remember) {
      localStorage.setItem("agrica_current_user", JSON.stringify(user));
    }
    triggerAlert("WELCOME", `Signed in as ${user.name}.`, "info");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("agrica_current_user");
    triggerAlert("SESSION CLOSED", "Signed out successfully.", "info");
  };

  return (
    <div className="min-h-screen bg-[#FBF6E6] text-[#16130F] font-sans antialiased selection:bg-[#D98B6F] selection:text-[#FBF6E6]">
      {/* Top Header & Navigation */}
      <HeaderNav
        activeTab={selectedField ? "fieldDetail" : activeTab}
        setActiveTab={(tab) => {
          setSelectedField(null);
          setActiveTab(tab);
        }}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        unreadAlertsCount={alerts.length}
        openAlertsDrawer={() => setIsAlertsOpen(true)}
        language={language}
        setLanguage={setLanguage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNewField={() => setIsNewFieldOpen(true)}
      />

      {/* Main Screen Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {selectedField ? (
          <FieldDetailView
            field={fields.find((f) => f.id === selectedField.id) || selectedField}
            events={events}
            history={history}
            language={language}
            onBack={() => setSelectedField(null)}
            onUpdateConfig={(id, cfg) => setFields((fs) => fs.map((f) => (f.id === id ? { ...f, config: cfg } : f)))}
            onTogglePumpManual={handleTogglePumpManual}
          />
        ) : activeTab === "home" ? (
          <HomeOverviewView
            fields={fields}
            onNavigate={(tab) => setActiveTab(tab)}
            language={language}
          />
        ) : activeTab === "controller" ? (
          <PumpControllerView
            fields={fields}
            activeFieldId={fields[0]?.id}
            setActiveFieldId={(id) => setSelectedField(fields.find((f) => f.id === id))}
            onTogglePump={handleTogglePumpManual}
            onUpdateThreshold={handleUpdateThreshold}
            language={language}
          />
        ) : activeTab === "dashboard" ? (
          <MultiFieldDashboardView
            fields={fields}
            onSelectField={(f) => setSelectedField(f)}
            onTogglePump={handleTogglePumpManual}
            onOpenNewField={() => setIsNewFieldOpen(true)}
            language={language}
          />
        ) : activeTab === "weather" ? (
          <WeatherStationView
            weatherData={weatherData}
            onNavigate={(tab) => setActiveTab(tab)}
            language={language}
          />
        ) : activeTab === "devices" ? (
          <DevicesView
            devices={devices}
            fields={fields}
            language={language}
            onAddDevice={(dev) => setDevices((prev) => [...prev, dev])}
            onSaveCalibration={(devId, cal) => setDevices((ds) => ds.map((d) => (d.id === devId ? { ...d, calibration: cal } : d)))}
          />
        ) : activeTab === "insights" ? (
          <InsightsView
            fields={fields}
            events={events}
            weatherData={weatherData}
            language={language}
          />
        ) : activeTab === "contact" ? (
          <ContactSupportView language={language} />
        ) : (
          <SettingsView
            language={language}
            setLanguage={setLanguage}
            units={units}
            setUnits={setUnits}
            rainBlockThreshold={rainBlockThreshold}
            setRainBlockThreshold={setRainBlockThreshold}
            maxRunLimit={maxRunLimit}
            setMaxRunLimit={setMaxRunLimit}
          />
        )}
      </main>

      {/* Alerts Drawer */}
      <AlertsDrawer
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onDismissAlert={(id) => setAlerts((prev) => prev.filter((a) => a.id !== id))}
        onClearAll={() => setAlerts([])}
        language={language}
      />

      {/* Register New Plot Modal */}
      <NewFieldModal
        isOpen={isNewFieldOpen}
        onClose={() => setIsNewFieldOpen(false)}
        onAddField={(newF) => setFields((prev) => [...prev, newF])}
        language={language}
      />

      {/* Auth Modal (Login / Sign Up / Session) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        language={language}
      />
    </div>
  );
}
