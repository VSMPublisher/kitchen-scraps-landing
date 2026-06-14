import Image from "next/image";

export default function Categories() {
  const categories = [
    {
      title: "Go/No-Go",
      icon: "/go_nogo_icon.png",
      desc: '"Can I compost this?” — Fast, clear rules for everyday scraps. Learn why fats, dairy, and citrus stall your pile, and stop second-guessing yourself at the bin.',
    },
    {
      title: "Myths vs. Facts",
      icon: "/myths_facts_icon.png",
      desc: '"Eggshells, bioplastics, and paper cups—separate popular folklore from organic chemistry. Learn what actually breaks down at home and what belongs in the trash.',
    },
    {
      title: "The Why",
      icon: "/the_why_icon.png",
      desc: "Master the 'Greens vs. Browns' science. Understanding the carbon-to-nitrogen ratio keeps your composting bacteria active, thriving, and odor-free.",
    },
    {
      title: "Troubleshooting",
      icon: "/troubleshooting_icon.png",
      desc: "Soggy bin? Fruit flies? Ammonia smell? Diagnose and fix the moisture, aeration, and acidity imbalances that cause beginners to give up in week two.",
    },
    {
      title: "Practical Applications",
      icon: "/practical_applications_icon.png",
      desc: "From studio apartments to rainy backyard bins—see how real-world composters manage seasonal shifts, winter freezes, and small-space restrictions.",
    },
    {
      title: "Methods & Systems",
      icon: "/methods_systems_icon.png",
      desc: "Bokashi pickling, worm farms, hot tumblers, or cold bins—choose the biological decomposition method that aligns with your daily routine and budget.",
    },
  ];

  return (
    <section id="categories" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-premium relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-soft-bg rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-emerald-800 text-center">
            Master 6 Gamified Quiz Categories
          </h2>
          <p className="text-center text-brand-primary-light mt-2">
            Master every aspect of waste reduction. Learn rules for standard piles, specialized bins, organic garden science, and structural setups.
          </p>
        </div>

        {/* Start Here Guidance for Beginners */}
        <div className="mb-10 p-4 bg-brand-soft-bg/50 border border-brand-header/20 rounded-2xl relative z-10">
          <div className="flex items-center gap-2 justify-center text-sm">
            <span className="w-6 h-6 rounded-full bg-brand-header text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
              🌱
            </span>
            <span className="font-display font-semibold text-brand-primary">
              New to composting? Start with <strong className="text-brand-header">Go/No-Go</strong> — the fastest way to learn what belongs in your bin.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-brand-bg p-8 rounded-2xl border border-brand-border/60 hover-lift shadow-premium-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icon container housing the optimized custom colored asset */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-brand-border flex items-center justify-center mb-6 shadow-premium-sm group-hover:scale-105 group-hover:bg-brand-soft-bg transition-all duration-300">
                {/* ACCESSIBILITY & VISUAL FIX: Declared a relative size wrapper with Next.js 'fill' to resolve collapsed/invisible icons on custom viewport widths */}
                <div className="relative w-12 h-12">
                  <Image
                    src={cat.icon}
                    alt={`${cat.title} Category Icon`}
                    fill
                    sizes="48px"
                    className="object-contain category-icon"
                    style={{ 
                      // Converts black-and-white asset directly into our primary brand green shade (#2D4A22)
                      filter: "brightness(0) saturate(100%) invert(21%) sepia(21%) saturate(1478%) hue-rotate(63deg) brightness(97%) contrast(92%)" 
                    }}
                  />
                </div>
              </div>

              <h3 className="font-display font-extrabold text-lg text-brand-primary mb-3">
                {cat.title}
              </h3>

              <p className="text-sm text-brand-primary-light leading-relaxed font-medium">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}