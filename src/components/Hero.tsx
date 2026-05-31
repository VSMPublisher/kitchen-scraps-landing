"use client";

import Link from "next/link";
import Image from "next/image";
import { trackOutboundLink } from "@/utils/analytics";

export default function Hero() {
  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  // Highly detailed, organic vector leaf template (designed procedurally to look realistic)
  const OrganicLeaf = ({ className }: { className: string }) => (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none select-none z-0 transition-transform ${className}`}
    >
      {/* Leaf Blade (Body Fill) */}
      <path 
        d="M15 85 C 10 50, 40 20, 85 15 C 80 50, 50 80, 15 85 Z" 
        fill="currentColor" 
        className="text-emerald-700/6"
      />
      {/* Midrib and Stem */}
      <path 
        d="M5 95 C 10 90, 15 85, 15 85 C 22 78, 45 45, 85 15" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        className="text-emerald-800/25"
      />
      {/* Parallel Lateral Veins - Left Side Sweep */}
      <path 
        d="
          M 20 80 C 15 76, 12 73, 12 70
          M 28 71 C 21 66, 16 62, 16 58
          M 36 62 C 28 56, 23 50, 23 46
          M 45 52 C 37 45, 31 39, 31 35
          M 54 42 C 46 35, 42 30, 42 26
          M 63 33 C 57 27, 55 23, 55 20
          M 72 24 C 68 19, 68 17, 68 16
        " 
        stroke="currentColor" 
        strokeWidth="0.8" 
        strokeLinecap="round" 
        className="text-emerald-800/20"
      />
      {/* Parallel Lateral Veins - Right Side Sweep */}
      <path 
        d="
          M 20 80 C 27 82, 33 83, 35 84
          M 28 71 C 37 74, 44 76, 47 78
          M 36 62 C 47 65, 55 67, 58 69
          M 45 52 C 56 55, 64 56, 68 58
          M 54 42 C 65 44, 73 45, 77 46
          M 63 33 C 73 34, 80 34, 83 34
          M 72 24 C 80 24, 84 23, 86 23
        " 
        stroke="currentColor" 
        strokeWidth="0.8" 
        strokeLinecap="round" 
        className="text-emerald-800/20"
      />
    </svg>
  );

  return (
    <section className="w-full bg-brand-bg relative overflow-hidden py-16 lg:py-24 px-6 scroll-mt-20">
      
      {/* FIXED: Added aria-hidden="true" to instruct accessibility engines to skip blurred background layers */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-soft-bg/40 rounded-full blur-[100px] pointer-events-none z-0" 
      />

      {/* Structured placements of the high-fidelity leaf templates */}
      <OrganicLeaf className="top-[3%] left-[2%] w-24 h-24 md:w-36 md:h-36 -rotate-12 opacity-80" />
      <OrganicLeaf className="top-[28%] left-[8%] w-18 h-18 md:w-28 md:h-28 rotate-45 opacity-70" />
      <OrganicLeaf className="bottom-[8%] left-[2%] w-28 h-28 md:w-40 md:h-40 rotate-[135deg] opacity-80" />
      
      <OrganicLeaf className="top-[4%] left-[45%] w-16 h-16 md:w-24 md:h-24 rotate-[60deg] opacity-60" />
      <OrganicLeaf className="bottom-[14%] left-[28%] w-20 h-20 md:w-32 md:h-32 rotate-[15deg] opacity-75" />

      <OrganicLeaf className="top-[8%] right-[28%] w-32 h-32 md:w-48 md:h-48 rotate-90 hidden lg:block opacity-90" />
      <OrganicLeaf className="top-[45%] right-[2%] w-18 h-18 md:w-28 md:h-28 -rotate-[30deg] hidden md:block opacity-65" />
      <OrganicLeaf className="bottom-[5%] right-[15%] w-24 h-24 md:w-36 md:h-36 rotate-[195deg] hidden sm:block opacity-80" />

      <div className="max-w-6xl mx-auto relative flex flex-col lg:flex-row items-center lg:items-end gap-12 lg:gap-16 z-10">
        
        {/* Left Side: Engaging content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-brand-soft-bg border border-brand-header/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-brand-hero-accent font-semibold text-xs tracking-wider uppercase">
              Free 60-Question Quiz
            </span>
          </div>
          
          <p className="flex items-start gap-2 justify-center lg:justify-start text-xs text-emerald-900 font-bold mt-1 text-center lg:text-left">
            <span className="shrink-0">⭐</span> 
            <span>Built using verified organic chemistry and household composting data</span>
          </p>
          
          {/* Main heading entry title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold my-6 text-brand-hero-accent leading-[1.1] tracking-tight">
            Turn Your Kitchen Scraps Into Garden <span className="text-brand-cta-text">Gold</span>
          </h1>

          {/* Subheading emphasizing gamified systems with bold keywords */}
          <p className="text-lg sm:text-xl mb-4 text-gray-800 max-w-2xl leading-relaxed font-semibold">
            Wondering how to compost kitchen scraps like coffee grounds or banana peels? Our free, gamified learning platform teaches you smart <strong className="text-emerald-800 font-bold">kitchen waste management app</strong> rules through interactive play in just 30 seconds.
          </p>

          <p className="text-base mb-8 text-gray-700 font-medium tracking-tight">
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

          {/* Safety badges and notice layouts */}
          <div className="mt-6 text-xs text-gray-700 font-medium tracking-wide space-y-1.5 pl-1">
            <p className="flex items-start gap-2 justify-center lg:justify-start text-center lg:text-left">
              <span className="shrink-0">🛡️</span> 
              <span>Safe direct APK download • Zero device permissions required • Compact 60MB</span>
            </p>
            <p className="flex items-start gap-2 justify-center lg:justify-start text-center lg:text-left">
              <span className="shrink-0">⚡</span> 
              <span>Play instantly in your browser — no installation required</span>
            </p>
          </div>
          
          <p className="text-xs text-gray-600 mt-4 italic font-medium">
            Note: Question pool updates and user-rewarded hint features roll out exclusively on the Android application.
          </p>
        </div>

        {/* Right Side: Tall Borderless Phone Mockup aligned cleanly to the bottom */}
        <div className="flex-shrink-0 w-full max-w-[210px] sm:max-w-[240px] lg:max-w-[310px] relative group h-fit z-10 self-center lg:self-end">
          <div className="absolute -inset-2 bg-gradient-to-tr from-brand-header/20 to-brand-cta/20 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Borderless screen frame container */}
          <div className="w-full h-auto rounded-[2rem] overflow-hidden shadow-mockup relative flex flex-col bg-brand-primary/10">
            <div className="relative w-full aspect-[450/952]">
              <Image
                src="/hero-mockup.png"
                alt="Kitchen Scraps & Food Waste Quiz Android App Gameplay Screen"
                fill
                sizes="(max-width: 310px) 100vw, 310px"
                priority
                className="object-cover rounded-[2rem]"
              />
            </div>
          </div>          
        </div>
      </div>
    </section>
  );
}