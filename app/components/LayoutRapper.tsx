"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";
import AdminSidebar from "@/app/(admin)/components/AdminSidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboardRoute ? (
        <div>
          <Header />
          {children}
          <Footerr />
        </div>
      ) : (
        <div className="flex">
          <AdminSidebar />
          <div className="w-full p-5">{children}</div>
        </div>
      )}
    </>
  );
}
