"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoServices from "@/components/BentoServices";
import ArtTunnel from "@/components/ArtTunnel";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-gold selection:text-white overflow-x-hidden">
      
      {/* 1. لودینگ اولیه */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`${loading ? 'fixed inset-0 overflow-hidden' : ''}`}>
        
        {/* نوار منو (شناور) */}
        <Navbar />

        {/* بخش 1: ورودی سینمایی */}
        <div id="home">
          <HeroSection />
        </div>

        {/* بخش 2: خدمات (چیدمان موزاییکی/Bento) */}
        <div id="services" className="relative z-30">
          <BentoServices />
        </div>

        {/* بخش 3: تونل هنری (اسکرول افقی) */}
        <div id="experience" className="relative z-40 hidden lg:block">
           <ArtTunnel />
        </div>

        {/* بخش 4: داستان برند */}
        <div id="about" className="relative z-50">
           <About />
        </div>

        {/* بخش 5: فوتر */}
        <div id="contact" className="relative z-50">
           <Footer />
        </div>

      </div>
    </main>
  );
}