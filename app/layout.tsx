import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/components/LayoutRapper";

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
      <body className={`${poppins.className} antialiased bg-gray-50/95 max-w-[1680px] mx-auto`}>
      <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
