"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function FilterBar() {
  const [dropdownOpen, setDropdownOpen] = useState<Boolean>(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="hidden md:flex flex-col flex-none w-[300px] p-2">
      <h2 className="text-3xl font-bold mb-6">Filter</h2>
      <div className="dropdown dropdown-bottom mt-4">
        <div className="font-semibold mb-4">Kategori Event</div>
        <div
          tabIndex={0}
          role="button"
          className="flex justify-between mr-6"
          onClick={toggleDropdown}
        >
          <div>Semua</div>
          <IoMdArrowDropdown className="text-xl" />
        </div>
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] w-64 p-2 shadow"
          >
            <li>
              <div>Konser</div>
            </li>
            <li>
              <div>Seminar</div>
            </li>
            <li>
              <div>Olahraga</div>
            </li>
            <li>
              <div>Expo</div>
            </li>
          </ul>
        )}
        <div className="border-b-[1px] w-64 mt-1"></div>
      </div>
      <div className="dropdown dropdown-bottom mt-4">
        <div className="font-semibold mb-4">Lokasi</div>
        <div
          tabIndex={0}
          role="button"
          className="flex justify-between mr-6"
          onClick={toggleDropdown}
        >
          <div>Semua</div>
          <IoMdArrowDropdown className="text-xl" />
        </div>
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] w-64 p-2 shadow"
          >
            <li>
              <div>Bandung</div>
            </li>
            <li>
              <div>Jakarta</div>
            </li>
            <li>
              <div>Surabaya</div>
            </li>
            <li>
              <div>Bali</div>
            </li>
          </ul>
        )}
        <div className="border-b-[1px] w-64 mt-1"></div>
      </div>
    </div>
  );
}
