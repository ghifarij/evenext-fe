"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar";

export default function NavbarExcept() {
    const pathname = usePathname();
    const noNavbarRoutes = ["/promotor/dashboard", "/not-found"]
    return noNavbarRoutes.includes(pathname) ? null : <Navbar />
}