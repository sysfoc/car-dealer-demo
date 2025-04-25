import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const adminToken = request.cookies.get("admin")?.value;
  const { pathname } = request.nextUrl;

  // If no token and no admin token, redirect to login
  if (!token && !adminToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Restrict /dashboard to admins only
  if (pathname.startsWith("/dashboard")) {
    if (!adminToken) {
      const userDashboardUrl = request.nextUrl.clone();
      userDashboardUrl.pathname = "/user/dashboard";
      return NextResponse.redirect(userDashboardUrl);
    }
  }

  // Restrict /user/* to logged in users (token)
  if (pathname.startsWith("/user") && !token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*"],
};
