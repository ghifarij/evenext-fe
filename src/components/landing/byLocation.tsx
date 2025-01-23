"use client";

import { IEvent } from "@/types/event";
import Image from "next/image";

import { FaMapMarkerAlt } from "react-icons/fa";
import FilterLocation from "./filterLocation";
import { useEffect, useState } from "react";
import { getEvents } from "@/libs/event";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";

export default function ByLocationEvent() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("Bandung");

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) => event.location === selectedLocation
  );

  return (
    <div className="bg-teal-800 py-6 mt-2">
      <div className="flex mx-auto max-w-[1200px] p-4">
        <div className="flex justify-center p-2 items-center">
          <div className="flex flex-col text-white font-bold">
            <h2 className="text-lg md:text-2xl">Cari Event di Kotamu 🔥</h2>
            <FilterLocation
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </div>
        <div className="carousel carousel-center rounded-box w-full h-[320px] space-x-5 p-4">
          {filteredEvents.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-wrap flex-col carousel-item w-[270px] bg-white rounded-xl shadow-md"
              >
                <Link
                  className="relative w-full h-[120px] md:h-[140px]"
                  href={`/event/${item.slug}`}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title || `Slide ${idx + 1}`}
                    layout="fill"
                    className="rounded-t-xl object-fill"
                  />
                </Link>
                <Link
                  className="p-2 text-lg font-medium line-clamp-1 h-10 mb-2 text-black"
                  href={`/event/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className="text-gray-600 p-1 ml-1 text-sm">
                  {formatDate(item.date)}
                </div>
                <div className="text-gray-600 p-1 ml-1 text-sm">
                  {item.location}
                </div>
                <span className="border-t-2 mt-1 w-[250px] mx-auto"></span>
                <div className="flex gap-1 p-2">
                  <FaMapMarkerAlt className=" text-teal-500" />
                  <span className="text-sm font-bold line-clamp-1">
                    {item.venue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
