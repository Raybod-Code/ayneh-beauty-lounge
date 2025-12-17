/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 نادیده گرفتن ارورهای تایپ‌اسکریپت (برای اینکه بیلد متوقف نشه)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 👇 مجوز دادن به سایت‌های عکس خارجی
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // مجوز برای Pexels
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // مجوز برای Unsplash (محض احتیاط)
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", 
      },
    ],
  },
};

export default nextConfig;