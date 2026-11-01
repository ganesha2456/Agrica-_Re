import React, { useState } from "react";
import { content } from "../data/content";
import {
  HalftoneSoilProbe,
  HalftoneESP32,
  HalftoneRelayPump,
  HalftoneLoRaNode,
  HalftoneSproutML,
} from "./HalftoneSVGs";

export const StickyWords = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = content.stickyWords.steps;
  const currentStep = steps[activeStepIndex];

  const renderIllustration = (key) => {
    switch (key) {
      case "sensing":
        return <HalftoneSoilProbe className="w-56 h-56 sm:w-64 sm:h-64" moisture={55} />;
      case "deciding":
        return <HalftoneESP32 className="w-56 h-56 sm:w-64 sm:h-64" />;
      case "acting":
        return <HalftoneRelayPump className="w-56 h-56 sm:w-64 sm:h-64" active={true} />;
      case "connecting":
        return <HalftoneLoRaNode className="w-56 h-56 sm:w-64 sm:h-64" />;
      case "learning":
        return <HalftoneSproutML className="w-56 h-56 sm:w-64 sm:h-64" />;
      default:
        return null;
    }
  };

  return (
    <section id="cycle" className="relative py-20 md:py-28 bg-[#FBF6E6] border-b border-[#16130F]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#3E5B34] font-semibold border border-[#3E5B34]/30 px-3 py-1 rounded-full">
            {content.stickyWords.sectionTag}
          </span>
        </div>

        {/* Dynamic Editorial Headline */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#16130F] tracking-tight">
            {content.stickyWords.titlePrefix}{" "}
            <span className="italic font-normal text-[#D98B6F] transition-all duration-300">
              *{currentStep.word}*
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#16130F]/60 mt-3 max-w-xl mx-auto">
            {currentStep.accent}
          </p>
        </div>

        {/* Step Progression Pills / Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {steps.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.key}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? "bg-[#0E0C0B] text-[#FBF6E6] border-[#0E0C0B] shadow-sm scale-105"
                    : "bg-[#FBF6E6] text-[#16130F]/70 border-[#16130F]/20 hover:border-[#16130F]"
                }`}
              >
                0{idx + 1} · {s.word}
              </button>
            );
          })}
        </div>

        {/* Centered Halftone Illustration & Explanatory Card */}
        <div className="max-w-3xl mx-auto bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center gap-8">
          {/* Left: Swapping Halftone Artwork */}
          <div className="flex-shrink-0 flex items-center justify-center p-2 bg-[#FBF6E6] rounded-2xl border border-[#16130F]/20 shadow-inner">
            {renderIllustration(currentStep.key)}
          </div>

          {/* Right: Editorial Details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#3E5B34] font-bold">
              {currentStep.caption}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16130F] leading-snug">
              {currentStep.subline}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#16130F]/80 leading-relaxed">
              {currentStep.details}
            </p>

            <div className="pt-2 flex items-center justify-center md:justify-start gap-4 text-xs font-mono text-[#16130F]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A8BE86]" />
                CLOSED LOOP
              </span>
              <span>·</span>
              <span>CYCLE SPEED: CONTINUOUS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
