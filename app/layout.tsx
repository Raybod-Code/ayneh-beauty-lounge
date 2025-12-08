import type { Metadata, Viewport } from "next"; // اضافه کردن Viewport
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import CartDrawer from "@/components/CartDrawer"; // 👈 ایمپورت جدید
import CustomCursor from "@/components/CustomCursor";

const doran = localFont({
  src: "./fonts/Doran-Variable.woff2",
  variable: "--font-doran",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// تنظیمات ویوپورت برای موبایل (جلوگیری از زوم ناخواسته و رنگ نوار وضعیت)
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AYNEH | آینه",
  description: "زیبایی، بازتاب توست - سالن زیبایی و اسپا لوکس",
  manifest: "/manifest.json", // اشاره به مانیفست
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AYNEH",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${doran.variable} ${playfair.variable}`}>
      <body className="bg-[#050505] text-white antialiased selection:bg-[#C6A87C] selection:text-black">
        <SmoothScroll />
        <CustomCursor />
        <CartDrawer />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}