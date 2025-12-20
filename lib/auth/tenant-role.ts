import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TenantRole = "owner" | "admin" | "secretary" | "customer";

export async function getCurrentTenantAndRole() {
  const h = await headers();
  const tenantSlug = h.get("x-ayneh-tenant");

  // اگر tenant از روی host پیدا نشد، اصلاً وارد پنل نشود
  if (!tenantSlug) {
    redirect("/"); // مهم: دیگر /admin/login نیست
  }

  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    redirect("/admin/login");
  }

  const { data: tenantRow, error: tenantError } = await supabase
    .from("tenants")
    .select("id, slug, status")
    .eq("slug", tenantSlug)
    .single();

  if (tenantError || !tenantRow) {
    redirect("/");
  }

  if (tenantRow.status !== "active") {
    redirect("/");
  }

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
    redirect("/admin");
  }

  return ctx;
}
