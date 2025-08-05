import { motion } from "framer-motion";
import { useShadModal } from "@/context/ModalContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import QuoteForm from "../forms/QuoteForm";
import SignInForm from "../forms/SignInForm";

export default function QuoteButton({
  onClick,
  className = "",
  children = "Get Free Quote",
  motionProps = {}, // New prop to pass motion config
}: {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  motionProps?: React.ComponentProps<typeof motion.button>;
}) {
  const { openModal } = useShadModal();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleQuoteClick = () => {
    onClick?.();
    if (status === "loading") return;

    if (!session) {
      toast.error("Please sign in to get a quote");
      openModal(
        "Log in to get your Quote",
        <SignInForm
          message="You need to be signed in to request a quote."
          callbackUrl={router.asPath}
          onSuccess={() => {
            toast.success("Signed in! Now you can request a quote.");
            openModal("Get Your Free Quote", <QuoteForm />);
          }}
        />
      );
      return;
    }

    openModal("Get Your Free Quote", <QuoteForm />);
  };

  return (
    <motion.button
      onClick={handleQuoteClick}
      className={className}
      {...motionProps} // Spread motion props
    >
      {children}
    </motion.button>
  );
}
