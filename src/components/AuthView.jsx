import React, { useState } from "react";
import { DEFAULT_USERS } from "../data/seedData";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  HarvestGranaryEngraving
} from "./HalftoneSVGs";
import {
  IconFarmerAvatar
} from "./AlmanacIcons";

export const AuthView = ({
  currentUser,
  onLogin,
  onLogout,
  onNavigate,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("ramesh@agrica.org");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("");
  const [farmLocation, setFarmLocation] = useState("Odisha Agro-Zone");
  const [primaryCrop, setPrimaryCrop] = useState("paddy");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const existing = DEFAULT_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    const userObj = existing || {
      name: email.split("@")[0],
      email,
      role: "Agricultural Operator",
      location: farmLocation,
      avatar: "👨‍🌾",
    };

    onLogin(userObj, rememberMe);
    onNavigate("dashboard");
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: fullName.trim() || "Farmer Partner",
      email,
      role: "Lead Agriculturist",
      location: farmLocation,
      avatar: "🌾",
    };

    onLogin(newUser, rememberMe);
    onNavigate("dashboard");
  };

  const handleQuickDemoLogin = (user) => {
    onLogin(user, true);
    onNavigate("dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 pb-24 md:pb-14 animate-fadeIn space-y-6">
      {/* Plate 7.4 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 7.4"
        title="Farmer Stewardship, Granary & Harvest Logs"
        subtitle="Heritage agricultural granary, well pulley & operator seal"
        defaultExpanded={false}
      >
        <HarvestGranaryEngraving />
      </PageArtworkHeader>

      {currentUser ? (
        /* Signed-in Farmer Profile Canvas */
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-8 sm:p-12 shadow-md text-center space-y-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-auto pointer-events-none opacity-[0.06] select-none">
            <HarvestGranaryEngraving />
          </div>
          <div className="w-24 h-24 rounded-full bg-[#FBF6E6] border-4 border-[#16130F] flex items-center justify-center mx-auto shadow-inner relative z-10">
            <IconFarmerAvatar className="w-14 h-14" gender={currentUser.gender || "male"} />
          </div>

          <div className="space-y-1 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#3E5B34] font-bold">
              ACTIVE FARMER SESSION · AUTHORIZED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16130F]">
              {currentUser.name}
            </h1>
            <p className="font-mono text-sm text-[#16130F]/70">
              {currentUser.email}
            </p>
            <div className="font-mono text-xs text-[#D98B6F] font-bold mt-1">
              {currentUser.role} &bull; {currentUser.location}
            </div>
          </div>

          <div className="pt-4 border-t border-[#16130F]/15 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-6 py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#3E5B34] transition-colors"
            >
              Enter Live Cockpit →
            </button>
            <button
              onClick={onLogout}
              className="px-6 py-3 rounded-full border-2 border-[#16130F] bg-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#D98B6F] hover:text-white transition-colors"
            >
              Sign Out Session
            </button>
          </div>
        </div>
      ) : (
        /* Sign In & Sign Up Form Canvas */
        <div className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-10 shadow-lg space-y-7 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-auto pointer-events-none opacity-[0.06] select-none">
            <HarvestGranaryEngraving />
          </div>
          {/* Header */}
          <div className="text-center space-y-2 border-b border-[#16130F]/15 pb-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#16130F]/20 bg-[#FBF6E6]">
              <span className="w-2 h-2 rounded-full bg-[#3E5B34]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/70 font-semibold">
                SECURE TELEMETRY ACCESS PORTAL
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#16130F]">
              {authMode === "login" ? "Farmer Sign In" : "Register Farm Account"}
            </h1>
            <p className="font-sans text-sm text-[#16130F]/70 max-w-md mx-auto">
              Access your field dielectric probes, autonomous relay pumps, and weather advisories.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 p-1.5 bg-[#FBF6E6] rounded-full border-2 border-[#16130F]/30 font-mono text-xs uppercase font-bold">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2.5 rounded-full transition-all ${
                authMode === "login"
                  ? "bg-[#0E0C0B] text-[#FBF6E6] shadow-sm"
                  : "text-[#16130F]/60 hover:text-[#16130F]"
              }`}
            >
              Sign In to Farm
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className={`flex-1 py-2.5 rounded-full transition-all ${
                authMode === "signup"
                  ? "bg-[#0E0C0B] text-[#FBF6E6] shadow-sm"
                  : "text-[#16130F]/60 hover:text-[#16130F]"
              }`}
            >
              New Registration
            </button>
          </div>

          {/* Quick Demo One-Click Login Buttons */}
          <div className="p-4 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/15 space-y-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#3E5B34] font-bold block">
              QUICK TEST / PORTFOLIO DEMO ACCESS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEFAULT_USERS.map((usr) => (
                <button
                  key={usr.email}
                  type="button"
                  onClick={() => handleQuickDemoLogin(usr)}
                  className="p-2.5 bg-white border border-[#16130F]/20 rounded-xl hover:border-[#16130F] flex items-center gap-2.5 text-left transition-all group"
                >
                  <IconFarmerAvatar className="w-6 h-6 text-[#3E5B34] flex-shrink-0" gender={usr.gender || (usr.email.includes("anita") ? "female" : "male")} />
                  <div>
                    <div className="font-serif font-bold text-xs text-[#16130F] group-hover:text-[#3E5B34]">
                      {usr.name}
                    </div>
                    <div className="font-mono text-[9px] text-[#16130F]/60">
                      {usr.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actual Form */}
          {authMode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none focus:border-[#16130F]"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none focus:border-[#16130F]"
                />
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#16130F]/70">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#3E5B34]"
                  />
                  <span>Remember session for 30 days</span>
                </label>
                <span className="text-[#3E5B34]">Demo: password123</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold tracking-widest hover:bg-[#3E5B34] transition-colors shadow-md"
              >
                Sign In to Farm Cockpit →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                  Farmer / Enterprise Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  placeholder="farmer@agrica.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                    District / Farm Holding:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Odisha Agro-Zone 4"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                    Primary Crop:
                  </label>
                  <select
                    value={primaryCrop}
                    onChange={(e) => setPrimaryCrop(e.target.value)}
                    className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-xs cursor-pointer focus:outline-none"
                  >
                    <option value="paddy">Paddy (Rice)</option>
                    <option value="wheat">Wheat</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="vegetables">Vegetables</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase font-bold text-[#16130F] block mb-1">
                  Create Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-[#16130F]/30 rounded-xl p-3 font-mono text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold tracking-widest hover:bg-[#3E5B34] transition-colors shadow-md"
              >
                Register & Initialize Cockpit →
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
