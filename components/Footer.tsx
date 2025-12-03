"use client";

import { Instagram, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-40 pb-10 px-6 relative overflow-hidden">
      
      {/* واترمارک غول‌پیکر پس‌زمینه */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[25vw] font-black font-serif text-white leading-none tracking-tighter translate-y-[20%]">
          AYNEH
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* بخش اصلی */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-20">
          
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">
              آماده تغییر <br/> <span className="text-brand-gold italic">هستید؟</span>
            </h2>
            <button className="bg-brand-gold text-black px-10 py-4 rounded-full font-bold hover:bg-white transition-colors">
              رزرو آنلاین نوبت
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm font-light text-gray-400">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest mb-4">تماس</h4>
              <div className="flex items-center gap-3 hover:text-brand-gold transition-colors cursor-pointer">
                <Phone size={16} />
                <p>۰۹۱۷-۰۰۰-۰۰۰۰</p>
              </div>
              <div className="flex items-center gap-3 hover:text-brand-gold transition-colors cursor-pointer">
                <Instagram size={16} />
                <p>@ayneh.beauty</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest mb-4">آدرس</h4>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <p>شیراز، قصرالدشت، خیابان وکلا،<br/>کوچه باغ بهشت، پلاک ۱۰</p>
              </div>
            </div>
          </div>

        </div>

        {/* خط جداکننده و کپی‌رایت */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
          <p>© 2025 AYNEH. All Rights Reserved.</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors group">
            Back to Top 
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}