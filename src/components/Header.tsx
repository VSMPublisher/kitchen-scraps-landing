"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-brand-header py-4 px-6 shadow-premium transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        
        {/* Logo Section */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-header rounded-xl p-1 hover:opacity-90 transition-opacity cursor-pointer z-10"
          aria-label="Scroll to top"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-transparent">
            <Image
              src="/app-icon.png"
              alt="Kitchen Scraps Logo"
              width={28}
              height={28}
              className="w-7 h-auto rounded-lg object-contain"
            />
          </div>
          <span className="text-white font-display font-bold text-base sm:text-xl tracking-normal">
            Kitchen Scraps & Food Waste Quiz
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
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Responsive Mobile Navigation Drawer */}
        <div
          className={`absolute top-[100%] left-0 w-full bg-brand-header border-t border-white/10 shadow-premium transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen
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
