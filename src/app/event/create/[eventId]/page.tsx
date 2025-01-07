"use client";

import { revalidate } from "@/libs/action";
import { TicketInput } from "@/types/ticket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

export const ticketSchema = Yup.object({
  category: Yup.string().required("Pilih kategori tiket"),
  price: Yup.number()
    .required("Harga dibutuhkan")
    .min(0, "Harga lebih besar dari 0"),
  seats: Yup.number()
    .required("Jumlah tiket dibutuhkan")
    .min(10, "Tiket minimum 10"),
});

const initialValues: TicketInput = {
  category: "Free",
  seats: 0,
  price: 0,
};

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function TicketCreatePage() {
  const [ticketForms, setTicketForms] = useState<TicketInput[]>([
    initialValues,
  ]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { eventId } = useParams();

  const onCreate = async (data: TicketInput[]) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${base_url}/tickets/${eventId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw result;

      revalidate("events");
      toast.success(result.message);
      router.push("/promotor/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTicketForm = (values: any, setFieldValue: any) => {
    const selectedCategories = values.tickets.map(
      (ticket: TicketInput) => ticket.category
    );

    const hasFree = selectedCategories.includes("Free");

    const availableCategories = hasFree
      ? []
      : ["EarlyBird", "Regular", "VIP"].filter(
          (category) => !selectedCategories.includes(category)
        );

    if (availableCategories.length === 0) {
      toast.error("Tidak dapat menambahkan tiket baru apabila event Free.");
      return;
    }

    const newTicket: TicketInput = {
      category: availableCategories[0] as TicketInput["category"],
      seats: 0,
      price: 0,
    };

    setFieldValue("tickets", [...values.tickets, newTicket]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="flex flex-col mx-auto max-w-[1200px] p-4 bg-gray-100 rounded-xl shadow mt-10 mb-20">
      <Formik
        initialValues={{ tickets: ticketForms }}
        validationSchema={Yup.array().of(ticketSchema)}
        onSubmit={(values, actions) => {
          onCreate(values.tickets);
          actions.resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {values.tickets.map((ticket, index) => (
              <div key={index} className="flex gap-10 mb-6">
                <div>
                  <label
                    htmlFor={`tickets.${index}.category`}
                    className="block mb-2 font-bold text-gray-800"
                  >
                    Pilih kategori tiket
                  </label>
                  <Field
                    name={`tickets.${index}.category`}
                    as="select"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-[10px]"
                  >
                    {(() => {
                      const selectedCategories = values.tickets
                        .slice(0, index)
                        .map((ticket) => ticket.category);

                      const isFreeAlreadySelected =
                        selectedCategories.includes("Free");

                      const filteredCategories =
                        index === 0
                          ? ["Free", "EarlyBird", "Regular", "VIP"]
                          : isFreeAlreadySelected
                          ? ["Free"]
                          : (["EarlyBird", "Regular", "VIP"] as const).filter(
                              (category) =>
                                !selectedCategories.includes(category)
                            );

                      return filteredCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ));
                    })()}
                  </Field>
                  <ErrorMessage
                    name={`tickets.${index}.category`}
                    component="span"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`tickets.${index}.price`}
                    className="block mb-2 font-bold text-gray-800"
                  >
                    Harga per tiket
                  </label>
                  <Field
                    name={`tickets.${index}.price`}
                    type="number"
                    disabled={values.tickets[index].category === "Free"}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-[10px]"
                  ></Field>
                  <ErrorMessage
                    name={`tickets.${index}.price`}
                    component="span"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`tickets.${index}.seats`}
                    className="block mb-2 font-bold text-gray-800"
                  >
                    Jumlah tiket
                  </label>
                  <Field
                    name={`tickets.${index}.seats`}
                    type="number"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[90%] p-[10px]"
                  ></Field>
                  <ErrorMessage
                    name={`tickets.${index}.seats`}
                    component="span"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="content-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-teal-700 hover:bg-teal-900 rounded-lg"
                  >
                    {isLoading ? "Loading..." : "Simpan"}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addTicketForm(values, setFieldValue)}
                disabled={values.tickets.length >= 3}
                className="w-10 h-10 text-[#f5f5f7] font-bold text-2xl bg-teal-500 hover:bg-teal-700 rounded-full"
              >
                +
              </button>
              <p className="content-center text-gray-600">Buat tiket baru</p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
