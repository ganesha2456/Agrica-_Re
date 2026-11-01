import React from "react";

/**
 * AGRICA Editorial Woodcut & Halftone Engravings
 * Page-specific agricultural landscape plates and watermarks in Ink (#16130F),
 * Paddy (#A8BE86), Deep Leaf (#3E5B34), Clay (#D98B6F), and Water Blue (#A9C8EC)
 * on Paper Cream (#FBF6E6).
 */

// 1. Furrow Sprinkler Irrigation Field (Home Page Hero)
export const SprinklerFieldEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 560" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="sf-cloud" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.5" fill="#9FA9EE" fillOpacity="0.75" />
      </pattern>
      <pattern id="sf-mtn" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="8" y2="2" stroke="#3E5B34" strokeWidth="1" strokeOpacity="0.6" />
      </pattern>
      <pattern id="sf-earth" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="2" height="2" fill="#D98B6F" fillOpacity="0.8" />
        <rect x="3" y="3" width="2" height="2" fill="#16130F" fillOpacity="0.5" />
      </pattern>
      <pattern id="sf-crop" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="4" height="4" fill="#3E5B34" />
        <rect x="4" y="4" width="4" height="4" fill="#A8BE86" />
      </pattern>
    </defs>
    <rect width="1200" height="560" fill="#FBF6E6" />
    <g fill="url(#sf-cloud)">
      <path d="M0,140 Q180,70 380,110 T800,90 T1200,120 L1200,200 L0,200 Z" />
      <circle cx="240" cy="90" r="50" />
      <circle cx="480" cy="70" r="65" />
      <circle cx="760" cy="80" r="55" />
      <circle cx="980" cy="100" r="45" />
    </g>
    <path d="M0,190 L120,135 L280,165 L460,95 L610,145 L780,105 L960,155 L1120,120 L1200,160 L1200,240 L0,240 Z" fill="#9FA9EE" fillOpacity="0.35" />
    <path d="M0,190 L120,135 L280,165 L460,95 L610,145 L780,105 L960,155 L1120,120 L1200,160" fill="none" stroke="#16130F" strokeWidth="2" />
    <path d="M0,230 Q300,190 600,225 T1200,210 L1200,260 L0,260 Z" fill="url(#sf-mtn)" />
    <path d="M0,230 Q300,190 600,225 T1200,210" fill="none" stroke="#16130F" strokeWidth="1.5" />
    <rect x="0" y="240" width="1200" height="40" fill="#A8BE86" fillOpacity="0.5" />
    <polygon points="600,240 0,330 0,560 520,560" fill="url(#sf-earth)" />
    <polygon points="600,240 680,560 1200,560 1200,330" fill="url(#sf-earth)" />
    <path d="M600,240 L80,560 L240,560 L600,240 Z" fill="url(#sf-crop)" fillOpacity="0.9" />
    <path d="M600,240 L310,560 L490,560 L600,240 Z" fill="url(#sf-crop)" fillOpacity="0.95" />
    <path d="M600,240 L710,560 L890,560 L600,240 Z" fill="url(#sf-crop)" fillOpacity="0.95" />
    <path d="M600,240 L960,560 L1120,560 L600,240 Z" fill="url(#sf-crop)" fillOpacity="0.9" />
    <polygon points="600,240 540,560 660,560" fill="#A9C8EC" stroke="#16130F" strokeWidth="2" />
    {[270, 310, 360, 420, 480, 530].map((y, idx) => (
      <line key={idx} x1={600 - (y - 240) * 0.15} y1={y} x2={600 + (y - 240) * 0.15} y2={y} stroke="#FBF6E6" strokeWidth={1.8 + idx * 0.4} strokeDasharray="8 6" />
    ))}
    <g transform="translate(600, 420)">
      <rect x="-8" y="0" width="16" height="70" fill="#16130F" stroke="#16130F" strokeWidth="2" />
      <circle cx="0" cy="0" r="10" fill="#16130F" />
      <rect x="-14" y="-8" width="28" height="12" rx="3" fill="#3E5B34" stroke="#16130F" strokeWidth="1.5" />
      <g stroke="#A9C8EC" strokeLinecap="round" fill="none">
        <path d="M-8,-2 Q-140,-120 -380,-60" strokeWidth="4" strokeDasharray="6 6" />
        <path d="M-8,-2 Q-160,-90 -450,-20" strokeWidth="3" strokeDasharray="5 5" />
        <path d="M-8,-2 Q-130,-150 -320,-90" strokeWidth="2.5" strokeDasharray="4 6" />
        <path d="M-8,-2 Q-200,-60 -520,30" strokeWidth="3.5" strokeDasharray="8 6" />
        <path d="M8,-2 Q140,-120 380,-60" strokeWidth="4" strokeDasharray="6 6" />
        <path d="M8,-2 Q160,-90 450,-20" strokeWidth="3" strokeDasharray="5 5" />
        <path d="M8,-2 Q130,-150 320,-90" strokeWidth="2.5" strokeDasharray="4 6" />
        <path d="M8,-2 Q200,-60 520,30" strokeWidth="3.5" strokeDasharray="8 6" />
      </g>
    </g>
    <rect x="10" y="10" width="1180" height="540" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="360" y="8" width="480" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      FIG. 1.4 · IN-SITU ROOT-ZONE SPRINKLER & FURROW IRRIGATION
    </text>
  </svg>
);

