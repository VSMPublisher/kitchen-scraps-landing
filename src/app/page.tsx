import Link from "next/link";

export default function LandingPage() {
  const categories = [
    { title: "Go/No-Go 🎯", desc: "Quick decisions on what can be safely composted." },
    { title: "Myths vs. Facts ❓", desc: "Distinguish composting myths from scientific facts." },
    { title: "The 'Why' Logic 💡", desc: "Understand the science behind the composting rules." },
    { title: "Troubleshooting ⚠️", desc: "Learn to solve common composting problems." },
    { title: "Practical Apps ⭐", desc: "Integrating composting into your daily life." },
    { title: "Systems & Methods 🏆", desc: "Explore Bokashi, Vermicomposting, and more." },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#3cd406] text-white py-20 px-6 text-center shadow-lg">
        <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
          Master Composting Today! 🍃
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium">
          The ultimate interactive quiz for environmentally conscious individuals. 
          Stop guessing and start composting like a pro.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link 
            href="https://kitchen-scraps-quiz.web.app" 
            className="bg-white text-[#3cd406] px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-md"
          >
            Play in Web Browser
          </Link>
          <button className="bg-[#E9B15D] text-white px-8 py-4 rounded-full font-bold text-xl cursor-not-allowed opacity-80 shadow-md">
            Android App (Coming Soon)
          </button>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          6 Expert-Crafted Categories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-[#95e17a] hover:scale-105 transition-transform">
              <h3 className="font-bold text-xl mb-3 text-gray-800">{cat.title}</h3>
              <p className="text-gray-600">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE HIGHLIGHT */}
      <section className="bg-[#95e17a] py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Gamified Learning Experience</h2>
          <p className="text-lg mb-8">
            Features 30-second countdown timers, a credit-based hint system, 
            and immediate expert feedback on every question.
          </p>
          <div className="flex flex-wrap justify-center gap-10 font-bold">
            <div className="bg-white text-gray-800 p-4 rounded-lg">⚡ 60+ Questions</div>
            <div className="bg-white text-gray-800 p-4 rounded-lg">⏰ 30s Timer</div>
            <div className="bg-white text-gray-800 p-4 rounded-lg">💡 Hint System</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center border-t border-gray-200 text-gray-500">
        <p className="mb-4">© 2023 Kitchen Scraps & Food Waste Quiz App</p>
        <div className="flex justify-center gap-6 underline text-sm">
           {/* Replace with your actual legal links later */}
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </footer>
    </main>
  );
}