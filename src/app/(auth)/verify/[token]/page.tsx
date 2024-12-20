"use client";

import { toastErr } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const onVerify = async () => {
    try {
      const res = await fetch(`${base_url}/auth/verify/${params.token}`, {
        method: "PATCH",
        next: { revalidate: 0 },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      router.push("/user/login");
    } catch (err) {
      toastErr(err);
      router.push("/");
    }
  };

  useEffect(() => {
    onVerify();
  }, []);

  return (
    <div className="flex justify-center min-h-screen items-center">
      {/* <button
        onClick={onVerify}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 "
      >
        Verifikasi
      </button> */}
    </div>
  );
}
