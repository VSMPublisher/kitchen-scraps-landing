"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

const AHA_ITEMS = [
  {
    name: "Avocado Pits",
    emoji: "🥑",
    question: "Do avocado pits belong in a standard backyard compost bin?",
    answer: "Go (But Smash First)",
    correct: true,
    scienceTitle: "Lignin Density & Mycorrhizal Fungi",
    explainer: "Avocado pits are extremely high in lignin (woody carbon), which acts as a physical barrier to bacterial digestion. Smashing them creates jagged edges and huge surface area. This allows slow-acting white rot fungi to colonize the wood, providing excellent long-term aeration pockets for beneficial garden microbes.",
    gardeningTip: "Hit avocado pits with a heavy spade or hammer before tossing them. It speeds up their breakdown from 2 years to just 2 months!",
    difficulty: "Hard",
    badge: "Carbon / Browns"
  },
  {
    name: "Pine Needles",
    emoji: "🌲",
    question: "Are pine needles safe to compost in large quantities?",
    answer: "Go (Shredded Only)",
    correct: true,
    scienceTitle: "The Acidic Myth vs. Waxy Cuticle Cutin",
    explainer: "Many gardeners believe pine needles ruin compost with acidity. In truth, compost microbes neutralize organic acids quickly. The real challenge is the needle's waxy cuticle shell (cutin), which sheds water and repels bacteria. Shredding physicalizes the needle, breaking open the barrier so bacterial decomposers can move in.",
    gardeningTip: "Run pine needles over with a lawnmower to shred the outer wax before composting. Shredded needles add wonderful, fluffy loft that prevents compost clumping.",
    difficulty: "Medium",
    badge: "Carbon / Browns"
  },
  {
    name: "Store-Bought Teabags",
    emoji: "🍵",
    question: "Can standard grocery paper teabags go directly in the compost?",
    answer: "No-Go (Most Brands)",
    correct: true,
    scienceTitle: "Hidden Heat-Resistant Plastics",
    explainer: "While the paper fibers and tea leaves are completely natural, up to 90% of traditional teabag brands use heat-resistant polypropylene (microplastic) to seal the bag's seams. If composted whole, paper and tea decompose, but invisible plastic mesh grids persist indefinitely, polluting your soil with microplastics.",
    gardeningTip: "Cut or snip teabags open. Dump the nitrogen-rich tea leaves straight into your green pile, and discard the plastic-lined bag mesh in the trash.",
    difficulty: "Medium",
    badge: "Synthetic Toxins"
  }
];

