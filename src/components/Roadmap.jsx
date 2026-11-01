import React from "react";
import { content } from "../data/content";

export const Roadmap = () => {
  return (
    <section id="roadmap" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-semibold mb-2">
            {content.roadmap.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#16130F] tracking-tight">
            {content.roadmap.headlineLead}{" "}
            <span className="italic text-[#D98B6F]">{content.roadmap.headlineEmphasis}</span>
          </h2>
          <p className="font-mono text-xs tracking-wider uppercase text-[#16130F]/60 mt-3">
            {content.roadmap.subheading}
          </p>
        </div>

        {/* Horizontal Crop Calendar Stages (Sowing → Growing → Harvest) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.roadmap.stages.map((stage, sIdx) => {
            const isFirst = sIdx === 0;
            const isSecond = sIdx === 1;

            return (
              <div
                key={stage.phase}
                className="bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden"
              >
                {/* Seed Packet Header Envelope */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#16130F]/20 pb-3 mb-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#FBF6E6] border border-[#16130F]/30 font-bold text-[#16130F]">
                      {stage.tag}
                    </span>
                    <span className="font-mono text-[10px] text-[#3E5B34] font-bold">
                      {stage.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-[#E7B94A] border border-[#16130F]" />
                    <h3 className="font-serif text-2xl font-bold text-[#16130F]">
                      {stage.phase} PHASE
                    </h3>
                  </div>

                  {/* Seed Packet Milestones */}
                  <div className="space-y-4">
                    {stage.milestones.map((m, mIdx) => (
                      <div
                        key={m.title}
                        className="p-3.5 bg-[#FBF6E6] rounded-xl border border-[#16130F]/15 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] font-bold bg-[#A8BE86]/40 px-1.5 py-0.5 rounded text-[#3E5B34]">
                            STAGE {sIdx + 1}.{mIdx + 1}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#16130F]">
                            {m.title}
                          </h4>
                        </div>
                        <p className="font-sans text-xs text-[#16130F]/75 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Seasonal Note */}
                <div className="pt-6 mt-6 border-t border-[#16130F]/15 flex items-center justify-between font-mono text-[9px] text-[#16130F]/60 uppercase">
                  <span>AGRONOMIC MATURITY</span>
                  <span>{isFirst ? "PROTOTYPED" : isSecond ? "IN FIELD TRIAL" : "PLANNED R&D"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
