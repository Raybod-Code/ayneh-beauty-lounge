import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext";
import AIWidget from "@/components/AIWidget";
import { ColorProvider } from "@/app/context/ColorContext";

import { getTenantFromRequest } from "@/lib/tenant/get-tenant";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayneh-beauty.vercel.app"),
  title: {
    default: "AYNEH | سالن زیبایی و اسپا لوکس",
    template: "%s | آینه بیوتی",
  },
  description:
    "تجربه‌ای متفاوت از زیبایی و آرامش. خدمات تخصصی مو، میکاپ و اسپا با بهره‌گیری از هوش مصنوعی و برترین متخصصین.",
  keywords: [
    "سالن زیبایی",
    "آرایشگاه زنانه",
    "میکاپ عروس",
    "هوش مصنوعی زیبایی",
    "فروشگاه لوازم آرایشی",
    "رزرو آنلاین آرایشگاه",
  ],
  authors: [{ name: "Ayneh Team" }],
  creator: "Ayneh Beauty Lounge",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://ayneh-beauty.vercel.app",
    title: "AYNEH | جایی که زیبایی بازتاب توست",
    description:
      "اولین بیوتی لانژ هوشمند ایران. همین حالا استایل خود را با هوش مصنوعی آنالیز کنید.",
    siteName: "Ayneh Beauty",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayneh Beauty Lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AYNEH | آینه بیوتی",
    description: "زیبایی هوشمند و خدمات لوکس بانوان",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tenant } = await getTenantFromRequest();

  const isRtl = tenant?.public_config?.rtl ?? true;
  const dir = isRtl ? "rtl" : "ltr";
  const lang = tenant?.locale ?? "fa";
  const primaryColor = tenant?.theme?.primary ?? "#C8A951";

  const isSuspended = tenant && tenant.status !== "active";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${doran.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans bg-brand-bg text-brand-light"
        style={
          {
            "--ayneh-primary": primaryColor,
          } as React.CSSProperties
        }
      >
        {isSuspended ? (
          <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold">
              دسترسی این سالن موقتاً غیرفعال شده است
            </h1>
            <p className="max-w-md text-sm md:text-base text-neutral-400">
              لطفاً برای فعال‌سازی دوباره سرویس با پشتیبانی آینه یا مدیر سالن
              تماس بگیرید.
            </p>
          </main>
        ) : (
          <ColorProvider>
            <CartProvider>
              <SmoothScroll />
              <CustomCursor />
              <Navbar />
              <CartDrawer />
              <AIWidget />
              <div className="noise-overlay" />
              {children}
              <Footer />
            </CartProvider>
          </ColorProvider>
        )}
      </body>
    </html>
  );
}
