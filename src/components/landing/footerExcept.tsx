"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterExcept() {
  const pathname = usePathname();
  const noFooterRoutes = [
    "/promotor",
    "/promotor/dashboard",
    "/promotor/profile",
    "/promotor/eventactive",
    "/promotor/eventfinish",
    "/promotor/ticketsales",
    "/not-found",
    "/event/create",
  ];
  return noFooterRoutes.includes(pathname) ? null : <Footer />;
}
