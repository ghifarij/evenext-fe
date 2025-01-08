"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import authGuard from "@/hoc/authGuard";
import { formatPrice } from "@/helpers/formatPrice";
import ChartIncome from "./chartAll";
import promotorGuard from "@/hoc/promotorGuard";

type CardProps = {
  title: string;
  value: string | number;
};

type DashboardData = {
  activeEvent: number;
  finishEvent: number;
  totalTransaction: number;
};

const fetchDashboardData = async (token: string): Promise<DashboardData> => {
  try {
    const [activeEventRes, finishEventRes, totalTransactionRes] =
      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/eventactive`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/eventfinish`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
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

    return {
      activeEvent: activeEventData.activeEvent || 0,
      finishEvent: finishEventData.finishEvent || 0,
      totalTransaction: totalTransactionData.totalTransaction || 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Login required!");
      return;
    }

    fetchDashboardData(token)
      .then(setDashboardData)
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const renderCard = (title: string, value: string | number) => (
    <Card title={title} value={value} />
  );

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen transform bg-black transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
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
        <header className="flex items-center justify-between bg-white p-4 shadow-sm">
          <button
            className="text-teal-800 font-extrabold md:hidden"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col p-4 gap-4 md:p-6 lg:p-8">
          <div className="flex justify-end">
            <Link
              href="/event/create"
              className="flex flex-row w-full sm:w-[120px] h-[40px] rounded-full bg-teal-800 hover:bg-teal-700 items-center justify-center text-white space-x-1 px-2"
            >
              <div className="text-[25px]">
                <CiCirclePlus />
              </div>
              <div className="text-xs font-bold">Buat Event</div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderCard(
              "Event Aktif",
              dashboardData?.activeEvent ?? "Loading..."
            )}
            {renderCard(
              "Event Selesai",
              dashboardData?.finishEvent ?? "Loading..."
            )}
            {renderCard("Jumlah Booking", 0)}
            {renderCard(
              "Total Transaksi",
              dashboardData?.totalTransaction
                ? formatPrice(dashboardData.totalTransaction)
                : "Loading..."
            )}
          </div>

          <div>
            <ChartIncome />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value }: CardProps) {
  return (
    <div className="flex flex-col shadow-md rounded-lg w-full h-[100px] bg-white">
      <div className="flex rounded-t-lg w-full h-1/2 bg-teal-800">
        <h1 className="font-semibold text-sm text-white p-2">{title}</h1>
      </div>
      <p className="flex font-semibold text-black text-sm p-2">{value}</p>
    </div>
  );
}

export default authGuard(DashboardPage) && promotorGuard(DashboardPage);
