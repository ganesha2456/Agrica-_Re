import React, { useState } from "react";
import { content } from "../data/content";

export const FieldNotesRows = () => {
  const [expandedRow, setExpandedRow] = useState("advantages");

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getBgClass = (bg) => {
    switch (bg) {
      case "water":
        return "bg-[#A9C8EC]/35 hover:bg-[#A9C8EC]/50";
      case "paddy":
        return "bg-[#A8BE86]/35 hover:bg-[#A8BE86]/50";
      case "cream":
      default:
        return "bg-[#FAF4E2] hover:bg-[#F5ECD2]";
    }
  };

  return (
    <section id="notes" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-semibold mb-2">
            {content.fieldNotes.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#16130F] tracking-tight">
            {content.fieldNotes.headlineLead}{" "}
            <span className="italic text-[#3E5B34]">{content.fieldNotes.headlineEmphasis}</span>
          </h2>
          <p className="font-mono text-xs tracking-wider uppercase text-[#16130F]/60 mt-3">
            {content.fieldNotes.subheading}
          </p>
        </div>

        {/* Stacked Full-Width Expandable Color-Block Rows */}
        <div className="space-y-4">
          {content.fieldNotes.rows.map((row) => {
            const isExpanded = expandedRow === row.id;

            return (
              <div
                key={row.id}
                className="relative rounded-2xl border-2 border-[#16130F] overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Thin Black Tab on Top as requested */}
                <div className="h-2 bg-[#0E0C0B] w-full" />

                {/* Row Header Button */}
                <button
                  onClick={() => toggleRow(row.id)}
                  className={`w-full p-6 sm:p-7 text-left transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${getBgClass(
                    row.bg
                  )}`}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/70 font-bold">
                      {row.meta}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16130F]">
                      {row.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#16130F]/60">
                      {isExpanded ? "COLLAPSE [-]" : "INSPECT [+]"}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full border border-[#16130F] flex items-center justify-center font-mono text-xs bg-[#FBF6E6] transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </div>
                  </div>
                </button>

                {/* Expanded Drawer / Points List */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 bg-[#FBF6E6] border-t-2 border-[#16130F] animate-fadeIn">
                    <ul className="space-y-3.5">
                      {row.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full border border-[#16130F] bg-[#FAF4E2] flex items-center justify-center font-mono text-[10px] font-bold text-[#16130F] flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="font-sans text-sm sm:text-base text-[#16130F]/85 leading-relaxed">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
