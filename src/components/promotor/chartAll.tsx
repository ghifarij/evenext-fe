"use client";

import React, { useEffect, useState, useRef } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import axios from "axios";

type IncomeData = {
  date: string;
  month: string;
  year: string;
  totalIncome: number;
};

type ApiResponse = {
  incomePerDay?: IncomeData[];
  incomePerMonth?: IncomeData[];
  incomePerYear?: IncomeData[];
};

export default function ChartIncome() {
  const [uData, setUData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"day" | "month" | "year">("day");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        let endpoint = "";
        switch (activeView) {
          case "day":
            endpoint = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/transaction/day`;
            break;
          case "month":
            endpoint = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/transaction/month`;
            break;
          case "year":
            endpoint = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/transaction/year`;
            break;
        }

        const response = await axios.get<ApiResponse>(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const incomeData =
          activeView === "day"
            ? response.data.incomePerDay
            : activeView === "month"
            ? response.data.incomePerMonth
            : response.data.incomePerYear;

        if (incomeData) {
          const labels = incomeData.map((item) =>
            activeView === "day" ? item.date : activeView === "month" ? item.month : item.year
          );
          const data = incomeData.map((item) => item.totalIncome);

          setXLabels(labels);
          setUData(data);
        }
      } catch (err) {
        console.error("Error fetching income data:", err);
        setError("Failed to fetch income data");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeData();
  }, [activeView]);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        const height = chartContainerRef.current.offsetHeight;
        setChartSize({ width: width - 20, height: Math.min(height - 20, 400) });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewChange = (view: "day" | "month" | "year") => {
    setActiveView(view);
  };

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Buttons to toggle between views */}
      <div className="flex justify-center gap-4 mb-5">
        <button
          className={`px-4 py-2 rounded ${
            activeView === "day" ? "bg-teal-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleViewChange("day")}
        >
          Day
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeView === "month" ? "bg-teal-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleViewChange("month")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeView === "year" ? "bg-teal-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleViewChange("year")}
        >
          Year
        </button>
      </div>

      {/* Chart */}
      <div
        ref={chartContainerRef}
        className="max-w-xl h-[400px] border rounded-lg bg-white"
      >
        <LineChart
          width={chartSize.width}
          height={chartSize.height}
          series={[{ data: uData, label: "Income", area: true, showMark: true }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          className="p-5"
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
}
