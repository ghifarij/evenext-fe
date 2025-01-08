"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface FilterBarProps {
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

export default function FilterBar({
  onCategoryChange,
  onLocationChange,
}: FilterBarProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] =
    useState<boolean>(false);
  const [locationDropdownOpen, setLocationDropdownOpen] =
    useState<boolean>(false);

  const toggleCategoryDropdown = () =>
    setCategoryDropdownOpen(!categoryDropdownOpen);
  const toggleLocationDropdown = () =>
    setLocationDropdownOpen(!locationDropdownOpen);
  return (
    <div className="hidden md:flex flex-col flex-none w-[300px] p-2">
      <h2 className="text-3xl font-bold mb-6">Filter</h2>
      <div className="dropdown dropdown-bottom mt-4">
        <div className="font-semibold mb-4">Kategori Event</div>
        <div
          tabIndex={0}
          role="button"
          className="flex justify-between mr-6"
          onClick={toggleCategoryDropdown}
        >
          <div>Semua</div>
          <IoMdArrowDropdown className="text-xl" />
        </div>
        {categoryDropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] w-64 p-2 shadow"
          >
            <li>
              <div onClick={() => onCategoryChange("Konser")}>Konser</div>
            </li>
            <li>
              <div onClick={() => onCategoryChange("Seminar")}>Seminar</div>
            </li>
            <li>
              <div onClick={() => onCategoryChange("Olahraga")}>Olahraga</div>
            </li>
            <li>
              <div onClick={() => onCategoryChange("Expo")}>Expo</div>
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
          onClick={toggleLocationDropdown}
        >
          <div>Semua</div>
          <IoMdArrowDropdown className="text-xl" />
        </div>
        {locationDropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] w-64 p-2 shadow"
          >
            <li>
              <div onClick={() => onLocationChange("Bandung")}>Bandung</div>
            </li>
            <li>
              <div onClick={() => onLocationChange("Jakarta")}>Jakarta</div>
            </li>
            <li>
              <div onClick={() => onLocationChange("Surabaya")}>Surabaya</div>
            </li>
            <li>
              <div onClick={() => onLocationChange("Bali")}>Bali</div>
            </li>
          </ul>
        )}
        <div className="border-b-[1px] w-64 mt-1"></div>
      </div>
    </div>
  );
}
