import React, { useState, useEffect } from "react";
import { content } from "../data/content";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#FBF6E6]/95 backdrop-blur-md shadow-sm border-b border-[#16130F]/15 py-3" : "bg-[#FBF6E6] border-b border-[#16130F]/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo at Left */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full border border-[#16130F] flex items-center justify-center bg-[#A8BE86]/30 group-hover:bg-[#A8BE86] transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#16130F]" fill="currentColor">
                <path d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z" fillOpacity="0.4" />
                <path d="M12 4C12 4 8 9 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 9 12 4 12 4Z" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#16130F] leading-none">
                {content.nav.logo}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#16130F]/60 uppercase">
                {content.nav.logoSub}
              </span>
            </div>
          </a>

          {/* Centred Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7">
            {content.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-widest text-[#16130F]/75 hover:text-[#16130F] hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Pill */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="font-mono text-[10px] text-[#3E5B34] bg-[#A8BE86]/25 px-2.5 py-1 rounded-full border border-[#3E5B34]/20">
              ESP32 · v2.4
            </span>
            <a
              href="#ledger"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-[11px] tracking-wider uppercase hover:bg-[#3E5B34] transition-colors shadow-sm"
            >
              {content.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md border border-[#16130F]/20 text-[#16130F] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FBF6E6] border-b border-[#16130F]/20 px-6 pt-3 pb-6 space-y-3">
            {content.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-xs uppercase tracking-wider text-[#16130F] py-2 border-b border-[#16130F]/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#ledger"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase"
              >
                {content.nav.cta}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Small "TOP ↑" mono link fixed bottom-left as requested */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-[#FBF6E6] border border-[#16130F] px-3 py-1.5 rounded-full shadow-md hover:bg-[#16130F] hover:text-[#FBF6E6] font-mono text-[10px] tracking-widest uppercase transition-all duration-200"
          title="Back to Top"
        >
          TOP ↑
        </button>
      )}
    </>
  );
};
