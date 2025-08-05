import React, { useState } from "react";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./navbar/nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

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
