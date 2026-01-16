/**
 * @file Authentication Error Page Component
 * @module pages/errorPage
 * @description This React component renders a dedicated page for displaying
 *              authentication-related errors. It can display a custom error message
 *              passed via URL query parameters and provides a button to navigate
 *              the user back to the home page.
 */
import { useRouter } from "next/router";

/**
 * Renders a generic error page, primarily for authentication failures.
 *
 * This component retrieves an `error` message from the URL query parameters
 * and displays it to the user. If no specific error message is provided,
 * a default message is shown. A "Return Home" button allows the user to
 * navigate back to the application's root.
 *
 * @returns {JSX.Element} The authentication error page UI.
 */
export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-4">
          {error || "An error occurred during authentication"}
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
