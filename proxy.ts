import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

function getHostname(hostHeader: string | null) {
  if (!hostHeader) return null;
  return hostHeader.split(":")[0]?.toLowerCase() ?? null;
}

function resolveTenantSlug(hostname: string | null) {
  if (!hostname) return null;

  // dev: royal.localhost => royal
  if (hostname.endsWith(".localhost")) return hostname.replace(".localhost", "");
  if (hostname === "localhost") return null;

  // prod later (دامنه خریدی): فقط ENV ست می‌کنی
  const root = process.env.AYNEH_ROOT_DOMAIN?.toLowerCase();
  if (!root) return null;

  if (hostname === root || hostname === `www.${root}`) return null;
  if (hostname.endsWith(`.${root}`)) return hostname.replace(`.${root}`, "");

  return null;
}

export async function proxy(request: NextRequest) {
  const hostname = getHostname(request.headers.get("host"));
  const tenantSlug = resolveTenantSlug(hostname);

  const requestHeaders = new Headers(request.headers);
  if (hostname) requestHeaders.set("x-ayneh-host", hostname);
  if (tenantSlug) requestHeaders.set("x-ayneh-tenant", tenantSlug);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  return await updateSession(request, res);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
