"use client";

import { IPromotor, UserType } from "@/types/event";
import { IUser } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import { SessionContext as ISessionContext } from "@/types/event";

export const SessionContext = createContext<ISessionContext | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [type, setType] = useState<UserType | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [promotor, setPromotor] = useState<IPromotor | null>(null);
  const [loading, setLoading] = useState(true);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const checkSession = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      if (tokenPayload.exp * 1000 < Date.now())
        throw new Error("Token expired");

      const res = await fetch(`${base_url}/auth/getSession`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch session");

      const result = await res.json();
      if (result.type === "promotor") {
        setPromotor(result);
        setType("promotor");
        setUser(null);
      } else if (result.type === "user") {
        setUser(result);
        setType("user");
        setPromotor(null);
      } else {
        throw new Error("Invalid session type");
      }

      setIsAuth(true);
    } catch (error) {
      console.error("Session check failed:", error);
      resetSession();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    resetSession();
  };

  const resetSession = () => {
    setIsAuth(false);
    setType(null);
    setUser(null);
    setPromotor(null);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{ isAuth, type, user, promotor, checkSession, logout, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};
