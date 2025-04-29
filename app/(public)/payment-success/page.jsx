'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
        if (!sessionId || hasVerified.current) return;
        hasVerified.current = true;

      try {
        const res = await fetch(`/api/stripe/verify-user-session?session_id=${sessionId}`);
        if (res.ok) {
          router.push('/user/dashboard');
        } else {
          const data = await res.json();
          alert(data.error || 'Payment verification failed');
          router.push('/failed-payment');
        }
      } catch (err) {
        alert('Something went wrong verifying your payment.');
        router.push('/failed-payment');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className="p-10 text-center">
      {loading ? (
        <p>Verifying your payment, please wait...</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
