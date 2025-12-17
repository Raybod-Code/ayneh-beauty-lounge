"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext"; // 👈

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const { cartItems, setIsOpen: setIsCartOpen } = useCart(); // 👈 گرفتن آیتم‌ها و تابع باز کردن دراور
  const cartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0); // محاسبه تعداد

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "خانه", href: "/" },
    { name: "خدمات", href: "/#services" },
    { name: "فروشگاه", href: "/shop" }, // 👈 لینک فروشگاه اضافه شد
    { name: "رزرو نوبت", href: "/booking" },
    { name: "گالری", href: "/#gallery" },
    { name: "تماس", href: "/#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-2 group">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-[#C6A87C] transition-colors">
                <span className="font-serif font-black text-black text-xl">A</span>
             </div>
             <span className="font-serif font-bold text-xl tracking-widest hidden md:block">AYNEH</span>
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#C6A87C] ${
                  pathname === link.href ? "text-[#C6A87C]" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* آیکون‌ها */}
          <div className="flex items-center gap-4">
             {/* دکمه سبد خرید */}
             <button 
               onClick={() => setIsCartOpen(true)} // باز کردن دراور
               className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
             >
                <ShoppingBag size={22} className="group-hover:text-[#C6A87C] transition-colors" />
                
                {/* 🔴 بج تعداد محصول */}
                {cartCount > 0 && (
                   <span className="absolute top-0 right-0 w-5 h-5 bg-[#C6A87C] text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                      {cartCount}
                   </span>
                )}
             </button>

             <Link href="/login" className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#C6A87C] transition-colors">
                <User size={18} /> ورود
             </Link>

             {/* دکمه منوی موبایل */}
             <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-white">
                <Menu size={28} />
             </button>
          </div>
        </div>
      </motion.nav>

      {/* منوی موبایل (Full Screen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center gap-8"
          >
             <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-2 bg-white/10 rounded-full">
                <X size={32} />
             </button>

             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 onClick={() => setIsOpen(false)}
                 className="text-3xl font-serif font-bold text-white hover:text-[#C6A87C] transition-colors"
               >
                 {link.name}
               </Link>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}