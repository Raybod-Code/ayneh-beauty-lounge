"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState<"login" | "reset" | null>(null);

  // اگر قبلاً لاگین بوده، مستقیم بفرست پنل
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) window.location.href = "/admin";
    })();
  }, [supabase]);

  const signIn = async () => {
    setLoading("login");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(null);

    if (error) {
      toast(error.message);
      return;
    }
    window.location.href = "/admin";
  };

  const resetPassword = async () => {
    if (!email) return toast("اول ایمیل را وارد کن.");
    setLoading("reset");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    setLoading(null);

    if (error) toast(error.message);
    else toast("لینک تغییر رمز به ایمیل ارسال شد.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background: gradient + glow + noise */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(198,168,124,0.18),rgba(0,0,0,0)_60%),linear-gradient(to_bottom,rgba(20,20,20,0.9),rgba(6,6,6,1))]" />
      <div className="absolute -top-24 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-140px] h-80 w-80 rounded-full bg-brand-gold/8 blur-3xl" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[420px] rounded-3xl border border-brand-gold/15 bg-black/45 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.85),0_0_0_1px_rgba(198,168,124,0.08)]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">پنل مدیریت</div>
              <div className="text-xl font-black tracking-tight mt-1">ورود ادمین</div>
            </div>

            <div className="h-10 w-10 rounded-2xl bg-brand-gold/15 border border-brand-gold/20 flex items-center justify-center">
              <Shield className="text-brand-gold" size={18} />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Sparkles size={14} className="text-brand-gold" />
                ورود امن فقط برای مدیران مجاز
              </div>
            </div>

            <label className="block">
              <div className="text-xs text-gray-400 mb-2">ایمیل</div>
              <input
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/15 transition"
                placeholder="admin@ayneh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-400 mb-2">پسورد</div>
              <div className="relative">
                <input
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 pr-12 outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/15 transition"
                  placeholder="••••••••"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  title={showPass ? "مخفی کردن" : "نمایش"}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <button
              onClick={signIn}
              disabled={loading !== null}
              className="w-full rounded-2xl bg-brand-gold text-black font-extrabold py-3 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading === "login" ? <Loader2 className="animate-spin" size={18} /> : null}
              ورود
            </button>

            <div className="flex items-center justify-between text-xs">
              <button
                onClick={resetPassword}
                disabled={loading !== null}
                className="text-brand-gold hover:underline disabled:opacity-60"
              >
                فراموشی رمز؟
              </button>

              <span className="text-gray-500">AYNEH • Admin</span>
            </div>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-gray-500 leading-relaxed pt-2"
              >
                نکته: اگر ایمیل را وارد کنی، گزینه “فراموشی رمز” لینک بازیابی را ارسال می‌کند.
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
