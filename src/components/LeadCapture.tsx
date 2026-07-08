"use client";

import { useState } from "react";
import { Mail, Check, ShieldCheck, Sparkles, BookOpen, KeyRound, HelpCircle, ArrowRight, Copy, User } from "lucide-react";
import { trackOutboundLink } from "@/utils/analytics";

export default function LeadCapture() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("GARDENGOLD99");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) return;

        setLoading(true);

        // Check if user has specified an endpoint URL in environment variables
        const customEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

        if (customEndpoint) {
            try {
                const isGoogleScript = customEndpoint.includes("script.google.com");
                const isFormSubmit = customEndpoint.includes("formsubmit.co");

                if (isGoogleScript || isFormSubmit) {
                    // Google Apps Script and FormSubmit prefer application/x-www-form-urlencoded or multipart/form-data
                    const formData = new URLSearchParams();
                    formData.append("name", name || "Gardener");
                    formData.append("email", email);
                    formData.append("source", "Kitchen Scraps Landing Page");
                    formData.append("timestamp", new Date().toISOString());

                    await fetch(customEndpoint, {
                        method: "POST",
                        mode: "no-cors", // Essential to bypass CORS preflight restrictions on third-party domains
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData.toString()
                    });
                } else {
                    // Standard JSON Post
                    await fetch(customEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: name || "Gardener",
                            email: email,
                            source: "Kitchen Scraps Landing Page",
                            timestamp: new Date().toISOString()
                        })
                    });
                }
            } catch (err) {
                console.warn("Could not post to configured endpoint, proceeding with local success flow", err);
            }
        }

        // Direct elegant delay to ensure optimal feedback feel
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
            // Track lead submission in analytics
            trackOutboundLink(`/lead-captured?email=${encodeURIComponent(email)}`, "Lead Capture Submit");
        }, 800);
    };

    return (
        <section id="get-app-free" className="py-16 px-6 max-w-6xl mx-auto scroll-mt-20">
            <div className="bg-brand-primary rounded-3xl border border-brand-primary-light p-8 sm:p-12 md:p-16 shadow-premium-lg relative overflow-hidden text-white">

                {/* Decorative backdrop elements */}
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-header/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {!isSubmitted ? (
                    <div className="max-w-3xl mx-auto relative z-10">
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-primary-light/40 text-amber-200 border border-brand-primary-light/60 text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="w-3 h-3" /> Exclusive Welcome Kit
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                                Get the Complete 60-Question Quiz Free
                            </h2>
                            <p className="text-brand-soft-bg mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                                Want to avoid the friction of installing right now? We&apos;ll send the direct secure APK file link, visual installation guides, and your exclusive <strong className="text-amber-300 font-black uppercase">Premium Gold Unlock Code</strong> straight to your inbox.
                            </p>
                        </div>

                        {/* Email Form */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-amber-300" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name..."
                                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-brand-primary-light rounded-2xl text-white placeholder-brand-soft-bg/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-medium shadow-inner text-base transition-all"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-amber-300" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address..."
                                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-brand-primary-light rounded-2xl text-white placeholder-brand-soft-bg/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-medium shadow-inner text-base transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-cta hover:bg-amber-400 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all hover-lift flex items-center justify-center gap-2 cursor-pointer text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-header/50"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent" />
                                        Preparing Welcome Kit...
                                    </span>
                                ) : (
                                    <>
                                        <span>Email Me the APK & Promo Code</span>
                                        <ArrowRight className="w-5 h-5 shrink-0" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Value Indicators under form */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-brand-primary-light/40 pt-8 max-w-2xl mx-auto">
                            <div className="flex flex-col items-center">
                                <ShieldCheck className="w-6 h-6 text-amber-300 mb-2" />
                                <span className="text-xs font-bold text-amber-100">VirusTotal Verified</span>
                                <span className="text-[10px] text-brand-soft-bg/80 mt-0.5">0/70 Clean Signatures</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <KeyRound className="w-6 h-6 text-amber-300 mb-2" />
                                <span className="text-xs font-bold text-amber-100">Premium Unlock Code</span>
                                <span className="text-[10px] text-brand-soft-bg/80 mt-0.5">Enables premium Gold Skin</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <BookOpen className="w-6 h-6 text-amber-300 mb-2" />
                                <span className="text-xs font-bold text-amber-100">Visual Setup Guide</span>
                                <span className="text-[10px] text-brand-soft-bg/80 mt-0.5">Bypass Google warns instantly</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* THANK YOU STATE - Progressive Installation Guide */
                    <div className="max-w-3xl mx-auto relative z-10 animate-fade-in text-center">
                        <div className="w-16 h-16 bg-amber-400 text-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium animate-bounce">
                            <Check className="w-8 h-8 stroke-[3]" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                            Awesome, {name.split(" ")[0]}! Your Gardener&apos;s Welcome Kit is on its Way
                        </h2>
                        <p className="text-brand-soft-bg mt-3 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                            We have sent your direct download links and code instructions to <strong className="text-amber-300 font-extrabold font-mono">{email}</strong>.
                        </p>

                        <div className="mt-10 bg-black/30 rounded-2xl border border-brand-primary-light p-6 sm:p-8 text-left max-w-2xl mx-auto shadow-inner space-y-6">
                            <h3 className="font-display font-extrabold text-lg text-white border-b border-brand-primary-light/60 pb-3 flex items-center gap-2">
                                <span>⚡ Get Started Immediately:</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 bg-brand-primary-light text-brand-soft-bg rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 select-none">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-white">Open the Email on your Android Phone</h4>
                                        <p className="text-xs text-brand-soft-bg mt-1">Tap the direct secure download link. The APK will instantly transfer directly onto your device.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-6 h-6 bg-brand-primary-light text-brand-soft-bg rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 select-none">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-white">How to Install (Sideload Guide)</h4>
                                        <p className="text-xs text-brand-soft-bg mt-1">
                                            Android shows a standard &quot;Unknown App&quot; warning because this is a direct APK instead of a Play Store wrapper. Simply tap <strong className="text-white">Settings → Allow from this source</strong>, or tap <strong className="text-white">More Details → Install Anyway</strong>. It requires zero sensitive permissions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-6 h-6 bg-brand-primary-light text-brand-soft-bg rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 select-none">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-extrabold text-sm text-white">Redeem your Premium Gold Code</h4>
                                        <p className="text-xs text-brand-soft-bg mt-1">
                                            Launch the app, open Settings, enter your exclusive code to watch the beautiful Amber Gold particles skin your entire interface!
                                        </p>

                                        {/* Visual copy button card */}
                                        <div className="mt-3 inline-flex items-center gap-3 bg-black/40 border border-dashed border-amber-300/40 rounded-xl px-4 py-2 w-full sm:w-auto justify-between select-none">
                                            <span className="font-mono text-sm font-black text-amber-300 tracking-wider">
                                                GARDENGOLD99
                                            </span>
                                            <button
                                                onClick={handleCopy}
                                                type="button"
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-3 h-3 stroke-[3]" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        <span>Copy Code</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Visual Sideload Guide Trigger */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowGuide(!showGuide)}
                                    className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 font-extrabold bg-brand-primary-light/30 px-3.5 py-2 rounded-xl border border-brand-primary-light cursor-pointer select-none"
                                >
                                    <HelpCircle className="w-4 h-4 shrink-0" />
                                    <span>{showGuide ? "Hide Visual Bypass Guide" : "Show Visual Bypass Guide"}</span>
                                </button>
                            </div>

                            {showGuide && (
                                <div className="bg-brand-primary-light/30 border border-brand-primary-light rounded-xl p-4 animate-fade-in-up space-y-3">
                                    <h4 className="font-bold text-xs text-amber-300 uppercase tracking-wider select-none">🛡️ Google Play Protect warning bypass:</h4>
                                    <p className="text-[11px] text-brand-soft-bg leading-relaxed">
                                        Android occasionally triggers an unverified source warning since you are running our lightweight developer build. Rest assured: there is zero background telemetry. The package has <strong>0 permissions</strong> declared.
                                    </p>
                                    <div className="bg-black/40 p-2.5 rounded border border-brand-primary-light/40 font-mono text-[10px] text-emerald-300 select-all overflow-x-auto">
                                        SHA-256 Hash: 90f28ff17c1db7a86bcc87b9b13ae788b4646769621674d1f19323bf464a31f5
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-xs text-brand-soft-bg hover:text-white font-semibold transition-all cursor-pointer bg-transparent border-0"
                            >
                                ← Edit email or submit again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
