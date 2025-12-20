import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type PublicTenant = {
  tenant_id: string;
  slug: string;
  name: string;
  status: string;
  locale: string;
  brand_name: string | null;
  logo_url: string | null;
  theme: {
    primary?: string;
    [key: string]: any;
  } | null;
  public_config: {
    rtl?: boolean;
    [key: string]: any;
  } | null;
};

export async function getTenantFromRequest(): Promise<{
  tenantSlug: string | null;
  tenant: PublicTenant | null;
}> {
  const h = await headers();
  const tenantSlug = h.get("x-ayneh-tenant");

  if (!tenantSlug) return { tenantSlug: null, tenant: null };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_public_tenant_by_slug", {
    p_slug: tenantSlug,
  });

  if (error || !data || data.length === 0) return { tenantSlug, tenant: null };
  return { tenantSlug, tenant: data[0] as PublicTenant };
}
