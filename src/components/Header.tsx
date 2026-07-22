"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCreator, Creator, saveCreatorToCache } from "@/utils/creators";
import { fetchCreatorFromFirestore } from "@/lib/firebase";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [liveCreator, setLiveCreator] = useState<Creator | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref") || params.get("code");
      if (ref) {
        localStorage.setItem("ks_referrer", ref);
        setTimeout(() => setReferrer(ref), 0);
      } else {
        const stored = localStorage.getItem("ks_referrer");
        if (stored) {
          setTimeout(() => setReferrer(stored), 0);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!referrer) return;
    let isSubscribed = true;
    fetchCreatorFromFirestore(referrer)
      .then((fetched) => {
        if (isSubscribed && fetched && fetched.avatar) {
          setLiveCreator(fetched);
          saveCreatorToCache(fetched);
        }
      })
      .catch(() => {});
    return () => {
      isSubscribed = false;
    };
  }, [referrer]);

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Categories", href: "#categories" },
    { label: "Features", href: "#features" },
    { label: "Web vs. App", href: "#web-vs-app" },
    { label: "Core Values", href: "#core-values" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-header shadow-premium transition-all duration-300 flex flex-col">
      {referrer && (() => {
        const creator = liveCreator || getCreator(referrer);
        return (
          <div className="bg-amber-400 text-slate-950 text-xs font-black py-2.5 px-4 text-center select-none flex items-center justify-center gap-2 border-b border-amber-500/30 animate-fade-in">
            <span>🌱</span>
            <span>
              You have been invited by <strong className="underline decoration-2 font-mono">{creator.name}</strong> ({creator.handle})! Download below to unlock your premium Welcome Kit.
            </span>
            <button 
              onClick={() => {
                localStorage.removeItem("ks_referrer");
                setReferrer(null);
              }}
              className="ml-2 bg-black/10 text-[9px] hover:bg-black/20 text-slate-950 font-bold px-1.5 py-0.5 rounded cursor-pointer border-0 transition-all uppercase"
              aria-label="Dismiss invite"
            >
              ✕ Dismiss
            </button>
          </div>
        );
      })()}
      <div className="max-w-6xl mx-auto w-full py-2.5 md:py-3 px-4 md:px-6 flex items-center justify-between relative">

        {/* Logo Section */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-header rounded-xl p-1 hover:opacity-90 transition-opacity cursor-pointer z-10"
          aria-label="Scroll to top"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-transparent shrink-0">
            <Image
              src="/app-icon.png"
              alt="Kitchen Scraps Logo"
              width={28}
              height={28}
              className="w-7 h-auto rounded-lg object-contain"
            />
          </div>

          <span className="text-white font-display font-bold tracking-normal">
            {/* Mobile Title (Shortened to fit single line on phone displays) */}
            <span className="inline md:hidden text-sm sm:text-base">
              Kitchen Scraps Quiz
            </span>

            {/* Desktop Title (Revealed once horizontal room allows) */}
            <span className="hidden md:inline text-lg lg:text-xl">
              Kitchen Scraps & Food Waste Quiz
            </span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-white hover:text-white/80 font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-header rounded px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-header rounded-xl z-10 cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>

        {/* Responsive Mobile Navigation Drawer */}
        <div
          className={`absolute top-full left-0 w-full bg-brand-header border-t border-white/10 shadow-premium transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen
              ? "opacity-100 scale-y-100 visible pointer-events-auto"
              : "opacity-0 scale-y-95 invisible pointer-events-none"
            } lg:hidden`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:bg-white/10 font-semibold text-base py-2.5 px-4 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
}