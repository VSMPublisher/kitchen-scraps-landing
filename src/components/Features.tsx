export default function Features() {
  const features = [
    {
      icon: "⏱️",
      title: "30-Second Timer",
      desc: "Keeps you focused without feeling rushed. Perfect for a quick, impactful knowledge break.",
    },
    {
      icon: "💡",
      title: "Credits & Hints",
      desc: "Stuck on a tricky item? Spend your earned in-game credits on expert hints to learn by doing, not guessing.",
    },
    {
      icon: "🧠",
      title: "Expert Explanations",
      desc: "Every single card option is accompanied by clear, science-backed breakdowns so the knowledge actually sticks.",
    },
    {
      icon: "🔥",
      title: "Streak Tracking",
      desc: "Watch your educational streak grow as you answer correctly. Experience the thrill of hitting a 10-item streak.",
    },
    {
      icon: "⚡",
      title: "Instant Feedback",
      desc: "Zero waiting. Review composting mechanics instantly with plain-language tips detailing chemical composting logic.",
    },
    {
      icon: "🔁",
      title: "Mistake Review",
      desc: "Go back and revisit questions that tripped you up previously. That is where deep habit-forming mastery happens.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white border-y border-brand-border/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-800 text-center">
            Learn Kitchen Waste Sorting Rules Faster
          </h2>
          <p className="text-center text-brand-primary-light mt-2">
            Composting rules can be dry and confusing. That is why we packed our quiz with fun, rewarding elements that turn learning into a game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-brand-bg p-6 rounded-2xl border border-brand-border/50 hover-lift shadow-premium-sm hover:shadow-premium flex items-start gap-4 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center text-2xl flex-shrink-0 shadow-premium-sm">
                <span aria-hidden="true">
                  {feat.icon}
                </span>
              </div>
              <div className="space-y-1">
                {/* FIXED: Shifted from h4 to h3 for semantic hierarchy compliance */}
                <h3 className="font-display font-extrabold text-brand-primary text-base">
                  {feat.title}
                </h3>
                {/* FIXED: Upgraded translucent utility to crisp text-gray-700 */}
                <p className="text-sm text-brand-primary-light leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}