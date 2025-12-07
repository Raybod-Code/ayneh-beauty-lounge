"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Sparkles, Scissors, PenTool, 
  Wind, CircleDashed, CheckCircle2, 
  Moon, Sun, 
  Minimize2, Maximize2, Brush, 
  Fingerprint, ShieldCheck 
} from "lucide-react";
import Image from "next/image";
import { QUIZ_DATA, RECOMMENDATIONS, RecommendationType } from "@/app/constants/quiz";

// مپ کردن کلمات کلیدی به آیکون‌های لوکس
const ICON_MAP: Record<string, any> = {
  // Hair Icons
  dry: Wind,           // موی خشک -> باد
  boring: CircleDashed,// معمولی -> دایره خط‌چین
  healthy: CheckCircle2,// سالم -> تیک
  sleep: Moon,         // رسیدگی کم -> ماه
  style: Sun,          // رسیدگی زیاد -> خورشید
  
  // Nail Icons
  break: Minimize2,    // شکننده -> کوچک
  ok: Fingerprint,     // معمولی -> اثر انگشت
  strong: ShieldCheck, // محکم -> سپر
  long: Maximize2,     // بلند -> بزرگ
  minimal: CircleDashed, // مینیمال
  art: Brush,          // هنری -> قلم‌مو
};

type Category = "hair" | "nail" | null;
type Scores = { [key: string]: number };

export default function SmartQuiz({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState<Category>(null);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [result, setResult] = useState<RecommendationType | null>(null);

  const handleCategorySelect = (cat: "hair" | "nail") => {
    setCategory(cat);
    setStep(0);
    setScores({});
  };

  const handleOptionClick = (optionScores: Partial<Scores>) => {
    if (!category) return;

    const newScores = { ...scores };
    Object.keys(optionScores).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + (optionScores[key] || 0);
    });
    setScores(newScores);

    const questions = QUIZ_DATA[category];
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Scores) => {
    const winnerKey = Object.keys(finalScores).reduce((a, b) => finalScores[a] > finalScores[b] ? a : b);
    setResult(RECOMMENDATIONS[winnerKey]);
  };

  const currentQuestions = category ? QUIZ_DATA[category] : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden font-sans"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
        <X size={32} />
      </button>

      <div className="w-full max-w-2xl relative">
        
        {/* --- مرحله ۰: انتخاب دسته --- */}
        {!category && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-12">
              در کدام بخش نیاز به <span className="text-brand-gold">مشاوره</span> دارید؟
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleCategorySelect("hair")}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border border-white/10 hover:border-brand-gold hover:bg-white/[0.05] transition-all w-full md:w-64 h-64"
              >
                <Scissors size={48} strokeWidth={1} className="text-gray-400 group-hover:text-brand-gold transition-colors" />
                <span className="text-2xl font-bold">خدمات مو</span>
              </button>
              
              <button 
                onClick={() => handleCategorySelect("nail")}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border border-white/10 hover:border-brand-gold hover:bg-white/[0.05] transition-all w-full md:w-64 h-64"
              >
                <PenTool size={48} strokeWidth={1} className="text-gray-400 group-hover:text-brand-gold transition-colors" />
                <span className="text-2xl font-bold">خدمات ناخن</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* --- مرحله پرسش و پاسخ --- */}
        {category && !result && (
          <div className="flex flex-col items-center text-center">
            <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
              <motion.div 
                className="h-full bg-brand-gold"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / currentQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${step}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <span className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4 block">
                  Step 0{step + 1}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-10 leading-tight">
                  {currentQuestions[step].question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestions[step].options.map((option: any, idx: number) => {
                    const IconComponent = ICON_MAP[option.icon] || Sparkles; // آیکون پیش‌فرض
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option.score)}
                        className="group flex items-center justify-between p-6 rounded-2xl border border-white/10 hover:border-brand-gold/50 hover:bg-white/[0.03] transition-all text-right"
                      >
                        <span className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors font-medium">
                          {option.text}
                        </span>
                        {/* رندر کردن آیکون */}
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold/50 group-hover:text-brand-gold group-hover:scale-110 transition-all">
                           <IconComponent size={24} strokeWidth={1.5} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* --- مرحله نتیجه --- */}
        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            <div className="h-2 bg-gradient-to-r from-brand-gold via-white to-brand-gold" />
            
            <div className="p-8 md:p-10 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest uppercase mb-6">
                <Sparkles size={14} />
                پیشنهاد هوشمند ما
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                {result.title}
              </h2>
              
              <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-6 group bg-gray-900">
                <Image 
                  src={result.image} 
                  alt={result.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center p-6">
                   <p className="text-gray-200 font-medium text-base md:text-lg leading-relaxed max-w-md">
                     {result.description}
                   </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
                <div className="text-center md:text-right">
                  <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">حدود هزینه</span>
                  <span className="text-xl font-bold text-white" dir="ltr">{result.priceRange} <span className="text-sm font-light text-gray-500">T</span></span>
                </div>
                
                <button 
                  onClick={() => window.open(`https://wa.me/989170000000?text=سلام، من از مشاوره هوشمند استفاده کردم و "${result.title}" بهم پیشنهاد شد. برای رزرو وقت راهنمایی می‌خواستم.`, "_blank")}
                  className="bg-brand-gold text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors w-full md:w-auto"
                >
                  رزرو همین پکیج
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}