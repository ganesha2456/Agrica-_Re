import React from "react";
import { content } from "../data/content";
import { HalftoneFarmerHands } from "./HalftoneSVGs";

export const ClosingBand = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#FAF4E2] border-b border-[#16130F]/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FBF6E6] border-2 border-[#16130F] rounded-3xl p-8 sm:p-12 md:p-16 shadow-lg flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Halftone Illustration of Farmer's Hands Cupping Water / Soil on the Left */}
          <div className="flex-shrink-0 flex items-center justify-center p-3 bg-[#FAF4E2] rounded-2xl border border-[#16130F]/20 shadow-inner">
            <HalftoneFarmerHands className="w-56 h-48 sm:w-64 sm:h-56" />
          </div>

          {/* Right Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#16130F]/20 bg-[#FAF4E2]">
              <span className="w-2 h-2 rounded-full bg-[#3E5B34]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#16130F]/70 font-semibold">
                {content.closing.badge}
              </span>
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#16130F] leading-tight">
              {content.closing.headline}
            </blockquote>

            <p className="font-sans text-sm sm:text-base text-[#16130F]/75">
              {content.closing.subtext}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#ledger"
                className="px-6 py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase tracking-wider hover:bg-[#3E5B34] transition-colors shadow-sm"
              >
                {content.closing.ctaPrimary}
              </a>
              <a
                href={content.meta.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-transparent border border-[#16130F] text-[#16130F] font-mono text-xs uppercase tracking-wider hover:bg-[#16130F]/5 transition-colors"
              >
                {content.closing.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
