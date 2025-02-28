import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarExcept from "@/components/landing/navbarExcept";
import { SessionProvider } from "@/context/useSession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterExcept from "@/components/landing/footerExcept";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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
          <FooterExcept />
        </SessionProvider>
      </body>
    </html>
  );
}
