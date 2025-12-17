"use client";

import { useState } from "react";
import {
  Sparkles,
  X,
  ScanFace,
  MessageCircleQuestion,
  ChevronRight,
  BrainCircuit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FaceAnalyzer from "@/components/FaceAnalyzer";
import SmartQuiz from "@/components/SmartQuiz"; // 👈 بازگشت مشاور هوشمند

type AIView = "menu" | "face" | "quiz";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AIView>("menu");

  const handleClose = () => {
    setIsOpen(false);
    // وقتی بسته شد، بعد از کمی تاخیر برگرده به منو که دفعه بعد تمیز باشه
    setTimeout(() => setCurrentView("menu"), 500);
  };

  return (
    <>
      {/* دکمه شناور (همیشه در صفحه) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] w-14 h-14 md:w-16 md:h-16 bg-brand-gold text-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(198,168,124,0.6)] border-2 border-white/20 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <BrainCircuit size={28} strokeWidth={1.5} className="relative z-10" />

        {/* افکت تپش (Pulse) */}
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </motion.button>

      {/* مودال اصلی */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* لایه تار پس‌زمینه */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* بدنه پنجره */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* هدر پنجره */}
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/5 bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  {currentView !== "menu" && (
                    <button
                      onClick={() => setCurrentView("menu")}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors mr-1"
                    >
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  )}
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
                    {currentView === "face" ? (
                      <ScanFace size={20} />
                    ) : currentView === "quiz" ? (
                      <MessageCircleQuestion size={20} />
                    ) : (
                      <Sparkles size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-none">
                      {currentView === "menu"
                        ? "مرکز هوشمند آینه"
                        : currentView === "face"
                        ? "آنالیزور چهره"
                        : "مشاور استایل"}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                      {currentView === "menu"
                        ? "انتخاب کنید چطور کمکتان کنیم"
                        : "هوش مصنوعی در خدمت زیبایی شما"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* محتوای متغیر */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {/* 1. منوی انتخاب (پیش‌فرض) */}
                {currentView === "menu" && (
                  <div className="h-full flex flex-col items-center justify-center gap-6 md:gap-10 animate-in fade-in zoom-in-95 duration-300">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl md:text-4xl font-black text-white">
                        سلام! 👋 من{" "}
                        <span className="text-brand-gold">آینه</span> هستم.
                      </h2>
                      <p className="text-gray-400">
                        امروز چطور می‌تونم به زیباتر شدنت کمک کنم؟
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                      {/* دکمه آنالیز چهره */}
                      <button
                        onClick={() => setCurrentView("face")}
                        className="group relative p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-brand-gold hover:text-black transition-all duration-300 text-right flex flex-col justify-between min-h-[200px]"
                      >
                        <div className="absolute top-6 left-6 w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center group-hover:bg-black/10 transition-colors">
                          <ScanFace size={32} />
                        </div>
                        <div className="mt-auto">
                          <h4 className="text-xl font-bold mb-2">
                            آنالیز هندسی چهره 📸
                          </h4>
                          <p className="text-sm opacity-60 group-hover:opacity-80 leading-relaxed">
                            با دوربین اسکن کنید تا فرم صورت و مدل‌های مناسبتون
                            رو با ریاضیات دقیق پیدا کنیم.
                          </p>
                        </div>
                      </button>

                      {/* دکمه مشاور استایل (همون که گم شده بود!) */}
                      <button
                        onClick={() => setCurrentView("quiz")}
                        className="group relative p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-[#C6A87C] hover:text-black transition-all duration-300 text-right flex flex-col justify-between min-h-[200px]"
                      >
                        <div className="absolute top-6 left-6 w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center group-hover:bg-black/10 transition-colors">
                          <MessageCircleQuestion size={32} />
                        </div>
                        <div className="mt-auto">
                          <h4 className="text-xl font-bold mb-2">
                            مشاوره هوشمند استایل 📝
                          </h4>
                          <p className="text-sm opacity-60 group-hover:opacity-80 leading-relaxed">
                            چند تا سوال ساده جواب بده تا بهترین خدمات و محصولات
                            رو بهت پیشنهاد بدم.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. کامپوننت آنالیز چهره */}
                {currentView === "face" && (
                  <div className="animate-in slide-in-from-right-10 duration-300">
                    <FaceAnalyzer />
                  </div>
                )}

                {/* 3. کامپوننت مشاور (SmartQuiz) */}
                {currentView === "quiz" && (
                  <div className="animate-in slide-in-from-left-10 duration-300">
                    <SmartQuiz
                      onClose={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
