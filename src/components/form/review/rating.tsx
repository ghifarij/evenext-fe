"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa6";

interface IProps {
  setFieldValue: (a: string, b: number) => void;
  values: number;
}

export default function Rating({ setFieldValue, values }: IProps) {
  const [rate, setRate] = useState<number>(0);
  const handleClick = (e: number) => {
    setRate(e);
    setFieldValue("rating", rate);
  };
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => {
        const pointRate = idx + 1;
        return (
          <label key={idx}>
            <input
              type="radio"
              name="rating"
              value={values}
              onClick={() => handleClick(pointRate)}
              className="hidden"
            />
            <FaStar
              className={`text-3xl cursor-pointer ${
                pointRate <= values ? "text-yellow-300" : "text-slate-400"
              }`}
            />
          </label>
        );
      })}
    </>
  );
}
