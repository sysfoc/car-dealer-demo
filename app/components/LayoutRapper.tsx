"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";
import AdminHeader from "@/app/(admin)/components/Header";
import AdminFooter from "@/app/(admin)/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {isDashboardRoute ? <AdminHeader /> : <Header />}
      {children}
      {isDashboardRoute ? <AdminFooter /> : <Footerr />}
    </>
  );
}
