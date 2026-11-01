import React from "react";
import { content } from "../data/content";

export const Footer = () => {
  return (
    <footer className="relative bg-[#0E0C0B] text-[#FBF6E6] pt-16 pb-12 border-t-2 border-[#16130F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#FBF6E6]/15">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* White Sunburst / Leaf-and-Drop Wordmark Emblem */}
              <span className="w-10 h-10 rounded-full border border-[#FBF6E6]/40 flex items-center justify-center bg-[#FBF6E6]/10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FBF6E6]" fill="currentColor">
                  {/* Sunburst Rays */}
                  <path d="M12 2L13.8 6.5L18.5 4.5L16.5 9.2L21 11L16.5 12.8L18.5 17.5L13.8 15.5L12 20L10.2 15.5L5.5 17.5L7.5 12.8L3 11L7.5 9.2L5.5 4.5L10.2 6.5L12 2Z" fillOpacity="0.4" />
                  {/* Water Droplet */}
                  <path d="M12 5C12 5 8.5 10 8.5 13.5C8.5 15.4 10.1 17 12 17C13.9 17 15.5 15.4 15.5 13.5C15.5 10 12 5 12 5Z" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF6E6]">
                {content.footer.brandName}
              </span>
            </div>

            <p className="font-sans text-xs text-[#FBF6E6]/70 leading-relaxed max-w-sm">
              {content.footer.brandDescription}
            </p>

            <div className="font-mono text-[10px] text-[#A8BE86] tracking-wider uppercase">
              OPEN-HARDWARE · OPEN-AGRONOMY
            </div>
          </div>

          {/* 4 Link Columns with Mono Headings */}
          {content.footer.columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#D98B6F] font-bold">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-[#FBF6E6]/75 hover:text-[#FBF6E6] hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Location Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#FBF6E6]/60 uppercase tracking-widest text-center sm:text-left">
          <div>{content.meta.copyright}</div>
          <div>{content.footer.bottomMeta}</div>
        </div>
      </div>
    </footer>
  );
};
