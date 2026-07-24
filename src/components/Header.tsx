"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Creator, saveCreatorToCache, getInitials } from "@/utils/creators";
import { fetchCreatorFromFirestore } from "@/lib/firebase";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [verifiedCreator, setVerifiedCreator] = useState<Creator | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref") || params.get("code") || params.get("creator") || params.get("advocateCode");
      if (ref) {
        const cleanRef = ref.trim().replace(/^@/, "");
        localStorage.setItem("ks_referrer", cleanRef);
        setTimeout(() => setReferrer(cleanRef), 0);
      } else {
        const stored = localStorage.getItem("ks_referrer");
        if (stored) {
          setTimeout(() => setReferrer(stored), 0);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!referrer) {
      setVerifiedCreator(null);
      return;
    }
    let isSubscribed = true;
    fetchCreatorFromFirestore(referrer)
      .then((fetched) => {
        if (isSubscribed) {
          if (fetched && fetched.isSyncedFromFirestore) {
            setVerifiedCreator(fetched);
            saveCreatorToCache(fetched);
            localStorage.setItem("ks_verified_creator", JSON.stringify(fetched));
          } else {
            // Unverified or invalid referral code in Firestore: silently ignore/discard
            setVerifiedCreator(null);
            localStorage.removeItem("ks_referrer");
            localStorage.removeItem("ks_verified_creator");
          }
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setVerifiedCreator(null);
        }
      });
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
      {/* Unified Firestore Verified Creator Welcome Banner */}
      {verifiedCreator && (
        <div className="bg-emerald-900 text-white text-xs py-2.5 px-4 border-b border-emerald-700/60 shadow-md animate-fade-in">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-left overflow-hidden">
              {/* Avatar Image with Initials/Badge Fallback */}
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-linear-to-br from-emerald-600 to-amber-600 border border-emerald-400/40 flex items-center justify-center font-black text-amber-300 text-xs shadow-xs">
                {verifiedCreator.avatar && !verifiedCreator.avatar.includes("unsplash.com") ? (
                  <Image
                    src={verifiedCreator.avatar}
                    alt={verifiedCreator.name}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    className="object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span>{getInitials(verifiedCreator.name)}</span>
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-800 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded border border-emerald-600/60 font-mono shrink-0">
                    🌱 Verified Creator Invite
                  </span>
                  <span className="font-extrabold text-sm text-white truncate">
                    Welcome! You were invited by {verifiedCreator.name}
                  </span>
                  <span className="text-emerald-200 text-xs font-mono font-semibold">
                    (@{verifiedCreator.handle.replace(/^@/, "")})
                  </span>
                </div>
                {/* Custom Bio or Default Warm Tagline */}
                <p className="text-emerald-100/90 text-xs mt-0.5 line-clamp-2 leading-relaxed">
                  {verifiedCreator.bio || `Join ${verifiedCreator.name} on Kitchen Scraps to explore zero-waste culinary quizzes, earn rewards, and track your sustainable habits!`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`/download?ref=${encodeURIComponent(verifiedCreator.advocateCode || verifiedCreator.handle || verifiedCreator.id)}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("download");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else if (typeof window !== "undefined") {
                    window.location.href = `/download?ref=${encodeURIComponent(verifiedCreator.advocateCode || verifiedCreator.handle || verifiedCreator.id)}`;
                  }
                }}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Get App & Perk</span>
                <span className="text-sm">➔</span>
              </a>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("ks_referrer");
                    localStorage.removeItem("ks_verified_creator");
                  }
                  setReferrer(null);
                  setVerifiedCreator(null);
                }}
                className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 hover:text-white font-extrabold text-xs px-2 py-1 rounded cursor-pointer transition"
                title="Dismiss invitation"
                aria-label="Dismiss invite"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
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