import React from "react";
import { content } from "../data/content";

export const IntroStatement = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Almanac Monospace Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#16130F]/20 bg-[#FBF6E6] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3E5B34]" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/70">
            {content.intro.figureTag}
          </span>
        </div>

        {/* Big Calm Editorial Serif Headline Paragraph */}
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-normal text-[#16130F] leading-[1.35] tracking-tight mb-8">
          “Fixed schedules and guesswork lead to over-watering, under-watering and wasted electricity.{" "}
          <span className="italic text-[#3E5B34] font-medium">AGRICA</span> reads the soil, the weather and the crop, and runs the pump{" "}
          <span className="italic text-[#D98B6F] font-medium">only when the field actually needs water</span>.”
        </blockquote>

        {/* Vintage Ruled Line with Center Wheat Embellishment */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-24 sm:w-36 h-[1px] bg-[#16130F]/20" />
          <span className="text-[#3E5B34] font-serif text-lg">❦</span>
          <div className="w-24 sm:w-36 h-[1px] bg-[#16130F]/20" />
        </div>

        {/* Footnote / Field Observation Monospace Caption */}
        <p className="font-mono text-xs text-[#16130F]/70 max-w-2xl mx-auto leading-relaxed border border-[#16130F]/10 p-4 rounded-xl bg-[#A8BE86]/10">
          {content.intro.annotation}
        </p>
      </div>
    </section>
  );
};
