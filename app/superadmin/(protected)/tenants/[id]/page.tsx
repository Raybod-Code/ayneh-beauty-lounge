// app/admin/(protected)/(admin-only)/tenants/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  Building2, ArrowRight, Edit3, Power, 
  Globe, Crown, Calendar, Clock, 
  Users, ExternalLink, Settings, Loader2
} from "lucide-react";
import Link from "next/link";

export default function TenantDetailPage() {
  const params = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    async function fetchTenant() {
      const supabase = createClient();
      const { data } = await supabase
        .from("tenants")
        .select("*")
        .eq("id", params.id)
        .single();
      
      setTenant(data);
      setLoading(false);
    }
    fetchTenant();
  }, [params.id]);

  const handleToggleStatus = async () => {
    if (!tenant) return;
    setToggling(true);

    try {
      const supabase = createClient();
      const newStatus = !tenant.is_active;

      const { error } = await supabase
        .from("tenants")
        .update({ is_active: newStatus })
        .eq("id", tenant.id);

      if (error) throw error;

      setTenant({ ...tenant, is_active: newStatus });
    } catch (error: any) {
      alert("خطا: " + error.message);
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#C8A951] animate-spin" />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-500">سالن یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] text-white">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#C8A951]/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <Link
              href="/admin/tenants"
              className="text-gray-500 hover:text-[#C8A951] transition-colors text-sm font-bold flex items-center gap-2 group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              بازگشت به لیست
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A951] to-[#D4B56A] flex items-center justify-center shadow-lg shadow-[#C8A951]/20">
                <Building2 className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                  {tenant.name}
                </h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
                  {tenant.slug}.ayneh.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/admin/tenants/${tenant.id}/edit`}
                className="group flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 rounded-2xl hover:border-[#C8A951]/50 transition-all hover:scale-105 font-bold"
              >
                <Edit3 className="w-4 h-4 group-hover:text-[#C8A951] transition-colors" />
                ویرایش
              </Link>

              <button
                onClick={handleToggleStatus}
                disabled={toggling}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 ${
                  tenant.is_active
                    ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                    : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20"
                }`}
              >
                {toggling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Power className="w-4 h-4" />
                )}
                {tenant.is_active ? "غیرفعال" : "فعال"}
              </button>
            </div>
          </motion.div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Main Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />
              
              <div className="relative bg-[#111] border border-white/5 rounded-[2rem] p-6 hover:border-[#C8A951]/20 transition-all">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#C8A951]" />
                    اطلاعات اصلی
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        پلن اشتراک
                      </span>
                      <span className="font-bold text-[#C8A951] uppercase">
                        {tenant.plan}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        زبان
                      </span>
                      <span className="font-bold">{tenant.locale?.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Power className="w-4 h-4" />
                        وضعیت
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          tenant.is_active
                            ? "bg-green-400/10 text-green-400 border border-green-400/30"
                            : "bg-red-400/10 text-red-400 border border-red-400/30"
                        }`}
                      >
                        {tenant.is_active ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        تاریخ ایجاد
                      </span>
                      <span className="font-mono text-sm">
                        {new Date(tenant.created_at).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />
              
              <div className="relative bg-[#111] border border-white/5 rounded-[2rem] p-6 hover:border-[#C8A951]/20 transition-all">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-[#C8A951]" />
                    دسترسی سریع
                  </h3>

                  <div className="space-y-3">
                    <a
                      href={`https://${tenant.slug}.ayneh.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-[#C8A951]/30 transition-all"
                    >
                      <span className="text-sm font-bold">مشاهده سایت</span>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover/link:text-[#C8A951] transition-colors" />
                    </a>

                    <button
                      className="w-full group/link flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-[#C8A951]/30 transition-all"
                    >
                      <span className="text-sm font-bold">مدیریت کاربران</span>
                      <Users className="w-4 h-4 text-gray-500 group-hover/link:text-[#C8A951] transition-colors" />
                    </button>

                    <button
                      className="w-full group/link flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-[#C8A951]/30 transition-all"
                    >
                      <span className="text-sm font-bold">تنظیمات پیشرفته</span>
                      <Settings className="w-4 h-4 text-gray-500 group-hover/link:text-[#C8A951] transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Activity Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />
            
            <div className="relative bg-[#111] border border-white/5 rounded-[2rem] p-8 hover:border-[#C8A951]/20 transition-all">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#C8A951]" />
                  فعالیت‌های اخیر
                </h3>
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    هنوز فعالیتی ثبت نشده است
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
