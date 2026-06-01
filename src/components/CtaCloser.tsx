"use client";

import { useState } from "react";
import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";
import DownloadModal from "./DownloadModal"; // Integrated

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
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link
            href="https://kitchen-scraps-quiz.web.app"
            onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
            className="bg-brand-header hover:bg-brand-hero-accent text-white font-bold px-6 py-3 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center"
          >
            Play Free in Web Browser
          </Link>
          <button
            onClick={() => {
              handleCtaClick("Download APK", "/kitchen-scraps.apk");
              setIsModalOpen(true);
            }}
            className="bg-brand-cta text-brand-primary hover:bg-[#e0a24b] font-bold px-6 py-3 rounded-xl transition-all hover-lift shadow-md w-full sm:w-auto text-sm text-center cursor-pointer"
          >
            Download for Android
          </button>
        </div>
      </div>

      {/* Render Pre-Download Trust Modal */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}