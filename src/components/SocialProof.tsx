export default function SocialProof() {
  return (
    <section className="bg-brand-soft-bg border-y border-brand-border/80 px-6 py-8 relative overflow-hidden">
      {/* Subtle organic leaves vector pattern or decorative element could be in background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-header/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cta/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center text-brand-primary">
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-1" role="img" aria-label="Gift Box">🎁</span>
          <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-emerald-900">
            100% Free
          </span>
          {/* FIXED: Swapped light text-brand-muted to safe high-contrast text-emerald-950 */}
          <span className="text-xs text-emerald-950 font-semibold mt-0.5">
            No features hidden behind paywalls
          </span>
        </div>

        <div className="hidden md:block w-px h-10 bg-brand-border" />

        <div className="flex flex-col items-center">
          <span className="text-3xl mb-1" role="img" aria-label="Lock">🔒</span>
          <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-emerald-900">
            No Sign-Up Required
          </span>
          {/* FIXED: Swapped light text-brand-muted to safe high-contrast text-emerald-950 */}
          <span className="text-xs text-emerald-950 font-semibold mt-0.5">
            Zero credentials, pure learning
          </span>
        </div>

        <div className="hidden md:block w-px h-10 bg-brand-border" />

        <div className="flex flex-col items-center">
          <span className="text-3xl mb-1" role="img" aria-label="Shield">🛡️</span>
          <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-emerald-900">
            Zero Forced Ads
          </span>
          {/* FIXED: Swapped light text-brand-muted to safe high-contrast text-emerald-950 */}
          <span className="text-xs text-emerald-950 font-semibold mt-0.5">
            No irritating popup interruptions
          </span>
        </div>

        <div className="hidden md:block w-px h-10 bg-brand-border" />

        <div className="flex flex-col items-center">
          <span className="text-3xl mb-1" role="img" aria-label="Lightning Bolt">⚡</span>
          <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-emerald-900">
            Instant Play
          </span>
          {/* FIXED: Swapped light text-brand-muted to safe high-contrast text-emerald-950 */}
          <span className="text-xs text-emerald-950 font-semibold mt-0.5">
            Open your browser and practice
          </span>
        </div>
      </div>
    </section>
  );
}