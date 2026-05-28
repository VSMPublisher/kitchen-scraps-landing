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
            {/* Image Showcase frame container */}
            <div className="w-full max-w-[240px] mb-8 relative">
              {/* Outer soft shadow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-brand-header/10 to-brand-cta/10 rounded-[2.2rem] blur-lg group-hover:blur-xl transition-all duration-300 pointer-events-none" />
              
              {/* Device Mockup Shadow Container */}
              <div className="relative rounded-[2rem] overflow-hidden border border-brand-border shadow-premium bg-white aspect-[9/19]">
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