// 2. Deep Borewell Pump House & Actuator Manifold (Pump Controller Page)
export const BorewellPumpHouseEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ph-brick" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
        <rect width="16" height="8" fill="#FAF4E2" />
        <rect x="0" y="0" width="16" height="4" fill="#D98B6F" fillOpacity="0.4" />
        <line x1="0" y1="4" x2="16" y2="4" stroke="#16130F" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="8" y1="0" x2="8" y2="4" stroke="#16130F" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="16" y1="4" x2="16" y2="8" stroke="#16130F" strokeWidth="0.8" strokeOpacity="0.4" />
      </pattern>
      <pattern id="ph-roof" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="12" y2="0" stroke="#D98B6F" strokeWidth="2.5" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="#16130F" strokeWidth="1" strokeOpacity="0.3" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <path d="M0,180 Q300,140 600,165 T1200,150 L1200,320 L0,320 Z" fill="#9FA9EE" fillOpacity="0.15" />
    <rect x="0" y="280" width="1200" height="200" fill="#FAF4E2" />
    <line x1="0" y1="280" x2="1200" y2="280" stroke="#16130F" strokeWidth="2" />
    <g stroke="#3E5B34" strokeWidth="1.5" fill="none">
      {[80, 180, 320, 960, 1080].map((x, i) => (
        <path key={i} d={`M${x},280 C${x-10},230 ${x+15},200 ${x},180 M${x},180 Q${x-30},160 ${x-45},175 M${x},180 Q${x+30},160 ${x+45},175 M${x},180 Q${x-15},145 ${x-25},140 M${x},180 Q${x+15},145 ${x+25},140`} />
      ))}
    </g>
    <g transform="translate(140, 110)">
      <polygon points="120,-30 290,-90 460,-30" fill="url(#ph-roof)" stroke="#16130F" strokeWidth="2.5" />
      <rect x="140" y="-30" width="300" height="200" fill="url(#ph-brick)" stroke="#16130F" strokeWidth="2.5" />
      <rect x="230" y="30" width="90" height="140" rx="4" fill="#16130F" />
      <rect x="240" y="40" width="70" height="130" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <rect x="160" y="20" width="45" height="50" rx="3" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
      <rect x="375" y="20" width="45" height="50" rx="3" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
      <line x1="290" y1="-90" x2="290" y2="-120" stroke="#16130F" strokeWidth="3" />
      <circle cx="290" cy="-120" r="4" fill="#D98B6F" />
      <path d="M290,-120 L275,-105 M290,-120 L305,-105" stroke="#16130F" strokeWidth="2" />
    </g>
    <g transform="translate(620, 200)">
      <rect x="-40" y="70" width="280" height="20" rx="3" fill="#D98B6F" stroke="#16130F" strokeWidth="2" />
      <rect x="-20" y="-20" width="130" height="90" rx="8" fill="#3E5B34" stroke="#16130F" strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={i} x1={-10 + i * 16} y1="-10" x2={-10 + i * 16} y2="60" stroke="#FAF4E2" strokeWidth="2" />
      ))}
      <rect x="20" y="-45" width="50" height="25" rx="3" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <text x="45" y="-28" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="bold" fill="#16130F">RELAY</text>
      <circle cx="155" cy="25" r="45" fill="#FAF4E2" stroke="#16130F" strokeWidth="2.5" />
      <circle cx="155" cy="25" r="30" fill="#3E5B34" fillOpacity="0.3" stroke="#16130F" strokeWidth="1.5" />
      <circle cx="155" cy="25" r="8" fill="#16130F" />
      <path d="M155,-20 L155,-70 L280,-70 L280,30" fill="none" stroke="#16130F" strokeWidth="18" strokeLinecap="square" />
      <path d="M155,-20 L155,-70 L280,-70 L280,30" fill="none" stroke="#A9C8EC" strokeWidth="12" />
      <circle cx="215" cy="-85" r="16" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <line x1="215" y1="-85" x2="225" y2="-92" stroke="#D98B6F" strokeWidth="2" />
      <line x1="250" y1="-70" x2="250" y2="-100" stroke="#16130F" strokeWidth="4" />
      <circle cx="250" cy="-100" r="10" fill="#D98B6F" stroke="#16130F" strokeWidth="2" />
      <path d="M280,30 C280,90 320,130 460,140" fill="none" stroke="#A9C8EC" strokeWidth="28" strokeLinecap="round" />
      <path d="M280,30 C280,90 320,130 460,140" fill="none" stroke="#16130F" strokeWidth="2" strokeDasharray="6 4" />
      {[60, 90, 120].map((d, i) => (
        <circle key={i} cx={310 + i * 40} cy={100 + i * 15} r={4 + i} fill="#FBF6E6" stroke="#A9C8EC" strokeWidth="2" />
      ))}
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 2.1 · AGRICULTURAL BOREWELL PUMP HOUSE & MOTOR ACTUATOR
    </text>
  </svg>
);

