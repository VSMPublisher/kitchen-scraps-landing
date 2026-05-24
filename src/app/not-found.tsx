import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FCFEF9] text-[#2D4A22] font-sans flex flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="text-8xl font-extrabold text-[#49A84D] mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#38761D]">
          Page Not Found
        </h1>
        <p className="text-lg text-[#556B2F] mb-8 leading-relaxed">
          Oops! This page doesn&apos;t exist. Let&apos;s get you back to the
          composting fun.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#49A84D] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#3D8C40] transition-all shadow-lg hover:shadow-xl"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
