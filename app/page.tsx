"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisualStory from "@/components/VisualStory";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import MoodSelector from "@/components/MoodSelector";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Sparkles, ScanFace, X } from "lucide-react"; // اضافه شدن X برای دکمه بستن
import {SmartQuiz} from "@/components/SmartQuiz";
import FaceAnalyzer from "@/components/FaceAnalyzer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFaceAI, setShowFaceAI] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C6A87C] selection:text-black overflow-x-hidden">
      {/* 1. لودینگ اولیه */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. مودال کوییز هوشمند (Smart Quiz) */}
      {showQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          {/* فرض بر این است که SmartQuiz خودش دکمه بستن دارد، اگر نه باید مثل پایینی رپ شود */}
          <SmartQuiz onClose={() => setShowQuiz(false)} />
        </div>
      )}

      {/* 3. مودال آنالیز چهره (Face Analyzer) - ✅ فیکس شده */}
      {showFaceAI && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-2 md:p-6 shadow-2xl">
            {/* دکمه بستن دستی */}
            <button
              onClick={() => setShowFaceAI(false)}
              className="absolute top-4 right-4 z-50 bg-white/10 p-2 rounded-full text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* کامپوننت اصلی */}
            <FaceAnalyzer />
          </div>
        </div>
      )}

      {/* بدنه اصلی سایت */}
      <div
        className={`${loading ? "fixed inset-0 overflow-hidden" : "relative"}`}
      >
        {/* نوبار و نشانگر */}
        {/* <CustomCursor /> این‌ها معمولاً در Layout هستند، اگر نیستند آنکامنت کن */}
        {/* <Navbar /> */}

        <div id="home">
          <HeroSection />
        </div>

        <div id="story" className="relative z-30">
          <VisualStory />
        </div>

        <div id="services" className="relative z-40">
          <Services />
        </div>

        <div id="gallery" className="relative z-40 bg-[#080808]">
          <Gallery />
        </div>

        {/* ✅ اسلایدر قبل و بعد */}
        <div id="before-after" className="relative z-20 py-20 bg-[#050505]">
          <BeforeAfterSlider />
        </div>

        <div id="mood" className="relative z-40">
          <MoodSelector />
        </div>

        <div id="about" className="relative z-40">
          <About />
        </div>

        <div id="contact" className="relative z-50">
          {/* <Footer /> معمولاً در Layout است */}
        </div>

        {/* 🔥 دکمه‌های شناور هوشمند (دقیقاً استایل خودت) */}
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
            <div className="absolute inset-0 bg-[#C6A87C] opacity-0 group-hover:opacity-20 transition-opacity" />
            <Sparkles className="w-7 h-7 text-[#C6A87C] animate-pulse" />

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
