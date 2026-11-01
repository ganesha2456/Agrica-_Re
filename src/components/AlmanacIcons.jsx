import React from "react";

/**
 * AGRICA Editorial Almanac & Print Vignette Icon Library
 * Replaces system emojis with authentic hand-drawn vector illustrations
 * in Ink (#16130F), Paddy (#A8BE86), Deep Leaf (#3E5B34), Clay (#D98B6F),
 * and Water Blue (#A9C8EC) on Paper Cream (#FBF6E6).
 */

// 1. Botanical Wheat Ear
export const IconWheat = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V2" />
    <path d="M12 4C10.5 4 9 5.5 9 7C10.5 7 12 5.5 12 4Z" fill={color} fillOpacity="0.35" />
    <path d="M12 4C13.5 4 15 5.5 15 7C13.5 7 12 5.5 12 4Z" fill={color} fillOpacity="0.35" />
    <path d="M12 8C10 8 8 9.5 8 11.5C10 11.5 12 9.5 12 8Z" fill={color} fillOpacity="0.35" />
    <path d="M12 8C14 8 16 9.5 16 11.5C14 11.5 12 9.5 12 8Z" fill={color} fillOpacity="0.35" />
    <path d="M12 13C9.5 13 7.5 14.5 7.5 17C10 17 12 14.5 12 13Z" fill={color} fillOpacity="0.35" />
    <path d="M12 13C14.5 13 16.5 14.5 16.5 17C14 17 12 14.5 12 13Z" fill={color} fillOpacity="0.35" />
  </svg>
);

// 2. Botanical Paddy (Rice) Sheaf
export const IconPaddy = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21C6.5 16 8.5 11 15 5" />
    <path d="M15 5C17 6 18 8 17 11C15 13 13 12 12 10" fill={color} fillOpacity="0.4" />
    <path d="M12 10C10 12 9 14 10 16C12 16 13 14 13.5 12.5" fill={color} fillOpacity="0.4" />
    <path d="M10 16C8.5 17.5 8 19 9 20.5" />
    <path d="M15 5L17 3" />
    <path d="M17 11L19 10" />
    <path d="M10 16L9 18" />
  </svg>
);

// 3. Segmented Sugarcane Stalks
export const IconSugarcane = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="22" x2="8" y2="2" />
    <line x1="16" y1="22" x2="16" y2="2" />
    <line x1="6" y1="7" x2="10" y2="7" strokeWidth="2" stroke="#D98B6F" />
    <line x1="6" y1="13" x2="10" y2="13" strokeWidth="2" stroke="#D98B6F" />
    <line x1="6" y1="18" x2="10" y2="18" strokeWidth="2" stroke="#D98B6F" />
    <line x1="14" y1="6" x2="18" y2="6" strokeWidth="2" stroke="#D98B6F" />
    <line x1="14" y1="12" x2="18" y2="12" strokeWidth="2" stroke="#D98B6F" />
    <line x1="14" y1="17" x2="18" y2="17" strokeWidth="2" stroke="#D98B6F" />
    <path d="M8 7C5 5 3 6 2 9" stroke={color} strokeWidth="1.6" />
    <path d="M16 12C19 10 21 11 22 14" stroke={color} strokeWidth="1.6" />
  </svg>
);

// 4. Open Cotton Boll
export const IconCotton = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21V16" />
    <path d="M9 16C6 16 4.5 13.5 5.5 11C6.5 8.5 9 9 9.5 9.5C9.5 7 12 5.5 14 7C16 8.5 15.5 10.5 15 11C17.5 10.5 19.5 12 19 14.5C18.5 17 15.5 17 14 16" fill="#FBF6E6" />
    <path d="M8 17C10 15 12 15 14 17C12 18 10 18 8 17Z" fill="#D98B6F" />
  </svg>
);

// 5. Cabbage / Leafy Greens Rosette
export const IconVegetables = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" fill="#A8BE86" fillOpacity="0.4" />
    <path d="M12 5C7 5 5 9 5 13C5 17 8 20 12 20C16 20 19 17 19 13C19 9 17 5 12 5Z" />
    <path d="M12 5C10 9 10 16 12 20" stroke={color} />
    <path d="M7 10C10 11 14 11 17 10" stroke={color} />
    <path d="M6 14C10 15 14 15 18 14" stroke={color} />
    <path d="M12 2V5" />
  </svg>
);

