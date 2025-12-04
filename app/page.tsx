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

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-brand-bg text-white selection:bg-brand-gold selection:text-black overflow-x-hidden">
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}

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

      </div>
    </main>
  );
}