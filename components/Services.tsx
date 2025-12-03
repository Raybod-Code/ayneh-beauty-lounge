"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    title: "هیرکات ژورنالی",
    category: "Haircut & Style",
    price: "از ۴۵۰",
    image: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "رنگ و لایت آمبره",
    category: "Color & Light",
    price: "از ۲.۵۰۰",
    image: "https://images.pexels.com/photos/3993313/pexels-photo-3993313.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "کراتین و احیا",
    category: "Treatments",
    price: "از ۳.۰۰۰",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "میکاپ عروس VIP",
    category: "Bridal Makeup",
    price: "مشاوره حضوری",
    image: "https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "فیشال تخصصی پوست",
    category: "Skincare",
    price: "از ۹۰۰",
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Services() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="relative bg-[#0a0a0a] py-32 px-6 overflow-hidden"
      style={{ color: '#ffffff' }} // 👈 این خط مشکل رو حل می‌کنه (زورگویی مثبت!)
      onMouseMove={handleMouseMove}
    >
      
      {/* هدر بخش */}
      <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-light mb-4 text-white font-serif">
            خدمات ما
          </h2>
          <p className="text-gray-400 text-lg font-sans">
            تلفیقی از هنر، تکنیک و اصالت
          </p>
        </div>
        <div className="hidden md:block text-right">
           <span className="text-xs tracking-[0.3em] uppercase opacity-50 text-white">Service Menu</span>
        </div>
      </div>

      {/* لیست خدمات */}
      <div className="max-w-7xl mx-auto">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            onMouseEnter={() => setActiveImage(service.image)}
            onMouseLeave={() => setActiveImage(null)}
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 z-10">
              <span className="text-xs text-gray-500 font-serif tracking-wider w-32">0{service.id}</span>
              <h3 className="text-3xl md:text-5xl font-light group-hover:pl-4 transition-all duration-500 text-white font-sans">
                {service.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-8 z-10">
              <span className="text-lg text-gray-400 group-hover:text-white transition-colors font-sans">
                {service.price}
              </span>
              <ArrowLeft className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
            </div>
            
            {/* لایه رنگی موقع هاور */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* عکس شناور (فقط دسکتاپ) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[500px] rounded-2xl overflow-hidden pointer-events-none z-50 hidden md:block"
        animate={{
          x: cursorPos.x - 200,
          y: cursorPos.y - 250,
          opacity: activeImage ? 1 : 0,
          scale: activeImage ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {activeImage && (
          <img 
            src={activeImage} 
            alt="Service Preview" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0"
          />
        )}
      </motion.div>

    </section>
  );
}