"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const MOODS = [
  {
    id: "01",
    title: "جسور و خاص",
    en: "BOLD",
    desc: "کوتاهی‌های ژورنالی و رنگ‌های فشن برای تغییری چشمگیر.",
    image: "/images/service-haircut.png",
  },
  {
    id: "02",
    title: "آرامش مطلق",
    en: "RELAX",
    desc: "یک ساعت اسپا و ماساژ سر برای فرار از هیاهوی شهر.",
    image: "/images/service-spa.png",
  },
  {
    id: "03",
    title: "درخشش طبیعی",
    en: "GLOW",
    desc: "احیای مو و فیشال تخصصی پوست برای درخششی ماندگار.",
    image: "/images/service-color.png",
  },
  {
    id: "04",
    title: "شکوه عروس",
    en: "ROYAL",
    desc: "پکیج VIP میکاپ و شینیون برای مهم‌ترین شب زندگی.",
    image: "/images/service-bridal.png",
  },
];

export default function MoodSelector() {
  const [activeMood, setActiveMood] = useState(MOODS[0]);

  return (
    <section className="relative bg-[#050505] py-20 md:py-32 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-24">
        
        {/* --- ستون تصویر (نمایشگر) --- */}
        {/* در موبایل ارتفاعش کمتره، در دسکتاپ بلنده و Sticky */}
        <div className="w-full md:w-5/12 h-[300px] md:h-[600px] relative rounded-[2rem] overflow-hidden md:sticky md:top-32 shadow-2xl order-1 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={activeMood.image} 
                alt={activeMood.title} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <h3 className="text-5xl md:text-8xl font-black text-white/20 font-sans tracking-tighter select-none">
                  {activeMood.en}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- ستون لیست (انتخابگر) --- */}
        <div className="w-full md:w-7/12 flex flex-col justify-center py-0 md:py-10 order-2 md:order-2">
          <div className="mb-8 md:mb-16 text-center md:text-right">
            <span className="text-brand-gold text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-3">
              Curated Experience
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-white">
              انتخاب <span className="italic text-brand-gold">احساس</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {MOODS.map((mood) => (
              <div 
                key={mood.id}
                // در موبایل با کلیک، در دسکتاپ با هاور
                onClick={() => setActiveMood(mood)}
                onMouseEnter={() => setActiveMood(mood)}
                className={`group cursor-pointer border-b border-white/10 py-5 md:py-8 transition-all duration-500 
                  ${activeMood.id === mood.id ? 'opacity-100 bg-white/5 md:bg-transparent rounded-xl md:rounded-none px-4 md:px-4' : 'opacity-50 hover:opacity-80 px-2'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-brand-gold font-mono">{mood.id}</span>
                    <h3 className={`text-xl md:text-4xl font-serif transition-colors ${activeMood.id === mood.id ? 'text-white' : 'text-gray-500'}`}>
                      {mood.title}
                    </h3>
                  </div>
                  <ArrowLeft 
                    size={20}
                    className={`text-brand-gold transition-transform duration-300 ${activeMood.id === mood.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} 
                  />
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ${activeMood.id === mood.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 font-light text-xs md:text-lg leading-relaxed max-w-md mr-8 md:mr-10">
                    {mood.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}