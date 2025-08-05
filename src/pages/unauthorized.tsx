import { Link, ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

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
