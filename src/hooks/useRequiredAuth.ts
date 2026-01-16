/**
 * @file Custom React Hook for Client-Side Authentication and Authorization
 * @module hooks/useRequiredAuth
 * @description This custom hook provides client-side authentication and role-based authorization
 *              for React components using `next-auth`. It checks the user's session status
 *              and role, redirecting them to appropriate pages if they are unauthenticated
 *              or do not possess the required role.
 *              This hook does not handle server-side authentication or render UI elements.
 */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Role } from "@prisma/client"; // Import the Role enum

/**
 * A React hook that enforces authentication and role-based authorization for client-side pages.
 *
 * This hook checks the current user's session status and role using `next-auth`.
 * - If the session is loading, it does nothing.
 * - If the user is not authenticated, it redirects them to the sign-in page (`/auth/signin`).
 * - If the user is authenticated but does not have the `requiredRole`, it redirects them
 *   to an unauthorized page (`/unauthorized`).
 *
 * @param {Role} requiredRole - The minimum role required to access the page or component.
 * @returns {import("next-auth").Session | null | undefined} The user session object if authenticated
 *   and authorized, otherwise null or undefined after redirection.
 */
export default function useRequireAuth(requiredRole: Role) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading

    if (!session) {
      // If not authenticated, redirect to sign-in page
      router.push("/auth/signin");
    } else if (session.user.role !== requiredRole) {
      // If authenticated but wrong role, redirect to unauthorized page
      router.push("/unauthorized"); // Assuming you have an unauthorized page
    }
  }, [session, status, requiredRole, router]);

  return session; // Return the session object
}
