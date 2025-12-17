"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import {
  Calendar,
  CheckCircle,
  User,
  Download,
  Share2,
  Sparkles,
  CalendarCheck,
  Clock,
  Hash,
  Smartphone,
} from "lucide-react";
import { STYLISTS, TIME_SLOTS, DATES } from "@/app/constants/booking";
import { SERVICES } from "@/app/constants";
import html2canvas from "html2canvas";
import { DigitalTicket } from "@/components/DigitalTicket";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "رزرو نوبت آنلاین",
//   description: "دریافت نوبت خدمات زیبایی در کمتر از ۱ دقیقه.",
// };

export default function BookingPage() {
  const [step, setStep] = useState<1 | 2>(1); // 1: انتخاب، 2: بلیط
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState("");

  // استیت‌های کارت دعوت و دانلود
  const [bookingId, setBookingId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // نهایی‌سازی رزرو و ذخیره در سیستم
  const handleFinalBook = () => {
    // 1. تولید شناسه رزرو تصادفی
    const newBookingId = Math.floor(1000 + Math.random() * 9000).toString();
    setBookingId(newBookingId);

    // 2. ساخت آبجکت رزرو
    const newBooking = {
      id: Date.now(), // یک شناسه یکتا برای سیستم
      bookingId: newBookingId, // شناسه نمایشی برای کاربر
      customer: "مشتری آنلاین", // در آینده می‌تونی اینپوت نام و تلفن بذاری
      service: selectedService.title,
      stylist: selectedStylist.name,
      date: `${selectedDate.day} ${selectedDate.date}`,
      time: selectedTime,
      status: "pending", // وضعیت اولیه: در انتظار تایید
      phone: "0912...", // شماره پیش‌فرض (یا از ورودی بگیر)
    };

    // 3. ذخیره در LocalStorage (برای اینکه ادمین ببینه)
    const existingBookings = JSON.parse(
      localStorage.getItem("ayneh-bookings") || "[]"
    );
    localStorage.setItem(
      "ayneh-bookings",
      JSON.stringify([newBooking, ...existingBookings])
    );

    // 4. رفتن به مرحله نمایش بلیط
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ارسال به واتس‌اپ
  const handleWhatsAppShare = () => {
    const message = `
درود، نوبت رزرو شده در آینه بیوتی:

🔖 شناسه رزرو: ${bookingId}
✂️ سرویس: ${selectedService.title}
👤 استایلیست: ${selectedStylist.name}
🗓 تاریخ: ${selectedDate.day} ${selectedDate.date}
⏰ ساعت: ${selectedTime}

با تشکر.
`.trim();

    window.open(
      `https://wa.me/989170000000?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // دانلود کارت دعوت (با کیفیت بالا و فیکس رنگ)
  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,
        backgroundColor: "#050505", // پس‌زمینه مشکی برای فایل JPG
        useCORS: true,
        logging: false,
        onclone: (doc) => {
          // تضمین سفید بودن متن در عکس خروجی
          const el = doc.getElementById("digital-ticket-id");
          if (el) el.style.color = "#ffffff";
        },
      });

      const data = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = data;
      link.download = `Ayneh-Ticket-${bookingId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Error", error);
      alert("مشکلی در دانلود پیش آمد.");
    } finally {
      setIsDownloading(false);
    }
  };

  // داده‌های کارت دعوت برای نمایش
  const ticketData = {
    name: "مشتری گرامی",
    service: selectedService.title,
    date: `${selectedDate.day} ${selectedDate.date}`,
    time: selectedTime,
    stylist: selectedStylist.name,
    bookingId: bookingId,
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C6A87C] selection:text-black font-sans">
      <CustomCursor />
      <Navbar />

      <div className="pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            // --- مرحله ۱: انتخاب خدمات ---
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-16"
            >
              {/* هدر صفحه */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-[#C6A87C] mb-4">
                  <Calendar size={18} />
                  <span className="text-xs tracking-[0.3em] uppercase font-bold">
                    Appointment Booking
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-serif text-white">
                  رزرو نوبت{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A87C] to-white">
                    آنلاین
                  </span>
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ستون راست: انتخاب‌ها */}
                <div className="lg:col-span-2 space-y-12">
                  {/* ۱. انتخاب سرویس */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <span className="bg-[#C6A87C] text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(198,168,124,0.4)]">
                        1
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        انتخاب خدمات
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES.slice(0, 4).map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-4 group
                              ${
                                selectedService.id === service.id
                                  ? "border-[#C6A87C] bg-[#C6A87C]/10 shadow-[0_0_20px_rgba(198,168,124,0.1)]"
                                  : "border-white/10 hover:border-white/30 bg-white/5"
                              }`}
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-sm font-bold block mb-1 text-white">
                              {service.title}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">
                              {service.price}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ۲. انتخاب آرایشگر */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <span className="bg-[#C6A87C] text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(198,168,124,0.4)]">
                        2
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        انتخاب استایلیست
                      </h3>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                      {STYLISTS.map((stylist) => (
                        <button
                          key={stylist.id}
                          onClick={() => setSelectedStylist(stylist)}
                          className={`relative min-w-[140px] p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 group
                              ${
                                selectedStylist.id === stylist.id
                                  ? "border-[#C6A87C] bg-[#C6A87C]/10"
                                  : "border-white/10 hover:border-white/30 bg-white/5"
                              }`}
                        >
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#C6A87C] transition-colors">
                            <Image
                              src={stylist.image}
                              alt={stylist.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-sm text-white">
                              {stylist.name}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                              {stylist.role}
                            </div>
                          </div>
                          {selectedStylist.id === stylist.id && (
                            <div className="absolute top-3 right-3 text-[#C6A87C] bg-black rounded-full p-0.5">
                              <CheckCircle
                                size={16}
                                fill="black"
                                className="text-[#C6A87C]"
                              />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ۳. انتخاب زمان */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <span className="bg-[#C6A87C] text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(198,168,124,0.4)]">
                        3
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        زمان مراجعه
                      </h3>
                    </div>

                    {/* روزها */}
                    <div className="flex justify-between gap-3 mb-6 bg-white/5 p-3 rounded-2xl overflow-x-auto border border-white/10">
                      {DATES.map((date, idx) => (
                        <button
                          key={idx}
                          disabled={!date.active}
                          onClick={() => setSelectedDate(date)}
                          className={`flex-1 min-w-[70px] py-4 rounded-xl flex flex-col items-center gap-1 transition-all
                              ${
                                !date.active
                                  ? "opacity-30 cursor-not-allowed grayscale"
                                  : selectedDate.date === date.date
                                  ? "bg-[#C6A87C] text-black shadow-lg scale-105 font-bold"
                                  : "hover:bg-white/10 text-gray-400"
                              }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider">
                            {date.day}
                          </span>
                          <span className="text-xl font-mono">{date.date}</span>
                        </button>
                      ))}
                    </div>

                    {/* ساعت‌ها */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
                      {" "}
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl text-sm font-mono border transition-all flex items-center justify-center gap-1
                              ${
                                selectedTime === time
                                  ? "bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] font-bold"
                                  : "border-white/10 hover:border-[#C6A87C] text-gray-400 bg-white/5"
                              }`}
                        >
                          <Clock
                            size={12}
                            className={
                              selectedTime === time
                                ? "text-black"
                                : "text-gray-500"
                            }
                          />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ستون چپ: خلاصه فاکتور (Sticky) */}
                <div className="lg:col-span-1">
                  <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 sticky top-32 shadow-2xl backdrop-blur-xl">
                    <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-4 flex items-center gap-2">
                      <Hash size={18} className="text-[#C6A87C]" />
                      خلاصه رزرو
                    </h3>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 relative overflow-hidden border border-white/10">
                          <Image
                            src={selectedService.image}
                            alt="Service"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#C6A87C] uppercase tracking-widest block mb-1">
                            Service
                          </span>
                          <div className="font-bold text-sm text-white">
                            {selectedService.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                          <User size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#C6A87C] uppercase tracking-widest block mb-1">
                            Stylist
                          </span>
                          <div className="font-bold text-sm text-white">
                            {selectedStylist.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#C6A87C] uppercase tracking-widest block mb-1">
                            Date & Time
                          </span>
                          <div className="font-bold text-sm text-white">
                            {selectedDate.day} {selectedDate.date} •{" "}
                            {selectedTime || "--:--"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 mb-6 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">هزینه سرویس</span>
                        <span className="text-white font-mono">
                          {selectedService.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">
                          مالیات و ارزش افزوده
                        </span>
                        <span className="text-white font-mono">
                          محاسبه در سالن
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleFinalBook}
                      disabled={!selectedTime}
                      className="w-full bg-[#C6A87C] text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(198,168,124,0.3)] flex items-center justify-center gap-2 group"
                    >
                      {selectedTime ? (
                        <>
                          تایید و صدور بلیط
                          <CheckCircle
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </>
                      ) : (
                        "لطفاً ساعت را انتخاب کنید"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // --- مرحله ۲: نمایش موفقیت و بلیط ---
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-8 py-10"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 relative z-10">
                  <CalendarCheck size={48} />
                </div>
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-50 z-0"></div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white font-serif">
                  رزرو شما <span className="text-[#C6A87C]">قطعی شد!</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
                  منتظر دیدار شما هستیم. کارت دعوت اختصاصی شما صادر شد.
                </p>
                <div className="inline-flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/10">
                  <Hash size={14} className="text-[#C6A87C]" />
                  <span className="text-sm text-gray-300">
                    کد رهگیری:{" "}
                    <span className="font-mono text-white font-bold">
                      {bookingId}
                    </span>
                  </span>
                </div>
              </div>

              {/* نمایش کارت دعوت */}
              <div className="w-full py-6 flex justify-center overflow-hidden">
                <div className="transform scale-[0.4] min-[400px]:scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform origin-center hover:scale-[1.02] duration-500">
                  <DigitalTicket ref={ticketRef} data={ticketData} />
                </div>
              </div>

              {/* دکمه‌های عملیات */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md z-10">
                <button
                  onClick={downloadTicket}
                  disabled={isDownloading}
                  className="flex-1 bg-[#C6A87C] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(198,168,124,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isDownloading ? (
                    <span className="animate-pulse flex items-center gap-2">
                      <Download size={20} className="animate-bounce" /> در حال
                      ذخیره...
                    </span>
                  ) : (
                    <>
                      <Download
                        size={24}
                        className="group-hover:-translate-y-1 transition-transform"
                      />
                      <span>دانلود کارت دعوت</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all border border-white/10 group"
                >
                  <Smartphone
                    size={24}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>ارسال به واتس‌اپ</span>
                </button>
              </div>

              <div className="bg-[#C6A87C]/5 border border-[#C6A87C]/10 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#C6A87C] mt-4 max-w-md">
                <Sparkles size={20} className="shrink-0 animate-pulse" />
                <p className="text-right">
                  پیشنهاد: با اشتراک‌گذاری این کارت در استوری اینستاگرام، از{" "}
                  <span className="font-bold underline">۱۰٪ تخفیف</span> در
                  خدمات بعدی بهره‌مند شوید.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}
