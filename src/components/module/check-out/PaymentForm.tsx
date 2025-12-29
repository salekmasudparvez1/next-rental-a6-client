"use client";
import { Button } from "@/components/ui/button";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = ({ requestId }: { requestId: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is still loading. Please wait.");
      return;
    }

    setSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/tenant/pay-success/?requestId=${requestId}`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="w-full bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {submitting ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}


export default PaymentForm;