// 3. Cadastral Agricultural Survey & Terraced Landscape (Cockpit Dashboard Page)
export const CadastralSurveyEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cs-hatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#3E5B34" strokeWidth="1.5" strokeOpacity="0.4" />
      </pattern>
      <pattern id="cs-clay" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.2" fill="#D98B6F" fillOpacity="0.8" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <path d="M0,160 Q300,100 650,140 T1200,110 L1200,240 L0,240 Z" fill="#9FA9EE" fillOpacity="0.2" />
    <path d="M0,230 Q280,180 580,210 T1200,190 L1200,320 L0,320 Z" fill="url(#cs-clay)" />
    <path d="M0,310 Q320,260 680,290 T1200,270 L1200,480 L0,480 Z" fill="url(#cs-hatch)" />
    <path d="M0,160 Q300,100 650,140 T1200,110" fill="none" stroke="#16130F" strokeWidth="2" />
    <path d="M0,230 Q280,180 580,210 T1200,190" fill="none" stroke="#16130F" strokeWidth="2" />
    <path d="M0,310 Q320,260 680,290 T1200,270" fill="none" stroke="#16130F" strokeWidth="2" />
    <path d="M380,125 C420,220 390,320 440,480" fill="none" stroke="#A9C8EC" strokeWidth="16" />
    <path d="M380,125 C420,220 390,320 440,480" fill="none" stroke="#16130F" strokeWidth="1.5" strokeDasharray="4 4" />
    <path d="M410,240 C520,250 640,230 760,260" fill="none" stroke="#A9C8EC" strokeWidth="10" />
    <path d="M410,240 C520,250 640,230 760,260" fill="none" stroke="#16130F" strokeWidth="1.5" strokeDasharray="4 4" />
    <g fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" fill="#16130F">
      <rect x="80" y="245" width="160" height="50" rx="4" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <text x="160" y="268" textAnchor="middle">PLOT 1 · PADDY</text>
      <text x="160" y="284" textAnchor="middle" fontSize="8" fill="#3E5B34">1.5 ACRES · VWC 42%</text>

      <rect x="490" y="255" width="160" height="50" rx="4" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <text x="570" y="278" textAnchor="middle">PLOT 2 · GREENS</text>
      <text x="570" y="294" textAnchor="middle" fontSize="8" fill="#3E5B34">0.8 ACRES · VWC 38%</text>

      <rect x="860" y="225" width="160" height="50" rx="4" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <text x="940" y="248" textAnchor="middle">PLOT 3 · WHEAT</text>
      <text x="940" y="264" textAnchor="middle" fontSize="8" fill="#3E5B34">2.2 ACRES · VWC 54%</text>
    </g>
    <g transform="translate(680, 80)">
      <line x1="0" y1="90" x2="0" y2="0" stroke="#16130F" strokeWidth="4" />
      <line x1="-15" y1="90" x2="0" y2="50" stroke="#16130F" strokeWidth="2" />
      <line x1="15" y1="90" x2="0" y2="50" stroke="#16130F" strokeWidth="2" />
      <rect x="-12" y="20" width="24" height="16" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="4" fill="#3E5B34" />
      <circle cx="0" cy="0" r="18" fill="none" stroke="#9FA9EE" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="0" cy="0" r="32" fill="none" stroke="#9FA9EE" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="0" cy="0" r="48" fill="none" stroke="#9FA9EE" strokeWidth="1.2" strokeDasharray="8 5" />
    </g>
    <g transform="translate(1080, 70)">
      <circle cx="0" cy="0" r="28" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <polygon points="0,-24 5,-6 0,0" fill="#16130F" />
      <polygon points="0,-24 -5,-6 0,0" fill="#FAF4E2" stroke="#16130F" strokeWidth="1" />
      <polygon points="0,24 5,6 0,0" fill="#D98B6F" />
      <polygon points="0,24 -5,6 0,0" fill="#FAF4E2" stroke="#16130F" strokeWidth="1" />
      <polygon points="24,0 6,5 0,0" fill="#16130F" />
      <polygon points="-24,0 -6,-5 0,0" fill="#16130F" />
      <text x="0" y="-28" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="bold">N</text>
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 3.0 · CADASTRAL TELEMETRY SURVEY & MULTI-PLOT TERRACES
    </text>
  </svg>
);

