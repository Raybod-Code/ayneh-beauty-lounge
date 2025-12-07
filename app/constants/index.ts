export const SERVICES = [
  // --- Hair Services ---
  {
    id: 1,
    title: "هیرکات و استایل ژورنالی",
    category: "Haircut & Style",
    price: "از ۴۵۰",
    image: "/images/service-haircut.png",
  },
  {
    id: 2,
    title: "رنگ، لایت و آمبره روسی",
    category: "Color & Light",
    price: "از ۲.۵۰۰",
    image: "/images/service-color.png",
  },
  {
    id: 3,
    title: "تراپی، کراتین و احیا",
    category: "Treatments",
    price: "از ۳.۰۰۰",
    image: "/images/service-spa.png",
  },
  {
    id: 4,
    title: "پکیج عروس VIP",
    category: "Bridal",
    price: "مشاوره حضوری",
    image: "/images/service-bridal.png",
  },
  // --- Nail Services (New) ---
  {
    id: 5,
    title: "کاشت پودر و ژل",
    category: "Nail Extensions",
    price: "از ۶۰۰",
    image: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=800", // Nail Image 1
  },
  {
    id: 6,
    title: "لمینت و استحکام‌سازی",
    category: "Nail Therapy",
    price: "از ۴۰۰",
    image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=800", // Nail Image 2
  },
  {
    id: 7,
    title: "طراحی و نیل‌آرت تخصصی",
    category: "Nail Art",
    price: "از ۵۰ / ناخن",
    image: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=800", // Nail Image 3
  },
  {
    id: 8,
    title: "پدیکور VIP و کفسابی",
    category: "Pedicure & Spa",
    price: "از ۵۰۰",
    image: "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg?auto=compress&cs=tinysrgb&w=800", // Pedicure Image
  },
];

export const NAV_LINKS = [
  { name: "خانه", href: "#home" },
  { name: "خدمات مو", href: "#services" },
  { name: "ناخن و اسپا", href: "#gallery" }, // هدایت به گالری یا سکشن جدید
  { name: "مشاوره هوشمند", href: "#quiz" }, // لینک جدید برای دسترسی سریع
  { name: "تماس", href: "#contact" },
];

export const MOODS = [
  {
    id: "bold",
    title: "جسور و خاص",
    enTitle: "BOLD",
    description: "برای کسانی که از تغییر نمی‌ترسند. کوتاهی‌های ژورنالی و رنگ‌های فانتزی.",
    image: "/images/service-haircut.png",
    color: "#D946EF",
  },
  {
    id: "relax",
    title: "آرامش مطلق",
    enTitle: "RELAX",
    description: "فرار از هیاهوی شهر. اسپای مو و ماساژ سر برای بازیابی انرژی.",
    image: "/images/service-spa.png",
    color: "#38BDF8",
  },
  {
    id: "glow",
    title: "درخشش طبیعی",
    enTitle: "GLOW",
    description: "احیای سلامت مو و پوست. زیبایی شما نیاز به فریاد زدن ندارد.",
    image: "/images/service-color.png",
    color: "#FACC15",
  },
  {
    id: "royal",
    title: "شکوه عروس",
    enTitle: "ROYAL",
    description: "پکیج VIP برای مهم‌ترین شب زندگی. ظرافت در جزئیات.",
    image: "/images/service-bridal.png",
    color: "#FFFFFF",
  },
];