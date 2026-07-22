"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";
import TrustBadge from "./TrustBadge";

export default function CtaCloser() {
  const [expiryDate, setExpiryDate] = useState("this month");
  const [referrer, setReferrer] = useState<string | null>(null);

  // Dynamically calculate the last day of the current month to create fresh, persistent urgency
  useEffect(() => {
    const date = new Date();
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const formatted = endOfMonth.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    });
    setTimeout(() => {
      setExpiryDate(formatted);
    }, 0);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ks_referrer");
      if (stored) {
        setTimeout(() => setReferrer(stored), 0);
      }
    }
  }, []);

  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <section className="bg-brand-bg py-12 px-4 border-t border-brand-primary/5">
      {/* Container Card with optimized mobile padding */}
      <div className="max-w-4xl mx-auto bg-emerald-50/40 rounded-3xl px-4.5 py-8 sm:p-12 text-center border border-emerald-600/10 shadow-sm relative overflow-hidden">

        {/* 
          Urgency Badge - Reverted to "Amber Gold" to match your #E9B15D token.
        */}
        <div className="inline-flex items-center justify-center bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full text-amber-800 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider mb-5 animate-pulse select-none max-w-full text-center">
          {/* Mobile Text (Fits on a single line on any mobile screen) */}
          <span className="inline sm:hidden">
            🔥 AMBER GOLD SKIN UNLOCK EXPIRES {expiryDate}!
          </span>

          {/* Desktop Text */}
          <span className="hidden sm:inline">
            🔥 PROMO: CLAIM YOUR FREE AMBER GOLD SKIN BEFORE {expiryDate}!
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-tight font-sans px-2">
          Ready to Stop Second-Guessing Your Waste?
        </h2>
        <p className="text-brand-primary mt-3 text-sm md:text-base max-w-md mx-auto px-4">
          Get the free app now and instantly master composting rules in just 5 minutes.
        </p>

        {/* Balanced Button Row (Padded safely on mobile) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full">
          {/* Download CTA (Primary Action - Deep Brand Green) */}
          <div className="flex flex-col w-full sm:w-auto px-4 sm:px-0">
            <Link
              href={referrer ? `/download?ref=${encodeURIComponent(referrer)}` : "/download"}
              onClick={() => handleCtaClick("Download APK", "/download")}
              className="bg-brand-header hover:bg-brand-hero-accent text-white font-bold px-6 py-3 rounded-xl transition-all hover-lift shadow-md w-full text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-header/50"
            >
              Download for Android
            </Link>
          </div>

          {/* Teaser CTA (Secondary Action) */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 px-4 sm:px-0">
            <Link
              href={referrer ? `https://kitchen-scraps-quiz.web.app/?ref=${encodeURIComponent(referrer)}` : "https://kitchen-scraps-quiz.web.app"}
              onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
              className="border-2 border-emerald-900 text-emerald-900 hover:bg-brand-soft-bg/30 font-bold px-6 py-2.5 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center order-first focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-900/50"
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