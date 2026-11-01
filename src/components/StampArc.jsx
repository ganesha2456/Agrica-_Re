import React, { useState } from "react";
import { content } from "../data/content";
import { StampArtwork } from "./HalftoneSVGs";

export const StampArc = () => {
  const [activeStamp, setActiveStamp] = useState(content.stamps.items[0]);

  // Rotations for the realistic botanical postage stamp row
  const rotations = [-3, 2, -2, 3, -1.5, 2.5, -2, 1.5];

  return (
    <section id="stamps" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-semibold mb-2">
            {content.stamps.subheading}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#16130F] tracking-tight">
            {content.stamps.headingLead}{" "}
            <span className="italic text-[#D98B6F]">{content.stamps.headingEmphasis}</span>
          </h2>
        </div>

        {/* Perforated Postage Stamp Row / Arc */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-5 pb-8">
          {content.stamps.items.map((item, index) => {
            const rot = rotations[index % rotations.length];
            const isSelected = activeStamp?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveStamp(item)}
                style={{ transform: isSelected ? "rotate(0deg) translateY(-8px)" : `rotate(${rot}deg)` }}
                className={`group relative cursor-pointer transition-all duration-300 w-36 sm:w-40 md:w-44 bg-[#FBF6E6] p-2.5 rounded-sm shadow-md hover:shadow-xl hover:rotate-0 hover:-translate-y-2 border-2 ${
                  isSelected ? "border-[#D98B6F] ring-2 ring-[#D98B6F]/40" : "border-[#16130F]/40"
                }`}
              >
                {/* Perforated Stamp Teeth Simulation (top & bottom dots) */}
                <div className="absolute -top-1.5 left-0 right-0 flex justify-around px-1 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[#FBF6E6] border border-[#16130F]/20" />
                  ))}
                </div>

                {/* Inner Framing Stamp Line */}
                <div className="border border-[#16130F]/30 p-2 flex flex-col items-center bg-[#FAF4E2]">
                  {/* Denomination & Stamp Serial */}
                  <div className="w-full flex justify-between items-center font-mono text-[8px] uppercase tracking-wider text-[#16130F]/70 mb-1">
                    <span>№ 0{index + 1}</span>
                    <span className="font-bold text-[#3E5B34]">AGRICA</span>
                  </div>

                  {/* Halftone SVG Stamp Art */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 my-1 flex items-center justify-center">
                    <StampArtwork id={item.id} />
                  </div>

                  {/* Stamp Title in Mono */}
                  <div className="font-mono text-[10px] uppercase font-bold text-center text-[#16130F] mt-1 leading-tight tracking-tight">
                    {item.title}
                  </div>
                  <div className="font-mono text-[8px] tracking-wider text-[#D98B6F] text-center uppercase">
                    {item.tag}
                  </div>
                </div>

                {/* Perforated Stamp Teeth Simulation (bottom) */}
                <div className="absolute -bottom-1.5 left-0 right-0 flex justify-around px-1 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[#FBF6E6] border border-[#16130F]/20" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stamp Inspection Card */}
        {activeStamp && (
          <div className="mt-8 max-w-2xl mx-auto bg-[#FBF6E6] border border-[#16130F] p-6 rounded-2xl shadow-sm animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#16130F]/15 pb-3 mb-3">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#3E5B34] font-semibold">
                  METHOD CONTROL PROFILE · {activeStamp.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#16130F]">
                  {activeStamp.title}
                </h3>
              </div>
              <span className="font-mono text-[10px] bg-[#D98B6F]/20 text-[#16130F] px-2.5 py-1 rounded-full border border-[#D98B6F]/40">
                {activeStamp.specs}
              </span>
            </div>
            <p className="font-sans text-sm text-[#16130F]/85 leading-relaxed">
              <span className="font-semibold text-[#16130F]">AGRICA Control Logic:</span> {activeStamp.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
