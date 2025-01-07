"use client";

import { FaStar } from "react-icons/fa6";

export default function Star({ rate }: { rate: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => {
        const pointRate = idx + 1;
        return (
          <FaStar
            key={idx}
            className={`text-2xl ${
              pointRate <= rate ? "text-yellow-300" : "text-slate-400"
            }`}
          />
        );
      })}
    </>
  );
}
