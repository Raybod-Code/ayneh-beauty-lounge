// app/utils/faceLogic.ts

// نقاط کلیدی صورت در MediaPipe
const LANDMARKS = {
  TOP: 10,
  BOTTOM: 152,
  LEFT_CHEEK: 234,
  RIGHT_CHEEK: 454,
  LEFT_JAW: 58,
  RIGHT_JAW: 288,
  LEFT_FOREHEAD: 21,
  RIGHT_FOREHEAD: 251,
};

// تابع محاسبه فاصله بین دو نقطه
const getDistance = (p1: any, p2: any) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const detectFaceShape = (landmarks: any[]) => {
  const width = getDistance(landmarks[LANDMARKS.LEFT_CHEEK], landmarks[LANDMARKS.RIGHT_CHEEK]);
  const length = getDistance(landmarks[LANDMARKS.TOP], landmarks[LANDMARKS.BOTTOM]);
  const jawWidth = getDistance(landmarks[LANDMARKS.LEFT_JAW], landmarks[LANDMARKS.RIGHT_JAW]);
  const foreheadWidth = getDistance(landmarks[LANDMARKS.LEFT_FOREHEAD], landmarks[LANDMARKS.RIGHT_FOREHEAD]);

  const ratio = length / width;

  // الگوریتم ساده شده تشخیص فرم صورت
  if (ratio > 1.5) {
    return { shape: "کشیده (Oblong)", desc: "صورت شما کشیده و اشرافی است.", styles: ["چتری", "باب بلند", "فر درشت"] };
  } else if (ratio < 1.15) {
    if (jawWidth > foreheadWidth * 0.9) {
      return { shape: "مربعی (Square)", desc: "خط فک قوی و جذاب دارید.", styles: ["لیر بلند", "پیکسی", "فرق کج"] };
    } else {
      return { shape: "گرد (Round)", desc: "صورتی با انحنای نرم و جوان.", styles: ["باب نامتقارن", "لیر خرد", "پف دار"] };
    }
  } else {
    if (jawWidth < foreheadWidth * 0.7) {
      return { shape: "قلبی (Heart)", desc: "پیشانی عریض و چانه ظریف.", styles: ["باب کلاسیک", "دم اسبی", "چتری کنار"] };
    } else {
      return { shape: "بیضی (Oval)", desc: "متعادل‌ترین فرم صورت (خوش‌شانس!).", styles: ["همه مدل‌ها!", "اسلیک بک", "باب کوتاه"] };
    }
  }
};