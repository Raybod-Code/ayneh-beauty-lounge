// app/constants/quiz.ts

export type RecommendationType = {
  title: string;
  description: string;
  priceRange: string;
  image: string;
  tags: string[];
};

export const RECOMMENDATIONS: Record<string, RecommendationType> = {
  // --- Hair Recommendations ---
  "hair_revival": {
    title: "پروتئین‌تراپی و احیا",
    description: "موهای شما تشنه هستند! پیشنهاد ما درمان عمیق با پروتئین ابریشم و اوزون‌تراپی برای بازگرداندن درخشش است.",
    priceRange: "۳.۰۰۰ - ۵.۰۰۰",
    image: "/images/service-spa.png",
    tags: ["hair", "damage"],
  },
  "hair_transformation": {
    title: "کوتاهی و بالیاژ ژورنالی",
    description: "وقت یک تغییر بزرگ است. یک کوتاهی باب یا لیر به همراه تکنیک بالیاژ برای بُعد دادن به موها.",
    priceRange: "۴.۵۰۰ - ۸.۰۰۰",
    image: "/images/service-color.png",
    tags: ["hair", "style"],
  },
  "hair_maintenance": {
    title: "رنگ ریشه و براشینگ",
    description: "برای حفظ زیبایی فعلی، یک رنگ ریشه دقیق و براشینگ مجلسی کافیست.",
    priceRange: "۱.۵۰۰ - ۲.۵۰۰",
    image: "/images/service-haircut.png",
    tags: ["hair", "daily"],
  },

  // --- Nail Recommendations (Local Images) ---
  "nail_extension": {
    title: "کاشت ژل روسی (Russian Gel)",
    description: "برای داشتن ناخن‌هایی بلند، ظریف و بسیار مقاوم. مناسب برای کسانی که صدف ناخن کوتاه دارند.",
    priceRange: "۸۰۰ - ۱.۲۰۰",
    image: "/images/service-bridal.png", // موقت: حس ظرافت
    tags: ["nail", "long"],
  },
  "nail_therapy": {
    title: "لمینت و مانیکور خیس",
    description: "استحکام‌سازی ناخن طبیعی بدون افزایش قد. ظاهری نچرال و بسیار شیک.",
    priceRange: "۴۵۰ - ۷۰۰",
    image: "/images/service-spa.png", // موقت: حس سلامت
    tags: ["nail", "natural"],
  },
  "nail_art": {
    title: "ژلیش با طراحی کروم/فرنچ",
    description: "یک دیزاین ترندی و خاص. پیشنهاد ما: فرنچ رنگی یا پودر کروم روی ناخن طبیعی.",
    priceRange: "۳۵۰ - ۶۰۰",
    image: "/images/service-color.png", // موقت: حس رنگ و هنر
    tags: ["nail", "art"],
  },
};

// سوالات (بدون تغییر، فقط برای اطمینان دوباره می‌گذارم)
export const QUIZ_DATA = {
  hair: [
    {
      id: 1,
      question: "وضعیت فعلی موهای شما چطور است؟",
      options: [
        { text: "خشک، دکلره شده و شکننده", icon: "dry", score: { hair_revival: 5, hair_transformation: 1, hair_maintenance: 0 } },
        { text: "سالم اما تکراری و بی‌حالت", icon: "boring", score: { hair_revival: 1, hair_transformation: 5, hair_maintenance: 2 } },
        { text: "خوب است، فقط نیاز به مرتب‌سازی دارد", icon: "healthy", score: { hair_revival: 0, hair_transformation: 2, hair_maintenance: 5 } },
      ],
    },
    {
      id: 2,
      question: "چقدر اهل رسیدگی روزانه هستید؟",
      options: [
        { text: "اصلاً (می‌خوام صبح پاشم عالی باشه)", icon: "sleep", score: { hair_revival: 5, hair_transformation: 2, hair_maintenance: 0 } },
        { text: "عاشق سشوار و حالت دادنم", icon: "style", score: { hair_revival: 1, hair_transformation: 5, hair_maintenance: 3 } },
      ],
    },
  ],
  nail: [
    {
      id: 1,
      question: "وضعیت ناخن‌های طبیعی شما؟",
      options: [
        { text: "بسیار شکننده و کوتاه", icon: "break", score: { nail_extension: 5, nail_therapy: 2, nail_art: 0 } },
        { text: "خوب و متوسط", icon: "ok", score: { nail_extension: 1, nail_therapy: 5, nail_art: 3 } },
        { text: "بلند و محکم", icon: "strong", score: { nail_extension: 0, nail_therapy: 2, nail_art: 5 } },
      ],
    },
    {
      id: 2,
      question: "چه سبکی را می‌پسندید؟",
      options: [
        { text: "خیلی بلند و خاص (فانتزی)", icon: "long", score: { nail_extension: 5, nail_therapy: 0, nail_art: 4 } },
        { text: "کوتاه، تمیز و نچرال (مینیمال)", icon: "minimal", score: { nail_extension: 0, nail_therapy: 5, nail_art: 2 } },
        { text: "پر از طرح و رنگ (آرت)", icon: "art", score: { nail_extension: 2, nail_therapy: 1, nail_art: 5 } },
      ],
    },
  ]
};