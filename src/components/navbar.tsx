"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const handleSearchClickOutside = (e: React.MouseEvent) => {
    const searchModal = document.getElementById("search-modal");
    if (searchModal && !searchModal.contains(e.target as Node)) {
      setSearchVisible(false);
    }
  };

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById("menu-dropdown");
      if (menu && !menu.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const scrollActive = scroll
    ? "py-4 bg-white shadow text-black"
    : "py-6 bg-white text-black";

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${scrollActive} px-10 md:px-[150px]`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link className="font-extrabold text-xl" href={"/"}>
          EVENEXT
        </Link>

        {/* Search Input */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="search"
            placeholder="Cari Event ..."
            className="bg-transparent outline-none w-[400px] text-sm"
          />
          <button className="text-teal-800 ml-2">
            <IoSearch size={20} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6">
          <Link href={"/"} className="text-sm font-medium hover:text-teal-800">
            Biaya
          </Link>
          <Link
            href={"/events"}
            className="text-sm font-medium hover:text-teal-800"
          >
            Events
          </Link>
          <Link href={"/"} className="text-sm font-medium hover:text-teal-800">
            Kontak Kami
          </Link>
          <Link
            href={"/promotor/register"}
            className="text-sm font-medium hover:text-teal-800"
          >
            Buat Event
          </Link>
          <Link
            href={"/user/login"}
            className="flex-none items-center rounded-full bg-black px-3 h-[20px] text-lg font-medium text-white shadow-sm hover:bg-teal-800"
          >
            <BiLogInCircle />
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-10">
          <button
            onClick={() => setSearchVisible(true)}
            className="text-teal-800 ml-2"
          >
            <IoSearch size={20} />
          </button>
          <button
            className="text-xl transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? "✖" : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="menu-dropdown"
          className="flex flex-col lg:hidden items-center rounded-md mt-4 p-4 space-y-4"
        >
          <Link
            href={"/"}
            className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center hover:bg-gray-200"
          >
            Biaya
          </Link>
          <Link
            href={"/"}
            className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center hover:bg-gray-200"
          >
            Events
          </Link>
          <Link
            href={"/"}
            className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center hover:bg-gray-200"
          >
            Kontak Kami
          </Link>
          <Link
            href={"/promotor/register"}
            className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center hover:bg-gray-200"
          >
            Buat Event
          </Link>
          <Link
            href={"/user/login"}
            className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center hover:bg-gray-200"
          >
            Masuk
          </Link>
        </div>
      )}

      {/* Search Modal */}
      {searchVisible && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start pt-4"
          onClick={handleSearchClickOutside} // Nutup jika klik di luar
        >
          <div
            id="search-modal"
            className="bg-white p-4 rounded-2xl w-full max-w-lg mx-2"
            onClick={(e) => e.stopPropagation()} // biar modal ganutup jika klik di dalam
          >
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Event ..."
                className="bg-transparent outline-none px-4 py-2 text-sm w-full"
              />
              <button
                className="bg-red rounded-full px-4 py-1 text-white text-sm"
                onClick={() => setSearchVisible(false)}
              >
                <IoSearch />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
