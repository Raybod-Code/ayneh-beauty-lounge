"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function ArtTunnel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["0vw", "-280vw"]);
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 20, mass: 0.5 });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateReverse = useTransform(rotate, (r) => r * -1);

  // انیمیشن شناور (برای همه دستگاه‌ها)
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section ref={targetRef} className={`relative bg-brand-light ${isMobile ? 'h-auto' : 'h-[500vh]'}`}>
      
      <div className={`${isMobile ? '' : 'sticky top-0 h-screen overflow-hidden'} bg-[#F5F5F0]`}>
        
        <motion.div 
          style={{ x: isMobile ? 0 : smoothX }} 
          className="flex flex-col md:flex-row h-auto md:h-full"
        >
          
          {/* === اسلاید ۱: STYLE === */}
          <div className="relative h-[80vh] md:h-full w-full md:w-screen flex items-center justify-center flex-shrink-0 bg-[#F5F5F0] border-b md:border-b-0 md:border-r border-black/5 overflow-hidden">
             <motion.div 
               animate={floatingAnimation} // ✅ فعال برای همه
               className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
             >
                <Image src="/images/text-style.png" alt="STYLE" width={1000} height={400} className="object-contain w-[90vw]" />
             </motion.div>

             <motion.div 
               style={{ rotate: isMobile ? 0 : rotate }} 
               animate={floatingAnimation} // ✅ فعال برای همه
               className="absolute top-10 right-10 md:top-20 md:right-40 w-40 h-40 md:w-80 md:h-80 z-10 opacity-80"
             >
                <Image src="/images/floating-brush.png" alt="Brush" fill className="object-contain drop-shadow-2xl" />
             </motion.div>

             <div className="relative z-20 max-w-xl text-center px-6">
               <span className="text-brand-gold text-xs tracking-[0.3em] uppercase block mb-4 font-sans font-bold">Precision</span>
               <h3 className="text-6xl md:text-8xl font-sans font-black text-brand-dark mb-6 tracking-tighter">
                 استایلِ <span className="italic text-brand-gold font-light font-serif">تو</span>
               </h3>
               <p className="text-gray-500 text-base md:text-lg leading-loose font-sans font-medium">
                 ما فقط موها را کوتاه نمی‌کنیم؛<br/>
                 ما شخصیت شما را در قالب هنر بازآفرینی می‌کنیم.
               </p>
             </div>
          </div>

          {/* === اسلاید ۲: PURE === */}
          <div className="relative h-[80vh] md:h-full w-full md:w-screen flex items-center justify-center flex-shrink-0 bg-[#EAEFE9] border-b md:border-b-0 md:border-r border-black/5 overflow-hidden">
             <motion.div 
               animate={floatingAnimation}
               className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
             >
                <Image src="/images/text-pure.png" alt="PURE" width={1000} height={400} className="object-contain w-[90vw]" />
             </motion.div>
             
             <motion.div 
               style={{ rotate: isMobile ? 0 : rotateReverse }}
               animate={{ y: [0, 15, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} // ✅ فعال
               className="absolute bottom-10 left-10 md:bottom-20 md:left-40 w-32 h-32 md:w-64 md:h-64 z-10 opacity-80"
             >
                <Image src="/images/floating-perfume.png" alt="Perfume" fill className="object-contain drop-shadow-2xl" />
             </motion.div>

             <div className="relative z-20 flex flex-col items-center">
               <div className="w-48 h-64 md:w-64 md:h-80 bg-white/40 backdrop-blur-md rounded-full border border-white/60 mb-10 flex items-center justify-center shadow-2xl">
                  <span className="font-serif italic text-brand-dark/50 text-3xl">Pure</span>
               </div>
               <h3 className="text-4xl md:text-5xl font-sans font-black text-brand-dark">اصالت و زیبایی</h3>
             </div>
          </div>

          {/* === اسلاید ۳: ART === */}
          <div className="relative h-[80vh] md:h-full w-full md:w-screen flex items-center justify-center flex-shrink-0 bg-[#1a1a1a] text-white overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
                <Image src="/images/text-art.png" alt="ART" width={1000} height={400} className="object-contain w-[80vw] invert" />
             </div>

             <div className="relative z-20 max-w-4xl text-center px-6 py-12 border-y border-brand-gold/20">
               <p className="text-3xl md:text-5xl font-light leading-relaxed font-sans italic text-brand-gold">
                 &quot;در آیـنـه، هر قیچی یک قلم‌مو است <br/> و صورت شما بوم نقاشی ما.&quot;
               </p>
               <div className="mt-12">
                 <button className="px-10 py-4 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold font-sans">
                   شروع تغییر
                 </button>
               </div>
             </div>
          </div>

          {/* === اسلاید ۴: پایان === */}
          <div className="relative h-[50vh] md:h-full w-full md:w-[80vw] flex flex-col items-center justify-center flex-shrink-0 bg-brand-gold">
             <h2 className="text-5xl md:text-8xl font-black text-white mb-8 text-center leading-tight font-sans">
               نوبتِ درخشش <br/> شماست
             </h2>
          </div>

        </motion.div>
      </div>
    </section>
  );
}