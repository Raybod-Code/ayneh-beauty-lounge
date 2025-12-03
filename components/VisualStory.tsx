"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function VisualStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const styleX = useTransform(scrollYProgress, [0.1, 0.4], ["50%", "0%"]);
  const brushY = useTransform(scrollYProgress, [0.1, 0.5], ["30%", "-30%"]);
  const pureScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1]);
  const perfumeRotate = useTransform(scrollYProgress, [0.4, 0.8], [0, 45]);

  return (
    <section ref={containerRef} className="relative bg-[#050505] overflow-hidden py-20 md:py-40">
      
      {/* === سکانس ۱: STYLE === */}
      <div className="relative min-h-[80vh] md:min-h-screen w-full flex flex-col md:flex-row items-center justify-center">
        {/* متن پس‌زمینه */}
        <motion.div style={{ x: styleX }} className="absolute right-[-10%] top-10 md:top-auto w-[120vw] md:w-[90vw] h-[30vh] md:h-[50vh] opacity-30 md:opacity-50 z-0">
          <Image src="/images/text-style.png" alt="STYLE" fill className="object-contain" />
        </motion.div>

        {/* محتوا */}
        <div className="relative z-10 max-w-2xl px-6 text-center mt-32 md:mt-0">
          <h3 className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4">The Art of Hair</h3>
          <h2 className="text-4xl md:text-7xl font-serif text-white mb-6">معماریِ استایل</h2>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-lg mx-auto font-light">
            در آینه، قیچی ابزار نیست؛ امتدادِ ذهنِ هنرمند است. <br className="hidden md:block"/>
            ما شخصیت شما را بازآفرینی می‌کنیم.
          </p>
        </div>

        {/* براش */}
        <motion.div style={{ y: brushY, rotate: -15 }} className="absolute left-[-20%] bottom-10 md:bottom-20 w-[70vw] h-[70vw] md:w-[30vw] md:h-[30vw] z-20 opacity-60 md:opacity-80 pointer-events-none">
           <Image src="/images/floating-brush.png" alt="Brush" fill className="object-contain drop-shadow-2xl" />
        </motion.div>
      </div>


      {/* === سکانس ۲: PURE === */}
      <div className="relative min-h-[80vh] md:min-h-screen w-full flex items-center justify-center mt-10 md:mt-0">
        <motion.div style={{ scale: pureScale }} className="absolute inset-0 flex items-center justify-center opacity-20 z-0">
          <div className="relative w-[100vw] md:w-[90vw] h-[40vh] md:h-[60vh]">
             <Image src="/images/text-pure.png" alt="PURE" fill className="object-contain" />
          </div>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl px-6 w-full">
           <motion.div style={{ rotate: perfumeRotate }} className="relative w-full h-[300px] md:h-[500px] order-2 md:order-1">
              <Image src="/images/floating-perfume.png" alt="Pure Essence" fill className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]" />
           </motion.div>

           <div className="text-center md:text-right order-1 md:order-2 pt-10 md:pt-0">
              <h3 className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4">Skin & Soul</h3>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">خلوصِ مطلق</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light">
                بازگشت به ریشه‌ها با متریال‌های ارگانیک. <br/>
                پوستی که نفس می‌کشد، روحی که آرام می‌گیرد.
              </p>
           </div>
        </div>
      </div>

      {/* === سکانس ۳: ART === */}
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center py-10 md:py-20">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="text-center z-10 px-4"
         >
            <div className="relative w-[80vw] md:w-[70vw] h-[15vh] md:h-[20vh] mx-auto mb-6 md:mb-8 opacity-80">
               <Image src="/images/text-art.png" alt="ART" fill className="object-contain invert brightness-0 filter" />
            </div>
            <p className="text-lg md:text-3xl text-white/80 font-serif italic">
              "زیبایی یعنی حذفِ هر چیزی که اضافیست."
            </p>
         </motion.div>
      </div>

    </section>
  );
}