"use client";

import { toastErr } from "@/helpers/toast";
import { ResetPaswordSchema } from "@/libs/schema";
import { Field, Form, Formik, FormikProps } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TypeAnimation } from "react-type-animation";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPro() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Extract route parameters
  const token = Array.isArray(params?.token) ? params.token[0] : params.token;

  // Store token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("promotorResetToken", token);
      setStoredToken(token);
    } else {
      const savedToken = localStorage.getItem("promotorResetToken");
      if (savedToken) {
        setStoredToken(savedToken);
      } else {
        toast.error("No reset token found. Redirecting to login...", {
          position: "bottom-right",
          autoClose: 3000,
          onClose: () => router.push("/promotor/login"),
        });
      }
    }
  }, [token, router]);

  const initialValue: FormValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleForget = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/auth/resetPasswordPromotor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: storedToken,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Password reset failed!");

      toast.success("Password reset successful! Redirecting to login...", {
        position: "bottom-right",
        autoClose: 3000,
        onClose: () => {
          localStorage.removeItem("promotorResetToken");
          router.push("/promotor/login");
        },
      });
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
            "url('https://i.pinimg.com/736x/9e/ca/87/9eca8792811adcd3b2e142dcab0b78d7.jpg')",
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
                      "BUAT EVENT UNTUK KONSER",
                      3000,
                      "BUAT EVENT UNTUK SEMINAR",
                      3000,
                      "BUAT EVENT UNTUK OLAHRAGA",
                      3000,
                      "BUAT EVENT UNTUK EXPO",
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
                  Buat event dan acara favoritmu kini lebih mudah dan cepat.
                  Mulai dari konser, festival, hingga seminar—semua ada di sini!{" "}
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
          <p className="text-gray-600 mt-2">
            Masukkan email kami akan kirim pemberitahuan via email.
          </p>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={ResetPaswordSchema}
          onSubmit={(values, action) => {
            handleForget(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="w-full max-w-sm space-y-4">
                <InputField
                  label="Password Baru"
                  name="newPassword"
                  type="password"
                  placeholder="Masukkan Password Baru"
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  value={values.newPassword}
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
                    {isLoading ? "Loading ..." : "Reset Password"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