// 4. Botanical Soil Stratigraphy & In-Situ Sensor Probe (Add Field Page)
export const SoilStratigraphyEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="st-top" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.5" fill="#16130F" fillOpacity="0.5" />
      </pattern>
      <pattern id="st-clay" x="0" y="0" width="10" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
        <line x1="0" y1="0" x2="10" y2="0" stroke="#D98B6F" strokeWidth="2" strokeOpacity="0.8" />
      </pattern>
      <pattern id="st-deep" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="4" height="4" fill="#3E5B34" fillOpacity="0.3" />
        <rect x="4" y="4" width="4" height="4" fill="#16130F" fillOpacity="0.3" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <rect x="0" y="130" width="1200" height="90" fill="url(#st-top)" />
    <rect x="0" y="220" width="1200" height="130" fill="url(#st-clay)" />
    <rect x="0" y="350" width="1200" height="130" fill="url(#st-deep)" />
    <line x1="0" y1="130" x2="1200" y2="130" stroke="#16130F" strokeWidth="3" />
    <line x1="0" y1="220" x2="1200" y2="220" stroke="#16130F" strokeWidth="1.8" strokeDasharray="6 4" />
    <line x1="0" y1="350" x2="1200" y2="350" stroke="#16130F" strokeWidth="1.8" strokeDasharray="6 4" />
    <g stroke="#3E5B34" strokeWidth="2" fill="none">
      {[120, 240, 380, 520, 680, 840, 980, 1100].map((x, i) => (
        <g key={i} transform={`translate(${x}, 130)`}>
          <path d="M0,0 Q-10,-40 -25,-60 Q-5,-45 0,0" fill="#A8BE86" />
          <path d="M0,0 Q10,-40 25,-60 Q5,-45 0,0" fill="#A8BE86" />
          <path d="M0,0 Q0,-50 0,-75" />
          <circle cx="0" cy="-75" r="4" fill="#E7B94A" />
        </g>
      ))}
    </g>
    <line x1="0" y1="100" x2="1200" y2="100" stroke="#16130F" strokeWidth="4" />
    {[180, 310, 450, 590, 740, 890, 1040].map((x, i) => (
      <g key={i} transform={`translate(${x}, 104)`}>
        <circle cx="0" cy="12" r="3" fill="#A9C8EC" stroke="#16130F" strokeWidth="1" />
        <circle cx="0" cy="22" r="3.5" fill="#A9C8EC" stroke="#16130F" strokeWidth="1" />
      </g>
    ))}
    <g stroke="#16130F" strokeWidth="1.5" fill="none" opacity="0.85">
      {[120, 240, 380, 680, 840, 1100].map((x, i) => (
        <path key={i} d={`M${x},130 Q${x-15},180 ${x-30},230 T${x-20},320 M${x},130 Q${x+15},180 ${x+30},230 T${x+40},310 M${x},130 Q${x},190 ${x+5},260 T${x},360`} />
      ))}
    </g>
    <g transform="translate(520, 80)">
      <rect x="-15" y="-30" width="30" height="30" rx="4" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <circle cx="0" cy="-15" r="4" fill="#3E5B34" />
      <line x1="0" y1="0" x2="0" y2="240" stroke="#16130F" strokeWidth="8" />
      <line x1="-8" y1="60" x2="-8" y2="230" stroke="#D98B6F" strokeWidth="3" />
      <line x1="8" y1="60" x2="8" y2="230" stroke="#D98B6F" strokeWidth="3" />
      {[30, 80, 140, 200].map((y, idx) => (
        <line key={idx} x1="-14" y1={y} x2="14" y2={y} stroke="#FBF6E6" strokeWidth="2" />
      ))}
    </g>
    <g transform="translate(40, 130)" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="bold" fill="#16130F">
      <line x1="0" y1="0" x2="0" y2="330" stroke="#16130F" strokeWidth="2" />
      <line x1="0" y1="0" x2="15" y2="0" stroke="#16130F" strokeWidth="2" />
      <text x="20" y="4">0 CM · SURFACE</text>
      <line x1="0" y1="90" x2="15" y2="90" stroke="#16130F" strokeWidth="2" />
      <text x="20" y="94">15 CM · HORIZON A (HUMUS)</text>
      <line x1="0" y1="220" x2="15" y2="220" stroke="#16130F" strokeWidth="2" />
      <text x="20" y="224">30 CM · HORIZON B (ROOT RETENTION)</text>
      <line x1="0" y1="330" x2="15" y2="330" stroke="#16130F" strokeWidth="2" />
      <text x="20" y="334">45 CM · SUB-ROOT DRAINAGE</text>
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 4.2 · ROOT-ZONE PEDOLOGY & CALIBRATION STRATA
    </text>
  </svg>
);

