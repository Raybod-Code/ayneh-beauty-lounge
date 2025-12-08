// app/constants/index.ts

export const SERVICES = [
  {
    id: 1,
    title: "هیرکات ژورنالی",
    category: "Haircut & Style",
    price: "از ۴۵۰",
    image: "/images/service-haircut.png",
  },
  {
    id: 2,
    title: "رنگ و لایت آمبره",
    category: "Color & Light",
    price: "از ۲.۵۰۰",
    image: "/images/service-color.png",
  },
  {
    id: 3,
    title: "تراپی و احیا",
    category: "Treatments",
    price: "از ۳.۰۰۰",
    image: "/images/service-spa.png",
  },
  {
    id: 4,
    title: "میکاپ عروس",
    category: "Bridal Makeup",
    price: "مشاوره حضوری",
    image: "/images/service-bridal.png",
  },
  {
    id: 5,
    title: "کاشت پودر و ژل",
    category: "Nail Extensions",
    price: "از ۶۰۰",
    image: "/images/service-bridal.png", 
  },
  {
    id: 6,
    title: "لمینت و استحکام‌سازی",
    category: "Nail Therapy",
    price: "از ۴۰۰",
    image: "/images/service-spa.png",
  },
  {
    id: 7,
    title: "طراحی و نیل‌آرت تخصصی",
    category: "Nail Art",
    price: "از ۵۰ / ناخن",
    image: "/images/service-color.png",
  },
  {
    id: 8,
    title: "پدیکور VIP و کفسابی",
    category: "Pedicure & Spa",
    price: "از ۵۰۰",
    image: "/images/service-spa.png",
  },
];

// 👇 محصولات بوتیک (جدید)
export const PRODUCTS = [
  {
    id: 1,
    title: "شامپو احیاکننده خاویار",
    enTitle: "Caviar Repair Shampoo",
    price: "۱.۸۵۰.۰۰۰",
    category: "Shampoo",
    image: "/images/service-spa.png", // بافت کرمی و لوکس
    description: "غنی شده با عصاره خاویار سیاه برای بازسازی عمیق فیبر مو.",
  },
  {
    id: 2,
    title: "الکسیر طلای آرگان",
    enTitle: "Golden Argan Elixir",
    price: "۲.۴۰۰.۰۰۰",
    category: "Oil & Serum",
    image: "/images/floating-perfume.png", // بطری شیشه‌ای (عالی برای روغن)
    description: "طلای مایع مراکش. درخشش آنی بدون ایجاد چربی.",
  },
  {
    id: 3,
    title: "ماسک موی کراتین خالص",
    enTitle: "Pure Keratin Mask",
    price: "۱.۶۰۰.۰۰۰",
    category: "Mask",
    image: "/images/service-color.png", // بافت رنگی و غلیظ
    description: "بمب آبرسان برای موهای دکلره و آسیب‌دیده.",
  },
  {
    id: 4,
    title: "اسپری محافظ حرارت",
    enTitle: "Heat Shield Mist",
    price: "۹۵۰.۰۰۰",
    category: "Styling",
    image: "/images/floating-brush.png", // ابزار استایل
    description: "محافظ نامرئی در برابر سشوار و اتو مو تا ۲۳۰ درجه.",
  },
];

export const NAV_LINKS = [
  { name: "خانه", href: "/" },
  { name: "خدمات", href: "/#services" },
  { name: "فروشگاه", href: "/shop" }, // 👈 لینک جدید فروشگاه
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