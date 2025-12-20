// app/admin/(protected)/(admin-only)/tenants/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Building2, Plus, Search, Filter, Crown, Calendar } from "lucide-react";
import Link from "next/link";

export default function TenantsListPage() {
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTenants() {
      const supabase = createClient();
      const { data } = await supabase
        .from("tenants")
        .select("*")
        .order("created_at", { ascending: false });
      setTenants(data || []);
    }
    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] text-white">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#C8A951]/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
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
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                مدیریت سالن‌ها
              </h1>
            </motion.div>
            <p className="text-gray-400 mr-16">
              {tenants.length} سالن در سیستم ثبت شده
            </p>
          </div>

          <Link
            href="/admin/tenants/new"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C8A951] to-[#D4B56A] text-black rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#C8A951]/40 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            افزودن سالن
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/20 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity" />
            <div className="relative">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#C8A951] transition-colors" />
              <input
                type="text"
                placeholder="جستجوی سالن..."
                className="w-full bg-[#111] border border-white/10 rounded-2xl pr-14 pl-6 py-4 text-white focus:border-[#C8A951]/50 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button className="group flex items-center gap-3 px-6 py-4 bg-[#111] border border-white/10 rounded-2xl hover:border-[#C8A951]/50 transition-all hover:scale-105">
            <Filter className="w-5 h-5 text-gray-400 group-hover:text-[#C8A951] transition-colors" />
            <span className="hidden lg:block font-bold">فیلتر</span>
          </button>
        </div>

        {/* Grid */}
        {tenants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant, idx) => (
              <motion.div
                key={tenant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C8A951]/20 via-purple-500/10 to-[#C8A951]/20 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                {/* Card */}
                <Link
                  href={`/admin/tenants/${tenant.id}`}
                  className="relative block h-full bg-[#111] border border-white/5 rounded-[2rem] p-7 overflow-hidden hover:border-[#C8A951]/30 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Noise */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />
                  
                  {/* Gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A951] to-transparent rounded-full blur-2xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#C8A951]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-14 h-14 bg-[#C8A951]/10 rounded-2xl flex items-center justify-center border border-[#C8A951]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <Building2 className="w-7 h-7 text-[#C8A951]" />
                        </div>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm ${
                          tenant.is_active
                            ? "bg-green-400/10 text-green-400 border border-green-400/30"
                            : "bg-red-400/10 text-red-400 border border-red-400/30"
                        }`}
                      >
                        {tenant.is_active ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black mb-2 group-hover:text-[#C8A951] transition-colors">
                      {tenant.name}
                    </h3>

                    {/* Domain */}
                    <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
                      {tenant.slug}.ayneh.com
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                        <Crown className="w-3.5 h-3.5 text-[#C8A951]" />
                        <span className="font-bold">{tenant.plan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(tenant.created_at).toLocaleDateString("fa-IR", { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Border Animation */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#C8A951] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-[2rem] bg-[#111] flex items-center justify-center border border-white/10">
              <Building2 className="w-12 h-12 text-gray-700" />
            </div>
            <p className="text-gray-500 text-lg">هنوز سالنی ثبت نشده است</p>
          </div>
        )}
      </div>
    </div>
  );
}
