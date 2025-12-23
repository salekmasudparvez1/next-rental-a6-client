"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { createPaymentIntent } from "@/service/pay";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";


// ----------------------------------
// Stripe Setup
// ----------------------------------
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined;

console.log("BUILD: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:", Boolean(publishableKey));
if (!publishableKey) {
  console.error("❌ Stripe publishable key is missing (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)");
}

const stripePromise = publishableKey ? loadStripe(publishableKey) : Promise.resolve(null);

// ----------------------------------
// Payment Form Component
// ----------------------------------
const PaymentForm = ({ requestId }: { requestId: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!stripe || !elements) {
      setError("Stripe is still loading. Please wait.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?requestId=${requestId}`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        variant="secondary"
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-800 disabled:bg-gray-400"
      >
        {isSubmitting ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

// ----------------------------------
// Checkout Page Component
// ----------------------------------
const CheckoutForm = () => {
  const params = useParams();
  const requestId = params?.id as string;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestId) return;

    const fetchClientSecret = async () => {
      try {
        const data = await createPaymentIntent(requestId);
        setClientSecret(data.clientSecret);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load payment";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [requestId]);

  if (!publishableKey) {
    toast.error("Stripe publishable key not configured");
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="ring" />
      </div>
    );
  }

  if (!clientSecret) {
    toast.error("Unable to initialize payment");
    return null;
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm requestId={requestId} />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
