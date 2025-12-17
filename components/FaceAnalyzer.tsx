// components/FaceAnalyzer.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { analyzeFaceGeometry } from "@/utils/faceLogic";
import { PRODUCTS } from "@/utils/faceDatabase";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Sparkles, Palette, Scissors, Lightbulb } from "lucide-react";

export default function FaceAnalyzer({ landmarks }: { landmarks: any[] }) {
  const { addToCart } = useCart();
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const data = analyzeFaceGeometry(landmarks);
      setResult(data);
      setIsAnalyzing(false);
    }, 2500); // شبیه‌سازی زمان پردازش AI
  };

  const handleAddToCart = (prodId: string) => {
    const product = PRODUCTS.find(p => p.id === prodId);
    if (product) {
      addToCart(product);
      setAddedId(prodId);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <AnimatePresence mode="wait">
        {!result && !isAnalyzing ? (
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={startAnalysis}
            className="w-full py-24 border-2 border-dashed border-brand-gold/30 rounded-[3rem] text-brand-gold hover:bg-brand-gold/5 flex flex-col items-center gap-4 group transition-all"
          >
            <Sparkles size={48} className="group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-widest uppercase font-serif">شروع آنالیز هوشمند استایل آینه</span>
          </motion.button>
        ) : isAnalyzing ? (
          <motion.div key="loading" className="py-24 text-center space-y-6">
            <div className="w-20 h-20 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-brand-gold font-mono animate-pulse uppercase">Scanning Geometry & Ratios...</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* ۱. ستون تحلیل فرم چهره */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
                <h3 className="text-4xl font-black text-white mb-4">فرم چهره: <span className="text-brand-gold uppercase">{result.title}</span></h3>
                <p className="text-gray-400 leading-loose text-lg">{result.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* بخش میکاپ و مو */}
                 <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5">
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                       <Lightbulb size={20} /> <span className="font-bold text-sm uppercase">توصیه میکاپ و مو</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">💄 {result.makeup}</p>
                    <p className="text-sm text-gray-300">✂️ {result.hair}</p>
                 </div>
                 {/* پالت رنگی داینامیک */}
                 <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5">
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                       <Palette size={20} /> <span className="font-bold text-sm uppercase">پالت رنگی شخصی</span>
                    </div>
                    <div className="flex gap-4">
                      {result.palette.map((c: string) => (
                        <div key={c} style={{ backgroundColor: c }} className="w-10 h-10 rounded-full border border-white/10 shadow-lg" title={c} />
                      ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* ۲. ستون پیشنهادات تجاری (Cross-Selling) */}
            <div className="space-y-6">
              {/* پیشنهاد خدمت */}
              <a href={result.service.link} className="block p-6 bg-brand-gold text-black rounded-[2rem] hover:bg-white transition-colors group">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Recommended Service</span>
                   <Scissors size={20} />
                </div>
                <h4 className="text-xl font-black mb-1">{result.service.name}</h4>
                <p className="text-xs font-bold opacity-70 group-hover:opacity-100 uppercase">رزرو وقت مشاوره رایگان</p>
              </a>

              {/* پیشنهاد محصول (خرید واقعی) */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem]">
                <div className="flex items-center gap-2 mb-4 opacity-50">
                  <ShoppingBag size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Personalized Product</span>
                </div>
                {(() => {
                  const product = PRODUCTS.find(p => p.id === result.productId);
                  if (!product) return null;
                  return (
                    <div className="space-y-4">
                       <div className="flex gap-4 items-center">
                          <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt={product.name} />
                          <div>
                            <h4 className="font-bold text-white text-sm">{product.name}</h4>
                            <p className="text-brand-gold text-sm font-mono">{product.price.toLocaleString()} تومان</p>
                          </div>
                       </div>
                       <button 
                        onClick={() => handleAddToCart(product.id)}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${addedId === product.id ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-brand-gold'}`}
                       >
                        {addedId === product.id ? <><Check size={18} /> اضافه شد</> : <><ShoppingBag size={18} /> افزودن به سبد</>}
                       </button>
                    </div>
                  )
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}