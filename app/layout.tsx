import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
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
          bg-[#050505] 
          text-white 
          antialiased 
          overflow-x-hidden
        `}
      >
        <SmoothScroll />
        <CustomCursor />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}