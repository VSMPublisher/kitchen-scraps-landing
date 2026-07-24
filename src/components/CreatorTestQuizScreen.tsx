"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Award, 
  CheckCircle, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  Gift, 
  ChevronRight, 
  RotateCcw,
  Check,
  Tv,
  Globe,
  Database,
  RefreshCw
} from "lucide-react";
import { Creator, QuizQuestion, DEFAULT_QUIZ_QUESTIONS } from "@/utils/creators";
import { fetchCreatorQuestionsFromFirestore } from "@/lib/firebase";

interface CreatorTestQuizScreenProps {
  creator: Creator;
  onClose?: () => void;
}

export default function CreatorTestQuizScreen({ creator, onClose }: CreatorTestQuizScreenProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUIZ_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirestoreSynced, setIsFirestoreSynced] = useState(false);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync questions from Firestore database for this specific creator
  useEffect(() => {
    let isMounted = true;

    fetchCreatorQuestionsFromFirestore(creator.id || creator.handle)
      .then((syncedQuestions) => {
        if (!isMounted) return;
        if (syncedQuestions && syncedQuestions.length > 0) {
          setQuestions(syncedQuestions);
          setIsFirestoreSynced(true);
        } else {
          setQuestions(DEFAULT_QUIZ_QUESTIONS);
          setIsFirestoreSynced(false);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch questions for creator test screen:", err);
        if (isMounted) {
          setQuestions(DEFAULT_QUIZ_QUESTIONS);
          setIsFirestoreSynced(false);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [creator]);

  const handleOptionSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    const isCorrect = selectedOption === questions[currentQuestionIdx].correctIdx;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
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
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Top Navigation & Close Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-extrabold text-sm transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Exit Test Screen &amp; Return to Leaderboard</span>
        </button>

        <span className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Interactive Test Screen Sandbox
        </span>
      </div>

      {/* Creator Profile Branding Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-850 to-brand-primary text-white rounded-3xl border border-emerald-950 p-6 sm:p-8 shadow-premium-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg">
            <Image
              src={creator.avatar}
              alt={creator.name}
              fill
              unoptimized
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>

          <div className="space-y-2 grow">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                {creator.name}
              </h2>
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                {renderPlatformIcon(creator.platform)}
                {creator.handle.startsWith("@") ? creator.handle : `@${creator.handle}`}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-xl leading-relaxed">
              Testing custom waste-sorting quiz rules for <strong className="text-amber-300 font-extrabold">{creator.name}</strong>. Synced directly with Android app referral ID <code className="bg-emerald-950/80 font-mono px-1.5 py-0.5 rounded text-amber-200">{creator.id}</code>.
            </p>

            {/* Sync Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="bg-emerald-950/70 border border-emerald-700 text-emerald-200 font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isLoading ? "Syncing..." : isFirestoreSynced ? "Android App Synced" : "Android App Sync"}</span>
              </span>
              <span className="bg-emerald-950/70 border border-emerald-700 text-amber-300 font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? "animate-spin" : ""}`} />
                <span>{questions.length} Synced Questions</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Test Stage */}
      {isLoading ? (
        <div className="bg-white border border-brand-border rounded-3xl p-12 text-center shadow-premium-sm space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display font-extrabold text-brand-primary text-base">
            Syncing Creator Questions for Android App...
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Loading tailored composting questions, custom explanations, and score tracking parameters.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-premium-lg">
          {!quizFinished ? (
            <div>
              {/* Progress Bar & Header */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-black font-mono uppercase text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <span className="bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                    Current Score: {score}
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-700 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Statement Card */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 mb-6 space-y-3">
                {/* Optional Category & Difficulty Badges */}
                {(questions[currentQuestionIdx].category || questions[currentQuestionIdx].difficulty) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {questions[currentQuestionIdx].category && (
                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-md font-mono">
                        {questions[currentQuestionIdx].category}
                      </span>
                    )}
                    {questions[currentQuestionIdx].difficulty && (
                      <span className={`font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-md font-mono border ${
                        questions[currentQuestionIdx].difficulty?.toLowerCase() === "hard"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : questions[currentQuestionIdx].difficulty?.toLowerCase() === "medium"
                          ? "bg-blue-100 text-blue-900 border-blue-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        Difficulty: {questions[currentQuestionIdx].difficulty}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* Optional Image or Emoji Icon */}
                  {questions[currentQuestionIdx].image && (
                    <div className="text-2xl p-2 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 select-none">
                      {questions[currentQuestionIdx].image}
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-primary leading-snug grow">
                    {questions[currentQuestionIdx].question}
                  </h3>
                </div>

                {/* Optional Hint */}
                {questions[currentQuestionIdx].hint && (
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 font-medium flex items-center gap-2">
                    <span className="shrink-0 text-base">💡</span>
                    <span><strong>Creator Hint:</strong> {questions[currentQuestionIdx].hint}</span>
                  </div>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {questions[currentQuestionIdx].options.map((option, idx) => {
                  const isCorrect = idx === questions[currentQuestionIdx].correctIdx;
                  const isSelected = idx === selectedOption;

                  let optionStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
                  if (isSelected) {
                    optionStyle = "bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/30";
                  }
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30";
                    } else if (isSelected) {
                      optionStyle = "bg-red-50 border-red-400 text-red-900 ring-2 ring-red-400/20";
                    } else {
                      optionStyle = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${optionStyle}`}
                    >
                      <span className="text-sm sm:text-base font-semibold">{option}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Soil Science Explanation Box */}
              {isAnswerSubmitted && (
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 mb-6 animate-fade-in text-left">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm mb-1.5">
                    <Sparkles className="w-4 h-4 fill-emerald-800 text-emerald-800" />
                    <span>Soil Science &amp; Composting Explanation:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {questions[currentQuestionIdx].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Test</span>
                </button>

                <div>
                  {selectedOption === null ? (
                    <button
                      disabled
                      className="bg-slate-200 text-slate-400 font-bold px-6 py-3 rounded-xl cursor-not-allowed text-sm"
                    >
                      Select an Option
                    </button>
                  ) : !isAnswerSubmitted ? (
                    <button
                      onClick={handleAnswerSubmit}
                      className="bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold px-6 py-3 rounded-xl cursor-pointer text-sm transition-all shadow-md"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl cursor-pointer text-sm transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <span>
                        {currentQuestionIdx < questions.length - 1 ? "Next Question" : "See Test Results"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Completed Scorecard Screen */
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto border-2 border-amber-300 shadow-inner">
                <Award className="w-10 h-10 text-amber-700" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-primary mb-1">
                  Test Screen Cleared for {creator.name}!
                </h3>
                <p className="text-sm font-bold text-slate-500 font-mono uppercase tracking-wider">
                  Final Score: <span className="text-emerald-800 font-black text-xl">{score}</span> / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </p>
              </div>

              {/* Reward Callout */}
              <div className="bg-brand-soft-bg/40 border border-brand-border rounded-2xl p-6 max-w-xl mx-auto text-left space-y-2">
                <h4 className="font-display font-extrabold text-brand-primary text-base flex items-center gap-2">
                  <Gift className="w-5 h-5 text-emerald-800" />
                  <span>Referral Seeding Link Verified</span>
                </h4>
                <p className="text-xs sm:text-sm text-brand-primary-light font-medium leading-relaxed">
                  Your test run generated a fully valid referral tracking link for <strong>{creator.name}</strong>. Followers who clear this quiz unlock the <strong>Welcome Kit</strong> in the Kitchen Scraps Android mobile app!
                </p>
              </div>

              {/* CTA Controls */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                <Link
                  href={`/download?ref=${encodeURIComponent(creator.id || creator.name)}`}
                  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl shadow-premium cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Test Mobile Download Page</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3.5 px-6 rounded-xl cursor-pointer transition-all"
                >
                  Re-Test Quiz
                </button>
              </div>

              {/* Share Back Link */}
              <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-xl mx-auto">
                <div>
                  <h5 className="font-bold text-xs text-brand-primary">Copy Shareable Quiz Link</h5>
                  <p className="text-[11px] text-slate-500 font-medium">Send this test link directly to {creator.name}.</p>
                </div>
                <button
                  onClick={async () => {
                    const domain = typeof window !== "undefined" ? window.location.origin : "";
                    const link = `${domain}/advocates?creator=${encodeURIComponent(creator.name)}&handle=${encodeURIComponent(creator.handle)}&platform=${creator.platform}`;
                    try {
                      await navigator.clipboard.writeText(link);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    } catch (_err) {
                      // Fallback
                    }
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-900" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Test Link"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