// 6. Maize / Corn Cob with Husk
export const IconMaize = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21V19" />
    <ellipse cx="12" cy="11" rx="4" ry="8" fill="#E7B94A" fillOpacity="0.5" />
    <line x1="10" y1="6" x2="14" y2="6" stroke="#16130F" strokeWidth="1.2" />
    <line x1="9" y1="9" x2="15" y2="9" stroke="#16130F" strokeWidth="1.2" />
    <line x1="9" y1="12" x2="15" y2="12" stroke="#16130F" strokeWidth="1.2" />
    <line x1="10" y1="15" x2="14" y2="15" stroke="#16130F" strokeWidth="1.2" />
    <path d="M7 17C6 13 7 9 9 6" stroke="#3E5B34" strokeWidth="1.8" />
    <path d="M17 17C18 13 17 9 15 6" stroke="#3E5B34" strokeWidth="1.8" />
  </svg>
);

// 7. Hand-Drawn Water Drop with Hatch Shading
export const IconWaterDrop = ({ className = "w-5 h-5", color = "#A9C8EC" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5C12 2.5 5 10.5 5 15.5C5 19.1 8.1 22 12 22C15.9 22 19 19.1 19 15.5C19 10.5 12 2.5 12 2.5Z" fill={color} fillOpacity="0.55" />
    <path d="M10 12.5C9.5 13.5 9 15 9.5 16.5" stroke="#16130F" strokeWidth="1.3" />
  </svg>
);

// 8. Mechanical Pump Impeller / Actuator
export const IconPumpImpeller = ({ className = "w-5 h-5", color = "#3E5B34", isSpinning = false }) => (
  <svg viewBox="0 0 24 24" className={`${className} ${isSpinning ? "animate-spin" : ""}`} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.25" />
    <circle cx="12" cy="12" r="3" fill="#16130F" />
    <path d="M12 3V7" />
    <path d="M12 17V21" />
    <path d="M3 12H7" />
    <path d="M17 12H21" />
    <path d="M5.6 5.6L8.5 8.5" />
    <path d="M15.5 15.5L18.4 18.4" />
    <path d="M18.4 5.6L15.5 8.5" />
    <path d="M8.5 15.5L5.6 18.4" />
  </svg>
);

// 9. Electronic Soil Probe in Strata
export const IconSoilProbe = ({ className = "w-5 h-5", color = "#D98B6F" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="10" x2="21" y2="10" strokeDasharray="2 2" stroke="#16130F" strokeOpacity="0.6" />
    <rect x="8" y="2" width="8" height="6" rx="2" fill="#FAF4E2" />
    <circle cx="12" cy="5" r="1.5" fill="#3E5B34" />
    <line x1="10" y1="8" x2="10" y2="22" strokeWidth="2" />
    <line x1="14" y1="8" x2="14" y2="22" strokeWidth="2" />
    <line x1="10" y1="13" x2="14" y2="13" stroke={color} strokeWidth="2" />
    <line x1="10" y1="17" x2="14" y2="17" stroke={color} strokeWidth="2" />
  </svg>
);

// 10. Precipitation Cloud with Angled Drops
export const IconRainCloud = ({ className = "w-5 h-5", color = "#9FA9EE" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 14C4.3 14 3 12.7 3 11C3 9.5 4.1 8.2 5.5 8.1C6 5.8 8.1 4 10.5 4C13.2 4 15.4 6 15.8 8.6C17.6 8.8 19 10.2 19 12C19 13.1 18.1 14 17 14" fill={color} fillOpacity="0.45" />
    <line x1="8" y1="17" x2="6.5" y2="21" stroke="#9FA9EE" strokeWidth="2" />
    <line x1="12" y1="17" x2="10.5" y2="21" stroke="#9FA9EE" strokeWidth="2" />
    <line x1="16" y1="17" x2="14.5" y2="21" stroke="#9FA9EE" strokeWidth="2" />
  </svg>
);

// 11. Botanical Circuit (Automatic Closed-Loop Mode)
export const IconAutoMode = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="14" height="14" rx="2" fill={color} fillOpacity="0.25" />
    <path d="M12 9V15" />
    <path d="M9 12H15" />
    <circle cx="12" cy="12" r="2" fill="#16130F" />
    <line x1="9" y1="2" x2="9" y2="5" />
    <line x1="15" y1="2" x2="15" y2="5" />
    <line x1="9" y1="19" x2="9" y2="22" />
    <line x1="15" y1="19" x2="15" y2="22" />
    <line x1="2" y1="9" x2="5" y2="9" />
    <line x1="2" y1="15" x2="5" y2="15" />
    <line x1="19" y1="9" x2="22" y2="9" />
    <line x1="19" y1="15" x2="22" y2="15" />
  </svg>
);

// 12. Mechanical Switch Toggle (Manual Override Mode)
export const IconManualMode = ({ className = "w-5 h-5", color = "#D98B6F" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="14" width="16" height="7" rx="3.5" fill="#FAF4E2" />
    <circle cx="8" cy="17.5" r="2.5" fill={color} />
    <path d="M8 15L15 4" strokeWidth="2.5" />
    <circle cx="15.5" cy="4" r="2.5" fill="#16130F" />
  </svg>
);

// 13. Traditional Alarm Bell
export const IconBell = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" fill="#FBF6E6" />
    <path d="M10.3 21C10.7 21.6 11.3 22 12 22C12.7 22 13.3 21.6 13.7 21" />
  </svg>
);

// 14. Woodcut Farmer Profile Portrait Medallion
export const IconFarmerAvatar = ({ className = "w-5 h-5", gender = "male" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="#FAF4E2" strokeWidth="1.8" />
    {gender === "male" ? (
      <path d="M4 8C7 5 17 5 20 8" fill="#D98B6F" fillOpacity="0.4" strokeWidth="1.6" />
    ) : (
      <path d="M5 8C8 4 16 4 19 8" fill="#A8BE86" fillOpacity="0.4" strokeWidth="1.6" />
    )}
    <circle cx="12" cy="11" r="3.2" fill="#FAF4E2" />
    <path d="M6.5 19.5C7.5 16.5 9.5 15.5 12 15.5C14.5 15.5 16.5 16.5 17.5 19.5" fill="#3E5B34" fillOpacity="0.3" />
  </svg>
);

// 15. Farmstead Home Silhouette
export const IconFarmstead = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V10L10 4L17 10V21H3Z" fill="#FAF4E2" />
    <rect x="7" y="14" width="4" height="7" fill="#16130F" />
    <rect x="13" y="12" width="3" height="3" fill="#A9C8EC" />
    <path d="M17 14L21 12V21H17V14Z" fill="#A8BE86" fillOpacity="0.4" />
  </svg>
);

// 16. Cadastral Survey Plot Grid
export const IconSurveyGrid = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#FAF4E2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="#3E5B34" />
    <circle cx="16.5" cy="7.5" r="1.5" fill="#D98B6F" />
    <circle cx="7.5" cy="16.5" r="1.5" fill="#A9C8EC" />
    <circle cx="16.5" cy="16.5" r="1.5" fill="#3E5B34" />
  </svg>
);

// 17. Meteorological Weather Vane / Sun
export const IconSun = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" fill="#E7B94A" fillOpacity="0.5" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
    <line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
    <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
    <line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
  </svg>
);