export default function HowItWorks() {
  const [activeAha, setActiveAha] = useState(0);

  const steps = [
    {
      step: "1",
      title: "Choose Your Sorting Category",
      desc: "Select from 6 tailored categories. Master apartment balcony systems, backyard soil chemistry, Bokashi bins, or vermiculture at your own pace.",
      image: "/step-category.png",
    },
    {
      step: "2",
      title: "Play 30-Second Micro-Quizzes",
      desc: "Test your sorting instincts against a rapid countdown timer. Unlock instant scientific explainers, request helpful hints, and earn streak points on every correct decision.",
      image: "/step-play.png",
    },
    {
      step: "3",
      title: "Review Mistakes & Lock In Habits",
      desc: "Our smart spaced-repetition tracker flags whatever tripped you up and serves it back later, turning temporary mistakes into permanent sorting confidence.",
      image: "/step-review.png",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-brand-primary rounded-3xl border border-brand-primary-light p-8 sm:p-12 md:p-16 shadow-premium relative overflow-hidden text-white">
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

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
          {steps.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Image Showcase frame container */}
              <div className="w-full max-w-[240px] mb-8 relative">
                {/* Outer soft shadow */}
                <div className="absolute -inset-1 bg-gradient-to-b from-brand-header/30 to-brand-cta/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 pointer-events-none" />

                {/* Device Mockup Shadow Container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-premium bg-white aspect-[9/19]">
                  <Image
                    src={item.image}
                    alt={`Kitchen Scraps App Setup Step ${item.step}: ${item.title}`}
                    width={240}
                    height={506}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
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

        {/* Decorative Divider */}
        <div className="border-t border-emerald-800/60 my-16 pt-16 relative z-10" />

        {/* PART 1 POINT 5: Interactive Visual "Aha Moment" Preview Section */}
        <div className="relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" /> Visual &quot;Aha!&quot; Science Simulator
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Visualize the Moment Composting Knowledge Clicks
            </h3>
            <p className="text-emerald-100 mt-3 text-base leading-relaxed font-medium">
              Don&apos;t just memorize rules. Master the chemical and biological laws of decomposition. Below is a preview of the app&apos;s actual <strong className="text-white">Instant Feedback Screen</strong>—giving you biology-backed explanations for tricky household organic waste items.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Left Selection Column: 5 Columns */}
            <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1">
              <p className="text-xs sm:text-sm text-emerald-200 font-extrabold tracking-wide uppercase px-1 text-center lg:text-left">
                Select a tricky waste item to preview:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                {AHA_ITEMS.map((item, idx) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveAha(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer group/btn ${activeAha === idx
                      ? "bg-emerald-950 border-emerald-500/50 shadow-premium text-white scale-[1.02] ring-2 ring-emerald-500/20"
                      : "bg-emerald-950/30 border-emerald-800/40 hover:bg-emerald-950/50 hover:border-emerald-700 text-emerald-100 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0 select-none bg-emerald-900/40 w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-800/50">
                        {item.emoji}
                      </span>
                      <div>
                        <span className="font-extrabold text-sm sm:text-base block tracking-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold tracking-wide uppercase">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${activeAha === idx ? "translate-x-1 text-brand-cta" : "text-emerald-700 group-hover/btn:translate-x-0.5"
                      }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display Mockup: 7 Columns */}
            <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
              <div className="w-full max-w-md bg-[#FAF9F5] border-[6px] border-zinc-800 rounded-[2.5rem] shadow-premium-lg overflow-hidden flex flex-col text-slate-900 relative">

                {/* Phone Top Notch Status Bar */}
                <div className="h-6 bg-emerald-850 w-full flex items-center justify-between px-5 text-[9px] text-emerald-200/80 font-sans tracking-tight shrink-0 select-none relative">
                  <span>9:41 AM</span>
                  <div className="w-14 h-4 bg-zinc-900 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center pointer-events-none">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                  </div>
                  <span>📶 🔋</span>
                </div>

                {/* Instant Feedback Simulator Main Container */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between shrink-0 select-none">
                    <span className="text-[10px] font-extrabold tracking-widest bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full uppercase">
                      Instant Feedback mechanics
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold font-mono">
                      Level: {AHA_ITEMS[activeAha].difficulty}
                    </span>
                  </div>

                  {/* Biology-backed Verified Question Card */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm select-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl select-none">{AHA_ITEMS[activeAha].emoji}</span>
                      <span className="text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase">
                        {AHA_ITEMS[activeAha].badge}
                      </span>
                    </div>
                    <h4 className="font-display font-black text-slate-900 text-xs sm:text-sm leading-snug">
                      {AHA_ITEMS[activeAha].question}
                    </h4>
                  </div>

                  {/* High-Impact Visual "Correct" Feedback Ribbon */}
                  <div className="bg-emerald-500 text-white rounded-xl py-2 px-3.5 flex items-center justify-between shadow-sm animate-fade-in select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                      </div>
                      <span className="font-display font-black text-[11px] sm:text-xs uppercase tracking-wider">
                        CORRECT! • Go Practice Rules
                      </span>
                    </div>
                    <span className="text-[11px] font-black font-mono select-none bg-emerald-600 px-2 py-0.5 rounded">
                      +12 XP
                    </span>
                  </div>

                  {/* Biology-backed Scientific Explanation Card */}
                  <div className="bg-emerald-950 text-emerald-50 rounded-2xl p-4 shadow-md flex-1 flex flex-col justify-between gap-3 animate-fade-in border border-emerald-800">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wide mb-1.5 select-none">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>Soil Science explainer</span>
                      </div>
                      <h5 className="text-[10px] sm:text-[11px] font-extrabold text-emerald-300 font-mono uppercase tracking-wide mb-1 select-none">
                        🔬 {AHA_ITEMS[activeAha].scienceTitle}
                      </h5>
                      <p className="text-[11px] sm:text-[12px] leading-relaxed font-medium font-sans">
                        {AHA_ITEMS[activeAha].explainer}
                      </p>
                    </div>

                    {/* Pro Gardening Tip Accent Box */}
                    <div className="bg-emerald-900/60 border-l-2 border-amber-400 p-2 rounded-r-lg text-[10px] sm:text-[11px] text-emerald-100 select-none">
                      <span className="font-black text-amber-400 block mb-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider">
                        💡 PRO GARDENER TIP:
                      </span>
                      <span>{AHA_ITEMS[activeAha].gardeningTip}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Notch Bar indicator */}
                <div className="h-4 bg-slate-50 w-full flex items-center justify-center shrink-0 border-t border-slate-100">
                  <div className="w-24 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
