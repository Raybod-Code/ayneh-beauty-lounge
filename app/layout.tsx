import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll"; // 👈 ایمپورت کامپوننت بالا
import CustomCursor from "@/components/CustomCursor"; // 👈 اضافه شد
// ۱. تنظیم فونت فارسی (دوران)
const doran = localFont({
  src: "./fonts/Doran-Variable.woff2", // فایل وریبل که توی پوشه fonts گذاشتی
  variable: "--font-doran",
  display: "swap",
});

// ۲. تنظیم فونت انگلیسی لوکس (Playfair)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AYNEH | آینه",
  description: "زیبایی، بازتاب توست - سالن زیبایی و اسپا لوکس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`
          ${doran.variable} 
          ${playfair.variable} 
          font-sans 
          bg-gray-50 
          text-gray-900 
          antialiased 
          overflow-x-hidden
        `}
      >
        {/* موتور اسکرول نرم رو اینجا صدا میزنیم */}
        <SmoothScroll />
        <CustomCursor /> {/* 👈 اینجا اضافه‌ش کن (بالای children) */}
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}