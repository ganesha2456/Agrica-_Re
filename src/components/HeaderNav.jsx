import React from "react";
import { getTranslation } from "../utils/i18n";
import {
  IconWheat,
  IconFarmerAvatar,
  IconFarmstead,
  IconPumpImpeller,
  IconSurveyGrid,
  IconRainCloud,
  IconPhoneDesk,
  IconAutoMode,
} from "./AlmanacIcons";

export const HeaderNav = ({
  activeTab,
  setActiveTab,
  demoMode,
  setDemoMode,
  unreadAlertsCount,
  openAlertsDrawer,
  language,
  setLanguage,
  currentUser,
  onOpenAuth,
  onOpenNewField,
}) => {
  const t = (key) => getTranslation(language, key);

  return (
    <>
      {/* Top Announcement Bar (from home.html & workspace2.html) */}
      <div className="bg-[#FAF4E2] border-b border-[#16130F]/15 px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#16130F]/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E5B34] animate-pulse" />
            <span>Agrica System &bull; Precision Agriculture & Automated Irrigation</span>
          </div>

          {/* User Session Profile Slot */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 hover:text-[#16130F] transition-colors"
            >
              <IconFarmerAvatar className="w-4 h-4 text-[#3E5B34]" gender={currentUser?.gender || "male"} />
              <span className="font-bold underline underline-offset-2">
                {currentUser ? currentUser.name : "Farmer Sign In"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FBF6E6]/95 backdrop-blur-md border-b border-[#16130F]/15 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 text-left group"
          >
            <span className="w-8 h-8 rounded-full border border-[#16130F] flex items-center justify-center bg-[#A8BE86]/40 text-[#16130F] font-bold group-hover:bg-[#A8BE86] transition-colors">
              <IconWheat className="w-5 h-5 text-[#3E5B34]" />
            </span>
            <div>
              <div className="font-serif text-xl font-bold tracking-tight text-[#16130F] leading-none">
                {t("appName")}
              </div>
              <div className="font-mono text-[8px] tracking-widest text-[#16130F]/60 uppercase">
                {t("appSub")}
              </div>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-5 font-mono text-xs uppercase tracking-wider">
            {[
              { id: "home", label: "Home" },
              { id: "controller", label: "Controller" },
              { id: "dashboard", label: "Live Cockpit" },
              { id: "weather", label: "Weather" },
              { id: "devices", label: "Nodes" },
              { id: "insights", label: "Insights" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#16130F] text-[#16130F] font-bold"
                    : "border-transparent text-[#16130F]/65 hover:text-[#16130F]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Mode, Language, Alerts, Quick CTA */}
          <div className="flex items-center gap-2">
            {/* Demo / Live Toggle */}
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="px-2.5 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider border bg-[#FAF4E2] text-[#D98B6F] border-[#D98B6F] flex items-center gap-1.5"
              title="Toggle between Simulated Demo Data and Live Firebase Hardware"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D98B6F] animate-pulse" />
              <span className="hidden sm:inline">{demoMode ? t("demoMode") : t("liveMode")}</span>
              <span className="sm:hidden">{demoMode ? "DEMO" : "LIVE"}</span>
            </button>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#FAF4E2] border border-[#16130F]/30 font-mono text-[10px] text-[#16130F] rounded-md px-1.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="or">ଓଡ଼ିଆ</option>
            </select>

            {/* Alerts Bell */}
            <button
              onClick={openAlertsDrawer}
              className="relative p-2 rounded-full border border-[#16130F]/20 hover:bg-[#16130F]/5 text-[#16130F]"
              aria-label="Alerts"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E7B94A] border border-[#16130F] text-[#16130F] font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Launch Controller Primary Pill (Desktop) */}
            <button
              onClick={() => setActiveTab("controller")}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-[11px] tracking-wider uppercase hover:bg-[#3E5B34] transition-colors shadow-sm"
            >
              Controller
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6E6] border-t border-[#16130F]/20 px-2 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: "home", label: "Home", icon: <IconFarmstead className="w-5 h-5 mb-0.5" /> },
          { id: "controller", label: "Pump", icon: <IconPumpImpeller className="w-5 h-5 mb-0.5" /> },
          { id: "dashboard", label: "Cockpit", icon: <IconSurveyGrid className="w-5 h-5 mb-0.5" /> },
          { id: "weather", label: "Weather", icon: <IconRainCloud className="w-5 h-5 mb-0.5" /> },
          { id: "contact", label: "Help", icon: <IconPhoneDesk className="w-5 h-5 mb-0.5" /> },
          { id: "settings", label: "Config", icon: <IconAutoMode className="w-5 h-5 mb-0.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
              activeTab === tab.id ? "text-[#3E5B34] font-bold" : "text-[#16130F]/50"
            }`}
          >
            {tab.icon}
            <span className="font-mono text-[8px] uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
