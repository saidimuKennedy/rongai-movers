/**
 * @file Navigation Bar Component
 * @module components/navbar/nav-bar
 * @description This React component implements the main navigation bar for the application.
 *              It features a dynamic background based on scroll position, a responsive design
 *              with distinct layouts for desktop and mobile, and integrates authentication status
 *              to display either a user dropdown or a sign-in option. It includes navigation links,
 *              a quote request button, and a mobile menu toggle.
 */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import NavLinks from "./nav-links";
import MobileMenu from "./mobile-menu";
import UserDropdown from "./drop-down";
import SignInForm from "../forms/SignInForm";
import QuoteButton from "./quote-button";
import { useShadModal } from "@/context/ModalContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  const { openModal } = useShadModal();
  
  const handleSignInClick = () => {
    openModal("Sign In", <SignInForm />);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-700 ease-out ${
        isScrolled
          ? "bg-white/98 backdrop-blur-2xl shadow-2xl border-b border-orange-100/50"
          : "bg-gradient-to-r from-white/95 via-orange-50/30 to-white/95 backdrop-blur-lg"
      }`}
    >
      {/* Enhanced top accent with animation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65C1C] via-[#FF8A50] to-[#E65C1C] opacity-90">
        <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 px-6 sm:px-8 lg:px-12">
          {/* Enhanced Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-4 group transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E65C1C] to-[#FF8A50] rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-white to-orange-50 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-orange-100">
                <Image
                  src="/images/rongai-movers.png"
                  width={200}
                  height={200}
                  alt="Rongai Movers"
                  className="w-12 h-12 relative z-10"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#E65C1C] to-[#FF8A50] bg-clip-text text-transparent">
                Rongai Movers
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Premium Moving Services
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded px-6 py-2 shadow-lg border border-orange-100/50">
            <NavLinks />
          </nav>

          {/* Enhanced Action Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <QuoteButton className="bg-[#E65C1C] text-white px-6 py-2.5 rounded text-sm font-semibold shadow-lg hover:bg-[#FF8A50] transition-all duration-300 group"/>
            {status === "loading" ? (
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-2 h-2 bg-[#E65C1C] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#FF8A50] rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
            ) : session ? (
              <UserDropdown
                role={session.user.role}
                name={session.user.name || undefined}
              />
            ) : (
              <div className="flex items-center space-x-3">
                <button className="relative group text-sm font-semibold text-gray-700 hover:text-[#E65C1C] px-4 py-2.5 rounded border border-gray-200 hover:border-orange-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-lg" onClick={handleSignInClick}>
                  <span className="relative z-10">Sign in</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden relative group p-3 rounded-full bg-gradient-to-r from-white/90 to-orange-50/90 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E65C1C]/10 to-[#FF8A50]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#E65C1C] transform transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 text-[#E65C1C] transform transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
