import { GetServerSideProps } from "next";
import { getProviders } from "next-auth/react";
import SignInButton from "@/components/auth/SignInButton";

export default function SignIn({ callbackUrl }: { callbackUrl: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            To continue to Rongai Errands & Movers
          </p>
        </div>
        <div className="mt-8">
          <SignInButton callbackUrl={callbackUrl} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
      callbackUrl: context.query.callbackUrl || "/",
    },
  };
};