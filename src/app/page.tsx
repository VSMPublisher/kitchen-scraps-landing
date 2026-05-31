import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import CoreValues from "@/components/CoreValues";
import Faq from "@/components/Faq";
import CtaCloser from "@/components/CtaCloser";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-bg text-brand-primary min-h-screen flex flex-col font-sans relative overflow-x-hidden antialiased">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Categories />
        <Features />
        <CoreValues />
        <Faq />
        <CtaCloser />
        <Footer />
      </main>
    </>
  );
}