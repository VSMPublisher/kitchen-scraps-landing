export default function ValueGapMatrix() {
  const comparisonRows = [
    {
      feature: "Question Pool",
      web: "Teaser Preview: Limited to 10 fixed questions/category",
      app: "Full Experience: Unlimited, dynamic pool of 60+ verified organic composting levels",
      psychology: "Curiosity: Finish teaser and check knowledge on complex items"
    },
    {
      feature: "Interactive Hints",
      web: "Disabled: Must proceed solely on guesswork without science tips",
      app: "Active Reward System: Spend in-game credits to review background science hints",
      psychology: "Gamified Support: Helps maintain correct educational streaks"
    },
    {
      feature: "Offline Compatibility",
      web: "Disabled: Requires steady connection; loading breaks in signal drops",
      app: "100% Offline-Enabled: Play in remote outdoor gardens, farms, or compost heaps",
      psychology: "Utility: Composting is outdoors. Portable off-grid resources are mandatory"
    },
    {
      feature: "Dynamic Updates",
      web: "Static: Requires continuous manual caching and manual reloads",
      app: "Instant Update Sync: Automatically receive background rule modifications as regional guidelines roll out",
      psychology: "Longevity: Converts a static website into a permanent garden companion utility"
    },
    {
      feature: "Pricing & Ads",
      web: "100% Free (No forced popups or interrupting ad loops)",
      app: "100% Free (No ads + full offline usage permissions)",
      psychology: "Transparency: No paywalls, hidden microtransactions, or data mining"
    }
  ];

  return (
    <section id="web-vs-app" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-premium-sm relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-soft-bg rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-12 max-w-2xl mx-auto relative z-10">
          <span className="text-brand-hero-accent font-display font-extrabold text-xs tracking-wider uppercase">
            Web vs. App Comparison
          </span>
          <h2 className="text-3xl font-bold text-emerald-800 tracking-tight mt-2">
            Web Teaser vs. Mobile App Edition
          </h2>
          <p className="text-brand-primary-light mt-2 max-w-lg mx-auto font-medium">
            While the web build serves as a quick trial, downloading the zero-permission native APK delivers our full suite of gardening features.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block relative z-10 overflow-x-auto border border-brand-border rounded-2xl shadow-premium-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-soft-bg border-b border-brand-border">
                <th className="p-5 font-display font-extrabold text-sm text-brand-primary w-1/5">Feature Suite</th>
                <th className="p-5 font-display font-extrabold text-sm text-brand-primary w-1/4">🌐 Web Play (Teaser)</th>
                <th className="p-5 font-display font-extrabold text-sm text-brand-primary w-1/3">🤖 Android Native (Definitive)</th>
                <th className="p-5 font-display font-extrabold text-sm text-emerald-800 w-1/4">Conversion Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-soft-bg/10 transition-colors">
                  {/* Feature Title */}
                  <td className="p-5 font-display font-bold text-sm text-brand-primary align-top">
                    {row.feature}
                  </td>
                  
                   {/* Web Play column - Soft, easy to read gray */}
                   <td className="p-5 text-xs text-brand-primary-light font-normal leading-relaxed align-top">
                     {row.web}
                   </td>
                  
                  {/* Android Native - Clean Semibold green with very soft highlight background */}
                  <td className="p-5 text-xs text-emerald-950 font-semibold leading-relaxed bg-brand-soft-bg/20 align-top">
                    {row.app}
                  </td>
                  
                   {/* Conversion Focus - High-readability neutral dark zinc */}
                   <td className="p-5 text-xs text-brand-muted font-medium leading-relaxed align-top">
                     {row.psychology}
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison Stack */}
        <div className="md:hidden space-y-6 relative z-10">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="bg-brand-bg rounded-2xl border border-brand-border/60 p-5 space-y-4 shadow-premium-sm">
              <h3 className="font-display font-extrabold text-base text-brand-primary pb-2 border-b border-brand-border">
                {row.feature}
              </h3>
              <div className="space-y-3">
                <div className="text-xs">
                  <span className="font-bold text-brand-muted block mb-0.5">🌐 WEB TEASER</span>
                  <p className="text-brand-primary-light font-normal leading-relaxed">{row.web}</p>
                </div>
                <div className="text-xs pt-2 border-t border-brand-border/40">
                  <span className="font-bold text-brand-hero-accent block mb-0.5">🤖 NATIVE APP</span>
                  <p className="text-emerald-950 font-semibold leading-relaxed">{row.app}</p>
                </div>
                <div className="text-xs pt-2 border-t border-brand-border/40">
                  <span className="font-bold text-emerald-800 block mb-0.5">CONVERSION FOCUS</span>
                  <p className="text-brand-muted font-medium leading-relaxed">{row.psychology}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}