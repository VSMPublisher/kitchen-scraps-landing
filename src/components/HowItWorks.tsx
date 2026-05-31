import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Select Your Category",
      desc: "Pick from 6 curated topics suited to your setup. Master apartment balcony systems, backyard composting, bokashi bins, or vermiculture at your own pace.",
      image: "/step-category.png",
    },
    {
      step: "2",
      title: "Play & Learn in 30s",
      desc: "Each question has an immersive countdown timer. Earn reward credits, request hints when stumped, and see instantaneous scoring and feedback mechanics.",
      image: "/step-play.png",
    },
    {
      step: "3",
      title: "Mistake Review & Build Habit",
      desc: "Review your mistakes. Our system tracks what tripped you up and makes sure you get another shot so you never forget the right sorting rule again.",
      image: "/step-review.png",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-brand-primary rounded-[2.5rem] border border-brand-primary-light p-8 sm:p-12 md:p-16 shadow-premium relative overflow-hidden text-white">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-header/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white text-center tracking-tight">
            How to Start Composting Kitchen Scraps
          </h2>
          <p className="text-center text-emerald-100 max-w-2xl mx-auto mt-3 text-base leading-relaxed font-medium">
            Whether you are a seasoned soil master or a complete novice, play through 3 quick stages to build your perfect indoor or outdoor setup.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
          {steps.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Image Showcase frame container */}
              <div className="w-full max-w-[240px] mb-8 relative">
                {/* Outer soft shadow */}
                <div className="absolute -inset-1 bg-gradient-to-b from-brand-header/30 to-brand-cta/30 rounded-[2.2rem] blur-lg group-hover:blur-xl transition-all duration-300 pointer-events-none" />
                
                {/* Device Mockup Shadow Container */}
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-premium bg-white aspect-[9/19]">
                  <Image
                    src={item.image}
                    alt={`Kitchen Scraps App Setup Step ${item.step}: ${item.title}`}
                    width={240}
                    height={506}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Steps text description */}
              <div className="text-center px-2">
                <div className="w-10 h-10 rounded-full bg-brand-cta text-brand-primary font-display font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-premium group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="font-display font-extrabold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-emerald-100 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}