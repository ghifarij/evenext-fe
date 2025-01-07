"use client";

import authGuard from "@/hoc/authGuard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";

interface IOrder {
  expiredAt: string;
  coupon: boolean;
  point: number;
  total_price: number;
  final_price: number;
  Order_Details: IOrderDetail[];
}

interface IOrderDetail {
  qty: number;
  subtotal: number;
  ticket: {
    category: "Free" | "EarlyBird" | "Regular" | "VIP";
    price: number;
    event: {
      title: string;
      thumbnail: string;
      date: string;
      time: string;
      location: "Bandung" | "Jakarta" | "Surabaya" | "Bali";
      venue: string;
    };
  };
}

const TicketSales = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        // Fetch data dari endpoint dengan header Authorization
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/ticketsales`,
          {
            method: "GET", // Sesuaikan dengan metode API
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Parsing response
        const data = await response.json();

        if (response.ok && data.success) {
          setOrders(data.data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
        <Link href={"/promotor/dashboard"}>
          <div className="text-lg md:text-xl hover:text-teal-400 flex items-center">
            <IoChevronBackCircleOutline className="mr-2" /> Kembali ke Dashboard
          </div>
        </Link>
      <h2 className="text-lg font-semibold mb-4">Penjualan Tiket</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <table className="table-auto w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Kategori Tiket</th>
              <th className="border border-gray-300 p-2">Event</th>
              <th className="border border-gray-300 p-2">Lokasi</th>
              <th className="border border-gray-300 p-2">Jumlah Terjual</th>
              <th className="border border-gray-300 p-2">Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, orderIndex) =>
              order.Order_Details?.map((detail, detailIndex) => (
                <tr key={`${orderIndex}-${detailIndex}`} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {orderIndex + 1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {detail.ticket.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div>
                      <img
                        src={detail.ticket.event.thumbnail}
                        alt={detail.ticket.event.title}
                        className="w-16 h-10 object-cover mx-auto mb-2"
                      />
                      {detail.ticket.event.title}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {detail.ticket.event.location}
                  </td>
                  <td className="border border-gray-300 p-2">{detail.qty}</td>
                  <td className="border border-gray-300 p-2">
                    Rp {detail.subtotal.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>Tidak ada data penjualan tiket.</p>
      )}
    </div>
  );
};

export default authGuard(TicketSales);
