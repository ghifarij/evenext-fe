"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "@/hooks/useSession";

export default function Avatar() {
  const { isAuth, user, logout } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout with toast and button disable
  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.success("You have been logged out successfully.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    logout();

    setTimeout(() => {
      window.location.assign("/user/login");
    }, 1000);
  };

  // Navigation helper
  const navigateTo = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  // Render nothing if not authenticated
  if (!isAuth || !user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <ToastContainer />

      {/* Avatar and User Info */}
      <div className="flex space-x-3 items-center">
        <button
          onClick={toggleDropdown}
          className="focus:outline-none"
          aria-expanded={isDropdownOpen}
          aria-controls="dropdown-menu"
        >
          <img
            src={user.avatar || "/default-user-avatar.png"}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border-2 border-teal-700"
          />
        </button>
        <div className="flex flex-col">
          <h1 className="text-xs hidden md:block font-semibold">
            {user.username || "User"}
          </h1>
          <h1 className="text-xs hidden md:block">{user.email}</h1>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          id="dropdown-menu"
          className="absolute right-0 mt-2 w-48 bg-white border border-white rounded-lg shadow-lg backdrop-blur-md z-50"
        >
          <ul className="py-2">
            <li>
              <button
                onClick={() => navigateTo("/profile")}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:text-teal-700"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/")}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:text-teal-700"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/event")}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:text-teal-700"
              >
                Event
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/artist")}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:text-teal-700"
              >
                About Us
              </button>
            </li>
            <hr className="border-1"/>
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                {isLoggingOut ? "Logging Out..." : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
