"use client";

import { useState } from "react";
import Image from "next/image";

export default function Categories() {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [userSelections, setUserSelections] = useState<Record<string, number>>({});

  const categories = [
    {
      id: "go-no-go",
      title: "Go/No-Go",
      icon: "/go_nogo_icon.png",
      difficulty: "Beginner",
      desc: '"Can I compost this?” — Fast, clear rules for everyday scraps. Learn why fats, dairy, and citrus stall your pile, and stop second-guessing yourself at the bin.',
      sampleQuestion: {
        question: "Can fruit peels (e.g., banana, apple, orange) be composted?",
        image: "🍎🍌🍊",
        options: ["Go", "No-Go"],
        correctIndex: 0,
        explanation: "Fruit peels are excellent 'greens' for your compost pile, adding nitrogen and moisture. Chop citrus peels finely to help them break down faster."
      }
    },
    {
      id: "myths-facts",
      title: "Myths vs. Facts",
      icon: "/myths_facts_icon.png",
      difficulty: "Beginner",
      desc: '"Eggshells, bioplastics, and paper cups—separate popular folklore from organic chemistry. Learn what actually breaks down at home and what belongs in the trash.',
      sampleQuestion: {
        question: "Myth or Fact: Composting always smells bad.",
        image: "👃❌",
        options: ["Myth", "Fact"],
        correctIndex: 0,
        explanation: "A healthy compost pile should smell earthy, like forest soil. Foul odors indicate an imbalance (too much 'greens' or not enough air) that needs addressing."
      }
    },
    {
      id: "the-why",
      title: "The Why",
      icon: "/the_why_icon.png",
      difficulty: "Intermediate",
      desc: "Master the 'Greens vs. Browns' science. Understanding the carbon-to-nitrogen ratio keeps your composting bacteria active, thriving, and odor-free.",
      sampleQuestion: {
        question: "Why should you chop or shred larger materials before adding them to compost?",
        image: "🔪✂️",
        options: ["To increase surface area", "To make the pile look neater"],
        correctIndex: 0,
        explanation: "Smaller pieces have a greater surface area, providing more entry points for microorganisms to begin breaking down the material, thus speeding up decomposition."
      }
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: "/troubleshooting_icon.png",
      difficulty: "Intermediate",
      desc: "Soggy bin? Fruit flies? Ammonia smell? Diagnose and fix the moisture, aeration, and acidity imbalances that cause beginners to give up in week two.",
      sampleQuestion: {
        question: "Your compost pile is too wet and slimy. How should you fix it?",
        image: "💧 slimy",
        options: ["Add dry carbon 'browns'", "Add more water to drain"],
        correctIndex: 0,
        explanation: "Excess moisture creates anaerobic conditions. Add dry 'brown' materials like shredded cardboard, dry leaves, or sawdust to absorb moisture and improve air circulation."
      }
    },
    {
      id: "practical-applications",
      title: "Practical Applications",
      icon: "/practical_applications_icon.png",
      difficulty: "Advanced",
      desc: "From studio apartments to rainy backyard bins—see how real-world composters manage seasonal shifts, winter freezes, and small-space restrictions.",
      sampleQuestion: {
        question: "What is the best way to use finished compost in your garden?",
        image: "🧑‍🌾🌱",
        options: ["Mix into soil / top dress", "Leave in large piles on top"],
        correctIndex: 0,
        explanation: "Finished compost can be gently mixed into the top few inches of soil or spread as a layer of mulch/top dressing around plants to enrich the soil."
      }
    },
    {
      id: "methods-systems",
      title: "Methods & Systems",
      icon: "/methods_systems_icon.png",
      difficulty: "Advanced",
      desc: "Bokashi pickling, worm farms, hot tumblers, or cold bins—choose the biological decomposition method that aligns with your daily routine and budget.",
      sampleQuestion: {
        question: "Which composting method involves using worms to break down organic matter?",
        image: "🪱🗑️",
        options: ["Vermicomposting", "Hot Composting"],
        correctIndex: 0,
        explanation: "Vermicomposting specifically utilizes certain species of earthworms (like red wigglers) to consume and digest organic waste, producing nutrient-rich castings."
      }
    },
  ];

  const handleToggleAccordion = (id: string) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  const handleSelectOption = (catId: string, optionIdx: number) => {
    if (userSelections[catId] !== undefined) return; // Prevent double-selecting
    setUserSelections({
      ...userSelections,
      [catId]: optionIdx
    });
  };

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
            <span className="font-display font-semibold text-brand-primary text-center sm:text-left">
              New to composting? Start with <strong className="text-brand-header">Go/No-Go</strong> — the fastest way to learn what belongs in your bin.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {categories.map((cat) => {
            const isExpanded = expandedCategoryId === cat.id;
            const selectedIdx = userSelections[cat.id];
            const hasAnswered = selectedIdx !== undefined;

            return (
              <div
                key={cat.id}
                className="relative bg-brand-bg p-8 rounded-2xl border border-brand-border/60 hover-lift shadow-premium-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Floating Difficulty Badge */}
                <span className={`absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full select-none ${cat.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                    cat.difficulty === "Intermediate" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                      "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}>
                  {cat.difficulty}
                </span>

                {/* Icon container housing the optimized custom colored asset */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-brand-border flex items-center justify-center mb-6 shadow-premium-sm group-hover:scale-105 group-hover:bg-brand-soft-bg transition-all duration-300 shrink-0">
                  <div className="relative w-12 h-12">
                    <Image
                      src={cat.icon}
                      alt={`${cat.title} Category Icon`}
                      fill
                      sizes="48px"
                      className="object-contain category-icon"
                      style={{
                        // Converts asset directly into our primary brand green shade (#2D4A22)
                        filter: "brightness(0) saturate(100%) invert(21%) sepia(21%) saturate(1478%) hue-rotate(63deg) brightness(97%) contrast(92%)"
                      }}
                    />
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-lg text-brand-primary mb-3">
                  {cat.title}
                </h3>

                <p className="text-sm text-brand-primary-light leading-relaxed font-medium mb-6">
                  {cat.desc}
                </p>

                {/* Interactive Accordion Try-Out Section (Point 9) */}
                <div className="mt-auto w-full pt-4 border-t border-brand-border/40 text-left">
                  <button
                    onClick={() => handleToggleAccordion(cat.id)}
                    className="w-full py-2 px-3 bg-white hover:bg-brand-soft-bg/30 border border-brand-border/60 rounded-xl text-[11px] font-bold text-brand-primary transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none"
                    aria-label={`Toggle sample question for ${cat.title}`}
                  >
                    <span>{isExpanded ? "🙈 Hide Question" : "📖 Try Sample Question"}</span>
                    <span className="text-zinc-400 text-[9px]">{isExpanded ? "▲" : "▼"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 bg-white border border-brand-border/80 rounded-xl animate-fade-in-up text-left">
                      {/* Question Text */}
                      <div className="flex items-start gap-2 mb-2.5">
                        <span className="text-lg shrink-0 select-none">{cat.sampleQuestion.image}</span>
                        <h4 className="text-xs font-bold text-zinc-800 leading-tight">
                          {cat.sampleQuestion.question}
                        </h4>
                      </div>

                      {/* Options Grid/List */}
                      <div className="space-y-1.5 mt-2">
                        {cat.sampleQuestion.options.map((option, idx) => {
                          const isCorrect = idx === cat.sampleQuestion.correctIndex;
                          const isSelected = selectedIdx === idx;

                          let optionStyle = "bg-brand-bg hover:bg-brand-soft-bg/20 border-zinc-200/80 text-zinc-700";
                          if (hasAnswered) {
                            if (isCorrect) {
                              optionStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold";
                            } else if (isSelected) {
                              optionStyle = "bg-rose-50 border-rose-300 text-rose-800 font-extrabold";
                            } else {
                              optionStyle = "bg-white border-zinc-100 text-zinc-300 opacity-50 pointer-events-none";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(cat.id, idx)}
                              className={`w-full py-2 px-3 text-left text-xs rounded-lg border transition-all cursor-pointer flex items-center justify-between focus:outline-none ${optionStyle}`}
                            >
                              <span>{option}</span>
                              {hasAnswered && isCorrect && <span className="text-emerald-700 text-xs">✓</span>}
                              {hasAnswered && isSelected && !isCorrect && <span className="text-rose-600 text-xs">✗</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback Card */}
                      {hasAnswered && (
                        <div className="mt-3 pt-3 border-t border-zinc-100 animate-fade-in-up">
                          <p className="text-[10px] text-zinc-600 leading-relaxed font-medium">
                            <strong className="text-emerald-800">Explanation: </strong>
                            {cat.sampleQuestion.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}