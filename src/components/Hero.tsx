"use client";

import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";

export default function Hero() {
  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <section className="w-full bg-brand-bg relative overflow-hidden py-16 lg:py-24 px-6 scroll-mt-20">
      {/* Background soft glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-soft-bg/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative flex flex-col lg:flex-row items-center lg:items-end gap-12 lg:gap-16">
        {/* Left Side: Engaging content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-brand-soft-bg border border-brand-header/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-brand-hero-accent font-semibold text-xs tracking-wider uppercase">
              Free 60-Question Quiz
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-brand-hero-accent leading-[1.1] tracking-tight">
            Turn Your Kitchen Scraps Into Garden <span className="text-brand-cta">Gold</span>
          </h2>

          <p className="text-lg sm:text-xl mb-4 text-brand-primary/85 max-w-2xl leading-relaxed font-medium">
            Yeah, we've all been there—staring at a banana peel or coffee grounds, wondering if it goes in the compost or the trash. Our quiz takes the guesswork out of composting, showing you exactly what belongs in your bin in just 30 seconds.
          </p>

          <p className="text-base mb-8 text-brand-muted font-normal tracking-tight">
            10 questions per run • 6 specialized categories • No signup, ever.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 max-w-md sm:max-w-none mx-auto lg:mx-0">
            <Link
              href="https://kitchen-scraps-quiz.web.app"
              onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
              className="bg-brand-header text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-hero-accent hover-lift transition-all shadow-premium hover:shadow-premium-lg w-full sm:w-auto text-center"
            >
              Play Now — Free in Web Browser
            </Link>
            <Link
              href="/kitchen-scraps.apk"
              onClick={() => handleCtaClick("Download APK", "/kitchen-scraps.apk")}
              className="bg-brand-cta text-brand-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#e0a24b] hover-lift transition-all shadow-premium w-full sm:w-auto text-center"
            >
              Download for Android
            </Link>
          </div>

          {/* Android Monetization and Question Pool Notice */}
          <p className="text-xs text-brand-muted/80 mt-4 italic font-normal">
            Note: Question pool updates and user-rewarded hint features roll out exclusively on the Android application.
          </p>
        </div>

        {/* Right Side: Code-based premium Flutter app mockup chassis with constrained layout scaling */}
        <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] relative group h-fit">
          {/* External decorative aura */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-brand-header/20 to-brand-cta/20 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* CSS Device Frame Container with restricted maximum height and overflow containment */}
          <div className="w-full h-auto max-h-[530px] bg-brand-primary rounded-[3rem] px-3 pb-3 pt-1 shadow-mockup border-4 border-brand-primary-light flex flex-col overflow-hidden relative">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-brand-primary rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-10 h-1 bg-brand-primary-light/50 rounded-full" />
              <div className="w-2 h-2 bg-brand-primary-light/30 rounded-full ml-2" />
            </div>

            {/* In-app mockup UI screen container wrapping snuggly around content */}
            <div className="rounded-[2.4rem] bg-brand-bg px-6 pt-5 pb-5 flex flex-col gap-4 overflow-hidden relative select-none h-auto">
              {/* Inner card layout */}
              <div className="space-y-4">
                {/* Header status in-app */}
                <div className="flex justify-between items-center text-xs font-bold text-brand-primary/60">
                  <span>Category: Go/No-Go</span>
                  <span className="text-brand-hero-accent">🔥 Streak: 8</span>
                </div>

                {/* Question Card mockup */}
                <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-premium-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-[10px] bg-brand-soft-bg text-brand-hero-accent font-bold rounded-md">
                      Q4 of 10
                    </span>
                    <span className="text-[10px] text-brand-muted font-semibold">
                      Time: 24s
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-brand-primary leading-snug">
                    Can fresh coffee grounds go straight into a compost pile?
                  </h4>
                </div>

                {/* Answers list mockup */}
                <div className="space-y-2.5">
                  <div className="bg-brand-soft-bg border-2 border-brand-header rounded-xl p-3 flex items-center gap-3 cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-brand-header text-white font-bold text-xs flex items-center justify-center">
                      A
                    </span>
                    <span className="text-xs font-bold text-brand-primary">
                      Yes, they are greens and rich in nitrogen.
                    </span>
                  </div>
                  <div className="bg-white border border-brand-border hover:border-brand-primary/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-brand-border text-brand-primary font-bold text-xs flex items-center justify-center">
                      B
                    </span>
                    <span className="text-xs font-semibold text-brand-primary/80">
                      No, they are too acidic for standard bins.
                    </span>
                  </div>
                </div>
              </div>

              {/* In-app expert explanation teaser */}
              <div className="bg-white/80 backdrop-blur-sm border border-brand-border rounded-xl p-3">
                <span className="text-[10px] bg-brand-cta/20 text-brand-primary font-bold px-1.5 py-0.5 rounded mr-1">
                  💡 Hint Used
                </span>
                <p className="text-[10px] text-brand-primary-light mt-1.5 font-medium leading-relaxed">
                  Despite their dark color, coffee grounds are loaded with nitrogen!
                </p>
              </div>

              {/* Bottom in-app branding */}
              <div className="text-center pt-2 border-t border-brand-border/60">
                <span className="text-[10px] text-brand-muted font-bold tracking-wider uppercase">
                  Kitchen Scraps & Food Waste Quiz
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
