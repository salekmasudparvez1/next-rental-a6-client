import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/auth/AuthService";

const authRoutes = ["/auth/login", "/auth/register"];

const roleBasedPrivateRoutes = {
   landlord: [/^\/landlord/, /^\/create-post/, /^\/profile/,/^\//],
   tenant: [/^\/tenant/, /^\/profile/],
   admin: [/^\/admin/, /^\/tenant/, /^\/landlord/, /^\/profile/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
   const { pathname } = request.nextUrl;

   const userInfo = await getCurrentUser();

   // 1️⃣ user not logged in
   if (!userInfo) {
      if (authRoutes.includes(pathname)) return NextResponse.next();

      return NextResponse.redirect(
         new URL(
            `/auth/login?redirectPath=${pathname}`,
            request.url
         )
      );
   }

   // 2️⃣ logged in → check role routes
   if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
   // 3️⃣ not allowed
   return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/auth/login",
    "/auth/register",
    "/profile",
    "/landlord",
    "/landlord/:path*",
    "/tenant",
    "/tenant/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
