import { NextResponse } from "next/server";

export function middleware(request) {
  if (
    request.nextUrl.pathname === "/api/getAllEvents" ||
    request.nextUrl.pathname.startsWith("/api/auth/") ||
    request.nextUrl.pathname.startsWith("/api/forgetPassword") ||
    request.nextUrl.pathname.startsWith("/api/resetPassword") ||
    request.nextUrl.pathname.startsWith("/api/verifyToken") ||
    request.nextUrl.pathname.startsWith("/api/getEventByDateRange") ||
    request.nextUrl.pathname.startsWith("/api/verifyCaptchaToken")
  ) {
    return;
  }
  const authtoken = request.cookies.get("next-auth.session-token");
  if (
    authtoken ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/forgotPassword" ||
    request.nextUrl.pathname === "/resetPassword" ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
export const config = {
  matcher: ["/dashboardAdmin", "/manageUsers", "/api/:path*"],
};
