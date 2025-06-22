import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/context/ModalContext"; // Your single, generic ModalProvider
import Modal from "@/components/Modal"; // Your single, generic Modal component
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* Only one ModalProvider */}
      <ModalProvider> 
        <Layout>
          <Component {...pageProps} />
          <Modal /> {/* Render your single Modal component here */}
          <Toaster position="top-right" />
        </Layout>
      </ModalProvider>
    </SessionProvider>
  );
}