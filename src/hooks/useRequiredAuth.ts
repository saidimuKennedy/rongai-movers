import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Role } from "@prisma/client"; // Import the Role enum

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
