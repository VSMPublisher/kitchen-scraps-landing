export default function CoreValues() {
  const values = [
    {
      abbr: "Su",
      title: "Sustainability",
      desc: "We empower everyday householders to build cleaner waste sorting habits, actively reducing municipal landfill loads through simple, compound actions.",
    },
    {
      abbr: "Tr",
      title: "Transparency",
      desc: "A completely free open-source educational platform. We provide instant question feedback and mistake reviews with no paywalls or required sign-ups.",
    },
    {
      abbr: "Sc",
      title: "Scientific Accuracy",
      desc: "Using evidence-based composting science to teach chemical carbon-to-nitrogen ratios, troubleshooting, vermiculture, and Bokashi rules, separating biology from myth.",
    },
    {
      abbr: "Ac",
      title: "Accessibility",
      desc: "Removing barriers to eco-education by offering a lightweight, offline-ready Android utility alongside a fast browser-based version designed for any device.",
    },
  ];

  return (
    <section id="core-values" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-[2.5rem] border border-brand-border p-8 sm:p-12 shadow-premium relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-soft-bg rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <span className="text-brand-hero-accent font-display font-extrabold text-xs tracking-wider uppercase">
            Our Foundation
          </span>
          <h2 className="text-3xl font-bold text-emerald-800 text-center tracking-tight mt-2">
            Core Values
          </h2>
          <p className="text-center text-gray-700 mt-2 max-w-xl mx-auto font-medium">
            We are a mass-market utility driven by a practical purpose to simplify environmental action.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 relative z-10">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-brand-bg p-8 rounded-2xl border border-brand-border/60 hover-lift shadow-premium-sm hover:shadow-premium transition-all duration-300 flex flex-col md:flex-row gap-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-soft-bg text-brand-hero-accent font-display font-bold text-lg flex items-center justify-center shrink-0 border border-brand-border group-hover:bg-brand-header group-hover:text-white transition-all duration-300 shadow-premium-sm">
                {val.abbr}
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-lg text-brand-primary">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}