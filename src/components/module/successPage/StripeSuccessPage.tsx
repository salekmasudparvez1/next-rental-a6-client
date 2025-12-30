"use client";

import React from "react";
import { CheckCircle, PrinterCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ITransaction } from "@/types/pay";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StripeSuccessPageProps {
  data: ITransaction;
}

export default function StripeSuccessPage({ data }: StripeSuccessPageProps) {
  const router = useRouter();

  const handlePrint = async (data: ITransaction) => {
    if (!data) {
      toast.error("No transaction data available for printing.");
      return;
    }

    // --- KEEP YOUR PRINT LOGIC AS IS ---
    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe?.contentWindow?.document;
    if (!doc) return;
    doc?.open();
    doc?.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Payment Successful</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div class="w-full max-w-2xl bg-white shadow-lg rounded-xl">
          <div class="text-center p-8">
            <svg class="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 class="text-2xl font-semibold mt-4">
              ${data?.paymentStatus?.status === "success" ? "Payment Successful 🎉" : "Payment Failed 😔"}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              ${data.paymentStatus.message}
            </p>
          </div>

          <div class="px-8 pb-8 space-y-6 text-sm">
            <!-- Payment Info -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-500">Transaction ID</p>
                <p class="font-medium break-all">${data.transactionId}</p>
              </div>
              <div>
                <p class="text-gray-500">Amount Paid</p>
                <p class="font-medium">$${data.amount} ${data?.currency?.toUpperCase() ?? ""}</p>
              </div>
              <div>
                <p class="text-gray-500">Payment Method</p>
                <p class="font-medium">${data.paymentMethod}</p>
              </div>
              <div>
                <p class="text-gray-500">Paid At</p>
                <p class="font-medium">${new Date(data.createdAt ?? "").toLocaleString()}</p>
              </div>
            </div>

            <hr />

            <!-- Rental Info -->
            <div class="space-y-2">
              <h3 class="font-semibold">🏠 Rental Details</h3>
              <div>
                <p class="text-gray-500">House</p>
                <p class="font-medium">${data?.requestId?.rentalHouseId?.title ?? "N/A"}</p>
              </div>
              <div>
                <p class="text-gray-500">Date</p>
                <p class="font-medium">
                  ${(data?.requestId?.date?.from ? new Date(data.requestId.date.from).toDateString() : "N/A")}
                  →
                  ${new Date(data?.requestId?.date?.to ?? "").toDateString() ?? "N/A"}
                </p>
              </div>
            </div>

            <hr />

            <!-- Users -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold mb-1">Tenant</h4>
                <p class="font-medium">@${data?.requestId?.tenantId?.username ?? "N/A"}</p>
                <p class="text-gray-500">${data?.requestId?.tenantId?.email ?? "N/A"}</p>
              </div>
              <div>
                <h4 class="font-semibold mb-1">Landlord</h4>
                <p class="font-medium">@${data?.requestId?.landloardId?.username ?? "N/A"}</p>
                <p class="text-gray-500">${data?.requestId?.landloardId?.email ?? "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="text-2xl mt-4">
            {data?.paymentStatus?.status === "success" ? "Payment Successful 🎉" : "Payment Failed 😔"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {data?.paymentStatus?.message ?? "Payment completed"}
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Payment Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Transaction ID" value={data?.transactionId ?? data?._id ?? "N/A"} />
            <Info
              label="Amount Paid"
              value={
                data?.amount != null
                  ? `$${data.amount} ${data?.currency?.toUpperCase() ?? ""}`
                  : "N/A"
              }
            />
            <Info label="Payment Method" value={data?.paymentMethod ?? "N/A"} />
            <Info
              label="Paid At"
              value={data?.createdAt ? new Date(data.createdAt).toLocaleString() : "N/A"}
            />
          </div>

          <Separator />

          {/* Rental Info */}
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">🏠 Rental Details</h3>
            <Info label="House" value={data?.requestId?.rentalHouseId?.title ?? "N/A"} />
            <Info
              label="Date"
              value={
                data?.requestId?.date?.from && data?.requestId?.date?.to
                  ? `${new Date(data.requestId.date.from).toDateString()} → ${new Date(
                      data.requestId.date.to
                    ).toDateString()}`
                  : "N/A"
              }
            />
          </div>

          <Separator />

          {/* Users */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Tenant</h4>
              <p>@{data?.requestId?.tenantId?.username ?? "N/A"}</p>
              <p className="text-muted-foreground">{data?.requestId?.tenantId?.email ?? ""}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Landlord</h4>
              <p>@{data?.requestId?.landloardId?.username ?? "N/A"}</p>
              <p className="text-muted-foreground">{data?.requestId?.landloardId?.email ?? ""}</p>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => router.push("/tenant/all-requests")} className="w-full">
              View Booking
            </Button>
            <Button onClick={() => handlePrint(data)} variant="outline" className="w-full flex items-center justify-center gap-2">
              <PrinterCheck /> Print Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Info component
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium truncate">{value}</p>
    </div>
  );
}
