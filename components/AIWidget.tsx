"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, X, Sparkles, ChevronRight, Camera } from "lucide-react";
import FaceAnalyzer from "./FaceAnalyzer"; // مطمئن شو این فایل هست
import SmartQuiz  from "./SmartQuiz"; // مطمئن شو این فایل هست

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'menu' | 'scan' | 'quiz'>('menu');

  // ریست کردن ویجت موقع بستن
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setMode('menu'), 300);
  };

  return (
    <>
      {/* --- دکمه شناور (همیشه دیده میشه) --- */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[90] w-16 h-16 bg-[#C6A87C] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(198,168,124,0.6)] border-2 border-white/20 group overflow-hidden"
      >
        {/* انیمیشن درخشش پس‌زمینه */}
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
        <ScanFace size={32} strokeWidth={2} className="relative z-10 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* --- پنجره مودال (وسط‌چین و جمع‌وجور) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ۱. پس‌زمینه تار */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* ۲. باکس اصلی */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#111] border border-white/10 rounded-[2rem] shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[85vh]"
            >
              
              {/* هدر */}
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-[#1a1a1a]">
                <div className="flex items-center gap-2 text-[#C6A87C]">
                  <Sparkles size={18} />
                  <span className="font-bold text-sm tracking-wider uppercase">Ayneh AI Assistant</span>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* بدنه اسکرول‌خور */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                
                {mode === 'menu' && (
                  <div className="space-y-4">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-black font-serif text-white mb-2">چطور می‌تونم کمکت کنم؟</h2>
                      <p className="text-gray-400 text-sm">از هوش مصنوعی برای پیدا کردن بهترین استایل کمک بگیر.</p>
                    </div>

                    <button
                      onClick={() => setMode('scan')}
                      className="w-full bg-gradient-to-r from-[#C6A87C] to-[#b0936a] p-1 rounded-2xl group"
                    >
                      <div className="bg-[#1a1a1a] rounded-xl p-5 flex items-center gap-4 transition-colors group-hover:bg-transparent group-hover:text-black">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-[#C6A87C] group-hover:bg-black/20 group-hover:text-black">
                          <Camera size={24} />
                        </div>
                        <div className="text-right flex-1">
                          <h3 className="font-bold text-lg group-hover:text-black text-white">آنالیز چهره هوشمند</h3>
                          <p className="text-xs text-gray-400 group-hover:text-black/70">تشخیص فرم صورت و پیشنهاد مدل مو</p>
                        </div>
                        <ChevronRight className="text-gray-500 group-hover:text-black" />
                      </div>
                    </button>

                    <button
                      onClick={() => setMode('quiz')}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors text-right"
                    >
                      <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-white">
                        <Sparkles size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white">آزمون استایل‌شناسی</h3>
                        <p className="text-xs text-gray-400">پیدا کردن روتین پوستی مناسب شما</p>
                      </div>
                      <ChevronRight className="text-gray-500" />
                    </button>
                  </div>
                )}

                {/* کامپوننت‌های داخلی */}
                {mode === 'scan' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                    <button onClick={() => setMode('menu')} className="mb-4 text-xs text-gray-500 hover:text-white flex items-center gap-1">
                      <ChevronRight size={14} className="rotate-180" /> بازگشت
                    </button>
                    {/* این کامپوننت باید ریسپانسیو باشه */}
                    <FaceAnalyzer /> 
                  </motion.div>
                )}

                {mode === 'quiz' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <button onClick={() => setMode('menu')} className="mb-4 text-xs text-gray-500 hover:text-white flex items-center gap-1">
                      <ChevronRight size={14} className="rotate-180" /> بازگشت
                    </button>
                    <SmartQuiz onClose={function (): void {
                                          throw new Error("Function not implemented.");
                                      } } />
                  </motion.div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}