import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import QuoteForm from "./forms/QuoteForm";
import toast from 'react-hot-toast'
import { useSession,signOut } from "next-auth/react";
import { Role } from "@prisma/client"; // Import the Role enum

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession(); // Get session and status

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteClick = () => {
    if (status === "loading") return; // Do nothing while loading

    if (!session) {
      toast.error("Please sign in to get a quote")
      router.push("/auth/signin");
      setIsMenuOpen(false);
      return;
    }
    openModal("Get Your Free Quote", <QuoteForm />);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "About Us", href: "/#about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold text-[#E65C1C]">
              Rongai Errands & Movers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-[#E65C1C] transition-colors ${
                  router.pathname === link.href
                    ? "text-[#E65C1C]"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons and Auth/Role Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+254723084530"
              className="flex items-center text-gray-700 hover:text-[#E65C1C]"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span>+254 723 084530</span>
            </a>
            <button
              onClick={handleQuoteClick}
              className="bg-[#E65C1C] text-white px-4 py-2 rounded-lg hover:bg-[#FF8A50] transition-colors"
            >
              Get Quote
            </button>

            {/* Conditional rendering based on session and role */}
            {status === "loading" ? (
              <div className="text-gray-700">Loading...</div>
            ) : session ? (
              <>
                {session.user.role === Role.MOVER && (
                  <Link href="/mover/dashboard" className="text-gray-700 hover:text-[#E65C1C]">
                    Mover Dashboard
                  </Link>
                )}
                {session.user.role === Role.ADMIN && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-[#E65C1C]">
                    Admin Dashboard
                  </Link>
                )}
                {/* Add a sign out button if authenticated */}
                 <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-[#E65C1C]"
                  >
                    Sign out
                  </button>
              </>
            ) : (
              <Link href="/auth/signin" className="text-gray-700 hover:text-[#E65C1C]">
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#E65C1C] focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200`}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+254723084530"
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C] flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Phone className="h-4 w-4 mr-2" />
            +254 723 084530
          </a>
          <button
            onClick={handleQuoteClick}
            className="w-full mt-2 bg-[#E65C1C] text-white px-4 py-2 rounded-lg hover:bg-[#FF8A50] transition-colors"
          >
            Get Quote
          </button>

           {/* Conditional rendering based on session and role for mobile */}
           {status === "loading" ? (
              <div className="block py-2 text-base font-medium text-gray-700">Loading...</div>
            ) : session ? (
              <>
                {session.user.role === Role.MOVER && (
                  <Link href="/mover/dashboard" className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]" onClick={() => setIsMenuOpen(false)}>
                    Mover Dashboard
                  </Link>
                )}
                {session.user.role === Role.ADMIN && (
                  <Link href="/admin/dashboard" className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]" onClick={() => setIsMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                 <button
                    onClick={() => signOut()}
                    className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]"
                  >
                    Sign out
                  </button>
              </>
            ) : (
              <Link href="/auth/signin" className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]" onClick={() => setIsMenuOpen(false)}>
                Sign in
              </Link>
            )}
        </div>
      </div>
    </header>
  );
}
