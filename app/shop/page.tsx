"use client";

import { useState, useMemo } from "react"; // 👈 هوک‌های جدید
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { PRODUCTS } from "@/app/constants";
import { ShoppingBag, ArrowUpRight, Star, Search, Filter } from "lucide-react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // استخراج دسته‌بندی‌ها به صورت دینامیک
  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  // فیلتر کردن هوشمند محصولات
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.enTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-gold selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* --- Header Section --- */}
      <section className="pt-48 pb-12 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none mix-blend-overlay" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-4 block font-sans font-bold">
            The Boutique
          </span>
          <h1 className="text-5xl md:text-8xl font-sans font-black mb-6 text-white">
            مجموعه <span className="italic text-brand-gold font-serif font-light">مراقبت</span>
          </h1>
        </motion.div>
      </section>

      {/* --- Filter & Search Bar (بخش جدید) --- */}
      <section className="px-6 mb-16 max-w-7xl mx-auto sticky top-28 z-30">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          
          {/* تب‌های دسته‌بندی */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                  ${activeCategory === cat 
                    ? "bg-brand-gold text-black shadow-[0_0_15px_rgba(198,168,124,0.3)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"}
                `}
              >
                {cat === "All" ? "همه محصولات" : cat}
              </button>
            ))}
          </div>

          {/* سرچ بار */}
          <div className="relative w-full md:w-80">
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
             <input 
               type="text" 
               placeholder="جستجو در بوتیک..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:border-brand-gold outline-none transition-colors text-sm font-sans"
             />
          </div>
        </div>
      </section>

      {/* --- Product Grid --- */}
      <section className="px-6 pb-40 max-w-7xl mx-auto min-h-[50vh]">
        
        {filteredProducts.length === 0 ? (
           <div className="text-center text-gray-500 py-20 flex flex-col items-center">
              <Filter size={48} className="mb-4 opacity-20" />
              <p>هیچ محصولی با این مشخصات پیدا نشد.</p>
           </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`} className="block group">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Product Image Card */}
                    <div className="relative aspect-[4/5] bg-[#111] rounded-[2rem] overflow-hidden mb-6 border border-white/5 group-hover:border-brand-gold/30 transition-colors duration-500">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-xl text-black">
                          <ShoppingBag size={24} />
                        </div>
                      </div>

                      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold font-sans text-white">
                        {product.price} <span className="text-[10px] opacity-70">تومان</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex justify-between items-start px-2">
                      <div>
                        <h3 className="text-xl font-bold font-sans text-white mb-1 group-hover:text-brand-gold transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-serif italic tracking-wide mb-3">
                          {product.enTitle}
                        </p>
                        <p className="text-xs text-gray-400 font-sans line-clamp-2 max-w-[250px] leading-relaxed font-light">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex text-brand-gold">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}