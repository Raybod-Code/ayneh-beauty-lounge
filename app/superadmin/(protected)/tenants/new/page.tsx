// app/admin/(protected)/(admin-only)/tenants/new/page.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import NewTenantForm from "@/components/admin/NewTenantForm";

export default function NewTenantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] text-white">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#C8A951]/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
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
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A951] to-[#D4B56A] flex items-center justify-center shadow-lg shadow-[#C8A951]/20">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                افزودن سالن جدید
              </h1>
            </div>
            <p className="text-gray-400 mr-16">
              ایجاد یک سالن Multi-Tenant جدید در سیستم
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A951]/10 via-transparent to-[#C8A951]/10 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />
            
            {/* Card */}
            <div className="relative bg-[#111] border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-[#C8A951]/20 transition-all">
              {/* Noise */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] pointer-events-none" />

              <div className="relative z-10">
                <NewTenantForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
