"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footerr from "@/app/components/Footerr";
import Social from "@/app/components/Social";
import Cookie from "@/app/components/Cookies";
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
      <div className='flex h-screen'>
        <Social />
        <AdminSidebar />
        <div className='w-full px-5 h-screen overflow-y-scroll'>
          <header className='mt-16 sm:mt-0 bg-white'>
            <UserButton />
          </header>
          <div>{children}</div>
          <Cookie />
        </div>
      </div>
    );
  }

  if (isUserRoute) {
    return (
      <div className='flex h-screen'>
        <Social />
        <UserSidebar />
        <div className='w-full px-5 h-screen overflow-y-scroll'>
          <header className='mt-16 sm:mt-0 bg-white'>
            <AdminButton />
          </header>
          <div className='mt-4'>{children}</div>
          <Cookie />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Social />
      <Header />
      {children}
      <Cookie />
      <Footerr />
    </div>
  );
}
