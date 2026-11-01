import React, { useState } from "react";
import { DEFAULT_USERS } from "../data/seedData";
import { getTranslation } from "../utils/i18n";

export const AuthModal = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  const [authTab, setAuthTab] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("ramesh@agrica.org");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const existing = DEFAULT_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const userObj = existing || {
      name: email.split("@")[0],
      email,
      role: "Farmer / Operator",
      location: "Farm Holding",
      avatar: "👨‍🌾",
    };

    onLogin(userObj, rememberMe);
    onClose();
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name || "Farmer",
      email,
      role: "Farmer",
      location: "Registered Holding",
      avatar: "🌾",
    };
    onLogin(newUser, rememberMe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#16130F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fadeIn">
        {currentUser ? (
          /* Profile / Sign Out State */
          <div className="space-y-5 text-center font-mono">
            <div className="w-16 h-16 rounded-full bg-[#FAF4E2] border-2 border-[#16130F] flex items-center justify-center text-3xl mx-auto shadow-inner">
              {currentUser.avatar || "👨‍🌾"}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#16130F]">
                {currentUser.name}
              </h2>
              <div className="text-xs text-[#3E5B34] font-bold">{currentUser.role}</div>
              <div className="text-[11px] text-[#16130F]/60">{currentUser.email}</div>
              <div className="text-[10px] text-[#16130F]/50 mt-1">{currentUser.location}</div>
            </div>

            <div className="pt-3 border-t border-[#16130F]/15 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#16130F] text-xs uppercase"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-5 py-2 rounded-full bg-[#D98B6F] text-[#FBF6E6] border border-[#16130F] text-xs uppercase font-bold hover:bg-[#c5795e]"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            {/* Header with Close */}
            <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#A8BE86]/40 border border-[#16130F] flex items-center justify-center text-sm">
                  A
                </span>
                <span className="font-serif text-xl font-bold text-[#16130F]">
                  Agrica Access
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full border border-[#16130F] flex items-center justify-center font-mono text-xs hover:bg-[#16130F] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Auth Tabs */}
            <div className="flex gap-2 p-1 bg-[#FAF4E2] rounded-full border border-[#16130F]/20 font-mono text-xs uppercase font-bold mb-5">
              <button
                onClick={() => setAuthTab("login")}
                className={`flex-1 py-1.5 rounded-full transition-colors ${
                  authTab === "login" ? "bg-[#0E0C0B] text-[#FBF6E6]" : "text-[#16130F]/60"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthTab("signup")}
                className={`flex-1 py-1.5 rounded-full transition-colors ${
                  authTab === "signup" ? "bg-[#0E0C0B] text-[#FBF6E6]" : "text-[#16130F]/60"
                }`}
              >
                Register
              </button>
            </div>

            {authTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Farmer Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-[#16130F]/70">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#3E5B34]"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-[#3E5B34]">Demo Pass: password123</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold hover:bg-[#3E5B34] transition-colors"
                >
                  Sign In to Dashboard →
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Farmer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="farmer@agrica.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold hover:bg-[#3E5B34] transition-colors"
                >
                  Create Farmer Account →
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
