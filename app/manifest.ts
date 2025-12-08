import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AYNEH Beauty Lounge',
    short_name: 'AYNEH',
    description: 'زیبایی، بازتاب توست - سالن زیبایی و اسپا لوکس',
    start_url: '/',
    display: 'standalone', // یعنی مثل اپلیکیشن باز بشه (بدون نوار مرورگر)
    background_color: '#050505',
    theme_color: '#050505',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable', // 👈 تغییر: اضافه کردن 'any'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable', // 👈 تغییر: اضافه کردن 'any'
      },
    ],
  };
}