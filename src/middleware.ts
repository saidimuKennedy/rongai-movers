import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token/role, redirect to sign in
    if (!token?.role) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Role-based routing
    if (path.startsWith("/admin") && token.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/mover") && token.role !== Role.MOVER) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Redirect to appropriate dashboard from /dashboard
    if (path === "/dashboard") {
      switch (token.role) {
        case Role.ADMIN:
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        case Role.MOVER:
          return NextResponse.redirect(new URL("/mover/dashboard", req.url));
        default:
          return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/admin/:path*",
    "/mover/:path*",
    "/api/quotes/:path*",
    "/api/admin/:path*",
    "/api/movers/:path*",
  ],
};
