"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    Share2,
    Sparkles,
    TrendingUp,
    User,
    Copy,
    Play,
    Compass,
    Gift,
    Check,
    ChevronRight,
    ShieldAlert,
    Tv,
    Globe
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { LEADERBOARD_DATA, Creator } from "@/utils/creators";

// Composting Questions Database for Playable Quiz
interface QuizQuestion {
    question: string;
    options: string[];
    correctIdx: number;
    explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: "Are coffee grounds classified as a Green (Nitrogen) or a Brown (Carbon) in composting?",
        options: [
            "🟢 Green (Nitrogen-rich)",
            "🟤 Brown (Carbon-rich)",
            "❌ Strictly Forbidden"
        ],
        correctIdx: 0,
        explanation: "Even though coffee grounds are dark brown, they are rich in Nitrogen! They serve as energy-packed food for the microbes digesting your pile."
    },
    {
        question: "Which of these kitchen items is strictly forbidden in backyard compost bins?",
        options: [
            "Fruit & vegetable skins",
            "Rinsed & crushed eggshells",
            "Cheese, butter, and frying oils",
            "Unbleached coffee filters"
        ],
        correctIdx: 2,
        explanation: "Dairy products and cooking oils block out critical oxygen, slow down aerobic decomposition, and attract unwanted rodents and pests!"
    },
    {
        question: "What is the perfect baseline ratio of Browns (Carbon) to Greens (Nitrogen) for a sweet-smelling pile?",
        options: [
            "1 Part Brown to 10 Parts Green",
            "2 Parts Brown to 1 Part Green",
            "50 Parts Green to 1 Part Brown"
        ],
        correctIdx: 1,
        explanation: "A balanced 2:1 ratio of dry Carbon-rich Browns (leaves, cardboard) to damp Nitrogen-rich Greens (scraps) maintains airflow and limits bad odors."
    },
    {
        question: "How moist should your composting pile be kept?",
        options: [
            "Bone dry to prevent bugs",
            "Damp like a wrung-out sponge",
            "Completely flooded with standing water"
        ],
        correctIdx: 1,
        explanation: "Microbes and decomposers require moisture to survive and migrate, but excess water drowns them. A damp sponge consistency is perfect!"
    },
    {
        question: "Can you compost cardboard tubes (toilet paper rolls) and clean shredded newspaper?",
        options: [
            "Yes, they make excellent Browns!",
            "No, ink and wood fiber always ruin compost.",
            "Yes, but only if you boil them first."
        ],
        correctIdx: 0,
        explanation: "Yes! Uncoated cardboard, paper tubes, and shredded newsprint are fantastic dry Carbon-rich Browns that keep your heap aerated."
    }
];

