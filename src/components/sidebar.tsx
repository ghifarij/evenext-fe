"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineEditCalendar } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { TbUserEdit } from "react-icons/tb";
import { HiOutlineKey } from "react-icons/hi";
import Divider from "./divider";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className={`h-full w-[280px] p-[60px] bg-black text-white transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative fixed top-0 left-0`}
    >
      {/* Branding */}
      <div className="flex flex-col font-extrabold text-2xl mb-10">
        <TypeAnimation
          sequence={["▲ EVENEXT", 3000, "▲ PROMOTOR", 3000]}
          wrapper="span"
          cursor={false}
          repeat={Infinity}
          style={{ fontSize: "1rem", display: "inline-block" }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-5">
        {/* Dashboard */}
        <div className="flex items-center gap-2">
          <GrHomeRounded />
          <Link href="/" className="font-bold text-sm hover:text-teal-800">
            Dashboard
          </Link>
        </div>
        <Divider />

        {/* Event Management */}
        <div className="flex flex-col gap-5 mt-5">
          <div className="text-sm text-gray-400">Management Event:</div>
          <div className="relative">
            <div className="flex gap-2 items-center">
              <MdOutlineEditCalendar />
              <button
                onClick={toggleDropdown}
                className="font-bold text-sm hover:text-teal-800 focus:outline-none"
              >
                Event Saya
              </button>
            </div>
            {isDropdownOpen && (
              <div className="relative bg-white text-black mt-2 w-48 rounded shadow-lg z-10">
                <Link
                  href="/"
                  className="text-sm block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Semua Event
                </Link>
                <Link
                  href="/"
                  className="text-sm block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Event Online
                </Link>
                <Link
                  href="/"
                  className="text-sm block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Event Offline
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <LuTicket />
            <Link href="/" className="font-bold text-sm hover:text-teal-800">
              Penjualan Tiket
            </Link>
          </div>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-5 mt-5">
          <div className="text-sm text-gray-400">Akun:</div>
          <div className="flex items-center gap-2">
            <TbUserEdit />
            <Link href="/" className="font-bold text-sm hover:text-teal-800">
              Informasi Dasar
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineKey />
            <Link href="/" className="font-bold text-sm hover:text-teal-800">
              Kata Sandi
            </Link>
          </div>
        </div>
        <Divider />

        {/* Logout */}
        <div className="flex items-center gap-2 mt-5">
          <BiLogOut />
          <Link href="/" className="font-bold text-sm hover:text-teal-800">
            Keluar
          </Link>
        </div>
      </nav>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white bg-transparent p-2 md:hidden"
        onClick={toggleSidebar}
      >
        ×
      </button>
    </div>
  );
}
