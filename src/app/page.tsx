import Link from "next/link";

export default function LandingPage() {
  const categories = [
    { title: "Go/No-Go 🎯", desc: "Quick decisions on what can be safely composted." },
    { title: "Myths vs. Facts ❓", desc: "Distinguish composting myths from scientific facts." },
    { title: "The Why Logic 💡", desc: "Understand the science behind the composting rules." },
    { title: "Troubleshooting ⚠️", desc: "Learn to solve common composting problems." },
    { title: "Practical Apps ⭐", desc: "Integrating composting into your daily life." },
    { title: "Systems & Methods 🏆", desc: "Explore Bokashi, Vermicomposting, and more." },
  ];

  return (
    // Background is now a very light, clean "Mint Cream" - fresh but easy on eyes
    <main className="min-h-screen bg-[#F8FDF5] text-[#2D4A22] font-sans">
      
      {/* HEADER - Solid Brand Green */}
      <header className="bg-[#49A84D] py-5 px-6 text-center shadow-md">
        <h1 className="text-white font-bold text-2xl tracking-tight">
          Kitchen Scraps & Food Waste Quiz
        </h1>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#38761D] leading-tight">
          Master Composting Today! <span className="inline-block">🍃</span>
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-[#556B2F] max-w-3xl mx-auto leading-relaxed font-medium">
          The ultimate interactive tool for promoting sustainable food waste practices. 
          Test your knowledge and empower your eco-friendly lifestyle.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link 
            href="https://kitchen-scraps-quiz.web.app" 
            className="bg-[#49A84D] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-[#3D8C40] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Play in Web Browser
          </Link>
          <button className="bg-white border-2 border-[#A9C4A0] text-[#7A9671] px-12 py-5 rounded-2xl font-bold text-xl cursor-not-allowed shadow-sm">
            Android App (Soon)
          </button>
        </div>
      </section>

      {/* CATEGORIES SECTION - Restored Symbols and Vibrancy */}
      <section className="py-16 px-6 max-w-6xl mx-auto bg-white rounded-[3rem] shadow-sm border border-[#F1F5EE]">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#38761D]">
          6 Expert-Crafted Categories
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="bg-[#F9FBF7] p-8 rounded-3xl border-b-4 border-[#49A84D] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
              <h4 className="font-bold text-2xl mb-4 text-[#2D4A22]">{cat.title}</h4>
              <p className="text-[#556B2F] text-base leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES - Vibrant Mint Section */}
      <section className="py-20 px-6 mt-16 bg-[#F1F8EE] text-center border-y border-[#E2EADA]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-[#38761D]">Gamified Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#D9E4D4] font-bold text-lg">⏰ 30s Timer</div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#D9E4D4] font-bold text-lg">⚡ Streaks</div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#D9E4D4] font-bold text-lg">💡 Hints</div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#D9E4D4] font-bold text-lg">📝 Feedback</div>
          </div>
        </div>
      </section>

      {/* FOOTER - Professional Darker Green Footer */}
      <footer className="bg-[#2D4A22] py-16 px-6 text-center text-[#A9C4A0]">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-white font-bold text-xl mb-6">Kitchen Scraps & Food Waste Quiz</h4>
          <p className="mb-8 opacity-80 italic">"Empowering sustainable habits through interactive education."</p>
          <div className="flex justify-center gap-10 font-bold text-white mb-10">
            <Link href="#" className="hover:text-[#49A84D] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#49A84D] transition-colors">Terms of Service</Link>
          </div>
          <div className="pt-8 border-t border-[#3D5C31] text-xs opacity-60">
            © 2023 VSMPublisher. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}