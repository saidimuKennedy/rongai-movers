import React, { useState } from "react";
import AuthButton from "./AuthButton";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: "",
    address: "",
    date: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.success("Quote requested:" + quoteData);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Quote requested! We'll be in touch.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Toaster /> {/* Toast system */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* main section */}
        <main className="max-w-7xl mx-auto py-6 px-4">{children}</main>

        {/* footer */}
        <Footer services={[]} />

        {/* Modal */}
        <Modal>
          <div className="bg-white dark:bg-[#0A1128] dark:text-white p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Get Your Free Quote</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleQuoteSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500"
                  value={quoteData.name}
                  onChange={(e) =>
                    setQuoteData((v) => ({ ...v, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Address"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={quoteData.address}
                  onChange={(e) =>
                    setQuoteData((v) => ({ ...v, address: e.target.value }))
                  }
                />
              </div>

              <div>
                <input
                  type="date"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={quoteData.date}
                  onChange={(e) =>
                    setQuoteData((v) => ({ ...v, date: e.target.value }))
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E65C1C] text-white rounded hover:bg-[#FF8A50] transition-colors"
                >
                  Submit Quote
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
