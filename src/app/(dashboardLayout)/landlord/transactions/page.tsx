
"use client"

import  { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { getAllTransactions } from "@/service/pay";
import { ITransaction } from "@/types/pay";
import toast from "react-hot-toast";

const Page = () => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [pageCount, setPageCount] = useState(0)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


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
        cell: ({ row }) => <div className="text-sm">{row.original.transactionId ?? row.original._id}</div>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amt = row.original.amount ?? (row.original.amountCents ? row.original.amountCents / 100 : 0);
          return <div className="text-sm font-medium">{row.original.currency ?? "BDT"} {amt}</div>;
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Method",
        cell: ({ row }) => <div className="text-sm">{row.original.paymentMethod ?? "-"}</div>,
      },
      {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => <div className="text-sm">{row.original.paymentStatus?.status ?? "-"}</div>,
      },
      {
        accessorKey: "requestId.rentalHouseId.title",
        header: "House",
        cell: ({ row }) => <div className="text-sm">{row.original.requestId?.rentalHouseId?.title ?? "-"}</div>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          const date = row.original.requestId?.createdAt ?? undefined;
          return <div className="text-sm">{date ? new Date(date).toLocaleString() : "-"}</div>;
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTransactions(pagination?.pageIndex, pagination?.pageSize);
        setPageCount(res?.meta ? Math.ceil(res.meta.total / res.meta.limit) : 0);
        setData(res?.data || []);
        
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch transactions");
      }
    };

    fetchData();
  }, [pagination?.pageIndex, pagination?.pageSize]);

  return (
    <div className="p-5 space-y-4 min-h-[calc(100vh-110px)]">
      <SectionHeader title="Transactions" description="All payment transactions" />
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
