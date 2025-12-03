"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ArtTunnel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // حرکت افقی (از 0 تا -75 درصد)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-brand-light">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex">
          
          {/* --- پرده 1: STYLE --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0">
             <h1 className="text-[25vw] font-black text-brand-dark/5 select-none absolute z-0" style={{ fontFamily: 'var(--font-doran)' }}>
               STYLE
             </h1>
             <div className="relative z-10 max-w-xl text-center px-6">
               <h3 className="text-5xl md:text-7xl font-serif text-brand-dark mb-6">معماریِ مو</h3>
               <p className="text-brand-gray text-lg leading-loose">
                 در آیـنـه، قیچی یک ابزار نیست؛ امتدادِ ذهنِ هنرمند است.<br/>
                 ما خطوط چهره شما را بازتعریف می‌کنیم.
               </p>
             </div>
          </div>

          {/* --- پرده 2: PURE --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0 bg-[#EAEFE9]">
             <h1 className="text-[25vw] font-black text-white/40 select-none absolute z-0" style={{ fontFamily: 'var(--font-doran)' }}>
               PURE
             </h1>
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-64 h-80 bg-white/50 backdrop-blur-md rounded-full border border-white/40 mb-10 flex items-center justify-center shadow-xl">
                  {/* جای عکس عطر یا محصول (اگر بود) */}
                  <span className="font-serif italic text-brand-dark/30 text-2xl">Essence</span>
               </div>
               <h3 className="text-4xl font-serif text-brand-dark">رایحه اصالت</h3>
             </div>
          </div>

          {/* --- پرده 3: ART --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0 bg-brand-dark text-white">
             <h1 className="text-[25vw] font-black text-white/5 select-none absolute z-0" style={{ fontFamily: 'var(--font-doran)' }}>
               ART
             </h1>
             <div className="relative z-10 max-w-2xl text-center px-6 border-y border-brand-gold/30 py-10">
               <p className="text-2xl md:text-4xl font-light leading-relaxed font-serif italic text-brand-gold">
                 "زیبایی یعنی حذفِ هر چیزی که اضافیست، <br/>و درخششِ هر چیزی که واقعیست."
               </p>
             </div>
          </div>

          {/* --- پرده 4: پایان --- */}
          <div className="relative h-screen w-[80vw] flex flex-col items-center justify-center flex-shrink-0 bg-brand-gold">
             <h2 className="text-5xl md:text-8xl font-black text-white mb-8 text-center" style={{ fontFamily: 'var(--font-doran)' }}>
               نوبتِ درخشش <br/> شماست
             </h2>
          </div>

        </motion.div>
      </div>
    </section>
  );
}