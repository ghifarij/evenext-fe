import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function BurgerHandphone() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <button
          className="text-xl transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✖" : <RxHamburgerMenu />}
        </button>
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
              className="flex justify-center items-center text-sm font-medium w-full h-[35px] rounded-md text-center group-[hover]: hover:bg-teal-800 hover:text-white"
            >
              Masuk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
