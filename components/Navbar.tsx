"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/app/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={{ width: "90%", borderRadius: "24px", y: 0 }}
        animate={{
          width: scrolled ? "auto" : "90%", // در حالت اسکرول جمع‌وجور میشه
          borderRadius: "50px",
          y: scrolled ? 0 : 10,
          backgroundColor: scrolled ? "rgba(15, 15, 15, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          padding: scrolled ? "8px 12px" : "20px 40px",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-auto flex items-center justify-between max-w-5xl mx-auto"
      >
        
        {/* لوگو - فقط وقتی اسکرول نشده نشون داده میشه تا جا باز شه */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden md:block mr-12 shrink-0 overflow-hidden"
            >
              <Link href="/" className="text-2xl font-black font-serif text-white tracking-tighter">
                AYNEH
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* لینک‌ها - با افکت Sliding Tab */}
        <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar mask-gradient-x w-full md:w-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="relative shrink-0">
              <Link
                href={link.href}
                className="relative z-10 block px-4 py-2 text-xs md:text-sm font-medium text-white/70 hover:text-white transition-colors"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.name}
              </Link>
              
              {/* اون هاله متحرک پشت لینک */}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-white/10 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* دکمه رزرو - همیشه هست */}
        <div className={`shrink-0 ${scrolled ? "ml-2" : "ml-12"}`}>
          <button 
            onClick={() => window.open("https://wa.me/989170000000", "_blank")}
            className={`
              relative overflow-hidden rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300
              ${scrolled 
                ? "bg-brand-gold text-black px-5 py-2.5 hover:bg-white" 
                : "border border-white/30 text-white px-6 py-3 hover:bg-white hover:text-black"
              }
            `}
          >
            رزرو
          </button>
        </div>

      </motion.nav>
    </div>
  );
}