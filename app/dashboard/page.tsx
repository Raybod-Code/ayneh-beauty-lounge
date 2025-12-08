"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import { User, Calendar, Sparkles, LogOut, Settings } from "lucide-react"; // Settings رو ایمپورت کن
import Link from "next/link"; // Link رو ایمپورت کن

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-gold selection:text-black">
      <CustomCursor />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* --- هدر پروفایل --- */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b border-white/10 pb-12">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-gold p-1">
             <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 relative">
               {/* عکس پروفایل پیش‌فرض */}
               <Image src="/images/service-haircut.png" alt="Profile" fill className="object-cover" />
             </div>
          </div>
          <div className="text-center md:text-right flex-1">
            <h1 className="text-3xl md:text-5xl font-black font-serif mb-2">شهرزاد عزیز</h1>
            <p className="text-gray-400 font-sans">عضو طلایی باشگاه آینه • Hair ID: #8824</p>
          </div>
          <button className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-sans">
             <LogOut size={16} /> خروج
          </button>
        </div>

        {/* --- بخش‌های اصلی --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون راست: شناسنامه مو (Hair ID) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-transparent" />
               <div className="flex items-center gap-3 mb-6 text-brand-gold">
                 <Sparkles size={20} />
                 <h3 className="font-bold text-lg font-sans">شناسنامه مو</h3>
               </div>
               
               <ul className="space-y-4 text-sm font-sans">
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-gray-500">جنس مو</span>
                   <span className="text-white">فر درشت (2C)</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-gray-500">تخلخل</span>
                   <span className="text-white">متوسط (Medium)</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-gray-500">تاریخچه رنگ</span>
                   <span className="text-white">آمبره (۶ ماه پیش)</span>
                 </li>
                 <li className="flex justify-between pt-2">
                   <span className="text-gray-500">نیاز اصلی</span>
                   <span className="text-brand-gold font-bold">آبرسانی عمیق</span>
                 </li>
               </ul>
            </div>

            {/* شارژ کیف پول (گیمیفیکیشن) */}
            <div className="bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/30 rounded-[2rem] p-8 text-center">
               <span className="block text-gray-400 text-xs mb-1 uppercase tracking-widest">Loyalty Points</span>
               <span className="block text-4xl font-black text-brand-gold mb-4 font-mono">2,450</span>
               <p className="text-xs text-gray-300 mb-6 font-sans">معادل ۲۴۵ هزار تومان تخفیف در خدمات بعدی</p>
               <button className="w-full bg-brand-gold text-black py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors">
                 استفاده از امتیاز
               </button>
            </div>
          </div>

          {/* ستون چپ: تاریخچه و رزروها */}
          <div className="lg:col-span-2">
             <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 min-h-[400px]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl font-sans flex items-center gap-2">
                    <Calendar size={20} className="text-brand-gold" /> نوبت‌های من
                  </h3>
                  <button className="text-xs text-gray-500 hover:text-white transition-colors">مشاهده همه</button>
                </div>

                <div className="space-y-4">
                  {/* کارت نوبت آینده */}
                  <div className="bg-white/5 border border-brand-gold/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                        <div className="bg-brand-gold/20 text-brand-gold w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold">
                           <span className="text-lg">25</span>
                           <span className="text-xs uppercase">Dec</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg font-sans">ترمیم لایت و کوتاهی</h4>
                           <p className="text-gray-400 text-sm font-sans">با سارا • ساعت ۱۴:۰۰</p>
                        </div>
                     </div>
                     <span className="bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">در انتظار مراجعه</span>
                  </div>

                  {/* کارت نوبت گذشته */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 opacity-60 hover:opacity-100 transition-opacity">
                     <div className="flex items-center gap-4">
                        <div className="bg-white/10 text-gray-400 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold">
                           <span className="text-lg">10</span>
                           <span className="text-xs uppercase">Nov</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg font-sans">پدیکور VIP</h4>
                           <p className="text-gray-400 text-sm font-sans">با مینا • انجام شد</p>
                        </div>
                     </div>
                     <button className="text-xs border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors">ثبت نظر</button>
                  </div>
                </div>

             </div>
          </div>
          {/* دکمه‌های اکشن */}
  <div className="flex gap-3">
    {/* 👇 دکمه تنظیمات جدید */}
    <Link href="/dashboard/settings" className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-sans text-white">
       <Settings size={16} /> تنظیمات
    </Link>
    
    <button className="flex items-center gap-2 border border-red-500/30 text-red-400 px-6 py-3 rounded-full hover:bg-red-500/10 transition-colors text-sm font-sans">
       <LogOut size={16} /> خروج
    </button>
  </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}