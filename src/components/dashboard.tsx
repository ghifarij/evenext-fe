"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";

type CardProps = {
  title: String;
  value: String;
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <div className="flex flex-1 justify-end">BreadCrumbs</div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Saldo Saya" value="Rp. 0" />
            <Card title="Event Saya" value="0" />
            <Card title="Jumlah Booking" value="0" />
            <Card title="Total Transaksi" value="Rp. 0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px]"></div>
            <div className="shadow-md rounded-lg w-full h-[300px] md:h-[400px]"></div>
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
      <p className="flex font-semibold text-sm p-3">{value}</p>
    </div>
  );
}
