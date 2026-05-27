import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-header py-4 px-6 shadow-premium transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center bg-transparent">
            <Image
              src="/app-icon.png"
              alt="Kitchen Scraps Logo"
              width={28}
              height={28}
              className="w-7 h-auto rounded-lg object-contain"
            />
          </div>
          <span className="text-white font-display font-extrabold text-base sm:text-xl tracking-tight">
            Kitchen Scraps & Food Waste Quiz
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-white/90 hover:text-white font-medium text-sm transition-colors"
          >
            How It Works
          </a>
          <a
            href="#categories"
            className="text-white/90 hover:text-white font-medium text-sm transition-colors"
          >
            Categories
          </a>
          <a
            href="#features"
            className="text-white/90 hover:text-white font-medium text-sm transition-colors"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-white/90 hover:text-white font-medium text-sm transition-colors"
          >
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}
