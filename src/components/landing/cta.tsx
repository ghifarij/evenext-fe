"use client";

import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

export default function CallAction() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">Evenext Promotor</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          Gabung bersama kami dan buat event kamu sekarang.
        </p>
        <a
          href="/promotor/register"
          className="flex-none rounded-full bg-black px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Register Sekarang <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
