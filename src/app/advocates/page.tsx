"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Play, 
  Compass, 
  Check, 
  ShieldAlert,
  Tv,
  Globe
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorTestQuizScreen from "@/components/CreatorTestQuizScreen";

import { LEADERBOARD_DATA, Creator, getCreator, saveCreatorToCache } from "@/utils/creators";
import { fetchAllCreatorsFromFirestore, fetchCreatorFromFirestore } from "@/lib/firebase";

export default function AdvocatesPage() {
  // Navigation and active creator test screen state
  const [activeTab, setActiveTab] = useState<"portal" | "builder">("portal");
  const [creatorsList, setCreatorsList] = useState<Creator[]>(LEADERBOARD_DATA);
  const [testingCreator, setTestingCreator] = useState<Creator | null>(null);

  // Fetch live creators from Firestore database
  useEffect(() => {
    fetchAllCreatorsFromFirestore()
      .then((fetched) => {
        if (fetched && fetched.length > 0) {
          const map = new Map<string, Creator>();

          const getKey = (c: Creator) => {
            return (c.id || c.handle || c.name)
              .toLowerCase()
              .trim()
              .replace(/^@/, "")
              .replace(/_(instagram|youtube|tiktok|blog)$/i, "");
          };

          LEADERBOARD_DATA.forEach((c) => {
            map.set(getKey(c), c);
          });

          fetched.forEach((c) => {
            if (!c) return;
            const key = getKey(c);
            const existing = map.get(key);
            if (existing) {
              map.set(key, {
                ...existing,
                ...c,
                downloads: Math.max(existing.downloads || 0, c.downloads || 0),
                followers: Math.max(existing.followers || 0, c.followers || 0),
                avatar: (c.avatar && !c.avatar.includes("unsplash.com")) ? c.avatar : existing.avatar,
              });
            } else {
              map.set(key, c);
            }
            saveCreatorToCache(c);
          });

          const sorted = Array.from(map.values())
            .sort((a, b) => {
              const aDl = a.downloads ?? 0;
              const bDl = b.downloads ?? 0;
              if (bDl !== aDl) return bDl - aDl;
              return (b.followers ?? 0) - (a.followers ?? 0);
            })
            .map((c, i) => ({
              ...c,
              rank: i + 1,
            }));

          setCreatorsList(sorted);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live creators for leaderboard:", err);
      });
  }, []);

  const topCreator = creatorsList[0] || LEADERBOARD_DATA[0];

  // Custom Quiz Builder State
  const [creatorName, setCreatorName] = useState("");
  const [creatorHandle, setCreatorHandle] = useState("");
  const [creatorPlatform, setCreatorPlatform] = useState<"instagram" | "youtube" | "tiktok" | "blog">("instagram");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Extract URL queries client-side to test specific creator if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const creatorParam = params.get("creator");
      const handleParam = params.get("handle");
      const platformParam = (params.get("platform") || "instagram") as "instagram" | "youtube" | "tiktok" | "blog";

      if (creatorParam) {
        fetchCreatorFromFirestore(creatorParam)
          .then((fetched) => {
            if (fetched) {
              setTestingCreator(fetched);
            } else {
              setTestingCreator({
                id: creatorParam.toLowerCase().replace(/\s+/g, "_"),
                name: creatorParam,
                handle: handleParam || `@${creatorParam.toLowerCase().replace(/\s+/g, "_")}`,
                platform: platformParam,
                downloads: 120,
                badge: "Certified Advocate 🏆",
                avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80"
              });
            }
          })
          .catch(() => {
            setTestingCreator(getCreator(creatorParam));
          });
      }
    }
  }, []);

  // Handle building shareable link
  const handleGenerateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorName || !creatorHandle) return;

    const domain = typeof window !== "undefined" ? window.location.origin : "https://kitchen-scraps.web.app";
    const slugifiedName = encodeURIComponent(creatorName.trim());
    const slugifiedHandle = encodeURIComponent(creatorHandle.trim());
    const link = `${domain}/quiz?creator=${slugifiedName}&handle=${slugifiedHandle}&platform=${creatorPlatform}`;
    
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

  const handleStartTestQuiz = (creator: Creator) => {
    setTestingCreator(creator);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/advocates?creator=${encodeURIComponent(creator.name)}&handle=${encodeURIComponent(creator.handle)}&platform=${creator.platform}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLaunchGeneratedQuiz = () => {
    if (!creatorName || !creatorHandle) return;
    const newCreator: Creator = {
      id: creatorName.toLowerCase().replace(/\s+/g, "_"),
      name: creatorName,
      handle: creatorHandle.startsWith("@") ? creatorHandle : `@${creatorHandle}`,
      platform: creatorPlatform,
      downloads: 0,
      badge: "Partner Advocate Candidate 🏆",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
    };
    handleStartTestQuiz(newCreator);
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
    <>
      <Header />
      <main className="bg-brand-bg text-brand-primary min-h-screen py-10 px-4 md:px-6 relative overflow-hidden font-sans">
        
        {/* Background Decors */}
        <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-brand-soft-bg/25 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Back Button */}
          {!testingCreator && (
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold text-sm mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Composting Teaser</span>
            </Link>
          )}

          {/* Render Active Creator Test Quiz Screen if activated */}
          {testingCreator ? (
            <CreatorTestQuizScreen
              creator={testingCreator}
              onClose={() => {
                setTestingCreator(null);
                if (typeof window !== "undefined") {
                  window.history.replaceState({}, "", "/advocates");
                }
              }}
            />
          ) : (
            <>
              {/* Advocates Portal Hero Header */}
              <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-10 shadow-premium-lg mb-8 text-center sm:text-left">
                <span className="inline-block bg-brand-soft-bg text-emerald-900 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                  Advocate Flywheel &amp; Rewards
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-primary tracking-tight leading-none mb-4">
                  Eco-Creator Program
                </h1>
                <p className="text-base sm:text-lg text-brand-primary-light font-medium leading-relaxed max-w-2xl">
                  Partner with us to expand global compost intelligence. Get un-gated social tools, track custom referrals, and test creator quizzes in real-time!
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-brand-border mb-8">
                <button
                  onClick={() => setActiveTab("portal")}
                  className={`py-3.5 px-6 font-display font-extrabold text-sm md:text-base border-b-2 transition-all cursor-pointer ${
                    activeTab === "portal"
                      ? "border-emerald-800 text-emerald-800"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  🏆 Creator Leaderboard
                </button>
                <button
                  onClick={() => setActiveTab("builder")}
                  className={`py-3.5 px-6 font-display font-extrabold text-sm md:text-base border-b-2 transition-all cursor-pointer ${
                    activeTab === "builder"
                      ? "border-emerald-800 text-emerald-800"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  🛠️ Custom Quiz Builder
                </button>
              </div>

              {/* Tab 1: Creator Leaderboard */}
              {activeTab === "portal" ? (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Creator of the Month Showcase */}
                  <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-premium-lg flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bg-amber-400 text-slate-950 font-black text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-bl-xl shadow-premium-sm">
                      CREATOR OF THE MONTH
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0">
                      <Image 
                        src={topCreator.avatar} 
                        alt={topCreator.name}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2 text-center sm:text-left grow">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h3 className="font-display font-black text-xl text-brand-primary">
                          {topCreator.name}
                        </h3>
                        <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1 font-mono">
                          {renderPlatformIcon(topCreator.platform)}
                          {topCreator.handle.startsWith("@") ? topCreator.handle : `@${topCreator.handle}`}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-brand-primary-light font-semibold">
                        Driven Installs: <strong className="text-emerald-800 text-base">{topCreator.downloads} downloads</strong>
                      </p>
                      
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md">
                        {topCreator.name} shares zero-waste sustainability techniques. Crowned this month&apos;s champion with custom synced questions!
                      </p>

                      <button
                        onClick={() => topCreator.isSyncedFromFirestore && handleStartTestQuiz(topCreator)}
                        disabled={!topCreator.isSyncedFromFirestore}
                        title={topCreator.isSyncedFromFirestore ? `Test ${topCreator.name}'s Quiz` : "Quiz active for Firestore synced creators only"}
                        className={`font-extrabold text-xs py-2.5 px-5 rounded-xl transition flex items-center gap-1.5 mt-2 ${
                          topCreator.isSyncedFromFirestore
                            ? "bg-emerald-800 hover:bg-emerald-950 text-white cursor-pointer shadow-md"
                            : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-75"
                        }`}
                      >
                        {topCreator.isSyncedFromFirestore ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Test {topCreator.name}&apos;s Quiz</span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                            <span>Sync Required (Placeholder)</span>
                          </>
                        )}
                      </button>
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
                      {creatorsList.map((creator) => (
                        <div 
                          key={creator.id}
                          className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                        >
                          {/* Left: Rank & Profile details */}
                          <div className="flex items-center gap-4">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                              creator.rank === 1 
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
                                unoptimized
                                referrerPolicy="no-referrer"
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-display font-extrabold text-sm text-brand-primary">
                                  {creator.name}
                                </span>
                                <span className="text-[10px] text-emerald-800 font-extrabold bg-brand-soft-bg px-2 py-0.5 rounded-full">
                                  {creator.badge}
                                </span>
                                {creator.isSyncedFromFirestore ? (
                                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                    Synced
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-medium text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md">
                                    Placeholder
                                  </span>
                                )}
                              </div>
                              
                              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono font-semibold mt-0.5">
                                {renderPlatformIcon(creator.platform)}
                                {creator.handle}
                              </span>
                            </div>
                          </div>

                          {/* Right: Metrics & Test Quiz Button */}
                          <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Downloads Driven</span>
                              <span className="font-extrabold text-sm sm:text-base text-emerald-800 font-mono">
                                {creator.downloads}
                              </span>
                            </div>

                            {/* Active / Disabled Test Quiz Button */}
                            <button
                              onClick={() => creator.isSyncedFromFirestore && handleStartTestQuiz(creator)}
                              disabled={!creator.isSyncedFromFirestore}
                              title={
                                creator.isSyncedFromFirestore
                                  ? "Test Quiz (Firestore Synced)"
                                  : "Quiz active for Firestore synced creators only"
                              }
                              className={`font-extrabold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 ${
                                creator.isSyncedFromFirestore
                                  ? "bg-emerald-800 hover:bg-emerald-950 text-white cursor-pointer shadow-sm hover:shadow"
                                  : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-75"
                              }`}
                            >
                              {creator.isSyncedFromFirestore ? (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-white" />
                                  <span>Test Quiz</span>
                                </>
                              ) : (
                                <>
                                  <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Unsynced</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Custom Quiz Builder Section */
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                    <h3 className="font-display font-extrabold text-brand-primary text-base mb-1.5">
                      1. Developer Tool: Generating Custom Seeding Quizzes
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-primary-light font-medium leading-relaxed">
                      Generate customized mobile/web seeding quiz links with your creator details automatically embedded. Test questions sync live with the Android app, and your referral ID tracks all driven downloads.
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
                          className="w-full bg-slate-50 border border-brand-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 font-medium font-mono"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wide block">
                          Primary Platform
                        </label>
                        <select
                          value={creatorPlatform}
                          onChange={(e) => setCreatorPlatform(e.target.value as "instagram" | "youtube" | "tiktok" | "blog")}
                          className="w-full bg-slate-50 border border-brand-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 font-medium cursor-pointer"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="tiktok">TikTok</option>
                          <option value="blog">Blog / Website</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-premium cursor-pointer transition flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 fill-white" />
                        <span>Generate Custom Teaser Quiz</span>
                      </button>
                    </form>

                    {/* Link Output Preview */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="bg-slate-50 border border-brand-border rounded-3xl p-6 text-left space-y-4">
                        <h4 className="font-display font-extrabold text-sm text-brand-primary flex items-center gap-2">
                          <Compass className="w-4 h-4 text-emerald-800" />
                          Generated Quiz Endpoint
                        </h4>

                        {generatedLink ? (
                          <div className="space-y-4">
                            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                              Your customized quiz is ready to deploy! Share this link or launch test mode immediately below.
                            </p>
                            
                            <div className="bg-white border border-brand-border rounded-xl p-3 select-all break-all text-xs font-mono font-bold text-slate-800">
                              {generatedLink}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                onClick={handleCopyLink}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{isCopied ? "Copied!" : "Copy Link"}</span>
                              </button>
                              
                              <button
                                onClick={handleLaunchGeneratedQuiz}
                                className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>Launch Test Screen</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-10 space-y-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                              <Compass className="w-5 h-5 text-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-400">
                              Fill out the form to instantly generate your dynamic test link!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Security Info Card */}
                      <div className="bg-white border border-brand-border rounded-2xl p-5 text-left">
                        <div className="flex items-center gap-2 text-brand-primary font-bold text-xs mb-1.5">
                          <ShieldAlert className="w-4 h-4 text-emerald-800" />
                          <span>Security &amp; Sync Verification</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          All questions are validated and synchronized live with the Android app in real time, guaranteeing robust device metrics and accurate leaderboard tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
