"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LuxuryButton from "@/components/LuxuryButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "خانه", href: "#home" },
    { name: "داستان", href: "#story" },
    { name: "خدمات", href: "#services" },
    { name: "مود", href: "#mood" },
    { name: "تماس", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-white/10 py-3 md:py-4 shadow-2xl"
          : "bg-transparent border-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* لوگو */}
          <Link
            href="#home"
            className="text-xl md:text-2xl font-serif font-black text-white tracking-tighter shrink-0 z-10 relative"
          >
            AYNEH
          </Link>

          {/* منوی دسکتاپ (وسط) */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-bold text-white/60 hover:text-brand-gold transition-colors tracking-[0.15em] uppercase relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* دکمه رزرو (همیشه دیده می‌شود) */}
          <div className="shrink-0 z-10">
            <LuxuryButton
              onClick={() =>
                window.open("https://wa.me/989170000000", "_blank")
              }
              variant="outline"
              className="py-1.5 px-4 md:py-2 md:px-6 text-[10px] md:text-xs border-white/30 text-white hover:bg-white hover:text-black"
            >
              رزرو نوبت
            </LuxuryButton>
          </div>
        </div>

        {/* منوی موبایل (اسکرول افقی زیر هدر) */}
        <div className="md:hidden mt-4 pb-1 overflow-x-auto no-scrollbar mask-gradient-x flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-medium text-white/80 whitespace-nowrap active:text-brand-gold"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
