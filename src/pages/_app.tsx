import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { CustomModal } from "@/components/CustomModal";
import { ShadModalProvider } from "@/context/ModalContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ShadModalProvider>
        <Layout>
          <Component {...pageProps} />
          <CustomModal open={false} children={undefined} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <Toaster position="top-right" />
        </Layout>
      </ShadModalProvider>
    </SessionProvider>
  );
}