// 5. Agricultural Meteorology & Rain Observatory (Weather Station Page)
export const MeteorologyObservatoryEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="mo-cloud" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="2.5" fill="#9FA9EE" fillOpacity="0.8" />
      </pattern>
      <pattern id="mo-rain" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#A9C8EC" strokeWidth="2" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <g transform="translate(220, 110)">
      <circle cx="0" cy="0" r="45" fill="#E7B94A" fillOpacity="0.4" stroke="#16130F" strokeWidth="2" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
        <line key={deg} x1={55 * Math.cos(deg * Math.PI / 180)} y1={55 * Math.sin(deg * Math.PI / 180)} x2={85 * Math.cos(deg * Math.PI / 180)} y2={85 * Math.sin(deg * Math.PI / 180)} stroke="#16130F" strokeWidth="1.8" />
      ))}
    </g>
    <g fill="url(#mo-cloud)">
      <path d="M180,180 C240,80 390,60 480,120 C540,50 690,40 760,110 C830,60 960,70 1020,150 L1200,160 L1200,320 L180,320 Z" />
    </g>
    <path d="M180,180 C240,80 390,60 480,120 C540,50 690,40 760,110 C830,60 960,70 1020,150 L1200,160" fill="none" stroke="#16130F" strokeWidth="2.5" />
    <rect x="420" y="160" width="780" height="180" fill="url(#mo-rain)" opacity="0.6" />
    <path d="M0,320 Q300,240 600,285 T1200,260 L1200,480 L0,480 Z" fill="#3E5B34" fillOpacity="0.3" stroke="#16130F" strokeWidth="2" />
    <g transform="translate(240, 230)">
      <line x1="0" y1="180" x2="0" y2="0" stroke="#16130F" strokeWidth="4" />
      <line x1="-30" y1="40" x2="30" y2="40" stroke="#16130F" strokeWidth="2.5" />
      <line x1="0" y1="20" x2="0" y2="60" stroke="#16130F" strokeWidth="2.5" />
      <text x="-40" y="44" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold">W</text>
      <text x="36" y="44" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold">E</text>
      <text x="-4" y="14" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold">N</text>
      <text x="-4" y="74" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold">S</text>
      <g transform="translate(0, -10)">
        <polygon points="-35,0 35,0 20,-10 35,0 20,10" fill="none" stroke="#16130F" strokeWidth="2.5" />
        <path d="M-15,-5 C-20,-25 0,-35 10,-20 C18,-35 28,-15 15,0 Z" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
        <circle cx="8" cy="-22" r="2" fill="#D98B6F" />
      </g>
    </g>
    <g transform="translate(940, 240)">
      <line x1="0" y1="180" x2="0" y2="0" stroke="#16130F" strokeWidth="4" />
      <circle cx="0" cy="0" r="6" fill="#16130F" />
      <line x1="-30" y1="0" x2="30" y2="0" stroke="#16130F" strokeWidth="2" />
      <circle cx="-30" cy="0" r="10" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <circle cx="30" cy="0" r="10" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <rect x="40" y="60" width="28" height="65" rx="3" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <rect x="42" y="90" width="24" height="33" fill="#A9C8EC" stroke="#16130F" strokeWidth="1" />
      {[70, 80, 90, 100, 110].map((y, idx) => (
        <line key={idx} x1="40" y1={y} x2="48" y2={y} stroke="#16130F" strokeWidth="1" />
      ))}
      <text x="54" y="138" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="bold">GAUGE</text>
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 5.3 · HYPERLOCAL AGRICULTURAL METEOROLOGY OBSERVATORY
    </text>
  </svg>
);

