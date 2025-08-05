import Link from "next/link";
import { Phone, PackageOpen } from "lucide-react";
import QuoteButton from "./quote-button";
import UserDropdown from "./drop-down";
import { useSession } from "next-auth/react";
import { useShadModal } from "@/context/ModalContext";
import SignInForm from "../forms/SignInForm";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "About Us", href: "/#about" },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: session, status } = useSession();
  const { openModal } = useShadModal();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white/95 border-t border-gray-100 shadow-lg">
      <div className="px-4 py-4 space-y-2">
        {navLinks.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-[#E65C1C] hover:bg-orange-50 rounded"
          >
            {link.name}
          </Link>
        ))}

        <a
          href="tel:+254723084530"
          onClick={onClose}
          className="flex items-center py-3 px-4 text-base text-gray-700 hover:text-[#E65C1C]"
        >
          <Phone className="w-4 h-4 mr-2 text-green-400" />
          +254 723 084530
        </a>

        <QuoteButton
          onClick={onClose}
          className=
            "mt-3 w-full bg-[#E65C1C] text-white px-6 py-2.5 rounded text-sm font-semibold shadow-lg hover:bg-[#FF8A50] transition-all duration-300 group"
          
        />

        <div className="pt-3 border-t border-gray-100 mt-4">
          {status === "loading" ? (
            <div className="py-3 px-4 text-sm text-gray-700">Loading...</div>
          ) : session ? (
            <UserDropdown
              role={session.user.role}
              name={session.user.name || undefined}
            />
          ) : (
            <button
              onClick={() => openModal("Sign in", <SignInForm />)}
              className="w-full py-3 px-4 text-base font-medium text-gray-700 hover:text-[#E65C1C] border rounded hover:bg-orange-50"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
