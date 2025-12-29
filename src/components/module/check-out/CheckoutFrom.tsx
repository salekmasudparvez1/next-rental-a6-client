"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createPaymentIntent } from "@/service/pay";
import { Spinner } from "@/components/ui/spinner";
import PaymentForm from "./PaymentForm";


export default function CheckoutForm() {
  const params = useParams();
  const router = useRouter();

  const requestId = params?.id as string

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Stripe publishable key is not configured");
  }

  const stripePromise = loadStripe(publishableKey);

  /* ---------------- Fetch Client Secret ---------------- */
   console.log('requestId',requestId);
  useEffect(() => {
    if (!requestId) {
      toast.error("Invalid payment request");
      router.push("/");
      return;
    }

    const loadPaymentIntent = async () => {

      try {
        const data = await createPaymentIntent(requestId);
        setClientSecret(data?.clientSecret);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Payment initialization failed";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

  /* ---------------- UI States ---------------- */

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="ring" />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">Unable to initialize payment.</p>
      </div>
    );
  }

  /* ---------------- Render ---------------- */

  return (
    <div className=" p-6">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm requestId={requestId!} />
      </Elements>
    </div>
  );
}

// const stripe = new Stripe(publicKey, {
//   developerTools: {
//     assistant: {
//       enabled: false,
//     },
//   },
// });