// 6. Krishi Vigyan Kendra Extension Hub (Contact & Agronomist Helpdesk Page)
export const KrishiAgronomyDeskEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ka-leaves" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="2.5" fill="#3E5B34" fillOpacity="0.5" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <rect x="0" y="270" width="1200" height="210" fill="#FAF4E2" />
    <line x1="0" y1="270" x2="1200" y2="270" stroke="#16130F" strokeWidth="2" />
    <g transform="translate(180, 270)">
      <path d="M0,0 C-20,-80 -40,-160 -10,-220 C20,-160 10,-80 0,0" fill="#D98B6F" stroke="#16130F" strokeWidth="2.5" />
      <circle cx="-10" cy="-220" r="90" fill="url(#ka-leaves)" stroke="#16130F" strokeWidth="2" />
      <circle cx="-70" cy="-190" r="60" fill="url(#ka-leaves)" stroke="#16130F" strokeWidth="1.5" />
      <circle cx="50" cy="-180" r="70" fill="url(#ka-leaves)" stroke="#16130F" strokeWidth="1.5" />
    </g>
    <g transform="translate(360, 130)">
      <polygon points="40,20 200,-30 360,20" fill="#D98B6F" stroke="#16130F" strokeWidth="2" />
      <rect x="60" y="20" width="280" height="120" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <rect x="80" y="50" width="45" height="55" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
      <rect x="275" y="50" width="45" height="55" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
      <rect x="175" y="40" width="50" height="100" fill="#16130F" />
      <rect x="180" y="45" width="40" height="95" fill="#FAF4E2" stroke="#16130F" strokeWidth="1" />
      <rect x="110" y="8" width="180" height="22" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
      <text x="200" y="23" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="10" fontWeight="bold">KRISHI VIGYAN KENDRA</text>
    </g>
    <g transform="translate(740, 230)">
      <rect x="0" y="0" width="160" height="40" rx="3" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <line x1="20" y1="40" x2="20" y2="70" stroke="#16130F" strokeWidth="3" />
      <line x1="140" y1="40" x2="140" y2="70" stroke="#16130F" strokeWidth="3" />
      <line x1="40" y1="-25" x2="40" y2="0" stroke="#16130F" strokeWidth="3" />
      <line x1="30" y1="-25" x2="50" y2="-25" stroke="#16130F" strokeWidth="3" />
      <rect x="70" y="-18" width="16" height="18" fill="#D98B6F" stroke="#16130F" strokeWidth="1.5" />
      <rect x="95" y="-22" width="16" height="22" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
      <rect x="120" y="-12" width="25" height="12" fill="#FAF4E2" stroke="#16130F" strokeWidth="1.5" />
      <text x="132" y="-3" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6">LOG</text>
    </g>
    <g transform="translate(940, 260)">
      <rect x="0" y="0" width="180" height="60" fill="#FAF4E2" stroke="#16130F" strokeWidth="2" />
      <path d="M40,20 C80,50 120,70 160,110" fill="none" stroke="#A9C8EC" strokeWidth="20" />
      <line x1="60" y1="-10" x2="60" y2="40" stroke="#16130F" strokeWidth="3" />
      <circle cx="60" cy="-10" r="8" fill="#D98B6F" stroke="#16130F" strokeWidth="2" />
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 6.1 · KRISHI VIGYAN KENDRA ADVISORY HUB & TELEMETRY DESK
    </text>
  </svg>
);

