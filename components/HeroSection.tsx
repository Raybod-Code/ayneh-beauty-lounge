"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import LuxuryButton from "@/components/LuxuryButton";
import { useEffect } from "react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  // متغیرهای پارالاکس اسکرول (برای عمق دادن موقع پایین رفتن)
  const yBack = useTransform(scrollY, [0, 500], [0, 200]); 
  const yFront = useTransform(scrollY, [0, 500], [0, -100]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // متغیرهای حرکت موس (Mouse Parallax)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  
  // نرم‌کردن حرکت موس برای جلوگیری از لرزش
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center bg-black perspective-1000"
    >
      
      {/* 1. ویدیو پس‌زمینه (اتمسفر) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505] z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-110 opacity-60"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. آینه شناور (عنصر مرکزی) */}
      <motion.div 
        style={{ rotateX, rotateY, y: yBack }}
        className="absolute z-10 w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw] opacity-100 transition-all duration-75 drop-shadow-[0_0_50px_rgba(198,168,124,0.3)]"
      >
        <Image 
          src="/images/floating-mirror.png" 
          alt="Ayneh" 
          fill 
          className="object-contain"
          priority
        />
      </motion.div>

      {/* 3. قیچی و عطر معلق (که دور آینه می‌چرخند) */}
      <motion.div 
        style={{ x: useTransform(mouseX, (v) => v * -50), y: yFront }}
        className="absolute top-[20%] right-[10%] w-32 h-32 md:w-56 md:h-56 z-20 pointer-events-none"
      >
         <Image src="/images/floating-scissors.png" alt="Scissors" fill className="object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div 
        style={{ x: useTransform(mouseX, (v) => v * 50), y: yFront }}
        className="absolute bottom-[20%] left-[10%] w-24 h-24 md:w-40 md:h-40 z-20 pointer-events-none blur-[1px]"
      >
         <Image src="/images/floating-perfume.png" alt="Perfume" fill className="object-contain drop-shadow-2xl" />
      </motion.div>

      {/* 4. تایتل اصلی */}
      <motion.div style={{ opacity }} className="relative z-30 text-center mt-40 mix-blend-overlay">
        <h1 className="text-[18vw] font-serif font-black leading-none tracking-tighter text-white select-none">
          AYNEH
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-white/80 uppercase mt-4">
          Beauty Lounge
        </p>
      </motion.div>

      {/* دکمه اسکرول به پایین */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

    </section>
  );
}