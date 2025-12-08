"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, CheckCircle, User } from "lucide-react";
import { STYLISTS, TIME_SLOTS, DATES } from "@/app/constants/booking";
import { SERVICES } from "@/app/constants";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState("");

  // نهایی‌سازی و ارسال به واتس‌اپ
  const handleFinalBook = () => {
    const message = `سلام! 🌸 درخواست رزرو نوبت دارم:
    
✨ سرویس: ${selectedService.title}
👩‍🎨 آرایشگر: ${selectedStylist.name}
📅 تاریخ: ${selectedDate.day} ${selectedDate.date}
⏰ ساعت: ${selectedTime}

لطفاً تایید بفرمایید.`;

    window.open(`https://wa.me/989170000000?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-gold selection:text-black">
      <CustomCursor />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-[90vh] flex flex-col justify-center">
        
        {/* هدر صفحه */}
        <div className="text-center mb-16">
           <span className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-4 block font-bold">Appointment</span>
           <h1 className="text-4xl md:text-6xl font-black font-serif">رزرو نوبت آنلاین</h1>
        </div>

        {/* بدنه ویزارد */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون راست: مراحل انتخاب */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* ۱. انتخاب سرویس */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-3 text-gray-300">
                 <span className="bg-brand-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">1</span>
                 انتخاب خدمات
               </h3>
               <div className="grid grid-cols-2 gap-4">
                 {SERVICES.slice(0, 4).map((service) => (
                   <button
                     key={service.id}
                     onClick={() => setSelectedService(service)}
                     className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-4
                       ${selectedService.id === service.id ? "border-brand-gold bg-brand-gold/10" : "border-white/10 hover:border-white/30"}
                     `}
                   >
                     <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
                        <Image src={service.image} alt={service.title} fill className="object-cover" />
                     </div>
                     <span className="text-sm font-bold">{service.title}</span>
                   </button>
                 ))}
               </div>
            </div>

            {/* ۲. انتخاب آرایشگر */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-3 text-gray-300">
                 <span className="bg-brand-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">2</span>
                 انتخاب استایلیست
               </h3>
               <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                 {STYLISTS.map((stylist) => (
                   <button
                     key={stylist.id}
                     onClick={() => setSelectedStylist(stylist)}
                     className={`relative min-w-[120px] p-4 rounded-2xl border transition-all flex flex-col items-center gap-3
                       ${selectedStylist.id === stylist.id ? "border-brand-gold bg-brand-gold/10" : "border-white/10 hover:border-white/30"}
                     `}
                   >
                     <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                        <Image src={stylist.image} alt={stylist.name} fill className="object-cover" />
                     </div>
                     <div className="text-center">
                        <div className="font-bold text-sm">{stylist.name}</div>
                        <div className="text-[10px] text-gray-400">{stylist.role}</div>
                     </div>
                     {selectedStylist.id === stylist.id && <div className="absolute top-2 right-2 text-brand-gold"><CheckCircle size={16} /></div>}
                   </button>
                 ))}
               </div>
            </div>

            {/* ۳. انتخاب زمان */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-3 text-gray-300">
                 <span className="bg-brand-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">3</span>
                 زمان مراجعه
               </h3>
               
               {/* روزها */}
               <div className="flex justify-between gap-2 mb-6 bg-white/5 p-2 rounded-xl">
                 {DATES.map((date, idx) => (
                   <button
                     key={idx}
                     disabled={!date.active}
                     onClick={() => setSelectedDate(date)}
                     className={`flex-1 py-3 rounded-lg flex flex-col items-center gap-1 transition-all
                       ${!date.active ? "opacity-30 cursor-not-allowed" : 
                         selectedDate.date === date.date ? "bg-brand-gold text-black shadow-lg" : "hover:bg-white/10"}
                     `}
                   >
                     <span className="text-[10px] opacity-80">{date.day}</span>
                     <span className="font-bold text-lg font-mono">{date.date}</span>
                   </button>
                 ))}
               </div>

               {/* ساعت‌ها */}
               <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                 {TIME_SLOTS.map((time) => (
                   <button
                     key={time}
                     onClick={() => setSelectedTime(time)}
                     className={`py-2 rounded-lg text-sm font-mono border transition-all
                       ${selectedTime === time ? "bg-white text-black border-white" : "border-white/20 hover:border-brand-gold text-gray-300"}
                     `}
                   >
                     {time}
                   </button>
                 ))}
               </div>
            </div>

          </div>

          {/* ستون چپ: خلاصه فاکتور (Sticky) */}
          <div className="lg:col-span-1">
             <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 sticky top-32">
                <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-4">خلاصه رزرو</h3>
                
                <div className="space-y-6 mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 relative overflow-hidden">
                         <Image src={selectedService.image} alt="Service" fill className="object-cover" />
                      </div>
                      <div>
                         <span className="text-xs text-gray-500 block mb-1">خدمت انتخابی</span>
                         <div className="font-bold text-sm">{selectedService.title}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                         <User size={20} />
                      </div>
                      <div>
                         <span className="text-xs text-gray-500 block mb-1">با هنرمندی</span>
                         <div className="font-bold text-sm">{selectedStylist.name}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                         <Calendar size={20} />
                      </div>
                      <div>
                         <span className="text-xs text-gray-500 block mb-1">زمان</span>
                         <div className="font-bold text-sm">
                           {selectedDate.day} {selectedDate.date} • ساعت {selectedTime || "--:--"}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-6">
                   <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-400">هزینه حدودی</span>
                      <span className="text-white font-mono">{selectedService.price}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">بیعانه</span>
                      <span className="text-brand-gold font-bold">پرداخت در سالن</span>
                   </div>
                </div>

                <button 
                  onClick={handleFinalBook}
                  disabled={!selectedTime}
                  className="w-full bg-brand-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedTime ? "تایید و دریافت نوبت" : "لطفاً ساعت را انتخاب کنید"}
                </button>
             </div>
          </div>

        </div>

      </div>
      <Footer />
    </main>
  );
}