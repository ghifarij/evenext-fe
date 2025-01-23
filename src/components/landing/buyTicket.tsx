import { FaTicketAlt } from "react-icons/fa";
import { FaUserPlus, FaPlus, FaMoneyBill } from "react-icons/fa6";

export default function BuyTicket() {
  return (
    <div className="flex flex-col mx-auto max-w-[1200px] p-4 shadow-xl my-6 py-6 md:py-10 rounded-xl">
      <div className="text-center text-black">
        <h2 className="text-3xl md:text-4xl font-bold">Cara Beli Tiket</h2>
        <p className="my-4 text-sm text-gray-600">
          Sekarang beli tiket online gak perlu ribet
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 text-black">
        <div className="w-60 mt-2 md:mt-10">
          <div className="bg-teal-100 rounded-full w-24 md:w-28 mx-auto p-4 md:p-6">
            <FaUserPlus className="text-6xl text-teal-600" />
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-xl font-bold my-2 md:my-4">
              1. Daftarkan Akun
            </h4>
            <p className="text-sm text-gray-600">
              Daftarkan akun kamu untuk melakukan pembelian tiket.
            </p>
          </div>
        </div>
        <div className="w-60 mt-2 md:mt-10">
          <div className="bg-teal-100 rounded-full w-24 md:w-28 mx-auto p-4 md:p-6">
            <FaPlus className="text-6xl text-teal-600" />
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-xl font-bold my-2 md:my-4">
              2. Pilih Event
            </h4>
            <p className="text-sm text-gray-600">
              Pilih event dan tipe tiket yang akan kamu beli.
            </p>
          </div>
        </div>
        <div className="w-60 mt-2 md:mt-10">
          <div className="bg-teal-100 rounded-full w-24 md:w-28 mx-auto p-4 md:p-6">
            <FaMoneyBill className="text-6xl text-teal-600" />
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-xl font-bold my-2 md:my-4">
              3. Pembayaran
            </h4>
            <p className="text-sm text-gray-600">
              Pilih tipe pembayaran yang telah kami sediakan.
            </p>
          </div>
        </div>
        <div className="w-60 mt-2 md:mt-10">
          <div className="bg-teal-100 rounded-full w-24 md:w-28 mx-auto p-4 md:p-6">
            <FaTicketAlt className="text-6xl text-teal-600" />
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-xl font-bold my-2 md:my-4">
              4. Pembelian Selesai
            </h4>
            <p className="text-sm text-gray-600">
              E-Tiket telah dikirimkan ke email & akun Tiket Event kamu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
