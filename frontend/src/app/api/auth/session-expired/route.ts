import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/token";

/**
 * Reached when the backend rejects the session token (expired, revoked or signed
 * with another secret). Server Components cannot delete cookies, so they redirect
 * here: the cookie is removed and the user is sent to the login page.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login?session=expired", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
