"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { Suspense } from "react";

export default function NavbarExcept() {
  const pathname = usePathname();
  const noNavbarRoutes = [
    "/promotor",
    "/promotor/dashboard",
    "/promotor/profile",
    "/promotor/eventactive",
    "/promotor/eventfinish",
    "/promotor/ticketsales",
    "/not-found",
    "/event/create",
  ];
  return noNavbarRoutes.includes(pathname) ? null : (
    <Suspense>
      <Navbar />;
    </Suspense>
  );
}
