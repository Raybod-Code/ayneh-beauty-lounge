"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LuxuryButton from "@/components/LuxuryButton";

export default function About() {
  return (
    <section className="py-24 md:py-40 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        
        {/* متن داستان */}
        <div className="md:w-1/2 order-2 md:order-1">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-xs tracking-[0.4em] uppercase font-bold mb-6 block"
          >
            The Artist
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-doran)' }}
          >
            داستانِ <br/> <span className="font-serif italic font-light text-gray-400">یک رویا</span>
          </motion.h2>

          <div className="prose prose-lg text-brand-gray font-light text-justify leading-loose mb-10">
            <p>
              من شهرزاد هستم. باور دارم که زیبایی نباید نقاب باشد، بلکه باید آینه‌ای باشد از درونِ تو.
              در عمارتِ قصرالدشت، ما فضایی ساختیم که زمان در آن می‌ایستد.
            </p>
            <p>
              اینجا صدای قیچی با موسیقی جاز ترکیب می‌شود و رایحه‌ی قهوه با عطرِ چوب.
              ما به دنبال ترندهای زودگذر نیستیم؛ ما به دنبالِ امضای شخصیِ شما هستیم.
            </p>
          </div>

          <LuxuryButton variant="solid" className="bg-brand-dark text-white hover:bg-black">
            بیشتر درباره من
          </LuxuryButton>
        </div>

        {/* عکس هنرمند */}
        <div className="md:w-1/2 order-1 md:order-2 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            {/* فعلاً از عکس هیرکات استفاده می‌کنیم تا عکس خودت رو بذاری */}
            <Image 
              src="/images/service-haircut.jpg" 
              alt="Shahrzad" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            
            {/* کادر تزئینی دور عکس */}
            <div className="absolute inset-4 border border-white/20 rounded-[2.5rem] pointer-events-none"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}