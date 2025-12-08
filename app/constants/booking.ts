// app/constants/booking.ts

export const STYLISTS = [
  { id: 1, name: "سارا", role: "متخصص رنگ و لایت", image: "/images/service-color.png" },
  { id: 2, name: "مینا", role: "هیرکات آرتیست", image: "/images/service-haircut.png" },
  { id: 3, name: "الناز", role: "میکاپ آرتیست", image: "/images/service-bridal.png" },
];

export const TIME_SLOTS = [
  "10:00", "11:30", "13:00", "15:00", "16:30", "18:00", "19:30"
];

// روزهای هفته (برای دمو - ۷ روز آینده)
export const DATES = [
  { day: "شنبه", date: "24", active: true },
  { day: "یک‌شنبه", date: "25", active: true },
  { day: "دوشنبه", date: "26", active: false }, // مثلاً پر است
  { day: "سه‌شنبه", date: "27", active: true },
  { day: "چهارشنبه", date: "28", active: true },
  { day: "پنج‌شنبه", date: "29", active: true },
  { day: "جمعه", date: "30", active: false }, // تعطیل
];