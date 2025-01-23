"use client";

import React, { useState } from "react";

export default function Biaya() {
  const [ticketPrice, setTicketPrice] = useState(100000); // Default harga tiket
  const taxRate = 0.11; // Pajak 11%

  // Menghitung pajak dari harga tiket
  const taxAmount = ticketPrice * taxRate;

  // Menghitung total biaya (harga tiket + pajak)
  const totalCost = ticketPrice + taxAmount;

  // Fungsi untuk mengubah format input menjadi format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleInputChange = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Menghapus karakter non-numerik
    setTicketPrice(Number(rawValue)); // Mengubah input menjadi angka
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Left Section */}
      <div
        className="lg:w-1/2 hidden min-h-screen lg:flex justify-center items-center bg-gray-200"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/9d/bf/2d/9dbf2d9bbed19586db8b13318b1fd344.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800 mb-4">
            Yuk.. Simulasikan harga tiket eventmu.
          </h1>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>
              - Ini adalah harga simulasi dan biaya yang dibebankan ke customer
            </li>
            <li>- Harga tiket sudah termasuk PPN 11%</li>
            <li>- Pajak Hiburan Daerah menjadi tanggung jawab Event Creator</li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Biaya transaksi tiket
          </h2>

          {/* Input Harga Tiket */}
          <div className="mb-4">
            <label
              htmlFor="ticketPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Harga tiket kamu
            </label>
            <input
              type="text"
              id="ticketPrice"
              value={formatRupiah(ticketPrice)}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Pajak 11% */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pajak (11%)
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
              Rp{taxAmount.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Total Biaya */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Biaya
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
              Rp{totalCost.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Tombol Hubungi Kami */}
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all">
            Hubungi kami
          </button>
        </div>
      </div>
    </div>
  );
}
