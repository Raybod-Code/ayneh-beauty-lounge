"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisualStory from "@/components/VisualStory";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import ArtTunnel from "@/components/ArtTunnel"; // ✅ ایمپورت جدید
import MoodSelector from "@/components/MoodSelector";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Sparkles } from "lucide-react"; // اضافه کردن آیکون
import SmartQuiz from "@/components/SmartQuiz"; // ایمپورت کامپوننت جدید

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false); // استیت برای نمایش کوییز

  return (
    <main className="min-h-screen bg-brand-bg text-white selection:bg-brand-gold selection:text-black overflow-x-hidden">
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
        {/* نمایش کوییز به صورت مودال */}
      {showQuiz && <SmartQuiz onClose={() => setShowQuiz(false)} />}

      <div className={`${loading ? 'fixed inset-0 overflow-hidden' : ''}`}>
        
        <CustomCursor />
        <Navbar />

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

        {/* ✅ بخش جدید: تونل هنری (اسکرول افقی) */}
        {/* این بخش رنگ روشنه تا کنتراست ایجاد کنه با بخش‌های قبلی */}
        <div id="art-tunnel" className="relative z-40">
          <ArtTunnel />
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
        {/* 👇 دکمه شناور هوشمند (AI Stylist Trigger) */}
        <div className="fixed bottom-8 left-8 z-40 hidden md:block">
          <button 
            onClick={() => setShowQuiz(true)}
            className="group relative flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300"
          >
            <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-20 transition-opacity" />
            <Sparkles className="w-6 h-6 text-brand-gold animate-pulse" />
            
            {/* تولتیپ */}
            <span className="absolute left-full ml-4 px-3 py-1bg-black/80 text-white text-xs whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 pointer-events-none">
              مشاوره هوشمند
            </span>
          </button>
        </div>

      </div>
    </main>
  );
}