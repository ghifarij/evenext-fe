"use client";

import { getEvents } from "@/libs/event";
import { IEvent } from "@/types/event";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Swiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setData(events);
    };

    fetchEvents();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="flex items-center mx-auto max-w-[1200px] p-4">
      <div className="carousel w-full rounded-xl">
        {data.map((item, idx) => (
          <div
            key={idx}
            id={`slide${idx + 1}`}
            className={`carousel-item relative w-full ${
              idx === currentIndex ? "block" : "hidden"
            }`}
          >
            <div className="relative w-full h-[180px] md:h-[360px]">
              <Image
                src={item.thumbnail}
                alt={item.title || `Slide ${idx + 1}`}
                layout="fill"
                className="rounded-xl object-contain md:object-fill"
              />
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button onClick={handlePrev} className="btn btn-circle">
                ❮
              </button>
              <button onClick={handleNext} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
