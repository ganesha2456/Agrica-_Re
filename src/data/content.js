/**
 * AGRICA — Editorial Precision Irrigation System
 * All website copy and configuration content lives in this single source of truth.
 */

export const content = {
  meta: {
    siteTitle: "AGRICA — Smart Precision Irrigation System",
    tagline: "SMART PRECISION IRRIGATION · ESP32 · LORA · ML",
    edition: "ALMANAC NO. 04 · PRECISION HUSBANDRY SERIES",
    coordinates: "20.2961° N, 85.8245° E · TROPICAL AGRO-ECOLOGICAL ZONE",
    copyright: "©2026 AGRICA. ALL RIGHTS RESERVED. HARVESTED WITH CARE.",
    githubUrl: "https://github.com/agrica-irrigation/agrica-core",
    projectUrl: "#ledger",
  },

  nav: {
    logo: "AGRICA",
    logoSub: "PRECISION IRRIGATION",
    links: [
      { label: "Home", href: "#hero" },
      { label: "Methods", href: "#stamps" },
      { label: "System", href: "#architecture" },
      { label: "Technology", href: "#ledger" },
      { label: "Field Notes", href: "#notes" },
      { label: "Roadmap", href: "#roadmap" },
    ],
    cta: "View Project",
  },

  hero: {
    badge: "AGRICA SPECIFICATION SHEET · REV 2.4",
    headlineLead: "Every drop,",
    headlineEmphasis: "where it matters.",
    subline: "SMART PRECISION IRRIGATION · ESP32 · LORA · ML",
    description:
      "A closed-loop agricultural water management system coupling low-power microcontrollers, multi-depth soil dielectric probes, galvanically isolated pump actuation, and long-range sub-GHz telemetry.",
    ctaPrimary: "Explore the system",
    ctaSecondary: "View on GitHub",
    fieldStats: [
      { label: "TARGET REDUCTION", value: "38%", unit: "WATER USE" },
      { label: "TELEMETRY RANGE", value: "8.5 km", unit: "SUB-GHz LoRa" },
      { label: "PUMP RELAY LATENCY", value: "<120 ms", unit: "OPTO-ISOLATED" },
    ],
  },

  intro: {
    figureTag: "FIG. 01 — FIELD PROBLEM & THESIS",
    statement:
      "Fixed schedules and guesswork lead to over-watering, under-watering and wasted electricity. AGRICA reads the soil, the weather and the crop, and runs the pump only when the field actually needs water.",
    annotation:
      "OBSERVED DEFICIT: Over 62% of smallholder diesel and electric tube-well irrigation events in semi-arid zones exceed root-zone field capacity, depleting aquifers and leaching vital nitrates.",
  },

  stamps: {
    headingLead: "Methods of",
    headingEmphasis: "distribution & telemetry.",
    subheading: "PERFORATED STAMPS · CLICK ANY SPECIMEN TO INSPECT COMPATIBILITY",
    items: [
      {
        id: "drip",
        title: "Drip Irrigation",
        tag: "MICRO-EMISSION",
        specs: "1.2–2.4 L/h per emitter",
        note: "AGRICA pulses solenoid zones in staggered intervals to sustain root-zone osmotic equilibrium without pressure drops.",
      },
      {
        id: "sprinkler",
        title: "Sprinkler Arc",
        tag: "OVERHEAD CANOPY",
        specs: "15–30 PSI operating range",
        note: "AGRICA coordinates pump pressure valves and pauses cycles during high evaporative demand or gusty wind windows.",
      },
      {
        id: "furrow",
        title: "Furrow / Canal",
        tag: "SURFACE GRAVITY",
        specs: "Infiltration wave velocity",
        note: "AGRICA reads downstream wetting-front moisture probes and auto-closes canal intake gates as the water head reaches 80% run.",
      },
      {
        id: "pivot",
        title: "Centre-Pivot",
        tag: "MECHANIZED SWEEP",
        specs: "Variable speed speed-rate",
        note: "AGRICA feeds spatial sector moisture telemetry to speed regulators to apply variable-depth irrigation across concentric zones.",
      },
      {
        id: "pump",
        title: "Borewell Pump",
        tag: "SUBMERSIBLE INDUCTION",
        specs: "3HP–7.5HP 3-Phase Relay",
        note: "AGRICA drives high-current contactors through optocoupler snubber boards with dry-run protection and phase-sensing.",
      },
      {
        id: "raingauge",
        title: "Tipping Rain Gauge",
        tag: "METEOROLOGY · 0.2mm",
        specs: "Reed switch pulse count",
        note: "AGRICA immediately suppresses scheduled irrigation upon detecting precipitative flux exceeding 2.5 mm/hr.",
      },
      {
        id: "probe",
        title: "Dielectric Soil Probe",
        tag: "FDR / CAPACITIVE",
        specs: "Volumetric Water Content (VWC)",
        note: "AGRICA samples high-frequency dielectric permittivity insulated from soil salinity and ion corrosion.",
      },
      {
        id: "lora",
        title: "LoRa Field Node",
        tag: "868 / 915 MHz SX1276",
        specs: "+20dBm · Spreading Factor 12",
        note: "AGRICA uplinks encoded sensor telemetry packets across multi-kilometre crop canopies directly to the farm gateway.",
      },
    ],
  },

  stickyWords: {
    sectionTag: "CORE OPERATION CYCLE",
    titlePrefix: "Watering through",
    steps: [
      {
        key: "sensing",
        word: "sensing",
        accent: "soil moisture, dielectric permittivity, ambient vapor",
        subline: "Reads soil moisture, temperature and humidity continuously.",
        caption: "FIG. 02/A — CAPACITIVE IN-SITU PROBE",
        details:
          "Dual-depth 10cm & 30cm capacitive sensors sample rhizosphere volumetric water content (VWC) every 60 seconds with temperature compensation.",
      },
      {
        key: "deciding",
        word: "deciding",
        accent: "embedded hysteretic thresholds & crop coefficients",
        subline: "Applies irrigation logic using crop type, soil type and weather.",
        caption: "FIG. 02/B — DUAL-CORE XTENSA LOGIC RUNNER",
        details:
          "The ESP32 microcontroller compares real-time moisture against dynamically selected depletion thresholds (T_lower and T_stop), blocking cycles if rain is forecast.",
      },
      {
        key: "acting",
        word: "acting",
        accent: "isolated contactors, snubber circuits, solenoid manifolds",
        subline: "A relay switches the pump ON and OFF, safely isolated.",
        caption: "FIG. 02/C — GALVANIC RELAY ACTUATION MODULE",
        details:
          "Optoisolated relays fire 240V/415V pump contactors with zero-cross detection, flyback snubbing, and fail-safe watchdog timeouts.",
      },
      {
        key: "connecting",
        word: "connecting",
        accent: "hybrid 2.4GHz Wi-Fi mesh & Sub-GHz LoRa modulation",
        subline: "Wi-Fi for nearby fields, LoRa for long distances.",
        caption: "FIG. 02/D — LONG-RANGE TRANSCEIVER MATRIX",
        details:
          "Nodes transmit lightweight binary-packed payloads over SX1262 LoRa links to the master pump house gateway up to 10 kilometers away.",
      },
      {
        key: "learning",
        word: "learning",
        accent: "evapotranspiration regression & predictive soil physics",
        subline: "ML learns from history, rainfall and crop data.",
        caption: "FIG. 02/E — ADAPTIVE EDGE INFERENCE HARNESS",
        details:
          "Historical depletion slopes, solar radiation indices, and weather API lookaheads train adaptive models to pre-emptively irrigate before thermal stress.",
      },
    ],
  },

  seedCabinet: {
    sectionTag: "SYSTEM ARCHITECTURE",
    headlineLead: "Six layers, one",
    headlineEmphasis: "irrigation brain.",
    subheading: "DRAWERS OF THE SEED-SHED CABINET · HOVER OR TAP TO PULL CARD",
    drawers: [
      {
        id: "sensing",
        title: "SENSING",
        num: "DRAWER 01",
        summary: "Collects soil moisture and environmental measurements.",
        body: "Capacitive VWC probes, DS18B20 soil thermometers, DHT22 ambient sensors, and optical solar radiance meters sample the root envelope.",
        hardware: "Capacitive v1.2 / RS485 Modbus / SHT31",
      },
      {
        id: "control",
        title: "CONTROL",
        num: "DRAWER 02",
        summary: "Microcontroller reads sensor values and applies irrigation logic.",
        body: "ESP32 dual-core Xtensa LX6 runs RTOS tasks: sensor filtering, hysteretic state machines, EEPROM setpoint memory, and failsafe pump timers.",
        hardware: "ESP-WROOM-32 / FreeRTOS / 240MHz",
      },
      {
        id: "actuation",
        title: "ACTUATION",
        num: "DRAWER 03",
        summary: "A relay switches the irrigation pump ON/OFF.",
        body: "Solid-state or optocoupled electromagnetic relays energize 12V solenoid valves and heavy-duty 3-phase pump contactors safely isolated from MCU logic.",
        hardware: "Songle 30A Opto-Isolator / RC Snubber",
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        num: "DRAWER 04",
        summary: "Transfers field data to a remote interface; LoRa for long-range fields.",
        body: "Sub-GHz Semtech LoRa transceivers punch through dense crop foliage for distant fields, while 802.11 b/g/n Wi-Fi serves perimeter sensors.",
        hardware: "SX1276 / SX1262 LoRa / ESP-NOW Mesh",
      },
      {
        id: "application",
        title: "APPLICATION",
        num: "DRAWER 05",
        summary: "Shows measurements, irrigation status and control.",
        body: "Responsive web dashboard and farmer SMS/WhatsApp telemetry bot display real-time soil water balance, pump run hours, and emergency stop toggles.",
        hardware: "Vite + React / WebSockets / REST API",
      },
      {
        id: "intelligence",
        title: "INTELLIGENCE",
        num: "DRAWER 06",
        summary: "The future ML module predicts or recommends irrigation needs.",
        body: "Micro-models ingest cumulative thermal units, penman-monteith reference ET0, and 72-hour rain probabilities to optimize pump timing.",
        hardware: "TensorFlow Lite Micro / Edge Regression",
      },
    ],
  },

  fieldLedger: {
    sectionTag: "INTERACTIVE EXPERIMENT BENCH",
    headlineLead: "How AGRICA",
    headlineEmphasis: "decides.",
    subheading: "FIELD LOG BOOK & REAL-TIME CONTROLLER SIMULATION",
    tabs: [
      { id: "logic", label: "CONTROL LOGIC", tag: "SIMULATOR" },
      { id: "crop", label: "CROP & SOIL", tag: "SETPOINTS" },
      { id: "iot", label: "IOT & LORA", tag: "TELEMETRY" },
      { id: "ml", label: "ML (PLANNED)", tag: "PREDICTIVE" },
    ],

    crops: [
      { id: "paddy", name: "Paddy (Rice)", lowerT: 60, upperT: 85, soil: "Clay", waterReq: "High (Flooded/Saturated)", icon: "🌾" },
      { id: "wheat", name: "Wheat", lowerT: 35, upperT: 60, soil: "Loamy", waterReq: "Moderate (Crown root initiation)", icon: "🌿" },
      { id: "sugarcane", name: "Sugarcane", lowerT: 45, upperT: 75, soil: "Loamy / Clay", waterReq: "High & Frequent", icon: "🎋" },
      { id: "cotton", name: "Cotton", lowerT: 30, upperT: 55, soil: "Sandy Loam", waterReq: "Moderate (Avoid waterlogging)", icon: "☁️" },
      { id: "vegetables", name: "Vegetables", lowerT: 40, upperT: 70, soil: "Loamy", waterReq: "Frequent Shallow Irrigation", icon: "🌱" },
    ],

    soils: [
      { id: "sandy", name: "Sandy Soil", drainRate: "Rapid percolation", holdingCapacity: "Low (10–15%)", modifier: -5 },
      { id: "loamy", name: "Loamy Soil", drainRate: "Balanced infiltration", holdingCapacity: "Medium (25–35%)", modifier: 0 },
      { id: "clay", name: "Clay Soil", drainRate: "Slow absorption", holdingCapacity: "High (35–50%)", modifier: +8 },
    ],

    iotNodes: [
      { step: "01", name: "Soil & Weather Sensors", desc: "VWC probe + Rain gauge + Air temp/RH send 3.3V analog/I2C signals." },
      { step: "02", name: "ESP32 Field Node", desc: "ADC samples, calibrates voltage to VWC percentage, packages 16-byte payload." },
      { step: "03", name: "Local Hysteresis Engine", desc: "Compares against Lower Setpoint (T) and Rain Expected flag." },
      { step: "04", name: "Isolated Relay Actuator", desc: "Triggers 12V coil, closing 3-phase pump contactor if irrigation required." },
      { step: "05", name: "Wireless Uplink", desc: "Sends encrypted packet via LoRa (868MHz) or Wi-Fi to farm base station." },
      { step: "06", name: "Farmer Control Hub", desc: "Displays live telemetry, water consumed, pump runtimes, and override commands." },
    ],

    mlFeatures: [
      { name: "Current Soil Moisture (VWC %)", weight: "0.28", type: "Continuous" },
      { name: "Soil Temperature (°C)", weight: "0.12", type: "Continuous" },
      { name: "Ambient Relative Humidity (%)", weight: "0.10", type: "Continuous" },
      { name: "Recent Rainfall (past 24h mm)", weight: "0.22", type: "Continuous" },
      { name: "Weather API Forecast Rain (next 48h)", weight: "0.18", type: "Probability" },
      { name: "Crop Type & Phenology Stage", weight: "0.15", type: "Categorical" },
      { name: "Soil Infiltration Class", weight: "0.11", type: "Categorical" },
      { name: "Cumulative Solar Insolation (MJ/m²)", weight: "0.14", type: "Continuous" },
    ],
  },

  fieldNotes: {
    sectionTag: "ENGINEERING COMPENDIUM",
    headlineLead: "Field notes:",
    headlineEmphasis: "why it matters.",
    subheading: "PRACTICAL LESSONS FROM THE EXPERIMENTAL PLOTS",
    rows: [
      {
        id: "advantages",
        title: "System Advantages & Agronomic Gains",
        bg: "water",
        meta: "NOTEBOOK SHEET NO. 14 · EFFICIENCY GAINS",
        points: [
          "Reduces unnecessary water consumption by 30% to 45% compared to timed flood irrigation.",
          "Prevents soil nutrient leaching caused by over-saturation in vulnerable sandy loam strata.",
          "Eliminates midnight walks to turn pumps on/off during erratic rural electricity supply windows.",
          "Scalable from a single 0.5-acre vegetable greenhouse to a 50-acre multi-zone sugarcane farm.",
          "Forms an indelible foundation of high-resolution soil hydrologic data for precision yield modeling.",
        ],
      },
      {
        id: "limitations",
        title: "Hardware Limitations & Physical Boundaries",
        bg: "cream",
        meta: "NOTEBOOK SHEET NO. 15 · HARDWARE CONSTRAINTS",
        points: [
          "Low-cost capacitive sensors exhibit temperature drift and require two-point soil-specific calibration.",
          "Sub-GHz wireless propagation suffers attenuation when sorghum or sugarcane crops reach full canopy heights (2.5m+).",
          "Planned ML predictive engines require at least two full cropping cycles of clean telemetry before high-confidence inference.",
          "Pump relays must incorporate galvanic optical isolation, snubber diodes, and manual mechanical bypass switches.",
        ],
      },
      {
        id: "challenges",
        title: "Field Deployment & Environmental Challenges",
        bg: "paddy",
        meta: "NOTEBOOK SHEET NO. 16 · FARM REALITIES",
        points: [
          "Moisture and corrosive agrochemicals threaten outdoor PCB enclosures requiring IP67 conformal coating.",
          "Rodents chewing buried sensor cabling mandates UV-stabilized PVC conduit protection.",
          "Surge spikes from rural induction grid switching can corrupt flash memory without TVS diode clamping.",
          "Ensuring farmers retain full transparent control with simple manual overrides to build lasting trust in automation.",
        ],
      },
      {
        id: "features",
        title: "Core Architectural Capabilities",
        bg: "water",
        meta: "NOTEBOOK SHEET NO. 17 · FEATURE MATRIX",
        points: [
          "Autonomous closed-loop hysteretic thresholding: no internet needed for vital pump shutoff.",
          "Continuous 60-second multi-parameter root zone observation (VWC, temperature, battery level).",
          "Long-range LoRaWAN telemetry operating reliably up to 8.5 km across open farm terrain.",
          "Crop-specific and soil-aware dynamic setpoint profiles with rainfall prediction lockout.",
          "Edge-friendly predictive water balance calculations ready for lightweight ML micro-models.",
        ],
      },
    ],
  },

  roadmap: {
    sectionTag: "THE CHRONOLOGICAL HORIZON",
    headlineLead: "Where AGRICA",
    headlineEmphasis: "grows next.",
    subheading: "A CROPPING CALENDAR OF ARCHITECTURAL MILESTONES",
    stages: [
      {
        phase: "SOWING",
        period: "Q1 — FOUNDATIONAL FIRMWARE",
        tag: "SEED PACKET · STAGE 01",
        color: "turmeric",
        milestones: [
          { title: "Growth-Stage Setpoints", desc: "Auto-adjust threshold T as crop transitions from seedling to tillering and grain-fill." },
          { title: "Precipitation Lockout Engine", desc: "Integrate tipping-bucket rain interrupts and open-meteo API forecast lookahead." },
          { title: "Solar Power Harvest Module", desc: "Ultra-low-power sleep cycles powered by 5W monocrystalline panel and 18650 LiFePO4 cells." },
        ],
      },
      {
        phase: "GROWING",
        period: "Q2 — EXPANDED NETWORK",
        tag: "SEED PACKET · STAGE 02",
        color: "paddy",
        milestones: [
          { title: "Sub-GHz LoRa Mesh", desc: "Cluster-to-cluster multi-hop mesh across expansive agricultural cooperatives." },
          { title: "Venturi Fertigation Control", desc: "Secondary relay channels metering liquid nitrogen/potassium dosing into drip lines." },
          { title: "Farmer Mobile & SMS Bot", desc: "Offline-first vernacular WhatsApp and SMS telemetry for rural low-connectivity areas." },
        ],
      },
      {
        phase: "HARVEST",
        period: "Q3–Q4 — INTELLIGENT PLATFORM",
        tag: "SEED PACKET · STAGE 03",
        color: "clay",
        milestones: [
          { title: "Edge ML Soil Moisture Predictor", desc: "TensorFlow Lite Micro predicting root moisture 24 hours ahead from solar & historical decline." },
          { title: "Computer-Vision Canopy Health", desc: "ESP32-CAM canopy spectral analysis to correlate thermal stress with irrigation timing." },
          { title: "Multi-Field Yield Optimization", desc: "Cooperative water-budgeting algorithms balancing aquifer drawdown across adjoining holdings." },
        ],
      },
    ],
  },

  closing: {
    headline: "AGRICA starts as a simple sensor-based irrigation controller and grows into a scalable precision-agriculture platform.",
    subtext: "Designed with the humility of the soil and the rigour of modern engineering.",
    badge: "OPEN AGRONOMY SPECIFICATION · 2026 EDITION",
    ctaPrimary: "View Project",
    ctaSecondary: "GitHub Repository",
  },

  footer: {
    brandName: "AGRICA",
    brandDescription:
      "A rural-first, open-hardware precision irrigation platform marrying sensor telemetry, microcontrollers, and agro-ecological science.",
    columns: [
      {
        title: "EXPLORE",
        links: [
          { label: "Introduction", href: "#hero" },
          { label: "Irrigation Stamps", href: "#stamps" },
          { label: "Cycle of Operation", href: "#cycle" },
          { label: "Seed Cabinet", href: "#architecture" },
        ],
      },
      {
        title: "TECHNOLOGY",
        links: [
          { label: "Control Logic Sim", href: "#ledger" },
          { label: "Crop & Soil Matrix", href: "#ledger" },
          { label: "LoRa Sub-GHz Link", href: "#ledger" },
          { label: "ML Micro-Model", href: "#ledger" },
        ],
      },
      {
        title: "ROADMAP",
        links: [
          { label: "Sowing Phase", href: "#roadmap" },
          { label: "Growing Phase", href: "#roadmap" },
          { label: "Harvest Phase", href: "#roadmap" },
          { label: "Release Notes", href: "#notes" },
        ],
      },
      {
        title: "FIELD OFFICE",
        links: [
          { label: "GitHub Repository", href: "https://github.com/agrica-irrigation/agrica-core" },
          { label: "Hardware Schematics (KiCad)", href: "#" },
          { label: "ESP32 Firmware Source", href: "#" },
          { label: "Farmer Support Dispatch", href: "mailto:field-ops@agrica.internal" },
        ],
      },
    ],
    bottomMeta: "PRINTED IN ODISHA, INDIA · 20°17′N 85°49′E · COMPILED FOR SUSTAINABLE HARVESTS",
  },
};
