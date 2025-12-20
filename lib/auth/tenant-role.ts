import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TenantRole = "owner" | "admin" | "secretary" | "customer";

export async function getCurrentTenantAndRole() {
  const h = await headers();
  const tenantSlug = h.get("x-ayneh-tenant");

  if (!tenantSlug) {
    // فعلاً: اگر روی دامنه‌ی اصلی هستیم، پنل tenant نداریم
    redirect("/admin/login");
  }

  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) redirect("/admin/login");

  // tenant را پیدا کن
  const { data: tenantRow, error: tenantError } = await supabase
    .from("tenants")
    .select("id, slug, status")
    .eq("slug", tenantSlug)
    .single();

  if (tenantError || !tenantRow) {
    redirect("/admin/login");
  }

  if (tenantRow.status !== "active") {
    redirect("/"); // یا صفحه‌ی خاص برای معلق بودن سالن
  }

  // membership و role را پیدا کن
  const { data: membership, error: membershipError } = await supabase
    .from("tenant_memberships")
    .select("role")
    .eq("tenant_id", tenantRow.id)
    .eq("user_id", user.id)
    .single();

  if (membershipError || !membership?.role) {
    redirect("/admin/login");
  }

  const role = membership.role as TenantRole;

  return {
    tenant: tenantRow as { id: string; slug: string; status: string },
    user,
    role,
  };
}

export async function requireTenantRole(allowed: TenantRole[]) {
  const ctx = await getCurrentTenantAndRole();

  if (!allowed.includes(ctx.role)) {
    // اجازه ندارد این قسمت پنل را ببیند
    redirect("/admin");
  }

  return ctx;
}
