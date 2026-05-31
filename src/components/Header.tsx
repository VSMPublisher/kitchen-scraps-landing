"use client";

import Image from "next/image";

export default function Header() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-header py-4 px-6 shadow-premium transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-left focus:outline-none hover:opacity-90 transition-opacity cursor-pointer"
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
        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
          >
            How It Works
          </a>
          <a
            href="#categories"
            className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
          >
            Categories
          </a>
          <a
            href="#features"
            className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
          >
            Features
          </a>
          <a
            href="#core-values"
            className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
          >
            Core Values
          </a>
          <a
            href="#faq"
            className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
          >
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}