import React from "react";
import { getTranslation } from "../utils/i18n";

export const AlertsDrawer = ({
  isOpen,
  onClose,
  alerts = [],
  onDismissAlert,
  onClearAll,
  language = "en",
}) => {
  const t = (key) => getTranslation(language, key);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#16130F]/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FBF6E6] h-full border-l-2 border-[#16130F] p-6 shadow-2xl flex flex-col justify-between animate-fadeIn">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#16130F]/15 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔔</span>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#16130F]">
                  {t("alerts")}
                </h2>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/60">
                  {alerts.length} Active System Notifications
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[#16130F] flex items-center justify-center font-mono text-sm hover:bg-[#16130F] hover:text-[#FBF6E6] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Alerts List */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {alerts.length === 0 ? (
              <div className="text-center py-16 font-mono text-xs text-[#16130F]/50 space-y-2">
                <span className="text-3xl block">🌿</span>
                <div>All fields nominal. No alerts active.</div>
              </div>
            ) : (
              alerts.map((alt) => {
                const isCritical = alt.severity === "critical";
                const isWarning = alt.severity === "warning";

                return (
                  <div
                    key={alt.id}
                    className={`p-4 rounded-xl border-2 transition-all space-y-2 relative ${
                      isCritical
                        ? "bg-[#D98B6F]/20 border-[#D98B6F]"
                        : isWarning
                        ? "bg-[#E7B94A]/20 border-[#E7B94A]"
                        : "bg-[#A9C8EC]/20 border-[#A9C8EC]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          isCritical
                            ? "bg-[#D98B6F] text-[#FBF6E6]"
                            : isWarning
                            ? "bg-[#E7B94A] text-[#16130F]"
                            : "bg-[#A9C8EC] text-[#16130F]"
                        }`}
                      >
                        {alt.type || "SYSTEM"}
                      </span>

                      <span className="font-mono text-[9px] text-[#16130F]/60">
                        {new Date(alt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <div className="font-serif font-bold text-sm text-[#16130F]">
                      {alt.title}
                    </div>

                    <p className="font-mono text-xs text-[#16130F]/80 leading-relaxed">
                      {alt.message}
                    </p>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => onDismissAlert(alt.id)}
                        className="font-mono text-[10px] text-[#16130F]/60 hover:text-[#16130F] uppercase tracking-wider underline"
                      >
                        Acknowledge & Dismiss
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        {alerts.length > 0 && (
          <div className="pt-4 border-t border-[#16130F]/15 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="font-mono text-xs text-[#D98B6F] uppercase tracking-wider hover:underline"
            >
              Clear All Alerts
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