export default function AdvocatesPage() {
    // Query parameters state
    const [activeTab, setActiveTab] = useState<"portal" | "builder">("portal");
    const [isUrlLoaded, setIsUrlLoaded] = useState(false);
    const [urlParams, setUrlParams] = useState<{ creator: string; handle: string; platform: string } | null>(null);

    // Custom Quiz Builder State
    const [creatorName, setCreatorName] = useState("");
    const [creatorHandle, setCreatorHandle] = useState("");
    const [creatorPlatform, setCreatorPlatform] = useState<"instagram" | "youtube" | "tiktok" | "blog">("instagram");
    const [generatedLink, setGeneratedLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    // Playable Teaser Quiz State
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Extract URL queries client-side
    useEffect(() => {
        setTimeout(() => {
            setIsUrlLoaded(true);
            if (typeof window !== "undefined") {
                const params = new URLSearchParams(window.location.search);
                const creator = params.get("creator");
                const handle = params.get("handle");
                const platform = params.get("platform") || "instagram";

                if (creator && handle) {
                    setUrlParams({ creator, handle, platform });
                    // Automatically open quiz
                    setActiveTab("portal");
                }
            }
        }, 0);
    }, []);

    // Handle building shareable link
    const handleGenerateQuiz = (e: React.FormEvent) => {
        e.preventDefault();
        if (!creatorName || !creatorHandle) return;

        const domain = typeof window !== "undefined" ? window.location.origin : "https://kitchen-scraps.web.app";
        const slugifiedName = encodeURIComponent(creatorName.trim());
        const slugifiedHandle = encodeURIComponent(creatorHandle.trim());
        const link = `${domain}/advocates?creator=${slugifiedName}&handle=${slugifiedHandle}&platform=${creatorPlatform}`;

        setGeneratedLink(link);
    };

    const handleCopyLink = async () => {
        if (!generatedLink) return;
        try {
            await navigator.clipboard.writeText(generatedLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (_err) {
            // Fallback
        }
    };

    // Playable Quiz Handlers
    const handleOptionSelect = (idx: number) => {
        if (isAnswerSubmitted) return;
        setSelectedOption(idx);
    };

    const handleAnswerSubmit = () => {
        if (selectedOption === null || isAnswerSubmitted) return;

        const isCorrect = selectedOption === QUIZ_QUESTIONS[currentQuestionIdx].correctIdx;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setIsAnswerSubmitted(true);
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setIsAnswerSubmitted(false);

        if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleResetQuiz = () => {
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setScore(0);
        setQuizFinished(false);
    };

    // Helper for platform icons
    const renderPlatformIcon = (platform: "instagram" | "youtube" | "tiktok" | "blog") => {
        switch (platform) {
            case "instagram":
                return (
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                );
            case "youtube":
                return (
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.933-.502-5.837z" />
                        <path fill="#2D4A22" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                );
            case "tiktok":
                return <Tv className="w-3.5 h-3.5 shrink-0" />;
            default:
                return <Globe className="w-3.5 h-3.5 shrink-0" />;
        }
    };

    return (
        <>
            <Header />
            <main className="bg-brand-bg text-brand-primary min-h-screen py-10 px-4 md:px-6 relative overflow-hidden font-sans">

                {/* Background Decors */}
                <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-brand-soft-bg/25 rounded-full blur-[120px] pointer-events-none z-0" />
                <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="max-w-4xl mx-auto relative z-10">

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold text-sm mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Back to Composting Teaser</span>
                    </Link>

                    {/* Dynamic Banner: If playing a custom creator quiz */}
                    {isUrlLoaded && urlParams ? (
                        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl border border-emerald-950 p-6 sm:p-8 shadow-premium-lg mb-8 text-center sm:text-left relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/5 rounded-full" />
                            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4">
                                <Sparkles className="w-3 h-3 fill-slate-950" />
                                Featured Creator Challenge
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-none mb-3">
                                How well do you know {urlParams.creator}&apos;s Composting Rules?
                            </h1>
                            <p className="text-sm sm:text-base text-emerald-100/95 font-medium max-w-2xl leading-relaxed">
                                Test your waste-sorting intelligence now! Brought to you by{" "}
                                <span className="underline decoration-amber-400 decoration-2 font-bold font-mono">
                                    {urlParams.handle}
                                </span>{" "}
                                on {urlParams.platform}. Clear the 5 eco-questions below!
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-10 shadow-premium-lg mb-10 text-center sm:text-left">
                            <span className="inline-block bg-brand-soft-bg text-emerald-900 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                                Advocate Flywheel &amp; Rewards
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-primary tracking-tight leading-none mb-4">
                                Eco-Creator Program
                            </h1>
                            <p className="text-base sm:text-lg text-brand-primary-light font-medium leading-relaxed max-w-2xl">
                                Partner with us to expand global compost intelligence. Get un-gated social tools, track custom referrals, and rise on our organic leaderboard!
                            </p>
                        </div>
                    )}

                    {/* Tab Selection (Hide when a specific quiz parameter is loaded to keep player focused) */}
                    {!urlParams && (
                        <div className="flex border-b border-brand-border mb-8">
                            <button
                                onClick={() => setActiveTab("portal")}
                                className={`py-3.5 px-6 font-display font-extrabold text-sm md:text-base border-b-2 transition-all cursor-pointer ${activeTab === "portal"
                                        ? "border-emerald-800 text-emerald-800"
                                        : "border-transparent text-slate-500 hover:text-emerald-700"
                                    }`}
                            >
                                🏆 Creator Leaderboard
                            </button>
                            <button
                                onClick={() => setActiveTab("builder")}
                                className={`py-3.5 px-6 font-display font-extrabold text-sm md:text-base border-b-2 transition-all cursor-pointer ${activeTab === "builder"
                                        ? "border-emerald-800 text-emerald-800"
                                        : "border-transparent text-slate-500 hover:text-emerald-700"
                                    }`}
                            >
                                🛠️ Custom Quiz Builder
                            </button>
                        </div>
                    )}

                    {/* MAIN CONDITIONAL SECTIONS */}
                    {urlParams ? (
                        /* 1. Dynamic Playable Quiz (Visible only when ?creator URL parameters exist) */
                        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-premium-lg mb-8">
                            {!quizFinished ? (
                                <div>
                                    {/* Progress Header */}
                                    <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6">
                                        <span className="text-xs font-black text-slate-500 font-mono tracking-wider uppercase">
                                            Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                                        </span>
                                        <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            Score: {score}
                                        </span>
                                    </div>

                                    {/* Question */}
                                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-primary mb-6">
                                        {QUIZ_QUESTIONS[currentQuestionIdx].question}
                                    </h3>

                                    {/* Options */}
                                    <div className="space-y-3 mb-6">
                                        {QUIZ_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                                            const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIdx].correctIdx;
                                            const isSelected = idx === selectedOption;

                                            let optionBg = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
                                            if (isSelected) {
                                                optionBg = "bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/20";
                                            }
                                            if (isAnswerSubmitted) {
                                                if (isCorrect) {
                                                    optionBg = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/25";
                                                } else if (isSelected) {
                                                    optionBg = "bg-red-50 border-red-400 text-red-900 ring-2 ring-red-400/20";
                                                } else {
                                                    optionBg = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60 pointer-events-none";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={isAnswerSubmitted}
                                                    onClick={() => handleOptionSelect(idx)}
                                                    className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${optionBg}`}
                                                >
                                                    <span>{option}</span>
                                                    {isAnswerSubmitted && isCorrect && (
                                                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Feedback Explanation */}
                                    {isAnswerSubmitted && (
                                        <div className="bg-brand-soft-bg/40 border border-brand-border/80 rounded-2xl p-4 sm:p-5 mb-6 animate-fade-in text-left">
                                            <div className="flex gap-2 text-emerald-900 font-bold text-sm mb-1.5 items-center">
                                                <Sparkles className="w-4 h-4 fill-emerald-900" />
                                                <span>Soil Science Explanation:</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                                                {QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                                            </p>
                                        </div>
                                    )}

                                    {/* Controller Action */}
                                    <div className="flex justify-end">
                                        {selectedOption === null ? (
                                            <button
                                                disabled
                                                className="bg-slate-300 text-white font-bold px-6 py-3 rounded-xl cursor-not-allowed text-sm"
                                            >
                                                Submit Answer
                                            </button>
                                        ) : !isAnswerSubmitted ? (
                                            <button
                                                onClick={handleAnswerSubmit}
                                                className="bg-emerald-800 hover:bg-emerald-950 text-white font-black px-6 py-3 rounded-xl cursor-pointer text-sm transition-all"
                                            >
                                                Submit Answer
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNextQuestion}
                                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl cursor-pointer text-sm transition-all flex items-center gap-1.5"
                                            >
                                                <span>
                                                    {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Final Score"}
                                                </span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Quiz Complete Card with custom referral callout */
                                <div className="text-center py-6 sm:py-8">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-300">
                                        <Award className="w-8 h-8 text-amber-700" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-primary mb-2">
                                        Teaser Quiz Cleared!
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-500 mb-6 font-mono uppercase tracking-wider">
                                        Your Score: <span className="text-emerald-800 font-black font-sans text-lg">{score}</span> / {QUIZ_QUESTIONS.length}
                                    </p>

                                    <div className="bg-brand-soft-bg/30 border border-brand-border rounded-2xl p-5 mb-8 max-w-xl mx-auto text-left">
                                        <h4 className="font-display font-extrabold text-sm text-emerald-800 mb-2 flex items-center gap-1.5">
                                            <Gift className="w-4 h-4" />
                                            Special Reward Pack Locked!
                                        </h4>
                                        <p className="text-xs sm:text-sm text-brand-primary-light font-medium leading-relaxed">
                                            Amazing job sorting those scraps! {urlParams.creator} wants you to keep learning. Download the full **Kitchen Scraps App** to unlock 50+ eco-puzzles, track daily composting streaks, and cultivate healthy living soil.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                        <Link
                                            href={`/download?ref=${encodeURIComponent(urlParams.creator)}`}
                                            className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl shadow-premium cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <span>Get the Full Android App</span>
                                            <ChevronRight className="w-4.5 h-4.5" />
                                        </Link>
                                        <button
                                            onClick={handleResetQuiz}
                                            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3.5 px-6 rounded-xl cursor-pointer transition-all"
                                        >
                                            Play Again
                                        </button>
                                    </div>

                                    {/* Share Back Section */}
                                    <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-xl mx-auto">
                                        <div>
                                            <h5 className="font-bold text-xs text-brand-primary">Spread the word!</h5>
                                            <p className="text-[11px] text-slate-500 font-medium">Let your friends beat your composting score.</p>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                const domain = typeof window !== "undefined" ? window.location.href : "";
                                                try {
                                                    await navigator.clipboard.writeText(
                                                        `I scored ${score}/${QUIZ_QUESTIONS.length} on the Kitchen Scraps Composting Challenge brought to you by ${urlParams.creator}! Play it here: ${domain}`
                                                    );
                                                    alert("Teaser scorecard link copied to clipboard!");
                                                } catch (_err) {
                                                    // Fallback
                                                }
                                            }}
                                            className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black py-2 px-4 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shrink-0"
                                        >
                                            <Share2 className="w-3.5 h-3.5" />
                                            Copy Scorecard Link
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : activeTab === "portal" ? (
                        /* 2. Leaderboard Portal Section */
                        <div className="space-y-8 animate-fade-in">
                            {/* Leaderboard Summary banner */}
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center border border-amber-300 shrink-0">
                                    <Award className="w-6 h-6 text-amber-700" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-display font-extrabold text-brand-primary text-base">
                                        Alternative Compensation: The Leaderboard Hack
                                    </h4>
                                    <p className="text-xs sm:text-sm text-brand-primary-light font-medium leading-relaxed">
                                        We substitute paid ads with social credit. Rise on our weekly leaderboard below! The creator who drives the most APK downloads gets featured directly on the Main Dashboard of our Android app, routing organic traffic back to their channel!
                                    </p>
                                    <p className="text-[11px] text-amber-900/80 font-semibold italic mt-1.5">
                                        🛡️ Security & Sandbox Compliance: Current creator records listed below are pre-set sandbox placeholders used for program simulation and secure tracking verification until official brand deals and partner contracts are finalized.
                                    </p>
                                </div>
                            </div>

                            {/* Creator of Month Showcase */}
                            <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-premium-lg flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                                <div className="absolute right-0 top-0 bg-amber-400 text-slate-950 font-black text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-bl-xl shadow-premium-sm">
                                    CREATOR OF THE MONTH
                                </div>

                                {/* Avatar */}
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0">
                                    <Image
                                        src={LEADERBOARD_DATA[0].avatar}
                                        alt={LEADERBOARD_DATA[0].name}
                                        fill
                                        referrerPolicy="no-referrer"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="space-y-2 text-center sm:text-left flex-grow">
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                        <h3 className="font-display font-black text-xl text-brand-primary">
                                            {LEADERBOARD_DATA[0].name}
                                        </h3>
                                        <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1 font-mono">
                                            {renderPlatformIcon(LEADERBOARD_DATA[0].platform)}
                                            {LEADERBOARD_DATA[0].handle}
                                        </span>
                                    </div>

                                    <p className="text-xs sm:text-sm text-brand-primary-light font-semibold">
                                        Driven Installs: <strong className="text-emerald-800 text-base">{LEADERBOARD_DATA[0].downloads} downloads</strong>
                                    </p>

                                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md">
                                        Chef Sarah shares zero-waste cooking techniques and balconies garden soil tips. She was crowned this month&apos;s champion and is currently featured inside our main mobile dashboard!
                                    </p>
                                </div>
                            </div>

                            {/* Leaderboard Table Grid */}
                            <div className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-premium-sm">
                                <div className="bg-brand-soft-bg/40 px-6 py-4 border-b border-brand-border">
                                    <h3 className="font-display font-extrabold text-sm sm:text-base text-emerald-900 tracking-tight flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-800" />
                                        Weekly Advocate Standings
                                    </h3>
                                </div>

                                <div className="divide-y divide-brand-border">
                                    {LEADERBOARD_DATA.map((creator) => (
                                        <div
                                            key={creator.id}
                                            className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                                        >
                                            {/* Left: Rank & Profile details */}
                                            <div className="flex items-center gap-4">
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${creator.rank === 1
                                                        ? "bg-amber-400 text-slate-950 border border-amber-500"
                                                        : creator.rank === 2
                                                            ? "bg-slate-200 text-slate-800 border border-slate-300"
                                                            : creator.rank === 3
                                                                ? "bg-amber-600/20 text-amber-900 border border-amber-600/30"
                                                                : "bg-slate-100 text-slate-500"
                                                    }`}>
                                                    {creator.rank}
                                                </span>

                                                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-brand-border shrink-0">
                                                    <Image
                                                        src={creator.avatar}
                                                        alt={creator.name}
                                                        fill
                                                        referrerPolicy="no-referrer"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-display font-extrabold text-sm text-brand-primary">
                                                            {creator.name}
                                                        </span>
                                                        <span className="text-[10px] text-emerald-800 font-extrabold bg-brand-soft-bg px-2 py-0.5 rounded-full">
                                                            {creator.badge}
                                                        </span>
                                                    </div>

                                                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono font-semibold mt-0.5">
                                                        {renderPlatformIcon(creator.platform)}
                                                        {creator.handle}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right: Metrics & Link */}
                                            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                                <div className="text-left sm:text-right">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Downloads Driven</span>
                                                    <span className="font-extrabold text-sm sm:text-base text-emerald-800 font-mono">
                                                        {creator.downloads}
                                                    </span>
                                                </div>

                                                {/* Test URL */}
                                                <Link
                                                    href={`/advocates?creator=${encodeURIComponent(creator.name)}&handle=${encodeURIComponent(creator.handle)}&platform=${creator.platform}`}
                                                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-3.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Play className="w-3 h-3 fill-slate-800" />
                                                    <span>Test Quiz</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* 3. Custom Quiz Builder Section (Tab: builder) */
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                                <h3 className="font-display font-extrabold text-brand-primary text-base mb-1.5">
                                    1. Developer Tool: Generating Custom Seeding Quizzes
                                </h3>
                                <p className="text-xs sm:text-sm text-brand-primary-light font-medium leading-relaxed">
                                    Generate customized mobile/web seeding quiz links with your creator details automatically embedded. Your name and handles are featured right at the top header, and your referral ID tracks all driven downloads in background database metrics securely.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-12 gap-8">
                                {/* Builder Form Box */}
                                <form
                                    onSubmit={handleGenerateQuiz}
                                    className="md:col-span-7 bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-premium-sm space-y-5"
                                >
                                    <h4 className="font-display font-extrabold text-base text-emerald-800 tracking-tight pb-2 border-b border-brand-border">
                                        🛠️ Creator Parameters
                                    </h4>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-wide block">
                                            Creator / Channel Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Chef Sarah"
                                            value={creatorName}
                                            onChange={(e) => setCreatorName(e.target.value)}
                                            className="w-full bg-slate-50 border border-brand-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-wide block">
                                            Social Handle
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. @chef_sarah_cooking"
                                            value={creatorHandle}
                                            onChange={(e) => setCreatorHandle(e.target.value)}
                                            className="w-full bg-slate-50 border border-brand-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-wide block">
                                            Primary Social Platform
                                        </label>
                                        <select
                                            value={creatorPlatform}
                                            onChange={(e) => setCreatorPlatform(e.target.value as "instagram" | "youtube" | "tiktok" | "blog")}
                                            className="w-full bg-slate-50 border border-brand-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 font-medium"
                                        >
                                            <option value="instagram">Instagram</option>
                                            <option value="tiktok">TikTok</option>
                                            <option value="youtube">YouTube</option>
                                            <option value="blog">Website / Blog</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-premium cursor-pointer transition flex items-center justify-center gap-1.5"
                                    >
                                        <Sparkles className="w-4 h-4 fill-white" />
                                        <span>Generate Custom Teaser Quiz</span>
                                    </button>
                                </form>

                                {/* Live Preview Card */}
                                <div className="md:col-span-5 space-y-6">
                                    <div className="bg-slate-50 border border-brand-border/80 rounded-3xl p-5 text-left">
                                        <h4 className="font-display font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-3">
                                            Link Generation Output
                                        </h4>

                                        {generatedLink ? (
                                            <div className="space-y-4">
                                                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                                                    Your customized quiz is ready to deploy! Share this link on your link-in-bio or stories. Followers can play the game immediately with your brand featured.
                                                </p>

                                                <div className="bg-white border border-brand-border rounded-xl p-3 select-all break-all text-xs font-mono font-bold text-slate-800">
                                                    {generatedLink}
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleCopyLink}
                                                        className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-extrabold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                                                    >
                                                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                        <span>{isCopied ? "Copied!" : "Copy Link"}</span>
                                                    </button>

                                                    <Link
                                                        href={generatedLink}
                                                        className="bg-white border border-brand-border hover:bg-slate-100 text-slate-700 text-xs font-extrabold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                                                    >
                                                        <Play className="w-3.5 h-3.5 fill-slate-700" />
                                                        <span>Launch Quiz</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-10 space-y-3">
                                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                                                    <Compass className="w-5 h-5 text-slate-400" />
                                                </div>
                                                <p className="text-xs font-bold text-slate-400">
                                                    Fill out the form to instantly generate your dynamic URL!
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Security Info Card */}
                                    <div className="bg-white border border-brand-border rounded-2xl p-5 text-left">
                                        <div className="flex items-center gap-2 text-brand-primary font-bold text-xs mb-1.5">
                                            <ShieldAlert className="w-4 h-4 text-emerald-800" />
                                            <span>Security &amp; Abuse Prevention</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                            To prevent fraud and preserve leaderboard integrity, our system verifies unique Android device parameters. Referrals are credited organically at first-launch, ensuring a zero-ad high trust loop.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </>
    );
}
