import React from "react";

export default function FormRegister() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="lg:w-1/2 hidden h-screen lg:flex items-center justify-center bg-gray-200">
        <p className="text-xl font-semibold text-gray-600">IMAGE OR VIDEO</p>
      </div>

      <div className="lg:w-1/2 w-full h-screen flex flex-col items-center justify-center p-8 bg-white">
        <div className="mb-6 text-center">
          <h1 className="font-extrabold text-3xl text-gray-800">EVENEXT</h1>
          <p className="text-gray-600 mt-2">Buat akun untuk membeli tiket</p>
        </div>
        <form className="w-full max-w-sm space-y-4">
          <div>
            <input
              type="name"
              placeholder="Masukkan Nama Lengkap"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Masukkan Alamat Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Masukkan Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Konfimasi Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nomor Telepon"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Kode Referal"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
