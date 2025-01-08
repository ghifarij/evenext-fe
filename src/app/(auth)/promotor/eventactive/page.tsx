"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "@/libs/event"; // Import API atau fungsi untuk mengambil data event
import { IEvent } from "@/types/event"; // Tipe data event
import Image from "next/image"; // Untuk gambar thumbnail event
import Link from "next/link"; // Untuk navigasi ke detail event
import { IoChevronBackCircleOutline } from "react-icons/io5";
import authGuard from "@/hoc/authGuard";
import promotorGuard from "@/hoc/promotorGuard";

function EventActive() {
  const [events, setEvents] = useState<IEvent[]>([]); // State untuk menyimpan data event
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  // Fungsi untuk mengambil data event
  const fetchEvents = async () => {
    try {
      setLoading(true); // Set loading true saat memulai fetch
      const eventsData = await getAllEvents(1); // Mengambil data event dari API (pastikan fungsi getAllEvents sudah tersedia)
      const activeEvents = eventsData.events.filter(
        (event: IEvent) => event.status === "active"
      ); // Filter event yang statusnya aktif
      setEvents(activeEvents || []); // Menyimpan data event yang aktif ke dalam state
    } catch (error) {
      console.error("Error fetching events:", error); // Menangani error jika terjadi
    } finally {
      setLoading(false); // Set loading false setelah selesai fetch
    }
  };

  useEffect(() => {
    fetchEvents(); // Panggil fetchEvents saat komponen dimuat
  }, []); // Hanya sekali dijalankan ketika komponen dimuat

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-[1200px] p-4 mt-10">
      <Link href={"/promotor/dashboard"}>
        <div className="text-lg md:text-xl hover:text-teal-400 flex items-center">
          <IoChevronBackCircleOutline className="mr-2" /> Kembali ke Dashboard
        </div>
      </Link>
      <h2 className="text-xl font-bold mb-4">Event Aktif</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-xl shadow-md h-full"
          >
            {/* Gambar Event */}
            <Link
              href={`/event/${item.slug}`}
              className="relative w-full h-[150px]"
            >
              <Image
                src={item.thumbnail}
                alt={item.title || `Event ${idx + 1}`}
                layout="fill"
                className="rounded-t-xl object-cover"
              />

              <div className="text-white text-sm bg-green-500 rounded-tl-xl rounded-br-xl bg-opacity-40 backdrop-blur-lg absolute z-20 px-2 py-1 top-0 left-0">
                {item.status.toUpperCase()}
              </div>
            </Link>

            {/* Konten Event */}
            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="text-gray-600 text-sm mt-2">
                {item.date.split("T00:00:00.000Z")}
              </div>
              <div className="text-gray-600 text-sm">{item.location}</div>
            </div>

            {/* Tombol View Details */}
            <Link
              href={`/event/${item.slug}`}
              className="text-teal-500 text-sm px-4 py-2 bg-teal-100 text-center rounded-b-xl"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default authGuard(EventActive) && promotorGuard(EventActive);
