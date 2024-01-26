import { NextResponse } from "next/server";


export function middleware(request) {
    
    if(request.nextUrl.pathname==='/api/getAllEvents' || request.nextUrl.pathname.startsWith('/api/auth/') || request.nextUrl.pathname.startsWith('/api/forgetPassword') || request.nextUrl.pathname.startsWith('/api/resetPassword') || request.nextUrl.pathname.startsWith('/api/verifyToken')){
        return;
    }
    // const authtoken = request.cookies.get("__Secure-next-auth.session-token");   //for vercel
      const authtoken = request.cookies.get("next-auth.session-token");   //for local
    if (authtoken || request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/forgotPassword" || request.nextUrl.pathname === "/resetPassword" || request.nextUrl.pathname === "/") {
        // console.log("cookie found")

      return NextResponse.next();
    }

    
  return NextResponse.redirect(new URL("/login", request.url));
}
export const config = {
  matcher: ["/dashboardAdmin", "/manageUsers","/api/:path*"],
};
