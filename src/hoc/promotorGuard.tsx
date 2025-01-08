"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const promotorGuard = (WrappedComponent: React.ComponentType) => {
  const PromotorGuard: React.FC = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        router.push("/"); // Redirect ke halaman utama jika token tidak ada
        return;
      }

      try {
        // Decode token dan validasi strukturnya
        const decodedToken = jwtDecode<{ exp?: number }>(storedToken);

        // Tambahkan logika validasi token (misalnya, berdasarkan waktu kedaluwarsa)
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          throw new Error("Token expired");
        }

        // Jika token valid, izinkan akses
        setIsAuthorized(true);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/"); // Redirect ke halaman utama jika token tidak valid
      }
    }, [router]);

    if (!isAuthorized) {
      return null; // Jangan render komponen jika tidak diizinkan
    }

    return <WrappedComponent {...props} />;
  };

  return PromotorGuard;
};

export default promotorGuard;
