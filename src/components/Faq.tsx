export default function Faq() {
  const faqs = [
    {
      q: "Is this really free?",
      a: "Yes. Absolutely free. No signups, no paywalls, no forced popup ads, and no catches. Just open your browser and start building sorting habits instantly.",
    },
    {
      q: "Is the Android APK safe, and how do I install it?",
      a: "Yes! The application is 100% safe, completely ad-free, and open-source. Because you are downloading it directly rather than through the Play Store, your phone may show a warning prompt. To install safely: (1) Click 'Download for Android', (2) Open the downloaded file from your browser notifications, and (3) If prompted, allow 'Install from Unknown Sources' in your browser settings to finish setup."
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
    {
      q: "Will composting my kitchen scraps attract pests?",
      a: "No, if managed correctly! Pests are attracted to meats, dairy, and oils. Our 'Go/No-Go' quiz module teaches you exactly what to exclude and how to layer carbon-rich 'browns' like shredded cardboard to keep your system clean, safe, and entirely pest-free."
    },
    {
      q: "Can I compost if I live in a small apartment without a backyard?",
      a: "Absolutely! Urban techniques like Bokashi fermentation, compact worm bins, and local drop-off sharing maps make indoor composting seamless. Play our 'Practical Applications' levels to see which method fits your apartment space perfectly."
    },
    {
      q: "What are 'Greens' and 'Browns' and why do they need to be balanced?",
      a: "Think of it as the ultimate composting recipe! 'Greens' (nitrogen) are your wet kitchen scraps, while 'Browns' (carbon) are dry items like paper or dry leaves. Balancing them prevents odors and speeds up decomposition. Test your sorting skills in our interactive game modules!"
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-16">
        {/* FIXED: Swapped h3 -> h2 for a correct sequential layout heading sequence */}
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-hero-accent mb-4">
          Frequently Asked Questions
        </h2>
        {/* FIXED: Swapped pale brand utility with clean high-contrast text-gray-700 */}
        <p className="text-gray-700 font-medium max-w-xl mx-auto">
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
              {/* FIXED: Swapped h4 -> h3 to align layout headers perfectly */}
              <h3 className="font-display font-extrabold text-brand-primary text-base sm:text-lg pr-4 group-open:text-brand-hero-accent transition-colors duration-300">
                {faq.q}
              </h3>
              <span className="flex-shrink-0 w-8 h-8 bg-brand-soft-bg text-brand-hero-accent font-bold rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                ▼
              </span>
            </summary>
            {/* FIXED: Increased color contrast from text-brand-primary-light to high-readability text-gray-700 */}
            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed font-medium border-t border-brand-border/60 pt-4 animate-fade-in-up">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}