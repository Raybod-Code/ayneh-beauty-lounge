"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ArtTunnel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // اسکرول افقی
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-brand-light">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex">
          
          {/* --- بخش ۱: STYLE (با متن طلایی) --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0 bg-[#F5F5F0]">
             {/* عکس متن STYLE */}
             <div className="absolute inset-0 flex items-center justify-center opacity-10 md:opacity-20 pointer-events-none">
                <div className="relative w-[90vw] h-[50vh]">
                  <Image src="/images/text-style.png" alt="STYLE" fill className="object-contain" />
                </div>
             </div>

             {/* عکس براش آرایشی معلق */}
             <motion.div 
               style={{ x: useTransform(scrollYProgress, [0, 0.3], [200, -200]), rotate: 15 }} 
               className="absolute top-20 right-20 w-40 h-40 md:w-80 md:h-80 z-0 opacity-80"
             >
                <Image src="/images/floating-brush.png" alt="Brush" fill className="object-contain drop-shadow-xl" />
             </motion.div>

             <div className="relative z-10 max-w-xl text-center px-6">
               <h3 className="text-5xl md:text-7xl font-serif text-brand-dark mb-6">استایلِ تو</h3>
               <p className="text-brand-gray text-lg leading-loose">
                 ما فقط موها را کوتاه نمی‌کنیم؛<br/>ما شخصیت شما را در قالب هنر بازآفرینی می‌کنیم.
               </p>
             </div>
          </div>

          {/* --- بخش ۲: PURE (با متن طلایی) --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0 bg-[#EAEFE9]">
             {/* عکس متن PURE */}
             <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                <div className="relative w-[90vw] h-[50vh]">
                  <Image src="/images/text-pure.png" alt="PURE" fill className="object-contain" />
                </div>
             </div>
             
             {/* عکس عطر معلق */}
             <motion.div 
               style={{ y: useTransform(scrollYProgress, [0.3, 0.6], [-50, 50]), rotate: -10 }}
               className="absolute bottom-20 left-20 w-32 h-32 md:w-64 md:h-64 z-0 opacity-70"
             >
                <Image src="/images/floating-perfume.png" alt="Perfume" fill className="object-contain drop-shadow-xl" />
             </motion.div>

             <div className="relative z-10 flex flex-col items-center">
               <div className="w-64 h-80 bg-white/40 backdrop-blur-md rounded-full border border-white/60 mb-10 flex items-center justify-center shadow-2xl">
                  <span className="font-serif italic text-brand-dark/50 text-3xl">Pure</span>
               </div>
               <h3 className="text-4xl font-serif text-brand-dark">اصالت و زیبایی</h3>
             </div>
          </div>

          {/* --- بخش ۳: ART (با متن طلایی) --- */}
          <div className="relative h-screen w-screen flex items-center justify-center flex-shrink-0 bg-brand-dark text-white">
             {/* عکس متن ART (چون زمینه تیره است، شاید نیاز به افکت داشته باشد ولی فعلا خود عکس عالیه) */}
             <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="relative w-[80vw] h-[50vh]">
                  <Image src="/images/text-art.png" alt="ART" fill className="object-contain invert" />
                </div>
             </div>

             <div className="relative z-10 max-w-3xl text-center px-6 border-y border-brand-gold/30 py-12">
               <p className="text-2xl md:text-4xl font-light leading-relaxed font-serif italic text-brand-gold">
                 "در آیـنـه، هر قیچی یک قلم‌مو است و صورت شما بوم نقاشی ما."
               </p>
             </div>
          </div>

          {/* --- بخش ۴: پایان --- */}
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