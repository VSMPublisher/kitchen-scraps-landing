"use client";

import Link from "next/link";
import Image from "next/image";
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
<p className="flex items-center gap-1.5 justify-start text-xs text-emerald-800 font-medium mt-1">
  <span>⭐</span> 
  <span>Built using verified organic chemistry and household composting data</span>
</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-brand-hero-accent leading-[1.1] tracking-tight">
            Turn Your Kitchen Scraps Into Garden <span className="text-brand-cta">Gold</span>
          </h2>

          <p className="text-lg sm:text-xl mb-4 text-brand-primary/85 max-w-2xl leading-relaxed font-medium">
            Wondering how to compost kitchen scraps like coffee grounds or banana peels? 
  Our free interactive quiz teaches you smart <strong className="text-emerald-700 font-semibold">kitchen waste management app</strong> rules in just 30 seconds.
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
<div className="mt-3 text-xs text-gray-500 tracking-wide space-y-1.5 pl-1">
  <p className="flex items-center gap-1.5 justify-start">
    <span>🛡️</span> 
    <span>Safe direct APK download • Zero device permissions required • Compact 60MB</span>
  </p>
  <p className="flex items-center gap-1.5 justify-start text-gray-400">
    <span>⚡</span> 
    <span>Play instantly in your browser — no installation required</span>
  </p>
</div>
          {/* Android Monetization and Question Pool Notice */}
          <p className="text-xs text-brand-muted/80 mt-4 italic font-normal">
            Note: Question pool updates and user-rewarded hint features roll out exclusively on the Android application.
          </p>
        </div>

        {/* Right Side: Optimized Next.js Image Phone Mockup Container */}
        <div className="flex-shrink-0 w-full max-w-[210px] sm:max-w-[230px] lg:max-w-[250px] relative group h-fit">
          {/* External decorative aura */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-brand-header/20 to-brand-cta/20 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Premium Physical Chassis with explicit sleek mobile aspect ratio */}
          <div className="w-full h-auto bg-brand-primary rounded-[2.8rem] p-2 shadow-mockup border-4 border-brand-primary-light relative overflow-hidden flex flex-col">
            {/* In-app mockup screen with locked aspect ratio matching native asset dimensions */}
            <div className="rounded-[2rem] overflow-hidden bg-transparent relative w-full aspect-[450/952]">
              <Image
                src="/hero-mockup.png"
                alt="Kitchen Scraps & Food Waste Quiz Android App Gameplay Screen"
                fill
                sizes="(max-width: 250px) 100vw, 250px"
                priority
                className="object-cover"
              />
            </div>
          </div>          
        </div>
      </div>
    </section>
  );
}