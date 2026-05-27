export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Select Your Category",
      desc: "Pick from 6 curated topics suited to your setup. Master apartment balcony systems, backyard composting, bokashi bins, or vermiculture at your own pace.",
      mockup: (
        <div className="w-full aspect-[9/16] bg-brand-bg rounded-3xl p-4 border border-brand-border shadow-premium relative flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="bg-brand-header text-white text-center py-2 rounded-xl font-display font-extrabold text-xs shadow-premium-sm">
            Choose Challenge
          </div>
          {/* Selection List */}
          <div className="space-y-2 flex-1 mt-4">
            <div className="bg-white border-2 border-brand-header p-3 rounded-xl flex items-center justify-between shadow-premium-sm">
              <span className="text-xs font-bold text-brand-primary">♻️ Go/No-Go Sorting</span>
              <span className="text-[10px] text-brand-hero-accent font-bold">10 Qs</span>
            </div>
            <div className="bg-white border border-brand-border p-3 rounded-xl flex items-center justify-between opacity-80">
              <span className="text-xs font-bold text-brand-primary">✔️ Myths vs. Facts</span>
              <span className="text-[10px] text-brand-muted font-bold">10 Qs</span>
            </div>
            <div className="bg-white border border-brand-border p-3 rounded-xl flex items-center justify-between opacity-80">
              <span className="text-xs font-bold text-brand-primary">💡 The Why Logic</span>
              <span className="text-[10px] text-brand-muted font-bold">10 Qs</span>
            </div>
            <div className="bg-white border border-brand-border p-3 rounded-xl flex items-center justify-between opacity-80">
              <span className="text-xs font-bold text-brand-primary">🛠️ Troubleshooting</span>
              <span className="text-[10px] text-brand-muted font-bold">10 Qs</span>
            </div>
          </div>
          {/* Bottom Indicators */}
          <div className="text-center text-[10px] text-brand-muted font-semibold mt-2 border-t pt-2">
            Flutter Interface Preview
          </div>
        </div>
      ),
    },
    {
      step: "2",
      title: "Play & Learn in 30s",
      desc: "Each question has an immersive countdown timer. Earn reward credits, request hints when stumped, and see instantaneous scoring and feedback mechanics.",
      mockup: (
        <div className="w-full aspect-[9/16] bg-brand-bg rounded-3xl p-4 border border-brand-border shadow-premium relative flex flex-col justify-between overflow-hidden">
          {/* Top Info */}
          <div className="flex justify-between items-center text-[10px] font-bold text-brand-primary/70 border-b pb-2">
            <span>🔥 Streak: 5</span>
            <span className="text-brand-cta bg-brand-primary px-2 py-0.5 rounded-full">⚡ 120 XP</span>
          </div>
          {/* Quiz Area */}
          <div className="flex-1 flex flex-col justify-center gap-3 my-2">
            <div className="bg-white border border-brand-border p-4 rounded-xl shadow-premium-sm text-center">
              <span className="text-[10px] text-brand-header font-bold uppercase tracking-wider block mb-1">Question 2</span>
              <p className="text-xs font-display font-extrabold text-brand-primary">
                Can avocado pits be thrown directly into standard compost bins?
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="bg-white border border-brand-border p-2.5 rounded-lg text-center text-xs font-semibold text-brand-primary opacity-60">
                Yes, they degrade easily.
              </div>
              <div className="bg-brand-soft-bg border border-brand-header p-2.5 rounded-lg text-center text-xs font-bold text-brand-primary">
                No, they need chopping first.
              </div>
            </div>
          </div>
          {/* Timer and hints */}
          <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-brand-border mt-1">
            <span className="text-[10px] text-red-500 font-bold">⏳ 18s Left</span>
            <span className="text-[10px] bg-brand-cta/20 text-brand-primary font-bold px-2 py-0.5 rounded">💡 Get Hint</span>
          </div>
        </div>
      ),
    },
    {
      step: "3",
      title: "Mistake Review & Build Habit",
      desc: "Review your mistakes. Our system tracks what tripped you up and makes sure you get another shot so you never forget the right sorting rule again.",
      mockup: (
        <div className="w-full aspect-[9/16] bg-brand-bg rounded-3xl p-4 border border-brand-border shadow-premium relative flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="bg-red-500/10 border border-red-500/20 text-red-700 text-center py-2 rounded-xl font-display font-extrabold text-xs">
            Review Mode
          </div>
          {/* Mistake Detail */}
          <div className="flex-1 mt-3 space-y-3">
            <div className="bg-white border border-brand-border p-3.5 rounded-xl shadow-premium-sm">
              <span className="text-[9px] text-red-500 font-bold uppercase block mb-1">Reviewing Tripped Items</span>
              <h5 className="text-xs font-extrabold text-brand-primary">Bones & Meat Scraps</h5>
              <p className="text-[10px] text-brand-muted mt-1 leading-relaxed">
                Why? While organic, bones and meat scraps attract pests and smell foul in typical home systems.
              </p>
            </div>
            <div className="bg-brand-header text-white text-center py-2.5 rounded-xl font-bold text-xs shadow-premium cursor-pointer hover:bg-brand-hero-accent transition-colors">
              Retry Sorting Drill
            </div>
          </div>
          {/* Bottom */}
          <div className="text-center text-[10px] text-brand-muted font-bold border-t pt-2">
            Build Habits Successfully
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-hero-accent mb-4">
          How It Works
        </h3>
        <p className="text-brand-primary-light font-medium">
          Whether you are a seasoned soil master or a complete backyard composting novice, our structure turns complex sorting guidelines into quick, memorable habits.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
        {steps.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            {/* Mockup Showcase frame container */}
            <div className="w-full max-w-[240px] mb-8 relative">
              {/* Outer soft shadow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-brand-header/10 to-brand-cta/10 rounded-[2rem] blur-lg group-hover:blur-xl transition-all duration-300 pointer-events-none" />
              {item.mockup}
            </div>

            {/* Steps text description */}
            <div className="text-center px-2">
              <div className="w-10 h-10 rounded-full bg-brand-header text-white font-display font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-premium group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <h4 className="font-display font-extrabold text-lg text-brand-primary mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-brand-primary-light/95 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
