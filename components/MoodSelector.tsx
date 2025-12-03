"use client";

// 👇 اینجا AnimatePresence رو اضافه کن
import { motion, AnimatePresence } from "framer-motion"; 
import { Sparkles, Coffee, Moon, Scissors, ArrowLeft } from "lucide-react";
import { useState } from "react";
import LuxuryButton from "@/components/LuxuryButton";

const MOODS = [
  {
    id: "bold",
    title: "جسور و خاص",
    subtitle: "Bold & Unique",
    desc: "اگر دنبال تغییری هستی که همه نگاه‌ها رو برگردونه. کوتاهی‌های ژورنالی و رنگ‌های خاص.",
    icon: Scissors,
    bgImage: "bg-rose-50",
    accent: "text-rose-900",
  },
  {
    id: "relax",
    title: "آرامش مطلق",
    subtitle: "Deep Relaxation",
    desc: "پکیج VIP ماساژ سر، فیشال و اسپا. یک ساعت آرامش برای فرار از شلوغی شهر.",
    icon: Moon,
    bgImage: "bg-indigo-50",
    accent: "text-indigo-900",
  },
  {
    id: "party",
    title: "درخشش در شب",
    subtitle: "Night Glam",
    desc: "میکاپ و شینیون ویژه برای مهمانی‌های خاص. طوری که ستاره‌ی شب باشی.",
    icon: Sparkles,
    bgImage: "bg-amber-50",
    accent: "text-amber-900",
  },
  {
    id: "chill",
    title: "مرتب و شیک",
    subtitle: "Clean & Chic",
    desc: "یک آراستگی همیشگی. مانیکور، پدیکور و براشینگ روزانه برای خانم‌های مدرن.",
    icon: Coffee,
    bgImage: "bg-emerald-50",
    accent: "text-emerald-900",
  },
];

export default function MoodSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleBooking = (moodTitle: string) => {
    const message = `سلام! 🌸 من توی سایت حس "${moodTitle}" رو انتخاب کردم و می‌خوام رزرو کنم.`;
    window.open(`https://wa.me/989170000000?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative w-full bg-white text-gray-900 py-20 lg:py-40 px-6" style={{ fontFamily: 'var(--font-doran)' }}>
      
      <div className="max-w-7xl mx-auto lg:flex lg:gap-20">
        
        <div className="lg:w-1/3 mb-16 lg:mb-0">
          <div className="lg:sticky lg:top-40">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
            >
              مودِ امروز <br/> <span className="text-gray-400 font-serif italic">شما چیه؟</span>
            </motion.h2>
            <p className="text-lg text-gray-500 leading-loose font-light max-w-sm">
              ما باور داریم زیبایی یک حس درونیه. بر اساس حال و هوای امروزت، سرویس مورد نظرت رو انتخاب کن.
            </p>
            
            <div className="hidden lg:block w-20 h-[1px] bg-black mt-10"></div>
          </div>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-10 pb-24">
          {MOODS.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelected(mood.id)}
              className={`group relative overflow-hidden rounded-[2.5rem] p-10 lg:p-14 ${mood.bgImage} transition-colors duration-500 hover:bg-gray-900 hover:text-white cursor-pointer ${selected === mood.id ? 'ring-2 ring-offset-4 ring-gray-900' : ''}`}
            >
              <mood.icon className={`absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 w-64 h-64 ${mood.accent} group-hover:text-white`} />

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <span className="block text-sm font-serif italic opacity-60 mb-2">{mood.subtitle}</span>
                   <h3 className="text-3xl lg:text-4xl font-bold mb-4">{mood.title}</h3>
                   <p className="opacity-70 text-lg font-light max-w-md leading-relaxed">
                     {mood.desc}
                   </p>
                </div>

                <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowLeft className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 👇 دکمه شناور پایین صفحه (مغناطیسی شد) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto shadow-2xl rounded-full">
              <LuxuryButton 
                onClick={() => handleBooking(MOODS.find(m => m.id === selected)?.title || "")}
                className="px-12 py-5 text-lg"
              >
                رزرو نوبت
                <ArrowLeft size={20} className="mr-2" />
              </LuxuryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}