"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/app/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  
  const { 
    isOpen, closeCart, items, 
    removeItem, increaseQuantity, decreaseQuantity, 
    totalPrice 
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 👇 تابع جدید: تولید فاکتور واتس‌اپ
  const handleCheckout = () => {
    if (items.length === 0) return;

    const lineItems = items.map(
      (item) => `▪️ ${item.title} (${item.quantity} عدد) - ${item.price} T`
    ).join("\n");

    const total = totalPrice();

    const message = `سلام! 👋 من می‌خوام این سفارش رو از بوتیک آنلاین ثبت کنم:

${lineItems}

----------------
💰 *مبلغ کل: ${total} تومان*

لطفاً برای پرداخت و ارسال راهنمایی کنید. 🌸`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/989170000000?text=${encodedMessage}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#111] border-l border-white/10 z-[101] shadow-2xl flex flex-col font-sans"
          >
            
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111] z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-gold" />
                سبد خرید شما
                <span className="text-sm font-normal text-gray-500">({items.length} محصول)</span>
              </h2>
              <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                  <ShoppingBag size={64} strokeWidth={1} className="opacity-20" />
                  <p>سبد خرید شما خالی است</p>
                  <button onClick={closeCart} className="text-brand-gold hover:underline text-sm">
                    مشاهده محصولات
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout 
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 relative group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h4>
                        <span className="text-brand-gold text-sm font-mono">{item.price} T</span>
                      </div>

                      <div className="flex items-center gap-3 bg-black/40 w-fit px-3 py-1 rounded-lg border border-white/10">
                        <button onClick={() => decreaseQuantity(item.id)} className="text-white/70 hover:text-white transition-colors">
                          {item.quantity === 1 ? <Trash2 size={14} className="text-red-400"/> : <Minus size={14} />}
                        </button>
                        <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="text-white/70 hover:text-white transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-6 text-white">
                  <span className="text-gray-400">مبلغ قابل پرداخت</span>
                  <span className="text-2xl font-bold font-mono text-brand-gold">{totalPrice()} <span className="text-sm text-gray-500">تومان</span></span>
                </div>
                
                {/* 👇 اتصال تابع هندلر به دکمه */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                >
                  تکمیل خرید در واتس‌اپ
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}