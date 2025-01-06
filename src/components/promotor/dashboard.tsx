"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";

type CardProps = {
  title: string;
  value: string | number;
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetched token:", token);
        if (!token) {
          console.log("Login required!");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/eventactive`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setActiveEvent(data.activeEvent || 0);
      } catch (error) {
        console.error("Error fetching event active:", error);
      }
    };

    fetchEvent();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full overflow-hidden text-black">
      {/* Sidebar */}
      <div
        className={`top-0 left-0 z-40 h-full transform bg-black transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? "md:ml-[280px]" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-5 shadow-sm">
          <button
            className="text-teal-800 font-extrabold md:hidden"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold md:px-[20px]">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col p-4 md:p-10 gap-10">
          <div className="flex justify-end">
            <Link
              href="/event/create"
              className="flex flex-row w-[120px] h-[40px] rounded-full bg-teal-800 hover:bg-teal-700 items-center justify-center text-white space-x-1"
            >
              <div className="text-[25px]">
                <CiCirclePlus />
              </div>
              <div className="text-xs font-bold">Buat Event</div>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Saldo Saya" value="Rp. 0" />
            <Card
              title="Event Active"
              value={activeEvent !== null ? activeEvent : "Loading..."}
            />
            <Card title="Jumlah Booking" value="0" />
            <Card title="Total Transaksi" value="Rp. 0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px] bg-gray-100"></div>
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px] bg-gray-100"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value }: CardProps) {
  return (
    <div className="flex flex-col shadow-md rounded-lg w-full h-[100px]">
      <div className="flex rounded-t-lg w-full h-1/2 bg-teal-800">
        <h1 className="font-semibold text-sm text-white p-3">{title}</h1>
      </div>
      <p className="flex font-semibold text-black text-sm p-3">{value}</p>
    </div>
  );
}
