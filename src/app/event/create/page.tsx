"use client";

import { EventInput } from "@/types/event";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { revalidate } from "@/libs/action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FieldThumbnail } from "@/components/form/event/thumbnail";
import RichTextEditor from "@/components/form/event/textEditor";
import { createSlug } from "@/helpers/createSlug";
import { toast } from "react-toastify";

export const eventSchema = Yup.object({
  thumbnail: Yup.mixed<File>()
    .required("Thumbnail is required")
    .test(
      "fileSize",
      "File terlalu besar (maksimal 2MB)",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Format file tidak didukung (hanya .jpeg, .png, .jpg, .webp)",
      (value) =>
        !value ||
        (value instanceof File &&
          ["/image/jpeg", "image/png", "/image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 100 characters long")
    .required("Title is required"),
  date: Yup.date()
    .typeError("Invalid date format")
    .required("Event date is required"),
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format (must be HH:mm, 24-hour format)"
    )
    .required("Event time is required"),
  location: Yup.string().required(
    "Select location between Bandung, Jakarta, Surabaya, Bali"
  ),
  venue: Yup.string().required("Venue address is required"),
  category: Yup.string().required(
    "Select category between Konser, Seminar, Olahraga, Expo"
  ),
  promotorId: Yup.string().required("Promotor Id is required"),
  description: Yup.string().required("Description is requried"),
  terms: Yup.string().required("Terms is required"),
});

const initialValues: EventInput = {
  thumbnail: "",
  title: "",
  slug: "",
  date: "",
  time: "",
  location: "",
  venue: "",
  category: "",
  promotorId: "",
  description: "",
  terms: "",
};

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function EventCreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const token = localStorage.getItem("token");

  const onCreate = async (data: EventInput) => {
    try {
      setIsLoading(true);

      const combinedDateTime = new Date(
        `${data.date}T${data.time}:00Z`
      ).toISOString();

      const transformedData = {
        ...data,
        date: combinedDateTime,
        time: "1970-01-01T" + data.time + ":00Z",
      };

      const formData = new FormData();
      for (let key in transformedData) {
        const item = transformedData[key as keyof EventInput];
        if (item) {
          formData.append(key, item);
        }
      }

      const res = await fetch(`${base_url}/events`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw result;
      revalidate("events");
      toast.success(result.message);
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mx-auto max-w-[1200px] p-4 bg-gray-100 rounded-xl shadow mt-10 mb-20">
      <Formik
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={(values, actions) => {
          onCreate(values);
          actions.resetForm();
        }}
      >
        {(props) => {
          useEffect(() => {
            props.setFieldValue("slug", createSlug(props.values.title));
          }, [props.values.title, props.setFieldValue]);

          return (
            <Form className="flex flex-col gap-3 w-full">
              <div className="mx-auto">
                <label
                  htmlFor="thumbnail"
                  className="block mb-2 font-bold text-gray-800"
                >
                  Upload Banner
                </label>
                <FieldThumbnail
                  name="thumbnail"
                  formik={props}
                  className="bg-white"
                />
                <ErrorMessage
                  name="thumbnail"
                  component="span"
                  className="text-sm text-red-500"
                />
                <p className="text-blue-500 text-sm my-4">
                  Ukuran lebih dari 2Mb (Format JPG, JPEG, PNG)
                </p>
              </div>
              <div className="flex w-[750px] mx-auto">
                <div className="flex-1">
                  <div className="flex flex-col">
                    <label
                      htmlFor="title"
                      className="block mb-2 font-bold text-gray-800"
                    >
                      Judul Event
                    </label>
                    <Field
                      name="title"
                      type="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2"
                    />
                    <ErrorMessage
                      name={"title"}
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="slug"
                      className="block mb-2 font-bold text-gray-800"
                    >
                      Slug
                    </label>
                    <input
                      name="slug"
                      type="text"
                      value={props.values.slug}
                      readOnly
                      disabled
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2"
                    />
                    <ErrorMessage
                      name={"slug"}
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="date"
                      className="block mb-2 font-bold text-gray-800"
                    >
                      Tanggal
                    </label>
                    <Field
                      name="date"
                      type="date"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2"
                    />
                    <ErrorMessage
                      name={"date"}
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="time"
                      className="block mb-2 font-bold text-gray-800"
                    >
                      Waktu
                    </label>
                    <Field
                      name="time"
                      type="time"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2"
                    />
                    <ErrorMessage
                      name={"time"}
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <label
                      htmlFor="location"
                      className="block mb-2 font-bold text-gray-800 ml-10"
                    >
                      Lokasi
                    </label>
                    <Field
                      name="location"
                      as="select"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-[10px] ml-10"
                    >
                      <option value="Bandung">Bandung</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Bali">Bali</option>
                    </Field>
                    <ErrorMessage
                      name={"location"}
                      component="span"
                      className="text-sm text-red-500 ml-10"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="venue"
                      className="block mb-2 font-bold text-gray-800 ml-10"
                    >
                      Venue
                    </label>
                    <Field
                      name="venue"
                      type="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2 ml-10"
                    />
                    <ErrorMessage
                      name={"venue"}
                      component="span"
                      className="text-sm text-red-500 ml-10"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="category"
                      className="block mb-2 font-bold text-gray-800 ml-10"
                    >
                      Kategori
                    </label>
                    <Field
                      name="category"
                      as="select"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-[10px] ml-10"
                    >
                      <option value="Konser">Konser</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Expo">Expo</option>
                    </Field>
                    <ErrorMessage
                      name={"category"}
                      component="span"
                      className="text-sm text-red-500 ml-10"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="promotorId"
                      className="block mb-2 font-bold text-gray-800 ml-10"
                    >
                      Promotor Id
                    </label>
                    <Field
                      name="promotorId"
                      type="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-2 ml-10"
                    />
                    <ErrorMessage
                      name={"promotorId"}
                      component="span"
                      className="text-sm text-red-500 ml-10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[750px] mx-auto mt-4">
                <label
                  htmlFor="description"
                  className="block mb-2 font-bold text-gray-800"
                >
                  Deskripsi
                </label>
                <RichTextEditor
                  name="description"
                  value={props.values.description}
                  setFieldValue={props.setFieldValue}
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col w-[750px] mx-auto mt-4">
                <label
                  htmlFor="terms"
                  className="block mb-2 font-bold text-gray-800"
                >
                  Kebijakan
                </label>
                <RichTextEditor
                  name="terms"
                  value={props.values.terms}
                  setFieldValue={props.setFieldValue}
                />
                <ErrorMessage
                  name="terms"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex w-[750px] justify-end mx-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[40px] my-2 disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-teal-700 hover:bg-teal-900 rounded-lg"
                >
                  {isLoading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
