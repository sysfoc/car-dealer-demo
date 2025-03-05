import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Dealership Demo",
  description: "Explore The Best Car Dealership Themes",
  icons:'/logo.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-gray-50/95 max-w-7xl mx-auto`}>
        <Header />
        {children}
        <Footerr/>
      </body>
    </html>
  );
}
