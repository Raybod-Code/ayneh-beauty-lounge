import { type NextRequest, NextResponse } from "next/server";
import type { NextResponse as NextRes } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest, response?: NextRes) {
  let res = response ?? NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();

  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isAdminLogin = request.nextUrl.pathname === "/admin/login";

  if (isAdminPath && !isAdminLogin && !data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    const redirectRes = NextResponse.redirect(url);

    // کوکی‌ها را هم روی redirect حفظ کن
    res.cookies.getAll().forEach((c) => redirectRes.cookies.set(c));
    return redirectRes;
  }

  return res;
}
