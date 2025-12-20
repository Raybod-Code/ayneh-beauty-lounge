// app/admin/(protected)/(admin-only)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  Building2, Users, DollarSign, TrendingUp, 
  Clock, Eye, Sparkles, ArrowUpRight, 
  Crown, Activity
} from "lucide-react";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const [data, setData] = useState<any>({
    tenantsCount: 0,
    activeCount: 0,
    usersCount: 0,
    recentTenants: [],
  });

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const { count: tenantsCount } = await supabase
        .from("tenants")
        .select("*", { count: "exact", head: true });

      const { count: activeCount } = await supabase
        .from("tenants")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { data: recentTenants } = await supabase
        .from("tenants")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setData({ tenantsCount, activeCount, usersCount, recentTenants });
    }
    fetchData();
  }, []);

  const stats = [
    {
      title: "کل سالن‌ها",
      value: data.tenantsCount || 0,
      unit: "سالن",
      icon: Building2,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      gradient: "from-blue-500/20 to-blue-600/5",
    },
    {
      title: "سالن‌های فعال",
      value: data.activeCount || 0,
      unit: "فعال",
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-400/10",
      gradient: "from-green-500/20 to-emerald-600/5",
    },
    {
      title: "کل کاربران",
      value: data.usersCount || 0,
      unit: "کاربر",
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      gradient: "from-purple-500/20 to-purple-600/5",
    },
    {
      title: "درآمد ماهانه",
      value: "$0",
      unit: "USD",
      icon: DollarSign,
      color: "text-[#C8A951]",
      bg: "bg-[#C8A951]/10",
      gradient: "from-[#C8A951]/20 to-[#C8A951]/5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] text-white">
      {/* Ambient Soft Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C8A951]/[0.03] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A951] to-[#D4B56A] flex items-center justify-center shadow-lg shadow-[#C8A951]/20">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                داشبورد مدیریت
              </h1>
            </motion.div>
            <p className="text-gray-400 mr-16">
              مدیریت هوشمند سیستم Multi-Tenant
            </p>
          </div>

          <div className="text-left hidden md:block">
            <span className="text-[#C8A951] font-mono text-2xl font-bold">
              {new Date().toLocaleTimeString("fa-IR", { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-gray-500 text-sm block">
              {new Date().toLocaleDateString("fa-IR", { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Hover Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${stat.gradient} rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative bg-[#111] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between hover:border-[#C8A951]/30 transition-all hover:bg-white/[0.02]">
                  <div>
                    <p className="text-gray-500 text-xs mb-2 font-bold uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white font-mono">
                        {stat.value}
                      </span>
                      <span className="text-xs text-gray-400">{stat.unit}</span>
                    </div>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Tenants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          {/* Subtle Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/10 via-transparent to-[#C8A951]/10 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />
          
          {/* Card */}
          <div className="relative bg-[#111] border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-[#C8A951]/20 transition-all">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Activity size={22} className="text-[#C8A951]" />
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      آخرین سالن‌های ثبت شده
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      مشاهده و مدیریت سالن‌های جدید
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/admin/tenants"
                  className="group/link flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C8A951] to-[#D4B56A] text-black rounded-2xl font-bold hover:shadow-xl hover:shadow-[#C8A951]/30 transition-all duration-300 hover:scale-105"
                >
                  مشاهده همه
                  <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* List */}
              {data.recentTenants && data.recentTenants.length > 0 ? (
                <div className="space-y-4">
                  {data.recentTenants.map((tenant: any, idx: number) => (
                    <motion.div
                      key={tenant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <Link
                        href={`/admin/tenants/${tenant.id}`}
                        className="group/item relative block"
                      >
                        {/* Hover Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/20 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 blur transition-opacity" />
                        
                        {/* Item */}
                        <div className="relative flex items-center justify-between p-5 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl group-hover/item:bg-white/[0.04] group-hover/item:border-[#C8A951]/30 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#C8A951]/20 rounded-xl blur opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              <div className="relative w-14 h-14 bg-[#C8A951]/10 rounded-xl flex items-center justify-center border border-[#C8A951]/20 group-hover/item:scale-110 transition-transform duration-300">
                                <Building2 className="w-6 h-6 text-[#C8A951]" />
                              </div>
                            </div>

                            {/* Info */}
                            <div>
                              <h3 className="font-bold text-lg mb-1 group-hover/item:text-[#C8A951] transition-colors">
                                {tenant.name}
                              </h3>
                              <p className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
                                {tenant.slug}.ayneh.com
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Status */}
                            <span
                              className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm ${
                                tenant.is_active
                                  ? "bg-green-400/10 text-green-400 border border-green-400/30"
                                  : "bg-red-400/10 text-red-400 border border-red-400/30"
                              }`}
                            >
                              {tenant.is_active ? "فعال" : "غیرفعال"}
                            </span>

                            {/* Date */}
                            <span className="text-xs text-gray-500 font-mono flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(tenant.created_at).toLocaleDateString("fa-IR", { month: 'short', day: 'numeric' })}
                            </span>

                            {/* Arrow */}
                            <Eye className="w-5 h-5 text-gray-600 group-hover/item:text-[#C8A951] group-hover/item:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Building2 className="w-10 h-10 text-gray-700" />
                  </div>
                  <p className="text-gray-500">هنوز سالنی ثبت نشده است</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
