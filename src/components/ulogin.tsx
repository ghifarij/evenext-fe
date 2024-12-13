"use client";

import Link from "next/link";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function FormLoginUser() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="lg:w-1/2 hidden min-h-screen lg:flex items-center justify-center bg-gray-200">
        <div className="mt-10">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  <TypeAnimation
                    className="font-extrabold"
                    sequence={[
                      "CARI EVENT UNTUK KONSER",
                      3000,
                      "CARI EVENT UNTUK SEMINAR",
                      3000,
                      "CARI EVENT UNTUK OLAHRAGA",
                      3000,
                      "CARI EVENT UNTUK EXPO",
                      3000,
                      () => {
                        console.log("Sequence completed");
                      },
                    ]}
                    wrapper="span"
                    cursor={false}
                    repeat={Infinity}
                    style={{ fontSize: "1.5rem", display: "inline-block" }}
                  />
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  🎉 Jelajahi Pengalaman Tak Terlupakan Bersama{" "}
                  <span className="font-bold">EVENEXT !</span>
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Cari dan beli tiket acara favoritmu kini lebih mudah dan
                  cepat. Mulai dari konser, festival, hingga seminar—semua ada
                  di sini!{" "}
                  <span className="font-bold">
                    #Evenext #EventTicketing #NikmatiPengalamanmu
                  </span>
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <iframe
                    className="size-full object-cover object-top"
                    src="https://www.youtube.com/embed/T47ZuNliryI?autoplay=1&mute=1"
                    title="Evenext Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full h-screen flex flex-col items-center justify-start p-8 bg-white">
        <div className="mb-6 text-center mt-4">
          <h1 className="font-extrabold text-3xl text-gray-800">EVENEXT</h1>
          <p className="text-gray-600 mt-2">Masuk untuk membeli tiket</p>
        </div>
        <form className="w-full max-w-sm space-y-4">
          <div>
            <p className="text-gray-600 mt-2">Email or Username :</p>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <p className="text-gray-600 mt-2">Password :</p>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <p className="text-gray-600 mt-2">Nomor Telepon :</p>
            <input
              type="text"
              placeholder="Nomor Telepon"
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
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/user/register"
              className="text-teal-500 hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
