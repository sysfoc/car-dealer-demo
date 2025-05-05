"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useRouter();

  useEffect(() => {
    const capturePayment = async () => {
      if (!token) return;

      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: token }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setStatus("Payment successfull!");
        navigate.push("/user/dashboard");
      } else {
        setStatus("Payment verification failed.");
      }
    };

    capturePayment();
  }, [token]);

  return <div>{status}</div>;
}
