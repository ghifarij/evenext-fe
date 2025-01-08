"use client";

import promotorGuard from "@/hoc/promotorGuard";
import authGuard from "@/hoc/authGuard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Image from "next/image";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order, orderIndex) =>
            order.Order_Details?.map((detail, detailIndex) => (
              <div
                key={`${orderIndex}-${detailIndex}`}
                className="bg-gray-50 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200"
              >
                <div className="w-full h-32 relative">
                <Image
                  src={detail.ticket.event.thumbnail}
                  alt={detail.ticket.event.title}
                  layout="fill"
                  className="object-cover rounded-md mb-4"
                />
                </div>
                <h3 className="font-semibold text-lg">
                  {detail.ticket.event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Lokasi: {detail.ticket.event.location}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Kategori: {detail.ticket.category}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Jumlah Terjual: {detail.qty}
                </p>
                <p className="text-teal-600 font-semibold">
                  Pendapatan: Rp {detail.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Tidak ada data penjualan tiket.</p>
      )}
    </div>
  );
};

export default authGuard(TicketSales) && promotorGuard(TicketSales);
