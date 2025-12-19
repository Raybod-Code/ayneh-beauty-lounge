export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans" dir="rtl">
      {children}
    </div>
  );
}
