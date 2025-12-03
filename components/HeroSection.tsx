"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LuxuryButton from "@/components/LuxuryButton";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yVideo = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      
      {/* ویدیو */}
      <motion.div style={{ y: yVideo }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* متن */}
      <motion.div style={{ opacity: opacityText }} className="relative z-20 text-center px-4 mix-blend-overlay pt-20">
        <h2 className="text-white text-xs md:text-sm tracking-[0.6em] uppercase mb-6 border-b border-white/30 pb-4 inline-block">
          Luxury Beauty Lounge
        </h2>
        <h1 className="text-white text-6xl md:text-[8rem] font-serif tracking-tight mb-6 drop-shadow-2xl leading-none">
          AYNEH
        </h1>
        <p className="text-white/80 text-lg font-light max-w-md mx-auto">
          تلفیقی از هنر، تکنولوژی و اصالت.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
           <LuxuryButton variant="outline" className="border-white text-white hover:bg-white hover:text-black">
             تماشای گالری
           </LuxuryButton>
        </div>
      </motion.div>

      {/* نویز و گرادینت پایین */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('/images/noise.png')]"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-bg to-transparent z-20"></div>
    </section>
  );
}