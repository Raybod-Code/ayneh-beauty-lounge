"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// عکس‌های دمو (بعداً با عکس‌های واقعی عوض کن)
const IMAGES_ROW_1 = [
  "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3993313/pexels-photo-3993313.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3992875/pexels-photo-3992875.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const IMAGES_ROW_2 = [
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export default function Gallery() {
  const containerRef = useRef(null);
  
  // گرفتن میزان اسکرول صفحه
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // تبدیل اسکرول عمودی به حرکت افقی (پارالاکس)
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // ردیف اول به چپ
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0]); // ردیف دوم به راست

  // نرم کردن حرکت
  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const translateX1 = useSpring(x1, springConfig);
  const translateX2 = useSpring(x2, springConfig);

  return (
    <section ref={containerRef} className="py-32 bg-brand-bg overflow-hidden relative font-sans">
      
      {/* تیتر گالری */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <span className="block text-sm font-serif tracking-[0.3em] text-brand-gold mb-4 uppercase">
          Atmosphere
        </span>
        <h2 className="text-4xl lg:text-6xl font-black text-brand-dark" style={{ fontFamily: 'var(--font-doran)' }}>
          لحظاتی در <span className="font-serif italic font-light text-brand-gray">آیـنـه</span>
        </h2>
      </div>

      {/* ردیف اول عکس‌ها */}
      <motion.div 
        style={{ x: translateX1 }}
        className="flex gap-8 mb-8 w-[150%] lg:w-[120%] -translate-x-10"
      >
        {[...IMAGES_ROW_1, ...IMAGES_ROW_1].map((src, index) => (
          <div key={index} className="relative w-72 h-96 lg:w-96 lg:h-[30rem] flex-shrink-0 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer hover:scale-105">
            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/20 hover:bg-transparent transition-colors" />
          </div>
        ))}
      </motion.div>

      {/* ردیف دوم عکس‌ها */}
      <motion.div 
        style={{ x: translateX2 }}
        className="flex gap-8 w-[150%] lg:w-[120%] -translate-x-40"
      >
        {[...IMAGES_ROW_2, ...IMAGES_ROW_2].map((src, index) => (
          <div key={index} className="relative w-72 h-96 lg:w-96 lg:h-[30rem] flex-shrink-0 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer hover:scale-105">
            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/20 hover:bg-transparent transition-colors" />
          </div>
        ))}
      </motion.div>

    </section>
  );
}