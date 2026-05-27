"use client";

import Link from "next/link";
import { trackOutboundLink } from "@/utils/analytics";

export default function Footer() {
  const handleOutboundClick = (url: string, label: string) => {
    trackOutboundLink(url, label);
  };

  const socialLinks = [
    {
      href: "https://www.youtube.com/@KitchenScrapsQuiz",
      label: "YouTube",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.933-.502-5.837z" />
          <path fill="#2D4A22" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/kitchenscrapsquiz/",
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      href: "https://www.pinterest.com/kitchenscrapsquiz/",
      label: "Pinterest",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.042-3.438.218-.932 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      href: "https://linktr.ee/kitchenscrapsquiz",
      label: "Linktree",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M13.5 1.5v8.25h7.5l-.007 4.5h-7.493v8.25h-4.5v-8.25H1.5l-.007-4.5H9V1.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-brand-primary py-16 px-6 relative overflow-hidden">
      {/* Visual top border styling accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-header/35" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h4 className="text-white font-display font-extrabold text-2xl mb-4 tracking-tight">
          Kitchen Scraps & Food Waste Quiz
        </h4>
        <p className="mb-10 text-white/80 italic text-base leading-relaxed max-w-xl mx-auto">
          &ldquo;One quiz at a time, we're making composting less confusing and a lot more fun.&rdquo;
        </p>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-10">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick(link.href, link.label)}
              aria-label={link.label}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-header text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-premium-sm"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Verified Legal Anchors (strictly pointing to existing urls from profile) */}
        <div className="flex justify-center gap-10 font-display font-bold text-white mb-12">
          <Link
            href="https://vsmpublisher.github.io/kitchen-scraps-legal/privacy_policy.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              handleOutboundClick(
                "https://vsmpublisher.github.io/kitchen-scraps-legal/privacy_policy.html",
                "Privacy Policy"
              )
            }
            className="hover:text-brand-cta transition-colors decoration-brand-header underline underline-offset-8 decoration-2"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://vsmpublisher.github.io/kitchen-scraps-legal/terms_of_service.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              handleOutboundClick(
                "https://vsmpublisher.github.io/kitchen-scraps-legal/terms_of_service.html",
                "Terms of Service"
              )
            }
            className="hover:text-brand-cta transition-colors decoration-brand-header underline underline-offset-8 decoration-2"
          >
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-xs text-white/50 font-medium">
          &copy; {new Date().getFullYear()} VSMPublisher. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
