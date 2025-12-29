"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { getAllTransactions } from "@/service/pay";
import { ITransaction } from "@/types/pay";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";


const Page = () => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePrint = (data: ITransaction) => {
    if (!data) {
      toast.error("No transaction data available for printing.");
      return;
    }

    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Invoice</title>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- PRINT FIX -->
  <style>
    @page {
      size: A4;
      margin: 12mm;
    }

    @media print {
      body {
        margin: 0;
        background: white !important;
      }

      #invoicePay {
        min-height: auto !important;
        padding: 0 !important;
        background: white !important;
      }

      .invoice-card {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 12px !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      table, tr, td, th {
        page-break-inside: avoid !important;
      }

      body {
        zoom: 0.95;
      }
    }
  </style>
</head>

<body>
  <div id="invoicePay" class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="invoice-card max-w-3xl mx-auto bg-white shadow-lg rounded-lg px-8 py-5">

        <!-- BANNER / LOGO -->
<div class="flex items-center justify-center mb-6 bg-gray-100 p-4 rounded-lg">
  <img src="/logo.png" alt="Find Basa" class="h-16 object-contain" />
</div>
      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Invoice</h1>
          <p class="text-sm text-gray-500 mt-1">
            Invoice ID: <span class="font-medium">${data.paymentIntentId}</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Status</p>
          <span class="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
            ${data.paymentStatus?.status === "success" ? "PAID" : "UNPAID"}
          </span>
        </div>
      </div>

      <!-- BILLING -->
      <div class="grid grid-cols-2 gap-3 mt-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Billed To</h2>
          <p class="text-gray-800 font-medium">smpTest2 (Tenant)</p>
          <p class="text-sm text-gray-600">Email: ${data.requestId?.tenantId?.email ?? "N/A"
      }</p>
          <p class="text-sm text-gray-600">Phone: ${data.requestId?.tenantId?.phoneNumber ?? "N/A"
      }</p>
        </div>

        <div class="text-right">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Landlord</h2>
          <p class="text-gray-800 font-medium">smpTest</p>
          <p class="text-sm text-gray-600">Email: ${data.requestId?.landloardId?.email ?? "N/A"
      }</p>
          <p class="text-sm text-gray-600">Phone: ${data.requestId?.landloardId?.phoneNumber ?? "N/A"
      }</p>
        </div>
      </div>

      <!-- PROPERTY -->
      <div class="mt-6 border rounded-lg p-4 bg-gray-50">
        <h3 class="font-semibold text-gray-700 mb-2">Rental Property</h3>
        <p class="text-gray-800 font-medium">
          ${data.requestId?.rentalHouseId?.title ?? "N/A"}
        </p>
        <p class="text-sm text-gray-600">
          ${data.requestId?.rentalHouseId?.location?.division ?? ""},
          ${data.requestId?.rentalHouseId?.location?.district ?? ""},
          ${data.requestId?.rentalHouseId?.location?.subDistrict ?? ""},
          ${data.requestId?.rentalHouseId?.location?.streetAddress ?? ""}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          Rental Period:
          ${new Date(data.requestId?.date?.from ?? "").toLocaleDateString()} –
          ${new Date(data.requestId?.date?.to ?? "").toLocaleDateString()}
        </p>
      </div>

      <!-- TABLE -->
      <div class="mt-6">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left text-sm text-gray-600">
              <th class="py-2 px-3 border">Description</th>
              <th class="py-2 px-3 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-gray-700">
              <td class="py-2 px-3 border">Rent Payment (Card)</td>
              <td class="py-2 px-3 border text-right">$3,200.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TOTAL -->
      <div class="mt-4 flex justify-end">
        <div class="w-1/2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${data.amount ?? "N/A"}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between border-t mt-2 pt-2 font-semibold text-lg">
            <span>Total</span>
            <span>${data.amount ?? "N/A"}</span>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="mt-6 border-t pt-4 text-sm text-gray-500 flex justify-between">
        <p>Payment Method: <span class="font-medium text-gray-700">Card</span></p>
        <p>Transaction ID: <span class="font-medium text-gray-700">${data.transactionId
      }</span></p>
      </div>

      <div class="mt-8 text-center text-xs text-gray-400">
        Developed by <a href="https://salekmasudparvez.vercel.app" target="_blank" class="underline hover:text-gray-600 text-red-500 font-bold">Salek Masud Parvez</a>
      </div>

    </div>
  </div>

  
</body>
</html>
  `);

    doc.close();

    // PRINT ONLY ONCE
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      // cleanup
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  };

  const columns = useMemo<ColumnDef<ITransaction>[]>(
    () => [
      {
        accessorKey: "No",
        header: "No.",
        cell: ({ row }) => <div className="text-sm">{row.index + 1}</div>,
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.transactionId ?? row.original._id}
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amt =
            row.original.amount ??
            (row.original.amountCents ? row.original.amountCents / 100 : 0);
          return (
            <div className="text-sm font-medium">
              {row.original.currency ?? "BDT"} {amt}
            </div>
          );
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Method",
        cell: ({ row }) => (
          <div className="text-sm">{row.original.paymentMethod ?? "-"}</div>
        ),
      },
      {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.paymentStatus?.status ?? "-"}
          </div>
        ),
      },
      {
        accessorKey: "requestId.rentalHouseId.title",
        header: "House",
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.requestId?.rentalHouseId?.title}
          </div>
        ),
      },
      {
        accessorKey: "Print",
        header: "Print",
        cell: ({ row }) => {
          const tx = row.original;
          const id = tx._id ?? tx.transactionId;
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrint(row.original)}
              >
                <Printer />
                <span className="ml-2">Print</span>
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTransactions(
          pagination?.pageIndex,
          pagination?.pageSize
        );
        setPageCount(
          res?.meta ? Math.ceil(res.meta.total / res.meta.limit) : 0
        );
        setData(res?.data || []);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch transactions"
        );
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, [pagination?.pageIndex, pagination?.pageSize]);


  if(loading){
    return (
      <div className=" flex justify-center items-center min-h-[calc(100vh-110px)]">
        <Spinner variant="ring" />
      </div>
    );
  }

  return (
    <div className="p-5 relative space-y-4 min-h-[calc(100vh-110px)]">
      <SectionHeader
        title="Transactions"
        description="All payment transactions"
      />
      <div>
        <DataTable
          columns={columns}
          data={data}
          manualPagination={true}
          pageCount={pageCount}
          onPaginationChange={setPagination}
        />
      </div>
    </div>
  );
};

export default Page;
