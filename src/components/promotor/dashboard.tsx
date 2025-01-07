"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import authGuard from "@/hoc/authGuard";
import ChartIncomeDay from "./chartDay";
import ChartIncomeMonth from "./chartMonth";
import ChartIncomeYear from "./chartYear";

type CardProps = {
  title: string;
  value: string | number;
};

function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [finishEvent, setFinishEvent] = useState<number | null>(null);
  const [totalTransaction, setTotalTransaction] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetched token:", token);
        if (!token) {
          console.log("Login required!");
          return;
        }

        const [activeEventRes, finishEventRes, totalTransactionRes] =
          await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/eventactive`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/eventfinish`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/totaltransaction`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

        if (!activeEventRes.ok || !finishEventRes.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const activeEventData = await activeEventRes.json();
        const finishEventData = await finishEventRes.json();
        const totalTransactionData = await totalTransactionRes.json();

        setActiveEvent(activeEventData.activeEvent || 0);
        setFinishEvent(finishEventData.deactiveEvent || 0);
        setTotalTransaction(totalTransactionData.totalTransaction || 0);
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
    <div className="flex w-screen min-h-screen">
      {/* Sidebar */}
      <div
        className={`top-0 left-0 z-40 h-screen transform bg-black transition-transform duration-300 ${
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
            <Card
              title="Event Aktif"
              value={activeEvent !== null ? activeEvent : "Loading..."}
            />
            <Card
              title="Event Selesai"
              value={finishEvent !== null ? finishEvent : "Loading..."}
            />
            <Card title="Jumlah Booking" value="0" />
            <Card
              title="Total Transaksi"
              value={
                totalTransaction !== null ? totalTransaction : "Loading..."
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px] bg-gray-100 overflow-x-scroll">
              <ChartIncomeDay />
            </div>
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px] bg-gray-100 overflow-x-scroll">
              <ChartIncomeMonth />
            </div>
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px] bg-gray-100 overflow-x-scroll">
              <ChartIncomeYear />
            </div>
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

export default authGuard(DashboardPage);
