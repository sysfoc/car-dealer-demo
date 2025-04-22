import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogoutUser = async () => {
    try {
      setLoading(true);
      const res = fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button disabled={loading} color='failure' size='sm' className='flex items-center' onClick={handleLogoutUser} >
      <BiLogOut className='me-2 h-4 w-4' />
      <span>logout</span>
    </Button>
  );
};

export default LogoutButton;
