export default function CtaCloser() {
  return (
    <section className="bg-brand-bg py-12 px-4 border-t border-brand-primary/5">
      {/* Container Card that separates it from the FAQ above */}
      <div className="max-w-4xl mx-auto bg-emerald-50/40 rounded-3xl p-8 md:p-12 text-center border border-emerald-600/10 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-tight font-sans">
          Ready to Stop Second-Guessing Your Waste?
        </h2>
        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-md mx-auto">
          Get the free app now and instantly master composting rules in just 30 seconds.
        </p>
        
        {/* Balanced Button Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button className="bg-brand-header hover:bg-brand-header-light text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md w-full sm:w-auto text-sm">
            Play Free in Web Browser
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-medium px-6 py-3 rounded-xl transition-all shadow-md w-full sm:w-auto text-sm">
            Download for Android
          </button>
        </div>
        
        {/* Private & Trust Micro-copy */}
        <p className="text-xs text-gray-600 mt-5 tracking-wide">
          No signup required • 100% Ad-Free • Zero Device Permissions Required
        </p>
      </div>
    </section>
  );
}