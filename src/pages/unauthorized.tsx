/**
 * @file Unauthorized Access Page Component
 * @module pages/unauthorized
 * @description This React component displays a page informing the user that
 *              they do not have the necessary permissions to access a requested resource.
 *              It provides a clear message about the access denial and, if the user is
 *              authenticated, displays their current role. A prominent button allows
 *              the user to return to their dashboard.
 */
import { Link, ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

/**
 * Renders the Unauthorized access page.
 *
 * This component is displayed when a user attempts to navigate to a page
 * for which they do not have the required role or permissions.
 * It fetches the user's session to potentially display their current role
 * and offers a clear navigation option back to the dashboard.
 *
 * @returns {JSX.Element} The unauthorized access page UI.
 */
export default function Unauthorized() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <div className="mb-6">
            <div className="p-4 bg-yellow-50 rounded">
              <p className="text-yellow-800">
                You don't have permission to access this page.
                {session?.user?.role && (
                  <span className="block mt-2">
                    Your current role is: <strong>{session.user.role}</strong>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