// 18. Advisory Telegraph / Dispatch Telephone
export const IconPhoneDesk = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92V19.92C22 20.48 21.54 20.94 20.98 20.92C10.05 20.44 3.56 13.95 3.08 3.02C3.06 2.46 3.52 2 4.08 2H7.08C7.6 2 8.03 2.39 8.08 2.91C8.17 3.82 8.39 4.7 8.74 5.53C8.89 5.88 8.81 6.29 8.52 6.57L6.85 8.24C8.42 11.33 10.97 13.88 14.06 15.45L15.73 13.78C16.01 13.49 16.42 13.41 16.77 13.56C17.6 13.91 18.48 14.13 19.39 14.22C19.91 14.27 20.3 14.7 20.3 15.22L22 16.92Z" fill="#3E5B34" fillOpacity="0.25" />
  </svg>
);

// 19. Editorial Print Plate Checkmark
export const IconCheckCircle = ({ className = "w-5 h-5", color = "#3E5B34" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" />
    <path d="M8 12L11 15L16 9" stroke="#3E5B34" strokeWidth="2.2" />
  </svg>
);

// 20. Editorial Print Warning Badge
export const IconWarningTriangle = ({ className = "w-5 h-5", color = "#D98B6F" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#16130F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" fill={color} fillOpacity="0.3" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" fill="#16130F" />
  </svg>
);
