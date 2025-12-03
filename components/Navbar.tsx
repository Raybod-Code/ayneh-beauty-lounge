"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import LuxuryButton from "@/components/LuxuryButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "خانه", href: "#home" },
    { name: "خدمات", href: "#services" },
    { name: "تجربه", href: "#experience" },
    { name: "درباره ما", href: "#about" },
    { name: "تماس", href: "#contact" },
  ];

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${
          scrolled ? "top-4 px-4" : "top-0 py-6 px-6"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-lg rounded-full px-6 py-3 w-full max-w-5xl border border-white/20" 
              : "w-full max-w-7xl bg-transparent"
          }`}
        >
          {/* لوگو */}
          <Link href="#home" className={`font-serif font-bold text-2xl tracking-tighter ${scrolled ? "text-brand-dark" : "text-white"}`}>
            AYNEH
          </Link>

          {/* لینک‌های دسکتاپ (از md به بالا نشون میده) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleScrollTo(item.href)}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-brand-dark hover:text-brand-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* دکمه سمت چپ */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LuxuryButton 
                onClick={() => window.open("https://wa.me/989170000000", "_blank")}
                variant={scrolled ? "solid" : "outline"} 
                className={scrolled ? "py-2 px-5 text-xs bg-brand-dark text-white" : "py-2 px-6 border-white text-white hover:bg-white hover:text-black"}
              >
                رزرو وقت
              </LuxuryButton>
            </div>

            {/* همبرگری موبایل (فقط زیر md) */}
            <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className={scrolled ? "text-brand-dark" : "text-white"} />
              ) : (
                <Menu className={scrolled ? "text-brand-dark" : "text-white"} />
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* منوی موبایل (تمام صفحه) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-bg z-[90] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((item, i) => (
               <motion.button
                 key={item.name}
                 onClick={() => handleScrollTo(item.href)}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="text-3xl font-serif font-bold text-brand-dark"
               >
                 {item.name}
               </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}