import { PRODUCTS } from "@/app/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ArrowLeft, Star, Truck, ShieldCheck, Plus } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton"; // ✅ ایمپورت دکمه جدید

type Props = {
  params: Promise<{ id: string }>;
};

// تابع سئو (بدون تغییر)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return { title: "محصول یافت نشد | AYNEH" };
  }

  return {
    title: `${product.title} | بوتیک آینه`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) return notFound();

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-gold selection:text-black">
      <CustomCursor />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-sans">بازگشت به بوتیک</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          
          <div className="relative aspect-[4/5] bg-[#111] rounded-[3rem] overflow-hidden border border-white/5">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 opacity-[0.05] bg-[url('/images/noise.png')] pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase block mb-3 font-sans font-bold">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-sans font-black text-white mb-2 leading-tight">
                {product.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-serif italic text-gray-500 font-light">
                {product.enTitle}
              </h2>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
              <span className="text-3xl font-sans font-bold text-white">
                {product.price} <span className="text-sm text-gray-500 font-light">تومان</span>
              </span>
              <div className="flex items-center gap-1 text-brand-gold">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
                <span className="text-xs text-gray-500 mr-2 font-sans">(۴.۹ از ۵)</span>
              </div>
            </div>

            <p className="text-gray-400 leading-loose font-sans font-light text-lg mb-10">
              {product.description}
            </p>

            {/* 👇 استفاده از دکمه جدید (که کلاینت ساید هست) */}
            <div className="mb-10">
               <AddToCartButton product={product} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 font-sans mt-4">
              <div className="flex items-center justify-center gap-2 border border-white/10 py-3 rounded-xl">
                <Truck size={14} /> ارسال رایگان
              </div>
              <div className="flex items-center justify-center gap-2 border border-white/10 py-3 rounded-xl">
                <ShieldCheck size={14} /> ضمانت اصالت
              </div>
            </div>

            <div className="space-y-4 font-sans mt-10">
              <details className="group border-b border-white/10 pb-4 cursor-pointer">
                <summary className="flex justify-between items-center text-white font-bold list-none">
                  نحوه مصرف
                  <span className="transition-transform group-open:rotate-45"><Plus size={16} /></span>
                </summary>
                <p className="text-gray-500 mt-3 text-sm leading-relaxed animate-fadeIn">
                  مقدار مناسبی را روی موهای مرطوب ماساژ دهید. ۳ تا ۵ دقیقه صبر کنید و سپس آبکشی نمایید.
                </p>
              </details>
              <details className="group border-b border-white/10 pb-4 cursor-pointer">
                <summary className="flex justify-between items-center text-white font-bold list-none">
                  مواد تشکیل‌دهنده
                  <span className="transition-transform group-open:rotate-45"><Plus size={16} /></span>
                </summary>
                <p className="text-gray-500 mt-3 text-sm leading-relaxed animate-fadeIn">
                  روغن آرگان مراکشی، کراتین هیدرولیز شده، عصاره خاویار سیاه، ویتامین E.
                </p>
              </details>
            </div>

          </div>
        </div>

        {/* محصولات پیشنهادی */}
        <div className="border-t border-white/10 pt-20">
          <h3 className="text-3xl font-serif text-white mb-10 text-center">تکمیل کننده روتین شما</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group block">
                <div className="relative aspect-square bg-[#111] rounded-3xl overflow-hidden mb-4 border border-white/5 group-hover:border-brand-gold/30 transition-colors">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <h4 className="text-lg font-bold font-sans text-white group-hover:text-brand-gold transition-colors text-center">{p.title}</h4>
                <p className="text-sm text-gray-500 text-center mt-1 font-sans">{p.price} تومان</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}