"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";
import AdminSidebar from "@/app/(admin)/components/AdminSidebar";
import UserSidebar from "@/app/(user)/components/UserSidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isUserRoute = pathname.startsWith("/user/dashboard");

  if (isDashboardRoute) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="w-full p-5 h-screen overflow-y-scroll">{children}</div>
      </div>
    );
  }

  if (isUserRoute) {
    return (
      <div className="flex h-screen">
        <UserSidebar />
        <div className="w-full p-5 h-screen overflow-y-scroll">{children}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {children}
      <Footerr />
    </div>
  );
}
