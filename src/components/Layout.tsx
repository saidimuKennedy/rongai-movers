/**
 * @file Application Layout Component
 * @module components/Layout
 * @description This React component defines the main structural layout for the entire application.
 *              It includes a global navigation bar (`Navbar`), a flexible main content area,
 *              and a consistent footer (`Footer`). It also integrates a global toast
 *              notification system (`Toaster`) to provide consistent user feedback.
 *              This layout is designed to be reused across all pages to ensure a uniform UI experience.
 */
import React, { useState } from "react";
import Footer from "./home-page/Footer";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./navbar/nav-bar";

/**
 * Props for the Layout component.
 * @interface LayoutProps
 * @property {React.ReactNode} children - The content (e.g., page components) to be rendered within the main section of the layout.
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * The main layout component for the application.
 *
 * This component provides the fundamental structure for every page, consisting of:
 * - A global `Navbar` at the top for consistent navigation.
 * - A `main` content area that dynamically renders the `children` (page-specific content).
 * - A global `Footer` at the bottom.
 * - Integration of `Toaster` for displaying global notifications.
 *
 * @param {LayoutProps} props - The properties for the component.
 * @returns {JSX.Element} The structural layout wrapping the application content.
 */
export default function Layout({ children }: LayoutProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false); // Note: isQuoteOpen state seems unused in this component's current rendering.

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main section */}
      <main className="flex-grow relative">
        {/* Let each page handle its own container structure */}
        {children}
      </main>

      {/* Footer */}
      <Footer services={[]} />

      {/* Modal */}

      <Toaster position="top-right" />
    </div>
  );
}
