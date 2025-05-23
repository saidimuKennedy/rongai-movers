"use client";
import Link from "next/link";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop - show in mobile view only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 p-4 shadow-lg
          z-50 md:relative md:z-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="font-semibold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <span className="block p-2 rounded hover:bg-gray-700 cursor-pointer">
                🏠 Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/reports">
              <span className="block p-2 rounded hover:bg-gray-700 cursor-pointer">
                📄 Reports
              </span>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <span className="block p-2 rounded hover:bg-gray-700 cursor-pointer">
                ⚙️ Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}