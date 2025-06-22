
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

interface SignInFormProps {
  message?: string | null;
  callbackUrl?: string | null;
  onSuccess?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  message,
  callbackUrl = "/",
  onSuccess,
}) => {
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: callbackUrl ?? undefined,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.url) {
      onSuccess?.(); // Trigger success action
      closeModal(); // Close the modal on success
      window.location.href = res.url;
    }
    setLoading(false);
  };

  const handleOAuthSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: callbackUrl ?? undefined });
  };

  return (
    <div className="space-y-4">
      {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
      {error && (
        <div
          className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="mt-6 space-y-4">
        <button
          onClick={() => handleOAuthSignIn("google")}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E65C1C] hover:bg-[#FF8A50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E65C1C]"
        >
          Sign in with Google
        </button>

        <form onSubmit={handleCredentialSignIn} className="space-y-4">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E65C1C] focus:border-[#E65C1C] focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E65C1C] focus:border-[#E65C1C] focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {loading ? "Signing in..." : "Sign in with Email"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-[#E65C1C] hover:text-[#FF8A50]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
