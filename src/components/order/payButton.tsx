"use client";

import axios from "@/helpers/axios";
import { toastErr } from "@/helpers/toast";
import UseOpen from "@/hooks/useOpen";
import { getSnapToken } from "@/libs/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";

interface IProps {
  total_price: number;
  final_price: number;
  point: number;
  order_id: string;
  category: "EarlyBird" | "Regular" | "VIP" | "Free";
}

export default function PayButton({
  total_price,
  final_price,
  order_id,
  category,
}: IProps) {
  const { open, hidden, menuHandler } = UseOpen();
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    if (total_price) {
      try {
        SetIsLoading(true);
        const token = await getSnapToken(
          total_price,
          final_price,
          Number(order_id)
        );
        window.snap.pay(token);
      } catch (err: unknown) {
        toastErr(err);
      } finally {
        SetIsLoading(false);
      }
    } else menuHandler();
  };

  const freeTransaction = async () => {
    const resBody = {
      transaction_status: "settlement",
      order_id: order_id,
    };

    try {
      const { data } = await axios.post(
        "/transactions/midtrans-webhook",
        resBody
      );
      router.push("/");
      toast.success(data.message);
    } catch (err: unknown) {
      toastErr(err);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      {category !== "Free" ? (
        <button
          onClick={handleClick}
          className="w-full h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-teal-700 hover:bg-teal-900 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Bayar Tiket"}
        </button>
      ) : (
        <button
          onClick={freeTransaction}
          className="btn btn-secondary"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Konfirmasi Pembelian"}
        </button>
      )}
    </div>
  );
}
