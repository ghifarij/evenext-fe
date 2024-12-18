"use client";

import Link from "next/link";
import { useSession } from "@/context/useSession";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toastErr } from "@/helpers/toast";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

const LoginSchema = Yup.object().shape({
  data: Yup.string().required("Username is required!"),
  password: Yup.string()
    .min(3, "Password is too weak!")
    .required("Password is required!"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function FormLoginPro() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsAuth, setUser } = useSession();
  const router = useRouter();
  const initialValue: FormValues = {
    data: "",
    password: "",
  };

  const handleLogin = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setIsAuth(true);
      setUser(result.user);
      router.push("/");
      toast.success(result.message);
    } catch (err) {
      toastErr(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 items-center">
      <div
        className="lg:w-1/2 hidden min-h-screen justify-center items-center lg:flex bg-gray-200"
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

      <div className="lg:w-1/2 w-full h-screen flex flex-col items-center justify-center p-8 bg-white">
        <div className="mb-6 text-center">
          <h1 className="font-extrabold text-3xl text-black">EVENEXT</h1>
          <p className="text-gray-600 mt-2">Masuk untuk membuat event</p>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={(values, action) => {
            handleLogin(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="w-full max-w-sm space-y-4">
                <div>
                  <label htmlFor="data">Email or Username :</label>
                  <Field
                    type="email"
                    name="data"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.data}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {touched.data && errors.data ? (
                    <div className="text-red-500 text-xs">{errors.data}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password">Password :</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {touched.password && errors.password ? (
                    <div className="text-red-500 text-xs">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                {/* <div>
                  <p className="text-gray-600 mt-2">Nomor Telepon :</p>
                  <input
                    type="text"
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div> */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all"
                  >
                    {isLoading ? "Loading ..." : "Masuk"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/promotor/register"
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
