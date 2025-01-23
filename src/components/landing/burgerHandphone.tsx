import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function BurgerHandphone() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Burger Button */}
      <button
        className="text-xl transition-all duration-300 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
        aria-controls="menu-dropdown"
      >
        {isOpen ? "✖" : <RxHamburgerMenu />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="menu-dropdown"
          className="absolute top-full -right-10 w-screen lg:hidden bg-white border border-gray-200 rounded-xl shadow-md mt-2 p-4 z-50 "
        >
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center justify-center">
              <Link
                href="/"
                className="block w-full text-center text-sm font-medium h-9 p-2 rounded-md hover:bg-gray-200"
              >
                Biaya
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                href="/"
                className="block w-full text-center text-sm font-medium h-9 p-2 rounded-md hover:bg-gray-200"
              >
                Events
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                href="/"
                className="block w-full text-center text-sm font-medium h-9 p-2 rounded-md hover:bg-gray-200"
              >
                Kontak Kami
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                href="/promotor/register"
                className="block w-full text-center text-sm font-medium h-9 p-2 rounded-md hover:bg-gray-200"
              >
                Buat Event
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                href="/user/login"
                className="block w-full text-center text-sm font-medium h-9 p-2 rounded-md hover:bg-teal-800 hover:text-white"
              >
                Masuk
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
