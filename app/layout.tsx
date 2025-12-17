// app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar"; // ✅ نوبار سراسری
import Footer from "@/components/Footer"; // ✅ فوتر سراسری
import { CartProvider } from "@/app/context/CartContext"; // ✅ مدیریت سبد خرید

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
  manifest: "/manifest.json",
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
      <body className="bg-[#050505] text-white antialiased selection:bg-[#C6A87C] selection:text-black overflow-x-hidden">
        
        {/* کانتکست سبد خرید دور کل برنامه */}
        <CartProvider>
          <SmoothScroll />
          <CustomCursor />
          
          {/* نوبار همیشه و همه جا هست */}
          <div className="relative z-50">
            <Navbar />
          </div>

          <CartDrawer />
          
          {/* لایه نویز برای افکت سینمایی */}
          <div className="noise-overlay pointer-events-none fixed inset-0 z-40 opacity-5"></div>
          
          {/* محتوای صفحات (مثل page.tsx) اینجا رندر میشه */}
          {children}

          {/* فوتر همیشه پایین سایت هست */}
          <Footer />
        </CartProvider>
        
      </body>
    </html>
  );
}