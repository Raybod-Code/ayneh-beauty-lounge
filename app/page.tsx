"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisualStory from "@/components/VisualStory";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
// import ArtTunnel from "@/components/ArtTunnel";
import MoodSelector from "@/components/MoodSelector";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Sparkles, ScanFace } from "lucide-react";
import SmartQuiz from "@/components/SmartQuiz";
import FaceAnalyzer from "@/components/FaceAnalyzer";
// import GiftAtelier from "@/components/GiftAtelier";
import BeforeAfterSlider from "@/components/BeforeAfterSlider"; // 👈 ایمپورت جدید
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFaceAI, setShowFaceAI] = useState(false);

  return (
    <main className="min-h-screen bg-brand-bg text-white selection:bg-brand-gold selection:text-black">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* نمایش مودال‌ها */}
      {showQuiz && <SmartQuiz onClose={() => setShowQuiz(false)} />}
      {showFaceAI && <FaceAnalyzer onClose={() => setShowFaceAI(false)} />}

      <div className={`${loading ? "fixed inset-0 overflow-hidden" : ""}`}>
        <CustomCursor />
        <Navbar />

        <div id="home">
          <HeroSection />
        </div>
        {/* ✅ اضافه شدن آتلیه گیفت کارت
        <div id="gift" className="relative z-35">
          <GiftAtelier />
        </div> */}
        <div id="story" className="relative z-30">
          <VisualStory />
        </div>

        <div id="services" className="relative z-40">
          <Services />
        </div>

        <div id="gallery" className="relative z-40 bg-[#080808]">
          <Gallery />
        </div>

        {/* تونل سرعت
        <div id="art-tunnel" className="relative z-40">
          <ArtTunnel />
        </div> */}
        {/* ✅ اضافه شدن اسلایدر قبل و بعد */}
        <div id="before-after" className="relative z-20">
          <BeforeAfterSlider />
        </div>
        
        <div id="mood" className="relative z-40">
          <MoodSelector />
        </div>

        <div id="about" className="relative z-40">
          <About />
        </div>

        <div id="contact" className="relative z-50">
          <Footer />
        </div>

        {/* دکمه‌های شناور هوشمند (AI Tools) */}
        <div className="fixed bottom-8 left-8 z-[60] hidden md:flex flex-col gap-4">
          {/* دکمه ۱: آنالیز چهره (Face AI) */}
          <button
            onClick={() => setShowFaceAI(true)}
            className="group relative flex items-center justify-center w-14 h-14 bg-gray-900/80 backdrop-blur-md border border-white/20 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300 shadow-2xl"
          >
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            <ScanFace className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />

            {/* تولتیپ */}
            <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-white text-xs whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 pointer-events-none font-sans border border-white/10">
              آنالیز چهره (AI)
            </span>
          </button>

          {/* دکمه ۲: کوییز هوشمند (Smart Quiz) */}
          <button
            onClick={() => setShowQuiz(true)}
            className="group relative flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300 shadow-2xl"
          >
            <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-20 transition-opacity" />
            <Sparkles className="w-7 h-7 text-brand-gold animate-pulse" />

            {/* تولتیپ */}
            <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-white text-xs whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 pointer-events-none font-sans border border-white/10">
              مشاوره هوشمند
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
