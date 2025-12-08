"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Menu,
  Scissors,
  Bell,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const pathname = usePathname();

  // دیتای نمایشی نوتیفیکیشن‌ها
  const [notifications, setNotifications] = useState([
    { id: 1, text: "رزرو جدید: سارا محمدی (رنگ مو)", time: "۵ دقیقه پیش", type: "booking", read: false },
    { id: 2, text: "موجودی «شامپو خاویار» کم است", time: "۱ ساعت پیش", type: "alert", read: false },
    { id: 3, text: "کنسلی نوبت: مینا راد", time: "۲ ساعت پیش", type: "error", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // تابع خواندن پیام
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const MENU_ITEMS = [
    { title: "داشبورد", icon: LayoutDashboard, href: "/admin", role: "all" },
    { title: "مدیریت نوبت‌ها", icon: CalendarDays, href: "/admin/bookings", role: "secretary" },
    { title: "لیست مشتریان", icon: Users, href: "/admin/customers", role: "secretary" },
    { title: "مدیریت فروشگاه", icon: ShoppingBag, href: "/admin/products", role: "admin" },
    { title: "تنظیمات سایت", icon: Settings, href: "/admin/settings", role: "admin" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans" dir="rtl">
      
      {/* --- Sidebar --- */}
      <aside 
        className={`
          fixed md:sticky top-0 right-0 h-screen bg-[#111] border-l border-white/5 transition-all duration-300 z-50 flex flex-col
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="h-20 flex items-center justify-center border-b border-white/5">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-black font-serif tracking-widest text-brand-gold">AYNEH</h1>
          ) : (
            <span className="text-xl font-bold text-brand-gold">A</span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive ? "bg-brand-gold text-black font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white"}
                  ${!isSidebarOpen && "justify-center"}
                `}
              >
                <item.icon size={20} className={isActive ? "text-black" : "text-gray-400 group-hover:text-brand-gold"} />
                {isSidebarOpen && <span className="flex-1">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors ${!isSidebarOpen && "justify-center"}`}>
            <LogOut size={20} />
            {isSidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-white hidden md:block">پنل مدیریت</h2>
          </div>

          <div className="flex items-center gap-6">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotif(!showNotif)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-[#0a0a0a]" />
                )}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showNotif && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-4 w-80 bg-[#151515] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <span className="text-sm font-bold text-white">اعلانات ({unreadCount})</span>
                        <button className="text-[10px] text-brand-gold hover:underline">خواندن همه</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-center text-gray-500 py-8 text-sm">پیام جدیدی نیست</p>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id} 
                              onClick={() => markAsRead(notif.id)}
                              className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3 ${notif.read ? 'opacity-50' : 'opacity-100'}`}
                            >
                              <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notif.type === 'booking' ? 'bg-green-500' : notif.type === 'alert' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <div>
                                <p className="text-xs text-white leading-relaxed">{notif.text}</p>
                                <span className="text-[10px] text-gray-500 mt-1 block font-mono">{notif.time}</span>
                              </div>
                              {!notif.read && <Check size={12} className="text-brand-gold mt-1 ml-auto" />}
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-4 pl-2 md:pl-0">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-white">مدیر سیستم</span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold">
                <Scissors size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}