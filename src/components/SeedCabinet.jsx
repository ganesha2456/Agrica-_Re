import React, { useState } from "react";
import { content } from "../data/content";

export const SeedCabinet = () => {
  const [openDrawerId, setOpenDrawerId] = useState("sensing");

  const toggleDrawer = (id) => {
    setOpenDrawerId(openDrawerId === id ? null : id);
  };

  return (
    <section id="architecture" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-semibold mb-2">
            {content.seedCabinet.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#16130F] tracking-tight">
            {content.seedCabinet.headlineLead}{" "}
            <span className="italic text-[#3E5B34]">{content.seedCabinet.headlineEmphasis}</span>
          </h2>
          <p className="font-mono text-xs tracking-wider uppercase text-[#16130F]/60 mt-3">
            {content.seedCabinet.subheading}
          </p>
        </div>

        {/* Big Paddy-Green Wooden Seed Cabinet Container */}
        <div className="max-w-5xl mx-auto bg-[#3E5B34] p-5 sm:p-8 rounded-3xl border-4 border-[#16130F] shadow-2xl">
          {/* Top Brass Nameplate on Cabinet Header */}
          <div className="flex items-center justify-between border-b-2 border-[#16130F]/40 pb-4 mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E7B94A] border border-[#16130F]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#FBF6E6] font-bold">
                AGRICA PRECISION SEED & TOOL REGISTRY
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#A8BE86] tracking-wider uppercase">
              SPEC: ARCH-ESP32-SYS
            </span>
          </div>

          {/* 6 Drawers Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.seedCabinet.drawers.map((drawer) => {
              const isOpen = openDrawerId === drawer.id;

              return (
                <div
                  key={drawer.id}
                  onClick={() => toggleDrawer(drawer.id)}
                  className={`relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border-2 ${
                    isOpen
                      ? "bg-[#D98B6F] border-[#16130F] shadow-xl translate-y-1"
                      : "bg-[#2E4627] border-[#16130F]/80 hover:bg-[#35522d] shadow-md"
                  }`}
                >
                  {/* Drawer Front Face Panel */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#16130F]/30 bg-[#25391f]">
                    {/* Cream Label Plate in Mono Caps */}
                    <div className="bg-[#FBF6E6] border border-[#16130F] px-3 py-1.5 rounded-sm shadow-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D98B6F]" />
                      <span className="font-mono text-xs font-bold tracking-widest text-[#16130F]">
                        {drawer.title}
                      </span>
                    </div>

                    {/* Black Round Drawer Knob */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0E0C0B] border-2 border-[#16130F] shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E7B94A]" />
                      </div>
                    </div>
                  </div>

                  {/* Drawer Interior / Slide-out Note Card */}
                  <div
                    className={`p-5 transition-all duration-300 ${
                      isOpen ? "bg-[#D98B6F] text-[#16130F]" : "bg-[#2E4627] text-[#FBF6E6]/85"
                    }`}
                  >
                    <div className="font-mono text-[9px] tracking-widest uppercase opacity-75 mb-1.5">
                      {drawer.num} · HARDWARE LAYER
                    </div>

                    <h4
                      className={`font-serif text-lg font-bold leading-snug mb-2 ${
                        isOpen ? "text-[#16130F]" : "text-[#FBF6E6]"
                      }`}
                    >
                      {drawer.summary}
                    </h4>

                    {isOpen && (
                      <div className="space-y-3 pt-2 border-t border-[#16130F]/20 text-xs leading-relaxed animate-fadeIn">
                        <p>{drawer.body}</p>
                        <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-[#16130F] bg-[#FBF6E6]/70 p-2 rounded border border-[#16130F]/20">
                          <span className="font-bold">COMPONENT:</span>
                          <span>{drawer.hardware}</span>
                        </div>
                      </div>
                    )}

                    {!isOpen && (
                      <div className="mt-2 text-[10px] font-mono tracking-wider text-[#A8BE86] flex items-center gap-1">
                        <span>PULL TO OPEN DRAWER</span>
                        <span>↓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
