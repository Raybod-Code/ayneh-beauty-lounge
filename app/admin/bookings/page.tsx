"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, User, MoreVertical, Search, Plus, X, Filter, Ticket, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { DigitalTicket } from "@/components/DigitalTicket";

// داده‌های اولیه (رزروهای قدیمی)
const INITIAL_BOOKINGS = [
  { id: 1, customer: "سارا محمدی", service: "رنگ و لایت", stylist: "الناز", date: "1402/10/25", time: "14:00", status: "pending", phone: "0912..." },
  { id: 2, customer: "مینا راد", service: "هیرکات", stylist: "سارا", date: "1402/10/25", time: "15:30", status: "confirmed", phone: "0935..." },
  { id: 3, customer: "زهرا کریمی", service: "میکاپ عروس", stylist: "الناز", date: "1402/10/26", time: "10:00", status: "completed", phone: "0919..." },
  { id: 4, customer: "نیلوفر", service: "پدیکور VIP", stylist: "مینا", date: "1402/10/26", time: "11:00", status: "cancelled", phone: "0936..." },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // استیت‌های کارت دعوت
  const [ticketData, setTicketData] = useState<any>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  // ✅ لود کردن رزروهای جدید از LocalStorage
  useEffect(() => {
    // خواندن رزروهای ذخیره شده توسط کاربر
    const localBookings = JSON.parse(localStorage.getItem("ayneh-bookings") || "[]");
    
    if (localBookings.length > 0) {
      // اضافه کردن رزروهای جدید به ابتدای لیست
      setBookings((prev) => {
        // جلوگیری از تکراری شدن (اختیاری)
        const combined = [...localBookings, ...INITIAL_BOOKINGS];
        // حذف تکراری‌ها بر اساس ID (برای اطمینان)
        const unique = combined.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
        return unique;
      });
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "در انتظار تایید";
      case "confirmed": return "تایید شده";
      case "completed": return "انجام شد";
      case "cancelled": return "لغو شده";
      default: return status;
    }
  };

  // دانلود کارت دعوت از ادمین
  const handleDownloadTicket = async () => {
    if (!ticketRef.current || !ticketData) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#050505',
        useCORS: true,
        onclone: (doc) => {
            const el = doc.getElementById('digital-ticket-id');
            if(el) el.style.color = '#ffffff';
        }
      });

      const data = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Ayneh-Ticket-${ticketData.bookingId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("خطا در دانلود بلیط:", error);
      alert("دانلود انجام نشد.");
    }
  };

  const openTicketModal = (booking: any) => {
    setTicketData({
      name: booking.customer,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      stylist: booking.stylist,
      bookingId: booking.bookingId || booking.id.toString()
    });
  };

  const filteredBookings = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-8 relative">
      
      {/* هدر آماری (آپدیت شده با تعداد واقعی) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col">
           <span className="text-xs text-gray-500 mb-1">کل نوبت‌ها</span>
           <span className="text-2xl font-bold text-white">{bookings.length}</span>
        </div>
        <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col">
           <span className="text-xs text-gray-500 mb-1">در انتظار تایید</span>
           <span className="text-2xl font-bold text-yellow-500">{bookings.filter(b => b.status === 'pending').length}</span>
        </div>
        <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col">
           <span className="text-xs text-gray-500 mb-1">کنسلی‌ها</span>
           <span className="text-2xl font-bold text-red-500">{bookings.filter(b => b.status === 'cancelled').length}</span>
        </div>
        <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col">
           <span className="text-xs text-gray-500 mb-1">تکمیل شده</span>
           <span className="text-2xl font-bold text-green-500">{bookings.filter(b => b.status === 'completed').length}</span>
        </div>
      </div>

      {/* ابزارها */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#111] p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {["all", "pending", "confirmed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize whitespace-nowrap ${filter === tab ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white bg-white/5"}`}
            >
              {tab === "all" ? "همه نوبت‌ها" : getStatusText(tab)}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder="جستجو..." className="w-full bg-black border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-white focus:border-brand-gold outline-none text-sm" />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-gold text-black px-4 py-2.5 rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <Plus size={18} /> نوبت جدید
          </button>
        </div>
      </div>

      {/* لیست نوبت‌ها */}
      <div className="space-y-3">
        {filteredBookings.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-gold/30 transition-all group"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold border border-white/5">
                {item.customer.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{item.customer}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                  <span>{item.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 w-full md:w-auto justify-start bg-black/20 p-3 rounded-xl">
               <div className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-gold rounded-full"/> {item.service}</div>
               <div className="w-[1px] h-4 bg-white/10"/>
               <div className="flex items-center gap-2"><User size={14}/> {item.stylist}</div>
               <div className="w-[1px] h-4 bg-white/10"/>
               <div className="flex items-center gap-2"><Calendar size={14}/> {item.date}</div>
               <div className="w-[1px] h-4 bg-white/10"/>
               <div className="flex items-center gap-2"><Clock size={14}/> {item.time}</div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className={`px-3 py-1 rounded-lg text-xs border ${getStatusColor(item.status)}`}>
                {getStatusText(item.status)}
              </span>
              
              {/* دکمه صدور کارت دعوت */}
              <button 
                onClick={() => openTicketModal(item)}
                className="p-2 hover:bg-brand-gold hover:text-black rounded-lg text-brand-gold border border-brand-gold/20 transition-colors"
                title="صدور کارت دعوت"
              >
                <Ticket size={18} />
              </button>

              <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL 1: نوبت جدید --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl p-8 z-[70] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">ثبت نوبت دستی</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
              </div>
              
              <div className="space-y-4">
                <input type="text" placeholder="نام مشتری" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-brand-gold" />
                <input type="tel" placeholder="شماره تماس" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-brand-gold" />
                <div className="grid grid-cols-2 gap-4">
                   <select className="bg-black/50 border border-white/10 rounded-xl p-4 text-gray-300 outline-none">
                     <option>انتخاب سرویس...</option>
                     <option>رنگ مو</option>
                     <option>کوتاهی</option>
                   </select>
                   <select className="bg-black/50 border border-white/10 rounded-xl p-4 text-gray-300 outline-none">
                     <option>انتخاب آرایشگر...</option>
                     <option>سارا</option>
                     <option>مینا</option>
                   </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input type="date" className="bg-black/50 border border-white/10 rounded-xl p-4 text-gray-300 outline-none" />
                   <input type="time" className="bg-black/50 border border-white/10 rounded-xl p-4 text-gray-300 outline-none" />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">لغو</button>
                <button className="flex-[2] py-4 rounded-xl bg-brand-gold text-black font-bold hover:bg-white transition-colors">ثبت نوبت</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: کارت دعوت دیجیتال --- */}
      <AnimatePresence>
        {ticketData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setTicketData(null)}
               className="absolute inset-0 bg-black/90 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
               className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full"
             >
                <div className="flex justify-between items-center w-full max-w-2xl px-4">
                   <h3 className="text-2xl font-bold text-white">صدور کارت دعوت</h3>
                   <button onClick={() => setTicketData(null)} className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X size={20}/></button>
                </div>

                <div className="overflow-x-auto w-full flex justify-center py-4">
                   <div className="scale-75 md:scale-100 origin-center">
                      <DigitalTicket ref={ticketRef} data={ticketData} />
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={handleDownloadTicket}
                     className="bg-brand-gold text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 shadow-lg"
                   >
                     <Download size={20} /> دانلود فایل JPG
                   </button>
                   <button className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
                     <Share2 size={20} /> اشتراک‌گذاری
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}