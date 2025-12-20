"use client";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { IRequestOfTenant } from "@/types/request";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";


const ViewAllRequestPage = () => {
    const router = useRouter();

    const columns = useMemo<ColumnDef<IRequestOfTenant>[]>(
        () => [
            {
                accessorKey: "No.",
                header: "No.",
                cell: ({ row }) => row.index + 1,
            },
            {
                accessorKey: "houseTitle",
                header: "House Title",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                accessorKey: "rentAmount",
                header: "Rent Amount",
            },
            {
                accessorKey: "Pay",
                header: "Pay",
                cell: ({ row }) => (
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => router.push(`/tenant/pay-request/${row.original._id}`)}
                    >
                        Pay Now
                    </button>
                ),
            }
        ],
        [router]
    );

    return (
        <div className="p-5 space-y-4  min-h-[calc(100vh-110px)]">
            <SectionHeader title="All Request" description="Tenant can view all request of rent houses and pay" />
            <div>

                <DataTable
                    columns={columns}
                    data={[]}
                />
            </div>
        </div>
    );
}

export default ViewAllRequestPage;
