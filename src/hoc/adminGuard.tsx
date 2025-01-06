"use client";


import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const adminGuard = (WrappedComponent: React.ComponentType) => {
  const AdminGuard: React.FC = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        router.push("/login");
        return;
      }

      try {
        const decodedUser = jwtDecode(storedToken) as { role: "Admin" | "User" };
        if (decodedUser.role === "Admin") {
          setIsAuthorized(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        router.push("/login");
      }
    }, [router]);

    if (!isAuthorized) {
      return null; // Atau loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AdminGuard;
};

export default adminGuard;
