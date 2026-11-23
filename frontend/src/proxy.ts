import { NextResponse, type NextRequest } from "next/server";
import { isTokenUsable, SESSION_COOKIE } from "@/lib/auth/token";

const PROTECTED_PREFIXES = ["/dashboard", "/projects", "/account"];
const AUTH_PAGES = ["/login", "/register"];

/**
 * Optimistic route protection: it only checks that a non-expired session cookie
 * exists. The real authorization is done by the backend, which verifies the JWT
 * on every request made through the Data Access Layer.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = isTokenUsable(request.cookies.get(SESSION_COOKIE)?.value);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (pathname === "/") {
    return NextResponse.redirect(new URL(hasSession ? "/dashboard" : "/login", request.url));
  }

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_PAGES.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets, images and API routes.
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
