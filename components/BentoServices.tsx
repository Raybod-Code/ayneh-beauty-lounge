"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Scissors, Sparkles, Star } from "lucide-react";
import Image from "next/image";

export default function BentoServices() {
  return (
    <section className="py-24 px-4 bg-brand-bg relative font-sans">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-5xl md:text-7xl font-black text-brand-dark leading-none" style={{ fontFamily: 'var(--font-doran)' }}>
            خدماتِ <span className="text-brand-gold font-serif italic">هنری</span>
          </h2>
          <p className="text-brand-gray text-sm md:text-base max-w-sm leading-relaxed">
            ما خدمات رو ارائه نمی‌دیم، ما استایل شما رو معماری می‌کنیم. انتخاب کن و تغییر رو ببین.
          </p>
        </div>

        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          
          {/* 1. هیرکات (بزرگ عمودی) */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-1 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-xl bg-black">
             <Image src="/images/service-haircut.png" alt="Haircut" fill className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 grayscale" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
               <h3 className="text-white text-3xl font-serif mb-2">Hair Architecture</h3>
               <p className="text-white/60 text-xs">کوتاهی ژورنالی و دقیق</p>
             </div>
          </motion.div>

          {/* 2. رنگ (مستطیل افقی) */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group shadow-lg">
             <Image src="/images/service-color.png" alt="Color" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white font-serif text-5xl italic tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">BLONDE</span>
             </div>
          </motion.div>

          {/* 3. اسپا (مربع) */}
          <motion.div whileHover={{ y: -5 }} className="bg-[#E8E4D9] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group">
             <Image src="/images/service-spa.png" alt="Spa" fill className="object-cover opacity-30 mix-blend-multiply" />
             <Sparkles className="text-brand-dark relative z-10" />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold text-brand-dark">Therapy</h3>
               <p className="text-brand-dark/60 text-xs mt-2">احیا و سلامت مو</p>
             </div>
          </motion.div>

          {/* 4. عروس (مربع تیره) */}
          <motion.div whileHover={{ y: -5 }} className="bg-brand-dark rounded-[2.5rem] p-8 flex flex-col justify-between text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl"></div>
             <Star className="text-brand-gold" />
             <div>
               <h3 className="text-2xl font-bold">Bridal VIP</h3>
               <p className="text-white/50 text-xs mt-2">پکیج اختصاصی عروس</p>
             </div>
             <div className="absolute bottom-8 left-8">
               <ArrowUpRight className="text-white" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}