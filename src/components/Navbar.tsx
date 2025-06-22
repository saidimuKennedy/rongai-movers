// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Phone } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import QuoteForm from "./forms/QuoteForm";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm"; // You removed this button from the UI, but keep the import if SignUpForm is still used elsewhere (e.g., in SignInForm's link)
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";
import { Role } from "@prisma/client";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteClick = () => {
    setIsMenuOpen(false);
    if (status === "loading") return;

    if (!session) {
      toast.error("Please sign in to get a quote");
      openModal(
        "Log in to get your Quote",
        <SignInForm
          message="You need to be signed in to request a quote."
          callbackUrl={router.asPath}
          onSuccess={() => {
            toast.success("Successfully signed in! Please submit your quote.");
            openModal("Get Your Free Quote", <QuoteForm />);
          }}
        />
      );
      return;
    }
    openModal("Get Your Free Quote", <QuoteForm />);
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    openModal(
      "Log in to your account",
      <SignInForm
        onSuccess={() => toast.success("Welcome back!")}
        callbackUrl={router.asPath}
      />
    );
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    openModal(
      "Create your account",
      <SignUpForm // Ensure SignUpForm is correctly passed if you decide to add a button for it later
        onSuccess={() => toast.success("Account created successfully!")}
      />
    );
  };

  const getDashboardLink = () => {
    if (!session?.user?.role) return null;

    let href = "/dashboard";
    let linkText = "My Quotes";

    switch (session.user.role) {
      case Role.ADMIN:
        href = "/admin/dashboard";
        linkText = "Admin Dashboard";
        break;
      case Role.MOVER:
        href = "/mover/dashboard";
        linkText = "Mover Dashboard";
        break;
    }

    return (
      <Link
        href={href}
        // Use whitespace-nowrap here to prevent the link text from wrapping
        className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
        onClick={() => setIsMenuOpen(false)}
      >
        {linkText}
      </Link>
    );
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
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold text-[#E65C1C] whitespace-nowrap">
              {/* Abbreviate on smaller screens, full text on larger */}
              <span className="hidden sm:inline">Rongai Errands & Movers</span>
              <span className="sm:hidden">R. Errands & Movers</span> {/* Abbreviated for small screens */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8"> {/* Adjusted space-x for more flexibility */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-[#E65C1C] transition-colors whitespace-nowrap ${ // Added whitespace-nowrap
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
          {/* Use flex-nowrap to keep items on one line, and adjust space-x */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-nowrap">
            <a
              href="tel:+254723084530"
              className="flex items-center text-gray-700 hover:text-[#E65C1C] whitespace-nowrap text-sm" // Smaller font for phone number
            >
              <Phone className="h-4 w-4 mr-1 flex-shrink-0" /> {/* Prevent icon from shrinking */}
              <span>+254 723 084530</span>
            </a>
            <button
              onClick={handleQuoteClick}
              className="bg-[#E65C1C] text-white px-3 py-1.5 rounded-lg hover:bg-[#FF8A50] transition-colors text-sm whitespace-nowrap" // Smaller padding/font
            >
              Get Quote
            </button>

            {status === "loading" ? (
              <div className="text-gray-700 text-sm whitespace-nowrap">Loading...</div>
            ) : session ? (
              <>
                {getDashboardLink()} {/* Already has whitespace-nowrap */}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-700 hover:text-[#E65C1C] text-sm whitespace-nowrap"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignInClick}
                  className="text-gray-700 hover:text-[#E65C1C] text-sm whitespace-nowrap"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#E65C1C] focus:outline-none flex-shrink-0" // Prevent button from shrinking
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
            className=" py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C] flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Phone className="h-4 w-4 mr-2" />
            +254 723 084530
          </a>
          <button
            onClick={handleQuoteClick}
            className="w-full mt-2 bg-[#E65C1C] text-white px-4 py-2 rounded-lg hover:bg-[#FF8A50] transition-colors" // Full width for mobile button
          >
            Get Quote
          </button>

          {/* Conditional rendering based on session and role for mobile */}
          {status === "loading" ? (
            <div className="block py-2 text-base font-medium text-gray-700">
              Loading...
            </div>
          ) : session ? (
            <>
              {getDashboardLink()}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignInClick}
                className="block py-2 text-base font-medium text-gray-700 hover:text-[#E65C1C]"
              >
                Sign in
              </button>
              {/* You removed the SignUp button here, so it's commented out */}
              {/* <button
                onClick={handleSignUpClick}
                className="w-full mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign up
              </button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}