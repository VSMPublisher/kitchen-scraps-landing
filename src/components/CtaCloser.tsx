"use client";

import { useState } from "react";
import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";
import DownloadModal from "./DownloadModal";

export default function CtaCloser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <section className="bg-brand-bg py-12 px-4 border-t border-brand-primary/5">
      {/* Container Card that separates it from the FAQ above */}
      <div className="max-w-4xl mx-auto bg-emerald-50/40 rounded-3xl p-8 md:p-12 text-center border border-emerald-600/10 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-tight font-sans">
          Ready to Stop Second-Guessing Your Waste?
        </h2>
        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-md mx-auto">
          Get the free app now and instantly master composting rules in just 30 seconds.
        </p>
        
        {/* Balanced Button Row */}
<div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-4 mt-8">
  {/* Download CTA (Primary Action - Deep Brand Green) */}
  <div className="flex flex-col w-full sm:w-auto">
    <Link
      href="/kitchen-scraps.apk"
      download="kitchen-scraps.apk"
      onClick={(e) => {
        handleCtaClick("Download APK", "/kitchen-scraps.apk");
        setIsModalOpen(true);
      }}
      className="bg-brand-header hover:bg-brand-hero-accent text-white font-bold px-6 py-3 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center cursor-pointer"
    >
      Download for Android
    </Link>
  </div>
  
  {/* Teaser CTA (Secondary Action - Clean Outline) */}
  <div className="flex flex-col items-center w-full sm:w-auto">
    <span className="text-[9px] font-display font-extrabold uppercase tracking-widest text-brand-hero-accent/90 mb-1 select-none">
      ⚡ Instant Demo (10 Qs)
    </span>
    <Link
      href="https://kitchen-scraps-quiz.web.app"
      onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
      className="border-2 border-brand-header text-brand-header hover:bg-brand-soft-bg/30 font-bold px-6 py-2.5 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center"
    >
      Try Web Teaser
    </Link>
  </div>
</div>

        {/* Technical Reassurance Badge - Handled in high-contrast emerald-950 color */}
        <p className="text-emerald-950 text-xs font-semibold mt-6 tracking-wide">
          v1.0.0 • Secure Standalone APK (60MB) • Zero Device Permissions Required
        </p>
      </div>

      {/* Render Pre-Download Trust Modal */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}