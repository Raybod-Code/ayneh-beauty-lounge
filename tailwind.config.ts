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
      // Royal color palette (Sophy)
      colors: {
        brand: {
          bg: "#F9F9F9",       // Main background (matte chalk white)
          dark: "#1A1A1A",     // Charcoal (for footer and text)
          gold: "#C6A87C",     // Matte gold (very chic and nude)
          light: "#F5F5F0",    // Bone cream (for cards)
          gray: "#666666",     // Gray for descriptions
        }
      },
      // Added custom animation for rotating badge
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;