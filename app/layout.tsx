import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/components/LayoutRapper";
import StoreProvider from "@/app/StoreProvider";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Dealer Website Platform – Launch Your Auto Website Today",
  description:
    "Build a professional, no-code website for your dealership with Automotive Web Solutions. Easy setup, full support, and no tech worries—just subscribe and sell cars.",
  icons: "/favicon-32x32.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.className} antialiased bg-gray-50/95 max-w-[1680px] mx-auto`}
      >
        <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
