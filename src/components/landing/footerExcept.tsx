"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterExcept() {
  const pathname = usePathname();
  const noFooterRoutes = ["/promotor/dashboard", "/promotor/profile" ,"/not-found"];
  return noFooterRoutes.includes(pathname) ? null : <Footer />;
}
