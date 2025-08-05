import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link"; 
import { signOut } from "next-auth/react";
import { Role } from "@prisma/client";
import { useState, useRef, useEffect } from "react";

interface UserDropDownProps {
  role?: string;
  name?: string;
}

export default function UserDropDown({ role = "CLIENT", name = "User" }: UserDropDownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rolePaths = {
    [Role.ADMIN]: "/admin/dashboard",
    [Role.MOVER]: "/mover/dashboard",
    [Role.CLIENT]: "/dashboard",
  };

  const getRoleLabel = (userRole: string) => {
    switch (userRole) {
      case Role.ADMIN:
        return "Admin Dashboard";
      case Role.MOVER:
        return "Mover Dashboard";
      default:
        return "My Dashboard";
    }
  };

  const handleLinkClick = () => {
    setOpen(false); // Close dropdown when link is clicked
  };

  const handleSignOut = () => {
    setOpen(false); // Close dropdown before signing out
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-[#E65C1C] transition-colors duration-200 px-3 py-2 rounded"
      >
        <span>{name.split(" ")[0]}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`} 
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 py-1">
          <Link
            href={rolePaths[role as keyof typeof rolePaths]}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            onClick={handleLinkClick}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {getRoleLabel(role)}
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}