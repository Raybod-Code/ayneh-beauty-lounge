import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext"; // 👈 این خط خیلی مهمه

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${doran.variable} ${playfair.variable}`}>
      <body className="bg-[#050505] text-white antialiased selection:bg-[#C6A87C] selection:text-black overflow-x-hidden">
        
        {/* 👇 اینجا مغز فروشگاه رو فعال می‌کنیم 👇 */}
        <CartProvider>
          
          <SmoothScroll />
          <CustomCursor />
          
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* 👇 سبد خرید باید اینجا باشه تا روی همه‌چی باز بشه */}
          <CartDrawer /> 
          
          <div className="noise-overlay pointer-events-none fixed inset-0 z-40 opacity-5"></div>
          
          {children}

          <Footer />

        </CartProvider>
        {/* 👆 پایان بخش فروشگاه 👆 */}
        
      </body>
    </html>
  );
}