import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarExcept from "@/components/navbarExcept";
import { SessionProvider } from "@/context/useSession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Evenext",
  description: "Find Your Event Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <NavbarExcept />
          {children}
          <ToastContainer 
          draggable
          closeOnClick
          autoClose={3000}
          position="bottom-right"
          />
        </SessionProvider>
      </body>
    </html>
  );
}
