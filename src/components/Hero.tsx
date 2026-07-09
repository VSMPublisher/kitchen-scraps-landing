"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Lightbulb, ArrowRight, RotateCcw } from "lucide-react";
import { trackOutboundLink } from "@/utils/analytics";
import TrustBadge from "./TrustBadge";
import { getCreator } from "@/utils/creators";

const DEMO_QUESTIONS = [
  {
    category: "Greens vs Browns",
    question: "Are coffee grounds 'greens' or 'browns'?",
    emojis: "☕️🤎",
    difficulty: "Medium",
    options: [
      { label: "Greens (Nitrogen)", value: "Greens" },
      { label: "Browns (Carbon)", value: "Browns" }
    ],
    correctValue: "Greens",
    explanation: "Even though they look dark brown, they are rich in nitrogen (greens) and provide rapid fuel for composting microbes!"
  },
  {
    category: "Go / No-Go",
    question: "Can dairy products (milk, cheese, yogurt) be added to home compost?",
    emojis: "🥛🧀",
    difficulty: "Medium",
    options: [
      { label: "Go (Compost)", value: "Go" },
      { label: "No-Go (Toss)", value: "No-Go" }
    ],
    correctValue: "No-Go",
    explanation: "Dairy decomposes slowly, creates severe odor issues, and attracts unwanted nocturnal pests to backyard bins."
  },
  {
    category: "Apartment & Balcony",
    question: "Can citrus peels go into a worm farm (vermicomposting)?",
    emojis: "🍋🐛",
    difficulty: "Hard",
    options: [
      { label: "Go (Safe)", value: "Go" },
      { label: "No-Go (Avoid)", value: "No-Go" }
    ],
    correctValue: "No-Go",
    explanation: "Citrus peels are highly acidic and contain natural oils that irritate worms' sensitive organic skin."
  }
];

