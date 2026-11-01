import React from "react";
import { content } from "../data/content";
import { HalftoneLandscape } from "./HalftoneSVGs";

export const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-[#16130F]/15">
      {/* Background Ruled Lines / Almanac Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(22, 19, 15, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22, 19, 15, 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Almanac Metadata Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#16130F]/20 pb-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D98B6F] animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/70">
              {content.meta.edition}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/60">
            {content.meta.coordinates}
          </span>
        </div>

        {/* Full-Bleed Halftone Landscape Layer with Animated Cloud Drift */}
        <div className="relative rounded-2xl border border-[#16130F]/20 overflow-hidden bg-[#FBF6E6] shadow-sm mb-10">
          <div className="absolute top-3 left-3 z-10 font-mono text-[9px] uppercase tracking-wider bg-[#FBF6E6]/90 px-2 py-0.5 rounded border border-[#16130F]/20">
            FIG. 00 · TERRACED HYDROLOGIC PANORAMA
          </div>
          
          {/* Animated Cloud Drift Container */}
          <div className="relative w-full overflow-hidden">
            <HalftoneLandscape className="w-full h-48 sm:h-64 md:h-80 object-cover" />
          </div>
        </div>

        {/* Carved-Frame Panel / Farm Gateway & Pump-House Arch */}
        <div className="relative max-w-4xl mx-auto bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-6 sm:p-10 md:p-14 shadow-md text-center">
          {/* Decorative Arch Cornice / Ears */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FBF6E6] border border-[#16130F] rounded-full">
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#3E5B34] font-semibold">
              {content.hero.badge}
            </span>
          </div>

          {/* Drip Line with Falling Water Drop Animation */}
          <div className="relative my-3 flex justify-center items-center">
            <div className="relative w-48 h-12 flex justify-center">
              {/* Horizontal Drip Pipe */}
              <div className="absolute top-2 w-full h-[3px] bg-[#16130F] rounded-full" />
              {/* Micro Emitter */}
              <div className="absolute top-[3px] w-4 h-3 bg-[#D98B6F] border border-[#16130F] rounded-sm" />
              {/* Animated Falling Droplet */}
              <div className="absolute top-5 w-2.5 h-3.5 bg-[#A9C8EC] border border-[#16130F] rounded-full rounded-t-none animate-bounce" />
            </div>
          </div>

          {/* Headline: Editorial Serif with Key Words in Italic */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#16130F] tracking-tight leading-[1.08] mb-4">
            {content.hero.headlineLead}{" "}
            <span className="italic font-normal text-[#3E5B34] underline decoration-[#A8BE86]/60 decoration-wavy decoration-1 underline-offset-8">
              {content.hero.headlineEmphasis}
            </span>
          </h1>

          {/* Sub-line in Mono All-Caps */}
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#D98B6F] font-bold mb-6">
            {content.hero.subline}
          </p>

          {/* Body Description */}
          <p className="font-sans text-base sm:text-lg text-[#16130F]/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {content.hero.description}
          </p>

          {/* Action Pills: Black Primary, Outlined Secondary */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#ledger"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs tracking-wider uppercase hover:bg-[#3E5B34] transition-all duration-200 shadow-sm group"
            >
              <span>{content.hero.ctaPrimary}</span>
              <svg className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={content.meta.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border border-[#16130F] text-[#16130F] font-mono text-xs tracking-wider uppercase hover:bg-[#16130F]/5 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>{content.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Field Stats Triplet at Bottom of Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#16130F]/15 mt-10 pt-6">
            {content.hero.fieldStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left border-l-0 sm:border-l first:border-l-0 border-[#16130F]/15 sm:pl-4">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#16130F]">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/60">
                  {stat.label} · {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
