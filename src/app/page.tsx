import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="bg-brand-bg text-brand-primary min-h-screen flex flex-col font-sans relative overflow-x-hidden antialiased">
      <Header />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Categories />
      <Features />
      <Faq />
      <Footer />
    </main>
  );
}