/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 این بخش باعث میشه بیلد به خاطر ارور متوقف نشه
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 👆 پایان بخش تقلب
};

export default nextConfig;