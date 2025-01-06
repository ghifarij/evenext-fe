"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "@/hooks/useSession";
import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function ProfilePromotor() {
  const { isAuth, type, promotor } = useSession();
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const tickets = [
    {
      id: 1,
      logo: "/WTFLOGOPROFILE.png",
      eventName: "We The Fest",
      date: "2024-12-25",
      venue: "GBK Sport Complex Senayan",
      seat: "A12",
      price: 1000000,
      status: "ON-GOING",
    },
    {
      id: 2,
      logo: "/DWPLOGOPROFILE.png",
      eventName: "Djakarta Warehouse Project",
      venue: "GBK Sport Complex Senayan",
      date: "2024-12-30",
      seat: "B22",
      price: 1500000,
      status: "SUCCEED",
    },
    {
      id: 3,
      logo: "/AM.png",
      eventName: "Arctic Monkeys World Tour",
      date: "2024-12-30",
      venue: "Jakarta International Expo",
      seat: "B22",
      price: 960000,
      status: "SUCCEED",
    },
    {
      id: 4,
      logo: "/CAS.png",
      eventName: "Cigarette After Sex Tour",
      date: "2024-12-30",
      venue: "GBK Sport Complex Senayan",
      seat: "A12",
      price: 950000,
      status: "SUCCEED",
    },
    {
      id: 5,
      logo: "/orchestra.jpg",
      eventName: "Classic Musical Concert",
      date: "2024-12-30",
      venue: "Balai Resital Kartanegara",
      seat: "D45",
      price: 1000000,
      status: "SUCCEED",
    },
  ];

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      Swal.fire({
        title: "Error!",
        text: "No file selected. Please choose a file to upload.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    if (tokenPayload.exp * 1000 < Date.now()) throw new Error("Token expired");

    try {
      setUploading(true);
      const response = await fetch(`${base_url}/promotors/avatar-cloud`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        // credentials: "include",
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your profile picture has been updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => window.location.reload());
      } else {
        throw new Error(`Failed to upload. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update your profile picture. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setUploading(false);
    }
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  if (type !== "promotor") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-gray-100 py-10 px-4 lg:px-6 mt-5 relative">
      {/* Left Section */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white bg-opacity-90 p-5 rounded-xl shadow-lg mt-6 lg:mt-10">
        <Link href={"/promotor/dashboard"}>
          <div className="text-lg md:text-xl hover:text-teal-400 flex items-center">
            <IoChevronBackCircleOutline className="mr-2" /> Back to Dashboard
          </div>
        </Link>
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
          Your Tickets
        </h2>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 bg-gray-700 rounded-lg shadow flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4"
            >
              <img
                src={ticket.logo}
                alt={`${ticket.eventName} Logo`}
                className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer"
                onClick={() => openModal(ticket.logo)}
              />
              <div className="flex-1 text-center md:text-left">
                <p className="font-semibold text-white">{ticket.eventName}</p>
                <p className="text-gray-400 text-sm">Date: {ticket.date}</p>
                <p className="text-gray-400 text-sm">Venue: {ticket.venue}</p>
                <p className="text-gray-400 text-sm">Seat: {ticket.seat}</p>
                <p className="text-gray-400 text-sm">
                  Price: {formatPrice(ticket.price)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-white mb-2">{ticket.status}</p>
                <button className="text-sm bg-teal-500 hover:bg-teal-600 rounded-md px-4 py-2">
                  Look
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white bg-opacity-90 p-6 lg:ml-8 rounded-xl shadow-lg mt-6 lg:mt-10">
        <div className="flex flex-col items-center mb-8">
          <img
            src={promotor?.avatar || "https://via.placeholder.com/150"}
            alt="Promotor Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-teal-500 shadow-md mb-4 cursor-pointer"
            onClick={() =>
              openModal(promotor?.avatar || "https://via.placeholder.com/150")
            }
          />
          <label className="text-xs md:text-sm text-white font-bold bg-gray-400 p-2 rounded-xl hover:bg-teal-500 cursor-pointer">
            {uploading ? "Uploading..." : "Change Profile"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          <h2 className="text-xl md:text-2xl font-bold text-black mt-4">
            {promotor?.username || "Guest"}
          </h2>
          <p className="text-sm text-gray-400">
            {promotor?.email || "No Email Available"}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="relative max-w-screen-sm w-full">
            <img
              src={selectedImage!}
              alt="Full View"
              className="w-full max-h-screen rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl md:text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
