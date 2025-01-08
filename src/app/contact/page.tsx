"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 lg:p-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Kontak Kami
        </h2>
        <p className="mt-2 text-gray-600 text-center">
          Ada pertanyaan? Tolong beritahu kami.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg"
                placeholder="Masukkan alamat email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700"
            >
              Pesan
            </label>
            <textarea
              name="message"
              id="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg"
              placeholder="Masukkan pesan disini"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
