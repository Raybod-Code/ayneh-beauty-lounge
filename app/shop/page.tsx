"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, Search, Filter, ArrowRight, Star, Plus, 
  SlidersHorizontal, X, Eye, ChevronDown, Heart
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { PRODUCTS } from "@/app/utils/faceDatabase";
import { motion, AnimatePresence } from "framer-motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه اختصاصی",
  description: "خرید محصولات مراقبتی و آرایشی لوکس با ضمانت اصالت کالا.",
};
// --- داده‌های نمونه توسعه یافته برای فروشگاه ---
// (در واقعیت این‌ها از دیتابیس اصلی می‌آیند)
const SHOP_DATA = [
  ...PRODUCTS.map(p => ({ ...p, category: 'makeup', label: 'پرفروش' })), // فرض می‌کنیم محصولات هوش مصنوعی میکاپ هستند
  { id: "p7", name: "شامپو کراتینه بدون سولفات", price: 450000, image: "/images/p3.jpg", category: "hair", rating: 4.8, label: "جدید" },
  { id: "p8", name: "سرم ویتامین C روشن‌کننده", price: 890000, image: "/images/p5.jpg", category: "skin", rating: 4.9, label: null },
  { id: "p9", name: "ماسک موی آرگان مراکشی", price: 620000, image: "/images/p1.jpg", category: "hair", rating: 4.7, label: null },
  { id: "p10", name: "کرم دور چشم ضد چروک", price: 1100000, image: "/images/p2.jpg", category: "skin", rating: 5.0, label: "VIP" },
  { id: "p11", name: "براش‌های حرفه‌ای میکاپ", price: 1500000, image: "/images/p4.jpg", category: "tools", rating: 4.9, label: null },
  { id: "p12", name: "اسپری محافظ حرارتی مو", price: 380000, image: "/images/p6.jpg", category: "hair", rating: 4.6, label: null },
];

const CATEGORIES = [
  { id: 'all', name: 'همه محصولات' },
  { id: 'hair', name: 'مراقبت مو' },
  { id: 'skin', name: 'مراقبت پوست' },
  { id: 'makeup', name: 'لوازم آرایشی' },
  { id: 'tools', name: 'ابزار و اکسسوری' },
];