const OrganicLeaf = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none select-none z-0 transition-transform ${className}`}
  >
    <path
      d="M15 85 C 10 50, 40 20, 85 15 C 80 50, 50 80, 15 85 Z"
      fill="currentColor"
      className="text-emerald-700/6"
    />
    <path
      d="M5 95 C 10 90, 15 85, 15 85 C 22 78, 45 45, 85 15"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="text-emerald-800/25"
    />
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

export default function Hero() {
  const [showSticky, setShowSticky] = useState(false);

  // Mini-Quiz interactive simulator states
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isAnsLocked, setIsAnsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [timerProgress, setTimerProgress] = useState(100);
  const [streak, setStreak] = useState(11);
  const [isCompleted, setIsCompleted] = useState(false);

  const [copiedScore, setCopiedScore] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setTimeout(() => setIsDesktop(!isMobile), 0);

      // Extract current referrer
      const checkReferrer = () => {
        const stored = localStorage.getItem("ks_referrer");
        setTimeout(() => setReferrer(stored), 0);
      };
      checkReferrer();
      const interval = setInterval(checkReferrer, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleCopyScore = () => {
    const shareUrl = referrer
      ? `https://kitchen-scraps.web.app/?ref=${encodeURIComponent(referrer)}`
      : "https://kitchen-scraps.web.app/";
    const textToCopy = `🌱 I scored ${score}/3 on the Kitchen Scraps Composting teaser! Can you beat my score? Try it free: ${shareUrl}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedScore(true);
        setTimeout(() => setCopiedScore(false), 2000);
      });
    }
  };

  // Simulated countdown effect inside mockup
  useEffect(() => {
    if (isAnsLocked || isCompleted) return;
    const interval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev <= 2) {
          return 0;
        }
        return prev - 1.5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [currentQIndex, isAnsLocked, isCompleted]);

  const handleSelectOption = (optionValue: string) => {
    if (isAnsLocked) return;
    setSelectedAns(optionValue);
    setIsAnsLocked(true);

    const isCorrect = optionValue === DEMO_QUESTIONS[currentQIndex].correctValue;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < DEMO_QUESTIONS.length - 1) {
      setTimerProgress(100);
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAns(null);
      setIsAnsLocked(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAns(null);
    setIsAnsLocked(false);
    setScore(0);
    setStreak(11);
    setIsCompleted(false);
    setTimerProgress(100);
  };

  // Dynamic scroll listener tracking both the top fold and bottom fold
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Hide if we are within the first 400px of scrolling (top fold)
      const isAtTop = scrollY < 400;

      // Hide if the viewport is within 650px of the footer bottom (where CtaCloser is fully visible)
      const isNearBottom = scrollY + clientHeight >= scrollHeight - 650;

      if (!isAtTop && !isNearBottom) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial layout state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = (label: string, url: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <section id="hero" className="w-full bg-brand-bg relative overflow-hidden py-16 lg:py-24 px-6 scroll-mt-20">

      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-soft-bg/40 rounded-full blur-[100px] pointer-events-none z-0"
      />

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
            <span className="text-emerald-950 font-semibold text-xs tracking-wider uppercase">
              Free 60-Question Quiz
            </span>
          </div>

          <p className="flex items-start gap-2 justify-center lg:justify-start text-xs text-emerald-900 font-bold mt-1 text-center lg:text-left">
            <span className="shrink-0" aria-hidden="true">⭐</span>
            <span>Built using verified organic chemistry and household composting data</span>
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold my-6 text-brand-primary leading-[1.1] tracking-tight">
            Stop Guessing at the <span className="block text-brand-cta-text">Compost Bin</span>
          </h1>

          <p className="text-lg sm:text-xl mb-5 text-brand-primary max-w-2xl leading-relaxed font-semibold">
            Stop second-guessing your green/brown balance. Practice waste sorting across 6 essential categories in just <span className="text-emerald-950 font-bold bg-brand-soft-bg/80 px-2 py-0.5 rounded">5 minutes a day</span>.
          </p>

          <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/50 px-3.5 py-1.5 rounded-xl mb-8 text-xs sm:text-sm text-amber-900/95 font-medium tracking-tight shadow-sm justify-center lg:justify-start">
            <span className="text-base select-none">🌱</span>
            <span>Designed specifically for backyard gardeners, indoor kitchen composters, and balcony growers.</span>
          </div>

          {/* Call To Actions */}
          <div className="flex flex-col md:flex-row justify-center lg:justify-start items-start gap-6 max-w-md md:max-w-none mx-auto lg:mx-0">
            {/* Download CTA (Primary Action) */}
            <div className="flex flex-col w-full md:w-auto">
              <Link
                href={referrer ? `/download?ref=${encodeURIComponent(referrer)}` : "/download"}
                onClick={() => handleCtaClick("Download APK", "/download")}
                className="bg-brand-header text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-hero-accent hover-lift transition-all shadow-premium hover:shadow-premium-lg w-full flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-header/50"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>Download for Android</span>
              </Link>
              <TrustBadge className="mt-3 justify-center lg:justify-start" />
            </div>

            {/* Teaser CTA (Secondary Action) */}
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-3">
              <Link
                href="https://kitchen-scraps-quiz.web.app"
                onClick={() => handleCtaClick("Play Now - Web", "https://kitchen-scraps-quiz.web.app")}
                className="border-2 border-emerald-900 text-emerald-900 px-8 py-[14px] rounded-2xl font-bold text-lg hover:bg-brand-soft-bg/40 hover-lift transition-all shadow-premium w-full md:w-auto text-center order-first focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-900/50"
              >
                Try Web Teaser
              </Link>
              <span className="text-xs font-display font-extrabold uppercase tracking-widest text-emerald-950 select-none text-center md:text-left whitespace-nowrap mt-2 md:mt-0">
                ⚡ Instant Demo (10 Qs)
              </span>
            </div>
          </div>

          <p className="text-xs text-brand-muted mt-4 italic font-medium">
            Note: Question pool updates and user-rewarded hint features roll out exclusively on the Android application.
          </p>
        </div>

        {/* Right Side: Interactive Phone Simulator (Point 5 Visual "Aha Moment" Preview) */}
        <div className="flex-shrink-0 w-full max-w-[215px] sm:max-w-[235px] lg:max-w-[285px] relative group h-fit z-10 self-center lg:self-end">
          {/* Glowing ambient decoration */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-600/15 to-amber-500/15 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Phone Frame */}
          <div className="relative w-full aspect-[9/19] rounded-[2.2rem] border-[8px] border-zinc-800 bg-[#FAF9F5] shadow-mockup flex flex-col overflow-hidden select-none">

            {/* Safe Area Notch & Status Bar */}
            <div className="h-5 bg-emerald-700 w-full flex items-center justify-between px-3 text-[9px] text-emerald-100 font-sans tracking-tight shrink-0 select-none relative">
              <span>9:41 AM</span>
              <div className="w-12 h-3.5 bg-zinc-850 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center pointer-events-none">
                <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              </div>
              <div className="flex items-center gap-1 select-none">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Simulated App Header */}
            <div className="bg-brand-header py-2 px-3 text-white font-display font-extrabold text-[11px] sm:text-xs tracking-tight text-center relative flex items-center justify-between shrink-0 shadow-sm select-none">
              <span>{referrer ? `${getCreator(referrer).name.split(" ")[0]}'s Quiz` : "Go/No-Go Quiz"}</span>
              <span className="text-[9px] bg-emerald-600 px-1.5 py-0.5 rounded border border-emerald-500/30 font-mono flex items-center gap-0.5 select-none">
                ⏱️ {isAnsLocked ? "Paused" : "Active"}
              </span>
            </div>

            {/* Timer countdown progress bar */}
            <div className="h-1 bg-emerald-950/20 w-full shrink-0 relative overflow-hidden select-none">
              <div
                className="absolute left-0 top-0 h-full bg-amber-400 transition-all duration-150 ease-linear"
                style={{ width: `${timerProgress}%` }}
              />
            </div>

            {/* Quiz Screen Content */}
            {!isCompleted ? (
              <div className="p-2.5 flex-1 flex flex-col justify-between gap-2 overflow-y-auto min-h-0 select-none">
                {/* Question Info Bar */}
                <div className="flex justify-between items-center text-[10px] font-bold text-brand-primary/70 px-0.5 shrink-0 select-none">
                  <span>Q {currentQIndex + 1} of 3</span>
                  <span className="text-amber-700 flex items-center gap-0.5 select-none">
                    ⚡ {streak} Points
                  </span>
                </div>

                {/* Question Details */}
                <div className="bg-white border border-brand-primary-light/10 rounded-2xl p-2.5 flex-1 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden select-none">
                  <div className="text-3xl mb-1 animate-pulse select-none">
                    {DEMO_QUESTIONS[currentQIndex].emojis}
                  </div>
                  <span className="text-[9px] font-extrabold bg-brand-soft-bg text-emerald-900 px-2 py-0.5 rounded-full uppercase tracking-wider scale-90 mb-1 select-none">
                    {DEMO_QUESTIONS[currentQIndex].category}
                  </span>
                  <h3 className="text-[11px] sm:text-xs font-display font-extrabold text-emerald-950 leading-tight">
                    {DEMO_QUESTIONS[currentQIndex].question}
                  </h3>
                  <div className="mt-1.5 text-[9px] font-extrabold bg-amber-50 text-amber-800 border border-amber-100 px-1.5 py-0.5 rounded select-none">
                    Difficulty: {DEMO_QUESTIONS[currentQIndex].difficulty}
                  </div>
                </div>

                {/* Slide-up Instant Science Explanation */}
                {isAnsLocked && (
                  <div className="bg-amber-50/95 border border-amber-200/50 rounded-xl p-2 text-[10px] sm:text-[10px] leading-normal text-amber-950 flex gap-1.5 animate-fade-in-up shadow-sm select-none">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block text-amber-900 mb-0.5 select-none">
                        {selectedAns === DEMO_QUESTIONS[currentQIndex].correctValue ? "✅ Correct!" : "❌ Not Quite!"}
                      </span>
                      <span className="select-text">{DEMO_QUESTIONS[currentQIndex].explanation}</span>
                    </div>
                  </div>
                )}

                {/* Dynamic Buttons Area */}
                <div className="space-y-1.5 shrink-0 select-none">
                  {!isAnsLocked ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      {DEMO_QUESTIONS[currentQIndex].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className="bg-white hover:bg-amber-50/60 active:scale-95 border border-amber-150 text-emerald-950 py-2 rounded-xl font-extrabold text-[10px] text-center transition-all shadow-sm cursor-pointer select-none"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[11px] py-2 rounded-xl shadow-md w-full flex items-center justify-center gap-1 cursor-pointer animate-pulse select-none"
                    >
                      <span>{currentQIndex === DEMO_QUESTIONS.length - 1 ? "See Final Score" : "Next Question"}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Victory/Teaser Completed Screen */
              <div className="p-3.5 flex-1 flex flex-col items-center justify-between text-center bg-gradient-to-b from-emerald-50/40 to-white overflow-y-auto select-none gap-2">
                <div className="my-auto space-y-2.5">
                  <div className="text-3xl animate-bounce select-none">🏆</div>
                  <div>
                    <h3 className="font-display font-black text-emerald-950 text-sm sm:text-base leading-tight select-none">
                      Score: {score} of 3!
                    </h3>
                    <p className="text-[10px] text-brand-primary-light font-bold mt-1 tracking-tight leading-normal select-none">
                      {score === 3
                        ? "Perfect score! Soil Master chemistry intuition."
                        : "Great effort! Composting has tricky guidelines."}
                    </p>
                  </div>

                  {/* Streak details badge */}
                  <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full text-[10px] text-amber-900 font-extrabold mx-auto select-none">
                    <span>⚡ Streak: {streak}</span>
                  </div>

                  {/* QR Code for Desktop Sideloading */}
                  {isDesktop && (
                    <div className="flex flex-col items-center gap-1 bg-white p-1.5 rounded-xl border border-brand-border shadow-sm mx-auto w-fit">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("https://kitchen-scraps.web.app/download")}`}
                        alt="Scan to Download APK"
                        className="w-[72px] h-[72px] select-none"
                      />
                      <span className="text-[8px] font-bold text-brand-primary-light uppercase tracking-wide">Scan to install APK</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 w-full mt-auto shrink-0 select-none">
                  {/* Scoreboard Share/Copy Button */}
                  <button
                    onClick={handleCopyScore}
                    className="w-full bg-emerald-50 border border-emerald-150 hover:bg-emerald-100 text-emerald-900 font-extrabold text-[10px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>📋</span>
                    <span>{copiedScore ? "Copied Score!" : "Copy Scorecard"}</span>
                  </button>

                  <Link
                    href={referrer ? `/download?ref=${encodeURIComponent(referrer)}` : "/download"}
                    onClick={() => handleCtaClick("Teaser Phone Victory Download", "/download")}
                    className="bg-brand-header text-white font-extrabold text-[10px] sm:text-[11px] py-2 px-3 rounded-xl shadow-premium hover:bg-brand-hero-accent hover-lift transition-all w-full flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>Download Full App</span>
                  </Link>

                  <button
                    onClick={handleResetQuiz}
                    className="text-[9px] text-brand-muted hover:text-brand-primary font-bold flex items-center justify-center gap-1 mx-auto bg-transparent border-0 cursor-pointer py-1"
                  >
                    <RotateCcw className="w-3 h-3 shrink-0" />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Point 10: Mobile Sticky CTA Bar - Scroll Activated (Smooth Slide transition) */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-md border-t border-brand-border/40 shadow-premium-lg py-2.5 px-3.5 safe-area-pb transition-all duration-300 transform ${showSticky
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-6xl mx-auto flex flex-row gap-2.5">
          {/* Mobile Download Button */}
          <Link
            href={referrer ? `/download?ref=${encodeURIComponent(referrer)}` : "/download"}
            onClick={() => handleCtaClick("Download APK - Mobile CTA", "/download")}
            className="flex-1 bg-brand-header text-white px-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-hero-accent hover-lift transition-all shadow-premium text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-header/50 flex items-center justify-center min-h-[44px]"
          >
            <span className="inline sm:hidden">Download APK</span>
            <span className="hidden sm:inline">Download for Android</span>
          </Link>

          {/* Mobile Play Button */}
          <Link
            href="https://kitchen-scraps-quiz.web.app"
            onClick={() => handleCtaClick("Play Now - Web - Mobile CTA", "https://kitchen-scraps-quiz.web.app")}
            className="flex-1 border-2 border-emerald-900 text-emerald-900 px-2 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-soft-bg/40 hover-lift transition-all shadow-premium text-center focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-900/50 flex items-center justify-center min-h-[44px]"
          >
            <span className="inline sm:hidden">Play Web</span>
            <span className="hidden sm:inline">Try Web Teaser</span>
          </Link>
        </div>

        {/* Compact Trust Badge */}
        <div className="max-w-6xl mx-auto mt-2 flex justify-center">
          <TrustBadge />
        </div>
      </div>

    </section>
  );
}