"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EducatorsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [school, setSchool] = useState("");
    const [zip, setZip] = useState("");
    const [intendedUse, setIntendedUse] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !school) {
            setErrorMessage("Please fill out your name, email, and organization.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const customEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
        if (!customEndpoint) {
            // Demo mode fallback
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
            }, 1000);
            return;
        }

        try {
            const response = await fetch(customEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    action: "educator_request",
                    name,
                    email,
                    school,
                    zip: zip || "none",
                    intendedUse: intendedUse || "Classroom Instruction",
                    source: `Educator Request (${school})`
                })
            });

            const data = await response.json();
            if (data.status === "success") {
                setSuccess(true);
            } else {
                setErrorMessage(data.message || "Failed to submit request. Please try again.");
            }
        } catch (_err) {
            setErrorMessage("Network error: Failed to connect to the registration service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="bg-brand-bg text-brand-primary min-h-screen py-12 px-4 md:px-6 relative overflow-hidden font-sans">

                {/* Decorative Leaf SVG Accents */}
                <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-soft-bg/30 rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="max-w-4xl mx-auto relative z-10">

                    {/* Back Navigation Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold text-sm mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Back to Composting Teaser</span>
                    </Link>

                    {/* Hero Banner Section */}
                    <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-10 shadow-premium-lg mb-10 text-center sm:text-left">
                        <span className="inline-block bg-brand-soft-bg text-emerald-900 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                            Free Seeding Program
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-primary tracking-tight leading-none mb-4">
                            Compost Educator Toolkit
                        </h1>
                        <p className="text-base sm:text-lg text-brand-primary-light font-medium leading-relaxed max-w-2xl">
                            Empower your students, garden club, or eco-society. We provide un-gated, print-ready waste sorting guides, classroom posters, and interactive lesson prompts—100% free.
                        </p>
                    </div>

                    {/* Grid Layout: Left Column (Downloads), Right Column (Registration) */}
                    <div className="grid md:grid-cols-12 gap-8 items-start">

                        {/* Downloadable Assets Deck (8 Cols/Full Width depending on device) */}
                        <div className="md:col-span-7 space-y-6">
                            <h2 className="font-display font-extrabold text-xl text-emerald-800 tracking-tight pb-3 border-b border-brand-border">
                                🎒 Download Print-Ready Materials
                            </h2>

                            {/* Asset Card 1 */}
                            <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-premium-sm hover:shadow-premium transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display font-extrabold text-sm sm:text-base text-brand-primary">
                                            1. Classroom Sorting Flowchart
                                        </h3>
                                        <p className="text-xs text-brand-primary-light mt-1.5 leading-relaxed">
                                            A full-color, high-contrast visual flow chart illustrating exactly where household kitchen scraps belong. Perfect for mounting above community waste stations.
                                        </p>
                                        <a
                                            href="/flowchart-printout.svg"
                                            download="kitchen-scraps-flowchart.svg"
                                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 underline decoration-2 underline-offset-4 cursor-pointer"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Printable Vector SVG</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Card 2 */}
                            <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-premium-sm hover:shadow-premium transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                                        <Image
                                            src="/app-icon.png"
                                            alt="Teaser Icon"
                                            width={24}
                                            height={24}
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display font-extrabold text-sm sm:text-base text-brand-primary">
                                            2. Interactive Teaser Poster with QR
                                        </h3>
                                        <p className="text-xs text-brand-primary-light mt-1.5 leading-relaxed">
                                            Hang this in your community garden or classroom. Includes a scan-able QR code that instantly launches our interactive Kitchen Scraps web teaser!
                                        </p>
                                        <a
                                            href="/poster-printout.svg"
                                            download="kitchen-scraps-interactive-poster.svg"
                                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 underline decoration-2 underline-offset-4 cursor-pointer"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Printable Vector SVG</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Card 3 */}
                            <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-premium-sm hover:shadow-premium transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shrink-0 text-xl">
                                        ✏️
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display font-extrabold text-sm sm:text-base text-brand-primary">
                                            3. Composting Kids Lesson Plan & Worksheet
                                        </h3>
                                        <p className="text-xs text-brand-primary-light mt-1.5 leading-relaxed">
                                            A simple, structured curriculum guide with 5 engaging chemistry experiments and homework sorting quizzes tailored for K-12 instruction.
                                        </p>
                                        <a
                                            href="/worksheet-printout.svg"
                                            download="kitchen-scraps-kids-worksheet.svg"
                                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 underline decoration-2 underline-offset-4 cursor-pointer"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Printable Vector SVG</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Registration Form (5 Cols) */}
                        <div className="md:col-span-5 bg-white border border-brand-border rounded-3xl p-6 shadow-premium-lg">
                            {!success ? (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <h3 className="font-display font-extrabold text-lg text-emerald-900 tracking-tight leading-snug">
                                        Request Printed Kits & Live Worksheets
                                    </h3>
                                    <p className="text-xs text-brand-primary-light leading-normal">
                                        Sign up to join our environmental educator directory. We will email you notifications about updated worksheet releases and printed materials!
                                    </p>

                                    {errorMessage && (
                                        <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-xl p-3 text-center">
                                            ⚠️ {errorMessage}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="block text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                                            Your Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Sarah Jennings"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-[#FAF9F5] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-header font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="sarah.j@school.edu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-[#FAF9F5] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-header font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                                            School / Organization Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Oak Valley Elementary"
                                            value={school}
                                            onChange={(e) => setSchool(e.target.value)}
                                            className="w-full bg-[#FAF9F5] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-header font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                                            Zip / Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 90210"
                                            value={zip}
                                            onChange={(e) => setZip(e.target.value)}
                                            className="w-full bg-[#FAF9F5] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-header font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                                            Intended Use Case
                                        </label>
                                        <select
                                            value={intendedUse}
                                            onChange={(e) => setIntendedUse(e.target.value)}
                                            className="w-full bg-[#FAF9F5] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-header font-medium"
                                        >
                                            <option value="K-12 School Classroom">K-12 School Classroom</option>
                                            <option value="University Ecology Course">University Ecology Course</option>
                                            <option value="Local Composting Club">Local Composting Club</option>
                                            <option value="Backyard / Household Practice">Backyard / Household Practice</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-brand-header hover:bg-brand-hero-accent text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-premium"
                                    >
                                        {loading ? "Submitting..." : "Submit Seeding Request"}
                                    </button>

                                    <p className="text-[10px] text-center text-brand-primary-light">
                                        🔒 Registration logs securely in Google Sheets. Only print-ready PDF assets are mailed back.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl mx-auto">
                                        🎉
                                    </div>
                                    <h3 className="font-display font-extrabold text-lg text-emerald-950">
                                        Seeding Request Logged!
                                    </h3>
                                    <p className="text-xs text-brand-primary-light leading-relaxed">
                                        Thank you, <strong>{name}</strong>. We have securely registered your request for <strong>{school}</strong> on our Google Sheet. An automated email with printable educational guides has been sent to <strong>{email}</strong>!
                                    </p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="bg-brand-soft-bg text-emerald-950 hover:bg-brand-soft-bg/85 font-extrabold text-xs py-2 px-4 rounded-xl transition"
                                    >
                                        Register Another Group
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Core Values / Philosophy Callout */}
                    <div className="bg-[#FAF9F5] border border-dashed border-emerald-900/10 rounded-3xl p-6 sm:p-8 mt-12 text-center">
                        <h3 className="font-display font-extrabold text-lg text-emerald-950 mb-2">
                            🌿 Our Organic Seeding Philosophy
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-primary-light leading-relaxed max-w-2xl mx-auto">
                            We believe knowledge is the most powerful tool for sustainability. By providing educators, master gardeners, and neighborhood leaders with free, beautiful assets, we hope to eliminate composting trial-and-error—one community at a time.
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
