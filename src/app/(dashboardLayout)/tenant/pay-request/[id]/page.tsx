"use client";

import CheckoutForm from "@/components/module/check-out/CheckoutFrom";
import { totatlAmountCalculate } from "@/lib/utils";
import { getSingleRequestForTenant } from "@/service/post/postService";
import { IRequestOfTenant } from "@/types/request";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PayRequestPage = () => {
  const [data, setData] = useState<IRequestOfTenant>({} as IRequestOfTenant);

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    const getFetchedData = async () => {
      try {
        const res = await getSingleRequestForTenant(id);
        setData(res?.data);
      } catch (error) {
        toast.error(
          (error as Error).message || "Failed to fetch request data."
        );
      }
    };

    getFetchedData();
  }, [id]);

  return (
  <div className="min-h-screen bg-gray-50  px-4 py-6">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 text-center  sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Complete Your Payment
        </h1>
        <p className="mt-1 text-gray-600 max-w-2xl">
          Review your rental request and securely complete your payment.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Request Details */}
        <div className="rounded-2xl [box-shadow:5px_5px_rgb(82_82_82)] border-gray-200 bg-white p-5 sm:p-6 border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Request Details
          </h2>
          <div>
            <Image
              src={data?.rentalHouseId?.images?.[0] || "/placeholder-image.png"}
              alt={data?.rentalHouseId?.title || "House Image"}
              width={400}
              height={300}
              className="rounded-lg object-cover mb-4 w-full h-48 sm:h-64"
            />
          </div>

          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">House Name</span>
              <span className="font-medium text-gray-900 text-right">
                {data?.rentalHouseId?.title || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Bedroom</span>
              <span className="font-medium text-gray-900">
                {data?.rentalHouseId?.bedroomNumber ?? "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Rental Period</span>
              <span className="font-medium text-gray-900 text-right">
                {data?.date?.from && data?.date?.to
                  ? `${new Date(data.date.from).toLocaleDateString()} → ${new Date(
                      data.date.to
                    ).toLocaleDateString()}`
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Rent / Month</span>
              <span className="font-medium text-gray-900">
                ${data?.rentalHouseId?.rentAmount ?? "-"}
              </span>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between items-center text-base font-semibold">
              <span>Total Amount</span>
              <span className="text-green-600">
                $
                {totatlAmountCalculate(
                  data?.date,
                  Number(data?.rentalHouseId?.rentAmount || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-2xl bg-white p-5 [box-shadow:5px_5px_rgb(82_82_82)] sm:p-6 border border-gray-200 ">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Details
          </h2>

          <CheckoutForm />
        </div>
      </div>
    </div>
  </div>
);

};

export default PayRequestPage;
