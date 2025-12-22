import { type NextRequest, NextResponse } from "next/server";
import type { NextResponse as NextRes } from "next/server";
import { createServerClient } from "@supabase/ssr";

function withNext(url: URL, nextPath: string) {
  url.searchParams.set("next", nextPath);
  return url;
}

export async function updateSession(request: NextRequest, response?: NextRes) {
  // نکته: اگر response پاس داده شده (از proxy.ts ریشه)، باید همان را حفظ کنیم
  let res =
    response ??
    NextResponse.next({
      request: { headers: request.headers },
    });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // اگر واقعاً همین env را داری نگه‌دار؛ در غیر این صورت باید ANON_KEY باشد.
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

  // بهتر از claims برای فهمیدن لاگین بودن
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  const pathname = request.nextUrl.pathname;

  const isAdmin = pathname.startsWith("/admin");
  const isSuperAdmin = pathname.startsWith("/superadmin");

  const isAdminLogin = pathname === "/admin/login";
  const isSuperAdminLogin = pathname === "/superadmin/login";

  const needsAuth =
    (isAdmin && !isAdminLogin) || (isSuperAdmin && !isSuperAdminLogin);

  if (needsAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login"; // لاگین مشترک
    withNext(url, pathname);

    const redirectRes = NextResponse.redirect(url);
    res.cookies.getAll().forEach((c) => redirectRes.cookies.set(c));
    return redirectRes;
  }

  return res;
}
