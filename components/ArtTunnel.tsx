"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function ArtTunnel() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // هوک اسکرول برای کل سکشن
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // تبدیل اسکرول عمودی به حرکت افقی (فقط برای دسکتاپ)
  // ما ۳ تا اسلاید داریم، پس باید تا حدود -200% (یا -66% بسته به ویوپورت) بریم
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);
  
  // نرم‌کننده حرکت (Physics)
  const smoothX = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });

  // پارالاکس برای المان‌های معلق (حرکت مخالف جهت اسکرول)
  const parallax = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    // ارتفاع 300vh یعنی ۳ برابر ارتفاع صفحه اسکرول داریم (برای ۳ اسلاید)
    // در موبایل ارتفاع auto میشه چون اسکرول افقی نداریم
    <section ref={targetRef} className="relative md:h-[300vh] bg-brand-light">
      
      {/* کانتینر چسبنده (Sticky) فقط برای دسکتاپ */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden bg-[#F5F5F0]">
        
        {/* کانتینر متحرک افقی */}
        <motion.div 
          style={{ x: smoothX }} 
          className="flex flex-col md:flex-row h-auto md:h-full"
          // در موبایل استایل x رو غیرفعال می‌کنیم (با کلاس md: هندل شده اما برای اطمینان)
        >
          
          {/* === اسلاید ۱: STYLE === */}
          <div className="relative w-full md:w-screen h-screen md:h-full flex items-center justify-center flex-shrink-0 overflow-hidden border-b md:border-b-0 border-black/5">
             {/* متن پس‌زمینه */}
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <Image src="/images/text-style.png" alt="STYLE" width={1000} height={400} className="object-contain w-[90vw]" />
             </div>

             {/* عکس براش معلق (پارالاکس) */}
             <motion.div 
               style={{ x: parallax, rotate: 15 }} 
               className="absolute top-[10%] right-[5%] md:top-20 md:right-40 w-40 h-40 md:w-80 md:h-80 z-10 hidden md:block"
             >
                <Image src="/images/floating-brush.png" alt="Brush" fill className="object-contain drop-shadow-2xl" />
             </motion.div>

             <div className="relative z-20 max-w-xl text-center px-6">
               <span className="text-brand-gold text-xs tracking-[0.3em] uppercase block mb-4">Precision</span>
               <h3 className="text-5xl md:text-8xl font-serif text-brand-dark mb-6 tracking-tighter">
                 استایلِ <span className="italic text-brand-gold">تو</span>
               </h3>
               <p className="text-gray-500 text-sm md:text-lg leading-loose font-sans">
                 ما فقط موها را کوتاه نمی‌کنیم؛<br/>
                 ما شخصیت شما را در قالب هنر بازآفرینی می‌کنیم.
               </p>
             </div>
          </div>

          {/* === اسلاید ۲: PURE === */}
          <div className="relative w-full md:w-screen h-screen md:h-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#EAEFE9] border-b md:border-b-0 border-black/5">
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <Image src="/images/text-pure.png" alt="PURE" width={1000} height={400} className="object-contain w-[90vw]" />
             </div>
             
             {/* عکس عطر معلق */}
             <motion.div 
               style={{ y: parallax, rotate: -10 }}
               className="absolute bottom-[10%] left-[5%] md:bottom-20 md:left-40 w-32 h-32 md:w-64 md:h-64 z-10 hidden md:block"
             >
                <Image src="/images/floating-perfume.png" alt="Perfume" fill className="object-contain drop-shadow-2xl" />
             </motion.div>

             <div className="relative z-20 flex flex-col items-center">
               <div className="w-48 h-64 md:w-64 md:h-80 bg-white/40 backdrop-blur-md rounded-full border border-white/60 mb-8 flex items-center justify-center shadow-2xl">
                  <span className="font-serif italic text-brand-dark/50 text-3xl">Pure</span>
               </div>
               <h3 className="text-3xl md:text-5xl font-serif text-brand-dark">اصالت و زیبایی</h3>
             </div>
          </div>

          {/* === اسلاید ۳: ART === */}
          <div className="relative w-full md:w-screen h-screen md:h-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#1a1a1a] text-white">
             <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
                <Image src="/images/text-art.png" alt="ART" width={1000} height={400} className="object-contain w-[80vw] invert" />
             </div>

             <div className="relative z-20 max-w-4xl text-center px-6 py-12">
               <p className="text-2xl md:text-5xl font-light leading-relaxed font-serif italic text-brand-gold">
                 "در آیـنـه، هر قیچی یک قلم‌مو است <br/> و صورت شما بوم نقاشی ما."
               </p>
               <div className="mt-10">
                 <button className="px-8 py-3 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 uppercase tracking-widest text-xs">
                   شروع تغییر
                 </button>
               </div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}