// 7. Heritage Harvest Granary & Farmer Stewardship Seal (Auth & Profile Page)
export const HarvestGranaryEngraving = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 1200 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hg-sheaf" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="10" y2="10" stroke="#E7B94A" strokeWidth="2" strokeOpacity="0.5" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="#FBF6E6" />
    <rect x="0" y="270" width="1200" height="210" fill="#FAF4E2" />
    <line x1="0" y1="270" x2="1200" y2="270" stroke="#16130F" strokeWidth="2" />
    <g transform="translate(180, 110)">
      <polygon points="60,20 220,-40 380,20" fill="#D98B6F" stroke="#16130F" strokeWidth="2.5" />
      <rect x="80" y="20" width="280" height="140" fill="#FAF4E2" stroke="#16130F" strokeWidth="2.5" />
      {[40, 60, 80, 100, 120, 140].map((y, i) => (
        <line key={i} x1="80" y1={y} x2="360" y2={y} stroke="#16130F" strokeWidth="1" strokeOpacity="0.4" />
      ))}
      <rect x="180" y="60" width="80" height="100" fill="#16130F" />
      <circle cx="220" cy="30" r="14" fill="#A9C8EC" stroke="#16130F" strokeWidth="1.5" />
    </g>
    <g transform="translate(540, 220)" stroke="#16130F" strokeWidth="1.5" fill="#E7B94A" fillOpacity="0.4">
      <ellipse cx="40" cy="40" rx="30" ry="25" />
      <ellipse cx="80" cy="40" rx="30" ry="25" />
      <ellipse cx="60" cy="15" rx="25" ry="20" />
      <line x1="20" y1="25" x2="60" y2="25" stroke="#16130F" strokeWidth="2" />
      <line x1="60" y1="45" x2="100" y2="45" stroke="#16130F" strokeWidth="2" />
    </g>
    <g transform="translate(900, 220)">
      <circle cx="0" cy="0" r="70" fill="#FAF4E2" stroke="#16130F" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="62" fill="none" stroke="#16130F" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M-40,10 C-30,-30 0,-45 0,-45 C0,-45 30,-30 40,10 C20,30 -20,30 -40,10 Z" fill="#3E5B34" fillOpacity="0.2" stroke="#16130F" strokeWidth="1.5" />
      <line x1="0" y1="-45" x2="0" y2="25" stroke="#16130F" strokeWidth="2" />
      <text x="0" y="45" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="12" fontWeight="bold">STEWARDSHIP</text>
    </g>
    <rect x="10" y="10" width="1180" height="460" fill="none" stroke="#16130F" strokeWidth="2" />
    <rect x="330" y="8" width="540" height="28" fill="#FBF6E6" stroke="#16130F" strokeWidth="1.5" />
    <text x="600" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#16130F">
      PLATE 7.4 · FARMER STEWARDSHIP, HARVEST LOGS & OPERATOR IDENTITY
    </text>
  </svg>
);

// Reusable Editorial Page Artwork Header Banner with Expand/Compact Toggle
export const PageArtworkHeader = ({
  title,
  plateNo,
  subtitle,
  children,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className="w-full bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl overflow-hidden shadow-sm relative transition-all duration-300">
      <div className="px-5 py-3 border-b-2 border-[#16130F]/15 flex flex-wrap justify-between items-center gap-2 bg-[#FBF6E6]/90 backdrop-blur z-10 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3E5B34]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#3E5B34] font-bold">
            {plateNo}
          </span>
          <span className="text-xs text-[#16130F]/60 hidden sm:inline">&bull; {subtitle}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold border border-[#16130F] bg-white hover:bg-[#16130F] hover:text-[#FBF6E6] transition-colors"
        >
          {isExpanded ? "▲ Compact Backdrop" : "▼ Expand Full Engraving"}
        </button>
      </div>

      <div className={`relative transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-[520px]" : "max-h-[140px] sm:max-h-[180px]"}`}>
        {children}
        {!isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4E2] via-[#FAF4E2]/40 to-transparent pointer-events-none" />
        )}
        {!isExpanded && (
          <div className="absolute bottom-3 left-5 bg-[#FAF4E2]/90 backdrop-blur border border-[#16130F]/30 px-3 py-1 rounded-full font-mono text-[10px] font-bold text-[#16130F]">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};