const SORT_OPTIONS = [
  { id: 'newest', name: 'جدیدترین' },
  { id: 'price_low', name: 'ارزان‌ترین' },
  { id: 'price_high', name: 'گران‌ترین' },
  { id: 'popular', name: 'محبوب‌ترین' },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  
  // --- States ---
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 2000000]); // رنج قیمت فرضی
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null); // محصولی که در مودال باز شده

  // --- Filtering & Sorting Logic (Memoized for performance) ---
  const filteredProducts = useMemo(() => {
    let result = [...SHOP_DATA];

    // 1. فیلتر دسته‌بندی
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. فیلتر جستجو
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. فیلتر قیمت (ساده)
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. مرتب‌سازی
    if (sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
       result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    // 'newest' فرض بر این است که ترتیب اولیه آرایه است

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);


  // --- کامپوننت سایدبار فیلترها ---
  const FilterSidebar = () => (
    <div className="space-y-8 divide-y divide-white/10">
        {/* دسته‌بندی‌ها */}
        <div className="pt-4 first:pt-0">
            <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                دسته‌بندی‌ها <ChevronDown size={16} className="opacity-50"/>
            </h3>
            <div className="space-y-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-right flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeCategory === cat.id ? "bg-[#C6A87C] text-black font-bold" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
                    >
                        {cat.name}
                        {activeCategory === cat.id && <Filter size={14} />}
                    </button>
                ))}
            </div>
        </div>

        {/* فیلتر قیمت (شبیه‌سازی) */}
        <div className="pt-6">
            <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                محدوده قیمت <ChevronDown size={16} className="opacity-50"/>
            </h3>
            <div className="px-2">
                {/* اینجا در آینده یک کامپوننت اسلایدر دوطرفه واقعی قرار می‌گیرد */}
                <div className="h-2 bg-white/10 rounded-full relative mb-4">
                   <div className="absolute left-1/4 right-1/4 h-full bg-[#C6A87C] rounded-full"></div>
                   <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#C6A87C] border-2 border-black rounded-full cursor-pointer"></div>
                   <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#C6A87C] border-2 border-black rounded-full cursor-pointer"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-400">
                   <span>0 تومان</span>
                   <span>2M+ تومان</span>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C6A87C] selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* --- هیرو سکشن فروشگاه --- */}
      <div className="relative pt-40 pb-20 px-6 overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/shop-hero-bg.jpg')] bg-cover bg-center opacity-20 blur-3xl"></div> {/* یک پس‌زمینه محو */}
         <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
            <span className="text-[#C6A87C] text-xs tracking-[0.4em] uppercase font-bold animate-pulse">Ayneh Luxury Boutique</span>
            <h1 className="text-5xl md:text-7xl font-black font-serif leading-tight">
              کلکسیون <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#C6A87C] via-white to-[#C6A87C]">زیبایی</span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto text-lg font-light">
              انتخابی از برترین محصولات مراقبتی و آرایشی جهان، تایید شده توسط متخصصین آینه.
            </p>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
           
           {/* --- سایدبار فیلتر (دسکتاپ) --- */}
           <aside className="hidden lg:block w-72 sticky top-28 bg-[#111] border border-white/5 p-6 rounded-[2rem] h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shadow-xl">
               <FilterSidebar />
           </aside>

           {/* --- محتوای اصلی --- */}
           <div className="flex-1 w-full">
              
              {/* تولبار بالا (جستجو، فیلتر موبایل، مرتب‌سازی) */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-[#111]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 sticky top-24 z-30 shadow-lg">
                 
                 {/* دکمه فیلتر موبایل */}
                 <button 
                   onClick={() => setIsMobileFilterOpen(true)}
                   className="lg:hidden flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors w-full md:w-auto justify-center"
                 >
                    <SlidersHorizontal size={18} /> فیلترها
                 </button>

                 {/* جستجو */}
                 <div className="relative w-full md:max-w-md">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="جستجو در نام محصول..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pr-12 pl-4 outline-none focus:border-[#C6A87C] transition-colors text-left dir-ltr placeholder:text-right" 
                    />
                 </div>

                 {/* مرتب‌سازی */}
                 <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <span className="text-sm text-gray-500 hidden md:block">مرتب‌سازی:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C6A87C] cursor-pointer appearance-none pr-10 relative z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[left_1rem_center]"
                    >
                       {SORT_OPTIONS.map(opt => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                       ))}
                    </select>
                 </div>
              </div>

              {/* نمایش فیلترهای فعال */}
              {(activeCategory !== 'all' || searchQuery) && (
                 <div className="flex gap-2 flex-wrap mb-6">
                    {activeCategory !== 'all' && (
                       <div className="flex items-center gap-2 bg-[#C6A87C] text-black px-3 py-1 rounded-full text-xs font-bold">
                          <span>{CATEGORIES.find(c => c.id === activeCategory)?.name}</span>
                          <button onClick={() => setActiveCategory('all')}><X size={14}/></button>
                       </div>
                    )}
                    {searchQuery && (
                       <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                          <span>جستجو: {searchQuery}</span>
                          <button onClick={() => setSearchQuery('')}><X size={14}/></button>
                       </div>
                    )}
                    <button onClick={() => {setActiveCategory('all'); setSearchQuery('')}} className="text-xs text-gray-400 hover:text-[#C6A87C] transition-colors pr-2">
                       پاک کردن همه
                    </button>
                 </div>
              )}
              
              {/* گرید محصولات */}
              {filteredProducts.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredProducts.map((product) => (
                       // --- کارت محصول حرفه‌ای ---
                       <motion.div 
                         layout
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         key={product.id} 
                         className="group relative bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#C6A87C]/30 transition-all duration-500 flex flex-col"
                       >
                          
                          {/* تصویر و اکشن‌ها */}
                          <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] p-4">
                             <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                             
                             {/* لیبل‌ها */}
                             <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.label && (
                                   <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${product.label === 'VIP' ? 'bg-black text-[#C6A87C] border border-[#C6A87C]' : 'bg-[#C6A87C] text-black'}`}>
                                      {product.label}
                                   </span>
                                )}
                             </div>
                             
                             {/* دکمه علاقه‌مندی */}
                             <button className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C6A87C] hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 delay-75">
                                <Heart size={18} />
                             </button>
    
                             {/* اکشن بار پایین تصویر */}
                             <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/80 to-transparent pt-10">
                                <button 
                                  onClick={() => addToCart(product)}
                                  className="flex-1 bg-[#C6A87C] text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg"
                                >
                                   <ShoppingBag size={18} /> افزودن
                                </button>
                                <button 
                                  onClick={() => setQuickViewProduct(product)}
                                  className="w-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/10"
                                  title="مشاهده سریع"
                                >
                                   <Eye size={20} />
                                </button>
                             </div>
                          </div>
    
                          {/* اطلاعات محصول */}
                          <div className="p-6 flex flex-col flex-1">
                             <div className="flex justify-between items-start mb-2 gap-2">
                                <h3 className="font-bold text-base leading-tight line-clamp-2">
                                   <Link href={`/shop/${product.id}`} className="hover:text-[#C6A87C] transition-colors">
                                      {product.name}
                                   </Link>
                                </h3>
                                {product.rating && (
                                   <div className="flex items-center gap-1 text-[#C6A87C] text-xs font-bold bg-[#C6A87C]/10 px-2 py-1 rounded-lg shrink-0">
                                      <Star size={10} fill="currentColor" /> {product.rating}
                                   </div>
                                )}
                             </div>
                             
                             <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                                <div>
                                   <span className="text-xs text-gray-500 block mb-1">قیمت محصول</span>
                                   <span className="text-lg font-mono font-bold text-white">{product.price.toLocaleString()}</span>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              ) : (
                 // حالت بدون نتیجه
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-[#111] rounded-[3rem] border border-white/5">
                    <Search size={64} className="mb-6 opacity-20" />
                    <h3 className="text-2xl font-bold text-white mb-2">محصولی یافت نشد!</h3>
                    <p>با این فیلترها نتیجه‌ای نداریم. لطفاً جستجو را تغییر دهید.</p>
                    <button onClick={() => {setActiveCategory('all'); setSearchQuery('')}} className="mt-6 text-[#C6A87C] underline hover:text-white transition-colors">
                       مشاهده همه محصولات
                    </button>
                 </div>
              )}
              
           </div>
        </div>

      </div>

      {/* --- مودال فیلتر موبایل --- */}
      <AnimatePresence>
         {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
               />
               <motion.div
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-white/10 p-6 overflow-y-auto"
               >
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-2xl font-bold">فیلترها</h2>
                     <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
                  </div>
                  <FilterSidebar />
                  <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-[#C6A87C] text-black py-4 rounded-xl font-bold mt-8">
                     مشاهده {filteredProducts.length} محصول
                  </button>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* --- مودال مشاهده سریع (Quick View) --- */}
      <AnimatePresence>
         {quickViewProduct && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
               />
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden max-w-4xl w-full shadow-2xl grid grid-cols-1 md:grid-cols-2"
               >
                  <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-red-500 transition-colors"><X size={20}/></button>
                  
                  <div className="relative aspect-square md:aspect-auto bg-[#0a0a0a]">
                     <Image src={quickViewProduct.image} alt={quickViewProduct.name} fill className="object-cover" />
                  </div>
                  
                  <div className="p-8 flex flex-col">
                     <h2 className="text-3xl font-black font-serif mb-4">{quickViewProduct.name}</h2>
                     <div className="text-2xl font-mono text-[#C6A87C] mb-6">{quickViewProduct.price.toLocaleString()} تومان</div>
                     <p className="text-gray-400 leading-loose mb-8">توضیحات خلاصه محصول در اینجا قرار می‌گیرد. این یک محصول فوق‌العاده برای مراقبت حرفه‌ای است.</p>
                     
                     <div className="mt-auto flex gap-4">
                        <button 
                          onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                          className="flex-1 bg-[#C6A87C] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg"
                        >
                           <ShoppingBag size={20} /> افزودن به سبد
                        </button>
                        <Link href={`/shop/${quickViewProduct.id}`} className="px-6 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                           جزئیات کامل <ArrowRight size={18}/>
                        </Link>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}