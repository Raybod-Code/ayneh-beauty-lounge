"use client";

import { motion } from "framer-motion";
import { Instagram, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-brand-bg pt-32 pb-10 px-6 relative overflow-hidden font-sans">
      
      {/* واترمارک بزرگ پس‌زمینه */}
      <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-black font-serif text-white leading-none tracking-tighter">AYNEH</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 border-b border-white/10 pb-20">
          
          <div>
            <h3 className="text-3xl font-serif text-white mb-8">ارتباط با عمارت</h3>
            <div className="space-y-6 text-brand-gray font-light">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-gold shrink-0 mt-1" />
                <p>شیراز، قصرالدشت، خیابان وکلا،<br/>کوچه باغ بهشت، پلاک ۱۰</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-brand-gold shrink-0" />
                <p>۰۹۱۷-۰۰۰-۰۰۰۰</p>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-brand-gold shrink-0" />
                <p>@ayneh.beauty</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-center">
             <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-right" style={{ fontFamily: 'var(--font-doran)' }}>
               همین حالا <br/> <span className="text-brand-gold font-serif italic">رزرو کنید</span>
             </h2>
             <button className="bg-brand-gold text-brand-dark px-10 py-4 rounded-full font-bold hover:bg-white transition-colors">
               رزرو آنلاین نوبت
             </button>
          </div>

        </div>

        <div className="flex justify-between items-center text-xs text-brand-gray uppercase tracking-widest">
          <p>© 2025 AYNEH. All Rights Reserved.</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors">
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}