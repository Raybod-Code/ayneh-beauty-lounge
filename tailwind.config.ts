import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-doran)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      // 👇 پالت رنگی سلطنتی (سوفی)
      colors: {
        brand: {
          bg: "#F9F9F9",       // زمینه اصلی (سفید گچی مات)
          dark: "#1A1A1A",     // زغالی (برای فوتر و متن‌ها)
          gold: "#C6A87C",     // طلایی مات (خیلی شیک و نود)
          light: "#F5F5F0",    // کرم استخوانی (برای کارت‌ها)
          gray: "#666666",     // طوسی برای توضیحات
        }
      },
    },
  },
  plugins: [],
};
export default config;