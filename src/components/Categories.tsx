import Image from "next/image";

export default function Categories() {
  const categories = [
    {
      title: "Go/No-Go",
      icon: "/go_nogo_icon.png",
      desc: '"Can I compost this?" — Fast, clear rules for everyday kitchen scraps. Stop second-guessing yourself at the garbage bin.',
    },
    {
      title: "Myths vs. Facts",
      icon: "/myths_facts_icon.png",
      desc: '"Eggshells take years to degrade." True or false? Separate popular composting lore from scientific organic fact.',
    },
    {
      title: "The Why",
      icon: "/the_why_icon.png",
      desc: "Know the chemistry and biology behind the regulations. Understanding the science makes composting intuitive and fun.",
    },
    {
      title: "Troubleshooting",
      icon: "/troubleshooting_icon.png",
      desc: "Smelly box? Infested with fruit flies? Fix the common beginner mistakes that cause people to quit in their second week.",
    },
    {
      title: "Practical Applications",
      icon: "/practical_applications_icon.png",
      desc: "From tiny urban studio apartments to wide backyard raised beds — see how real people adapt composting to real life.",
    },
    {
      title: "Methods & Systems",
      icon: "/methods_systems_icon.png",
      desc: "Bokashi fermentation, vermicomposting, hot piles, cold bins — choose the exact system that matches your space, time, and budget.",
    },
  ];

  return (
    <section id="categories" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-[2.5rem] border border-brand-border p-8 sm:p-12 shadow-premium relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-soft-bg rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-hero-accent mb-4">
            6 Specialized Categories
          </h3>
          <p className="text-brand-primary-light font-medium">
            Master every aspect of waste reduction. Learn rules for standard piles, specialized bins, organic garden science, and structural setups.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-brand-bg p-8 rounded-2xl border border-brand-border/60 border-b-4 border-b-brand-header hover-lift shadow-premium-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icon container housing the optimized custom colored asset */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-brand-border flex items-center justify-center mb-6 shadow-premium-sm group-hover:scale-105 group-hover:bg-brand-soft-bg transition-all duration-300">
                <div 
                  className="relative w-12 h-12 flex items-center justify-center"
                  style={{ 
                    // Converts black-and-white asset directly into our primary brand green shade (#2D4A22)
                    filter: "brightness(0) saturate(100%) invert(21%) sepia(21%) saturate(1478%) hue-rotate(63deg) brightness(97%) contrast(92%)" 
                  }}
                >
                  <Image
                    src={cat.icon}
                    alt={`${cat.title} Category Icon`}
                    width={48}
                    height={48}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <h4 className="font-display font-extrabold text-lg text-brand-primary mb-3">
                {cat.title}
              </h4>
              <p className="text-sm text-brand-primary-light/90 leading-relaxed font-medium">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}