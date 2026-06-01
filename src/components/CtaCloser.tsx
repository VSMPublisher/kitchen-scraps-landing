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
<div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 max-w-md sm:max-w-none mx-auto lg:mx-0">
  <Link
    href="https://kitchen-scraps-quiz.web.app"
    onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
    className="bg-brand-header text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-hero-accent hover-lift transition-all shadow-premium hover:shadow-premium-lg w-full sm:w-auto text-center"
  >
    Play Now — Free in Web Browser
  </Link>
  
  {/* SWAPPED BUTTON TO LINK ELEMENT FOR HOVER PREVIEW AND VALIDATION */}
  <Link
    href="/kitchen-scraps.apk"
    download="kitchen-scraps.apk"
    onClick={(e) => {
      // Fires your tracking log matrix cleanly
      handleCtaClick("Download APK", "/kitchen-scraps.apk");
      // Triggers your custom Antigravity 2.0 Trust Modal box overlay
      setIsModalOpen(true);
    }}
    className="bg-brand-cta text-brand-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#e0a24b] hover-lift transition-all shadow-premium w-full sm:w-auto text-center cursor-pointer"
  >
    Download for Android
  </Link>
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