"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";
import Social from "@/app/components/Social";
import AdminSidebar from "@/app/(admin)/components/AdminSidebar";
import UserButton from "@/app/(admin)/components/dashboard/UserButton";
import UserSidebar from "@/app/(user)/components/UserSidebar";
import AdminButton from "@/app/(user)/components/dashboard/AdminButton";

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
        <Social/>
        <AdminSidebar />
        <div className="w-full px-5 h-screen overflow-y-scroll">
          <header className="bg-white">
            <UserButton/>
          </header>
          <div>{children}</div>
        </div>
      </div>
    );
  }

  if (isUserRoute) {
    return (
      <div className="flex h-screen">
        <Social/>
        <UserSidebar />
        <div className="w-full px-5 h-screen overflow-y-scroll">
          <header className="bg-white">
            <AdminButton/>
          </header>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Social/>
      <Header />
      {children}
      <Footerr />
    </div>
  );
}
