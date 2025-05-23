import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import QuoteForm from "./forms/QuoteForm";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteClick = () => {
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-2">
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
        </div>
      </div>
    </header>
  );
}
