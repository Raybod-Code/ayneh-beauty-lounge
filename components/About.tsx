"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LuxuryButton from "@/components/LuxuryButton";

export default function About() {
  return (
    <section className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        
        {/* متن داستان */}
        <div className="lg:w-1/2 order-2 lg:order-1 text-right">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-xs tracking-[0.4em] uppercase font-bold mb-8 block"
          >
            Behind the Mirror
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight"
            style={{ fontFamily: 'var(--font-doran)' }}
          >
            داستانِ <br/> <span className="text-brand-gold font-serif italic font-light">یک رویا</span>
          </motion.h2>

          <div className="text-gray-400 text-lg leading-loose font-light mb-12 space-y-6">
            <p>
              من شهرزاد هستم. باور دارم که زیبایی نباید نقاب باشد، بلکه باید آینه‌ای باشد از درونِ تو.
              در عمارتِ آیـنـه، ما فضایی ساختیم که زمان در آن می‌ایستد.
            </p>
            <p>
              اینجا صدای قیچی با موسیقی جاز ترکیب می‌شود و رایحه‌ی قهوه با عطرِ چوب.
              ما به دنبال ترندهای زودگذر نیستیم؛ ما به دنبالِ امضای شخصیِ شما هستیم.
            </p>
          </div>

          <LuxuryButton variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
            بیشتر درباره من
          </LuxuryButton>
        </div>

        {/* عکس هنرمند (با افکت ماسک) */}
        <div className="lg:w-1/2 order-1 lg:order-2 relative flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-[400px] h-[500px] md:w-[500px] md:h-[600px]"
          >
            {/* قاب عکس */}
            <div className="absolute inset-0 rounded-[10rem] border border-brand-gold/30 z-20 translate-x-4 translate-y-4"></div>
            
            {/* خود عکس */}
            <div className="absolute inset-0 rounded-[10rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 z-10">
               <Image 
                 src="/images/service-haircut.png" // فعلاً عکس دمو
                 alt="Shahrzad" 
                 fill 
                 className="object-cover"
               />
            </div>

            {/* امضا یا لوگوی چرخشی */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black rounded-full flex items-center justify-center border border-white/10 z-30 animate-spin-slow">
               <svg viewBox="0 0 100 100" className="w-24 h-24 fill-white">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                  <text className="text-[10px] uppercase tracking-widest">
                    <textPath href="#curve">
                      Ayneh Beauty Lounge • Est 2025 •
                    </textPath>
                  </text>
               </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}