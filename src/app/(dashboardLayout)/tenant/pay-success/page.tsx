"use client";

import StripeSuccessPage from "@/components/module/successPage/StripeSuccessPage";
import { Spinner } from "@/components/ui/spinner";
import { getTransactionByPaymentIntentId } from "@/service/pay";
import { ITransaction } from "@/types/pay";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
//   const requestId = searchParams.get("requestId");
//   const redirectStatus = searchParams.get("redirect_status");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ITransaction | null>(null);

  useEffect(() => {
    // Only fetch if paymentIntent exists
    if (!paymentIntent) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getTransactionByPaymentIntentId(paymentIntent);
        setData(res);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paymentIntent]);

  // Show spinner while loading or waiting for paymentIntent
  if (loading || !paymentIntent) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-110px)]">
        <Spinner variant="ring" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-110px)]">
        <p className="text-gray-500">No payment data found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10 px-4">
      <StripeSuccessPage data={data} />
    </div>
  );
};

export default SuccessPage;
