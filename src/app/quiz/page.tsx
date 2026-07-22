"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorTestQuizScreen from "@/components/CreatorTestQuizScreen";
import { Creator, getCreator } from "@/utils/creators";
import { fetchCreatorFromFirestore } from "@/lib/firebase";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const creatorNameParam = searchParams.get("creator") || searchParams.get("name") || "Chef Sarah";
  const handleParam = searchParams.get("handle") || "@chef_sarah_cooking";
  const platformParam = (searchParams.get("platform") || "instagram") as "instagram" | "youtube" | "tiktok" | "blog";

  const [creator, setCreator] = useState<Creator>(() => {
    return getCreator(creatorNameParam);
  });

  useEffect(() => {
    let isMounted = true;
    if (creatorNameParam) {
      fetchCreatorFromFirestore(creatorNameParam)
        .then((fetched) => {
          if (isMounted && fetched) {
            setCreator(fetched);
          } else if (isMounted) {
            setCreator({
              id: creatorNameParam.toLowerCase().replace(/\s+/g, "_"),
              name: creatorNameParam,
              handle: handleParam,
              platform: platformParam,
              downloads: 120,
              badge: "Certified Advocate 🏆",
              avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80"
            });
          }
        })
        .catch(() => {
          if (isMounted) {
            setCreator(getCreator(creatorNameParam));
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [creatorNameParam, handleParam, platformParam]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <CreatorTestQuizScreen
        creator={creator}
        onClose={() => router.push("/advocates")}
      />
    </div>
  );
}

export default function QuizPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-bg text-brand-primary min-h-screen py-6 relative overflow-hidden font-sans">
        <Suspense fallback={
          <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border border-brand-border text-center shadow-premium-sm">
            <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-extrabold text-brand-primary">Loading Test Screen &amp; Syncing Creator Questions...</p>
          </div>
        }>
          <QuizContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
