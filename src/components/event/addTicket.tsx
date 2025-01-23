"use client";

import { ITicket } from "@/types/ticket";
import { createContext, useEffect, useState } from "react";
import { IEvent } from "@/types/event";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TicketOrder from "./ticketOrder";
import { getCoupon, getPoints } from "@/libs/order";
import { formatCurrency } from "@/helpers/formatDate";

interface IProps {
  result: IEvent;
  ticketResult: ITicket[];
  params: { event_id: string };
}

export interface ITicketContext {
  ticket: ITicket;
  qty: number;
}

export interface TicketContextValue {
  ticketCart: ITicketContext[] | null;
  setTicketCart: (param: ITicketContext[] | null) => void;
}

export const TicketContext = createContext<TicketContextValue | null>(null);

export default function AddTicket({ ticketResult, params }: IProps) {
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  let final_price = totalPrice;
  const [coupon, setCoupon] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  let point = 0;
  const [isReedemedCoupon, setIsReedemedCoupon] = useState<boolean>(false);
  const [isReedemedPoints, setIsReedemedPoints] = useState<boolean>(false);
  const [ticketCart, setTicketCart] = useState<ITicketContext[] | null>(null);

  const handleOrderTicket = async () => {
    try {
      SetIsLoading(true);
      if (isReedemedPoints) {
        final_price -= points;
        point = points;
      }
      if (isReedemedCoupon) final_price -= final_price / 10;
      const resBody = {
        total_price: totalPrice,
        coupon: isReedemedCoupon,
        point,
        final_price,
        orderCart: ticketCart,
      };
      const { data } = await axios.post("/orders", resBody, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Order response:", data);

      if (data.order_id) {
        router.push(`/order/${data.order_id}`);
      } else {
        toast.error("Order creation failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    if (ticketCart) {
      setTotalPrice(ticketCart.reduce((a, b) => a + b.ticket.price * b.qty, 0));
    }
  }, [ticketCart]);

  useEffect(() => {
    const getData = async () => {
      const dataCoupon = await getCoupon();
      const dataPoints = await getPoints();
      setCoupon(dataCoupon);
      setPoints(dataPoints);
    };
    getData();
  }, []);

  const handleReedemCoupon = () => {
    setIsReedemedCoupon(true);
    setCoupon(false);
  };

  const handleReedemPoints = () => {
    setIsReedemedPoints(true);
  };

  return (
    <>
      <TicketContext.Provider value={{ ticketCart, setTicketCart }}>
        <div className={`flex flex-col xl:w-[70%]`}>
          <div className="mt-4 desc-content">
            {/* Only show tickets */}
            <div className="flex flex-col gap-6">
              {ticketResult
                .filter(
                  (ticket) => ticket.eventId === parseInt(params.event_id)
                )
                .map((item, idx) => {
                  return <TicketOrder key={idx} ticket={item} />;
                })}
            </div>
          </div>
        </div>
        <div className="sticky top-0 flex flex-col xl:w-[70%] xl:self-start">
          <div className="rounded-xl flex flex-col gap-4 px-4 py-6">
            <div className="flex flex-col gap-6">
              {ticketCart && ticketCart.length > 0
                ? ticketCart.map((item, idx) => {
                    return (
                      <div
                        className="flex border-b pb-4 rounded-md gap-4"
                        key={idx}
                      >
                        <div className="flex flex-col w-full gap-2">
                          <span className="font-semibold">
                            {item.ticket.category}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-semibold">
                              {item.qty} Tiket
                            </span>
                            <span className="font-semibold text-teal-500">
                              {formatCurrency(item.qty * item.ticket.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="flex flex-col gap-2">
              {ticketCart && ticketCart?.length > 0 ? (
                <>
                  {coupon || points || totalPrice > 100000 ? (
                    <div className="flex gap-2 justify-between">
                      <button
                        onClick={handleReedemCoupon}
                        disabled={!coupon}
                        className="rounded-md px-2 py-1 disabled:cursor-not-allowed bg-lightBlue font-semibold text-xs"
                      >
                        CLAIM COUPON
                      </button>
                      <button
                        onClick={handleReedemPoints}
                        disabled={isReedemedPoints || points <= 0}
                        className={`flex flex-col gap-1 px-2 py-1 rounded-md border disabled:cursor-not-allowed transition duration-200 border-lightBlue font-semibold text-xs`}
                      >
                        <span>CLAIM POINTS</span>
                        <span>
                          {!isReedemedPoints
                            ? points >= 1000
                              ? `${points / 1000}K`
                              : points
                            : 0}
                        </span>
                      </button>
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center py-2">
                      <span>
                        Total {ticketCart.reduce((a, b) => a + b.qty, 0)} tiket
                      </span>
                      <span className="font-semibold text-teal-500 text-xl">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                    {isReedemedPoints ? (
                      <div className="py-2 flex justify-end">
                        <span className="font-semibold text-red-500 text-xl">
                          - {formatCurrency(points)}
                        </span>
                      </div>
                    ) : null}
                    {isReedemedCoupon ? (
                      <div className="py-2 flex justify-end">
                        <span className="font-semibold text-red-500 text-xl">
                          -{" "}
                          {isReedemedPoints
                            ? formatCurrency((totalPrice - points) / 10)
                            : formatCurrency(totalPrice / 10)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
            <button
              disabled={isLoading}
              onClick={handleOrderTicket}
              className={`${
                isLoading && "disabled:cursor-not-allowed"
              } border border-teal-500 bg-teal-100 rounded-md text-centerpy-2 font-semibold w-[50%] mx-auto p-2`}
            >
              {isLoading ? "Loading ..." : "Pesan Sekarang"}
            </button>
          </div>
        </div>
      </TicketContext.Provider>
    </>
  );
}
