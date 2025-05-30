import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/context/ModalContext";
import { AuthModalProvider } from "@/context/AuthModalContext"; // Import AuthModalProvider
import SignInModal from "@/components/auth/SignInModal"; // Import SignInModal
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <SessionProvider session={session}>
      <AuthModalProvider>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
            <SignInModal
              />
            <Toaster position="top-right" />
          </Layout>
        </ModalProvider>
      </AuthModalProvider>
    </SessionProvider>
  );
}

