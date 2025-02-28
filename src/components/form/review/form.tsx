"use client";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import type { FormReview } from "@/types/review";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { toastErr } from "@/helpers/toast";
import Rating from "./rating";
import { reviewSchema } from "@/libs/schema";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormReview({ event_id }: { event_id: string }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const initialValue: FormReview = {
    rating: 0,
    description: "",
  };

  const handleAdd = async (review: FormReview) => {
    try {
      SetIsLoading(true);
      const { data } = await axios.post(`/reviews/${event_id}`, review, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(data.message);
    } catch (err: unknown) {
      toastErr(err);
    } finally {
      SetIsLoading(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={reviewSchema}
        onSubmit={(values, action) => {
          console.log(values);
          action.resetForm();
          handleAdd(values);
        }}
      >
        {({ setFieldValue, values }: FormikProps<FormReview>) => {
          const commentChange = (e: string) => {
            setFieldValue("description", e);
            // console.log(e);
          };
          return (
            <Form className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Rating setFieldValue={setFieldValue} values={values.rating} />
              </div>
              <ErrorMessage name="rating">
                {(msg) => (
                  <div className="text-red-500 text-xs mt-1 ml-1">
                    <sup>*</sup>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <ReactQuill onChange={commentChange} value={values.description} />
              <ErrorMessage name="description">
                {(msg) => (
                  <div className="text-red-500 text-xs mt-1 ml-1">
                    <sup>*</sup>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <button
                disabled={isLoading}
                type="submit"
                className={`${
                  isLoading
                    ? "disabled:cursor-not-allowed text-white"
                    : " hover:text-gray-600"
                } py-2 mx-2 rounded-lg transition ease-linear font-semibold bg-teal-500 text-white`}
              >
                {isLoading ? "Loading ..." : "Submit Review"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
