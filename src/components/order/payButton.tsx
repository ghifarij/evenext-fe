"use client";

import axios from "@/helpers/axios";
import { toastErr } from "@/helpers/toast";
import UseOpen from "@/hooks/useOpen";
import { getSnapToken } from "@/libs/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const { menuHandler } = UseOpen();
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

        if (window.snap && window.snap.pay) {
          window.snap.pay(token);
        } else {
          throw new Error("Midtrans Snap is not loaded.");
        }
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
      const { data } = await axios.post("/orders/midtrans-webhook", resBody);
      router.push("/");
      toast.success(data.message);
    } catch (err: unknown) {
      toastErr(err);
    }
  };

  useEffect(() => {
    if (!window.snap) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Use sandbox URL for testing
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        window.snap = window.snap || {};
      };
      document.body.appendChild(script);
    }
  }, []);

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
          className="w-full h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-teal-700 hover:bg-teal-900 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Konfirmasi"}
        </button>
      )}
    </div>
  );
}
