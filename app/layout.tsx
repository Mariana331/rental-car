import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";
import Header from "./components/Header/Header";

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family",
  weight: ["400", "500", "600", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--second-family",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Car gallery",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RentalCar",
    description: "Car gallery",
    url: "https://localhost:3000",
    images: [
      {
        url: "", // placeholder
        width: 1200,
        height: 630,
        alt: "logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
