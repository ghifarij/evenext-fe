"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineEditCalendar } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { TbUserEdit } from "react-icons/tb";
import { HiOutlineKey } from "react-icons/hi";
import Divider from "./divider";
import { useSession } from "@/hooks/useSession";
import { useRouter, usePathname } from "next/navigation";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { promotor, checkSession } = useSession();
  const [loading, setLoading] = useState(true);

  const { logout } = useSession();
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      window.location.assign("/promotor/login");
    }, 1000);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (err) {
        console.log("Failed to fetch promotor session", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checkSession]);
  return (
    <div
      className={`min-h-screen w-[280px] p-[60px] bg-black text-white transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative fixed top-0 left-0`}
    >
      {/* Branding */}
      <div className="flex flex-col font-extrabold text-2xl mb-5">
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
        <div className="flex flex-col space-y-3 items-center justify-center">
          <img
            src={promotor?.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-teal-700"
          />
          <div className="flex flex-col space-y-3 items-center justify-center">
            <h1 className="text-xs text-white md:block font-semibold">
              {promotor?.username}
            </h1>
            <h1 className="text-xs text-white md:block">{promotor?.email}</h1>
          </div>
        </div>
        {/* Dashboard */}
        <div className="flex items-center gap-2">
          <GrHomeRounded />
          <Link href="/promotor/dashboard" className="font-bold text-sm hover:text-teal-400">
            Dashboard
          </Link>
        </div>
        <Divider />

        {/* Event Management */}
        <div className="flex flex-col gap-5">
          <div className="text-sm text-gray-400">Management Event :</div>
          <div className="relative">
            <div className="flex gap-2 items-center">
              <MdOutlineEditCalendar />
              <button
                onClick={toggleDropdown}
                className="font-bold text-sm hover:text-teal-400 focus:outline-none"
              >
                Event Saya
              </button>
            </div>
            {isDropdownOpen && (
              <div className="relative bg-white text-black mt-2 w-30 rounded shadow-lg z-10">
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
            <Link href="/" className="font-bold text-sm hover:text-teal-400">
              Penjualan Tiket
            </Link>
          </div>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-5">
          <div className="text-sm text-gray-400">Akun :</div>
          <div className="flex items-center gap-2">
            <TbUserEdit />
            <Link href="/promotor/profile" className="font-bold text-sm hover:text-teal-400">
              Informasi Dasar
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineKey />
            <Link href="/promotor/forgotPassword" className="font-bold text-sm hover:text-teal-400" target="_blank">
              Kata Sandi
            </Link>
          </div>
        </div>
        <Divider />

        {/* Logout */}
        <div className="flex items-center gap-2">
          <BiLogOut />
          <Link
            href="/promotor/login"
            className="font-bold text-sm hover:text-teal-400"
            onClick={handleLogout}
          >
            Keluar
          </Link>
        </div>
      </nav>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white text-3xl bg-transparent p-2 md:hidden"
        onClick={toggleSidebar}
      >
        ×
      </button>
    </div>
  );
}
