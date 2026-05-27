export default function Faq() {
  const faqs = [
    {
      q: "Is this really free?",
      a: "Yes. Absolutely free. No signups, no paywalls, no forced popup ads, and no catches. Just open your browser and start building sorting habits instantly.",
    },
    {
      q: "Do I need composting experience?",
      a: "Not at all. The quiz meets you exactly where you are — whether you've never held a bin or you currently manage multiple complex backyard heaps.",
    },
    {
      q: "How long does it take?",
      a: "Each question takes a maximum of 30 seconds. With 10 curated questions across each of our 6 core categories, you can finish an entire practice set in just 5 minutes.",
    },
    {
      q: "What is the Android app?",
      a: "It is the same high-quality quiz built natively for mobile. It downloads your question bank once online, after which it operates 100% offline — perfect for references in the garden, compost bin, or classroom.",
    },
    {
      q: "What topics are covered?",
      a: "Six core categories: what goes in, standard sorting myth-busting, chemical organic science, smelly pile troubleshooting, practical balcony setups, and bokashi/vermicompost methodologies.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-16">
        <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-hero-accent mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-brand-primary-light font-medium max-w-xl mx-auto">
          Need quick answers regarding the quiz app mechanics, platforms, or content? We have you covered.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white border border-brand-border rounded-2xl p-6 shadow-premium-sm [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:shadow-premium select-none"
          >
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h4 className="font-display font-extrabold text-brand-primary text-base sm:text-lg pr-4 group-open:text-brand-hero-accent transition-colors duration-300">
                {faq.q}
              </h4>
              <span className="flex-shrink-0 w-8 h-8 bg-brand-soft-bg text-brand-hero-accent font-bold rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-4 text-sm sm:text-base text-brand-primary-light leading-relaxed font-medium border-t border-brand-border/60 pt-4 animate-fade-in-up">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
