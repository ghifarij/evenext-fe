"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const userGuard = (WrappedComponent: React.ComponentType) => {
  const UserGuard: React.FC = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        router.push("/promotor/dashboard"); // Redirect ke halaman utama jika token tidak ada
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
        router.push("/promotor/dashboard"); // Redirect ke halaman utama jika token tidak valid
      }
    }, [router]);

    if (!isAuthorized) {
      return null; // Jangan render komponen jika tidak diizinkan
    }

    return <WrappedComponent {...props} />;
  };

  return UserGuard;
};

export default userGuard;
