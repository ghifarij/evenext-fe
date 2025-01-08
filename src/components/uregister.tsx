"use client";

import { toastErr } from "@/helpers/toast";
import { RegisterSchema } from "@/libs/schema";
import { Field, Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { TypeAnimation } from "react-type-animation";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  referred_by?: string;
}

export default function FormRegisterUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referred_by: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (err) {
      toastErr(err);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    errors,
    touched,
    handleChange,
    value,
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    errors: any;
    touched: any;
    handleChange: any;
    value: any;
  }) => (
    <div>
      <label className="text-gray-600 mt-2">{label}:</label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-xs">{errors[name]}</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 items-center">
      {/* Left Section */}
      <div
        className="lg:w-1/2 hidden min-h-screen lg:flex justify-center items-center bg-gray-200"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/a6/0e/c9/a60ec9741397dec0981c997283fc8620.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mt-10">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-black max-lg:text-center">
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

      {/* Right Section */}
      <div className="lg:w-1/2 w-full h-screen flex flex-col items-center justify-center p-8 bg-white">
        <div className="mb-6 text-center">
          <h1 className="font-extrabold text-3xl text-black">EVENEXT</h1>
          <p className="text-gray-600 mt-2">Buat akun untuk membeli tiket</p>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            handleAdd(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="w-full max-w-sm space-y-4">
                <InputField
                  label="Nama Lengkap"
                  name="username"
                  placeholder="Masukkan Nama Lengkap"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.username}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Masukkan Alamat Email"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.email}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Masukkan Password"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.password}
                />
                <InputField
                  label="Konfirmasi Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi Password"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.confirmPassword}
                />
                <InputField
                  label="Kode Referal"
                  name="referred_by"
                  placeholder="Masukkan Kode Referal"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.referred_by}
                />
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-teal-500 text-white py-3 rounded-lg ${
                      isLoading
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-teal-600"
                    } transition-all`}
                  >
                    {isLoading ? "Loading ..." : "Daftar"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Telah Memiliki Akun?{" "}
            <Link href="/user/login" className="text-teal-500 hover:underline">
              Masuk Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
