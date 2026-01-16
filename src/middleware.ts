/**
 * @file Next.js Middleware for Authentication and Authorization
 * @module src/middleware
 * @description This middleware enforces authentication and role-based access control
 *              for specific routes in the application using `next-auth`.
 *              It redirects unauthenticated users to the sign-in page,
 *              and unauthorized users (based on their role) to an unauthorized page.
 *              It also handles redirection from a generic `/dashboard` path to
 *              role-specific dashboards (e.g., `/admin/dashboard`, `/mover/dashboard`).
 *              This file does not contain core application logic or UI components.
 */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

/**
 * Next.js Middleware function for authentication and authorization.
 *
 * This function is wrapped by `withAuth` from `next-auth/middleware` to provide
 * access to session token information (`req.nextauth.token`).
 * It performs the following checks:
 * 1. Redirects unauthenticated users to the sign-in page.
 * 2. Enforces role-based access for `/admin` and `/mover` routes.
 * 3. Redirects users from the generic `/dashboard` route to their
 *    respective role-specific dashboards.
 *
 * @param {import("next/server").NextRequest} req - The incoming request object,
 *   augmented with `nextauth.token` containing user session details.
 * @returns {NextResponse} A Next.js response object, which might be a redirect
 *   or a `NextResponse.next()` to proceed with the request.
 */
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

/**
 * Configuration object for the Next.js Middleware.
 *
 * The `matcher` array specifies the paths for which this middleware will be
 * invoked. This ensures that the authentication and authorization logic
 * only runs on relevant routes, optimizing performance.
 *
 * @property {string[]} matcher - An array of path patterns to match for the middleware execution.
 */
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
