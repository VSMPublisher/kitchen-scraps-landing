"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";
import TrustBadge from "./TrustBadge";

export default function CtaCloser() {
  const [expiryDate, setExpiryDate] = useState("this month");

  // Dynamically calculate the last day of the current month to create fresh, persistent urgency
  useEffect(() => {
    const date = new Date();
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const formatted = endOfMonth.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    });
    setExpiryDate(formatted);
  }, []);

  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <section className="bg-brand-bg py-12 px-4 border-t border-brand-primary/5">
      {/* 
        Container Card with optimized mobile padding (px-4.5) to free up 32px of extra 
        horizontal breathing room on mobile screens, while preserving desktop padding.
      */}
      <div className="max-w-4xl mx-auto bg-emerald-50/40 rounded-3xl px-4.5 py-8 sm:p-12 text-center border border-emerald-600/10 shadow-sm relative overflow-hidden">

        {/* 
          Point 7 Fix: Responsive Scarcity Badge.
          Displays a concise text string on mobile to stay strictly on a single line, 
          and reveals the full explanatory text on desktop sizes.
        */}
        <div className="inline-flex items-center justify-center bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-amber-800 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider mb-5 animate-pulse select-none max-w-full text-center">
          {/* Mobile Text (Fits on a single line on any screen > 320px) */}
          <span className="inline sm:hidden">
            🔥 CODE: <span className="underline decoration-amber-500 font-black">GARDENGOLD99</span> EXPIRES {expiryDate}!
          </span>

          {/* Desktop Text */}
          <span className="hidden sm:inline">
            🔥 PROMO: SKIN UNLOCK CODE <span className="underline decoration-amber-500 font-black">GARDENGOLD99</span> EXPIRES {expiryDate}!
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-tight font-sans px-2">
          Ready to Stop Second-Guessing Your Waste?
        </h2>
        <p className="text-brand-primary mt-3 text-sm md:text-base max-w-md mx-auto px-4">
          Get the free app now and instantly master composting rules in just 30 seconds.
        </p>

        {/* Balanced Button Row (Padded safely on mobile) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full">
          {/* Download CTA (Primary Action - Deep Brand Green) */}
          <div className="flex flex-col w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/download"
              onClick={() => handleCtaClick("Download APK", "/download")}
              className="bg-brand-header hover:bg-brand-hero-accent text-white font-bold px-6 py-3 rounded-xl transition-all hover-lift shadow-md w-full text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-header/50"
            >
              Download for Android
            </Link>
          </div>

          {/* Teaser CTA (Secondary Action) */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 px-4 sm:px-0">
            <Link
              href="https://kitchen-scraps-quiz.web.app"
              onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
              className="border-2 border-emerald-900 text-emerald-900 hover:bg-brand-soft-bg/30 font-bold px-6 py-2.5 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center order-first focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-900/50 animate-fade-in-up"
            >
              Try Web Teaser
            </Link>
            <span className="text-xs font-display font-extrabold uppercase tracking-widest text-emerald-950 select-none text-center sm:text-left whitespace-nowrap mt-2 sm:mt-0">
              ⚡ Instant Demo (10 Qs)
            </span>
          </div>
        </div>

        {/* Responsive Trust Badge Container */}
        <div className="mt-6 flex justify-center px-4 w-full">
          <div className="max-w-full text-xs">
            <TrustBadge />
          </div>
        </div>
      </div>
    </section>
  );
}