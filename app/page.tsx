"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisualStory from "@/components/VisualStory";
import BentoServices from "@/components/BentoServices";
import MoodSelector from "@/components/MoodSelector"; // اضافه شد
import About from "@/components/About"; // اضافه شد
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C6A87C] selection:text-black overflow-x-hidden">
      
      {/* 1. لودینگ */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`${loading ? 'fixed inset-0 overflow-hidden' : ''}`}>
        
        <CustomCursor />
        <Navbar />

        {/* 1. هیرو (ویدیو + 3D) */}
        <div id="home">
          <HeroSection />
        </div>

        {/* 2. داستان (متن‌های طلایی) */}
        <div id="story" className="relative z-30">
           <VisualStory />
        </div>

        {/* 3. خدمات (کارت‌های شیشه‌ای) */}
        <div id="services" className="relative z-40 bg-[#0a0a0a] rounded-t-[3rem] -mt-10 pt-10 border-t border-white/5">
          <BentoServices />
        </div>

        {/* 4. انتخاب مود (رزرو) */}
        <div id="mood" className="relative z-40">
          <MoodSelector />
        </div>

        {/* 5. درباره هنرمند */}
        <div id="about" className="relative z-40">
          <About />
        </div>

        {/* 6. فوتر */}
        <div id="contact" className="relative z-50">
           <Footer />
        </div>

      </div>
    </main>
  );
}