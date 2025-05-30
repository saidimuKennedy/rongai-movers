import { GetServerSideProps } from "next";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react"; // Import signIn
import { BuiltInProviderType } from "next-auth/providers/index";
import { useState } from "react"; // Import useState for form handling
import Link from "next/link";

interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  callbackUrl: string;
}

export default function SignIn({ providers, callbackUrl }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    const res = await signIn("credentials", {
      redirect: false, // Prevent default redirect
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.url) {
      // Redirect to the callbackUrl on success
      window.location.href = res.url;
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>

        {/* Display error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Render buttons for other providers (e.g., Google) */}
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.id === "credentials") return null;

              return (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl })}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E65C1C] hover:bg-[#FF8A50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E65C1C]"
                >
                  Sign in with {provider.name}
                </button>
              );
            })}

          {/* Credentials (Email and Password) Login Form */}
          <form onSubmit={handleCredentialSignIn} className="mt-8 space-y-6">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#E65C1C] focus:border-[#E65C1C] focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#E65C1C] focus:border-[#E65C1C] focus:z-10 sm:text-sm"
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            <Link
              href="/auth/signup"
              className="font-medium text-[#E65C1C] hover:text-[#FF8A50]"
            >
              Don't have an account?{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers: providers || [], // Ensure providers is not null
      callbackUrl: (context.query.callbackUrl as string) || "/",
    },
  };
};
