"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { getRequestForTenant } from "@/service/post/postService";
import { IRequestOfTenant } from "@/types/request";
import { CircleAlert, CircleCheckBig, Copy, DollarSign, Timer, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { totatlAmountCalculate } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

const ViewAllRequestPage = () => {
    const router = useRouter();
    const [data, setData] = useState<IRequestOfTenant[]>([]);
    const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    console.log(data);

    // Copy to clipboard function
    const handleCopy = async (text?: string) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText("0" + text);
            setCopiedPhone(text);
            setTimeout(() => setCopiedPhone(null), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Table columns
    const columns = useMemo<ColumnDef<IRequestOfTenant>[]>(
        () => [
            {
                accessorKey: "No.",
                header: "No.",
                cell: ({ row }) => (<div className="flex text-xs font-medium items-center gap-2 flex-nowrap">
                    <span className="border rounded-[100%] w-6 h-6 flex justify-center items-center border-gray-200 inset-shadow shadow-2xs"> {row.index + 1}</span>
                    <h1 className="text-gray-500 tracking-widest">-{row?.original?.rentalHouseId?.title}</h1>
                </div>)
            },
            {
                accessorKey: "rentalHouseId.title",
                header: "House Info",
                cell: ({ row }) => {
                    const status = row?.original?.status;
                    const landlord = row?.original?.landloardId;
                    const houseTitle = row?.original?.rentalHouseId?.title;
                    const location = row?.original?.rentalHouseId?.location;
                    // console.log(status==="approve");
                    if (status === "approve") {
                        return (
                            <div className="space-y-2">
                                {/* House Info */}
                                <div className="text-sm font-bold text-gray-600 bg-gray-200 px-2 py-1">House Info</div>
                                <div className="flex text-sm gap-1">
                                    <h1 className="font-medium">Name:</h1>
                                    <h1 className="font-light">{houseTitle}</h1>
                                </div>

                                { } {/* Contact Info */}
                                <div className="text-sm font-bold text-gray-600 bg-gray-200 px-2 py-1">Contact Info</div>
                                <div className="flex text-sm gap-1">
                                    <h1 className="font-medium">Username:</h1>
                                    <h1 className="font-light tracking-wide ">@{landlord?.username}</h1>
                                </div>

                                {/* Email */}
                                <div className="flex gap-1 items-center text-sm">
                                    <h1 className="font-medium">Email:</h1>
                                    <h1 className="font-light tracking-wide ">{landlord?.email}</h1>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-1 items-center text-sm">
                                    <h1 className="font-medium">Phone:</h1>
                                    <h1 className="font-light flex grow tracking-wide bg-gray-200 rounded px-2 py-1 border border-gray-400 items-center">
                                        +880{landlord?.phoneNumber}
                                        <button
                                            onClick={() => handleCopy(landlord?.phoneNumber)}
                                            className="ml-auto flex items-center justify-center transition"
                                        >
                                            {copiedPhone === landlord?.phoneNumber ? (
                                                <CopyCheck className="w-4 h-4 text-black " />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </h1>
                                </div>

                                {/* Address */}
                                <div className="flex gap-1 items-center text-sm">
                                    <h1 className="font-medium">Address:</h1>
                                    <h1 className="font-light tracking-wide ">{location?.division},{location?.district},{location?.subDistrict}</h1>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <>
                                {/* House Info */}
                                <div className="text-sm font-bold text-gray-600 bg-gray-200 px-2 py-1" > House Info</div >
                                <div className="flex text-sm gap-1">
                                    <h1 className="font-medium">Name:</h1>
                                    <h1 className="font-light">{houseTitle}</h1>
                                </div>
                            </>
                        )
                    }


                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                    <div className="text-center">
                        <span
                            className={`rounded-full px-3 py-1 text-xs flex justify-center items-center gap-1 font-semibold text-white shadow backdrop-blur ${row?.original?.status === "pending"
                                ? "bg-amber-600/90"
                                : row?.original?.status === "approve"
                                    ? "bg-emerald-600/90"
                                    : "bg-rose-600/90"
                                }`}
                        >
                            {row?.original?.status === "approve" ? <CircleCheckBig /> : row?.original?.status === "pending" ? <Timer /> : <CircleAlert />}{" "}
                            {row?.original?.status}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: "rentAmount",
                header: "Rent Amount",
                cell: ({ row }) => {
                    const date = row?.original?.date;
                    const rentData = row?.original?.rentalHouseId;
                    const rentAmountPerMonth = Number(rentData?.rentAmount || 0);

                    return (
                        <div className="flex flex-col justify-center items-start gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Rent Amount:</span>{" "}
                                <span className="flex items-center gap-1 font-medium text-red-500">
                                    <DollarSign className="w-4 h-4" /> {rentAmountPerMonth}/month
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total:</span>{" "}
                                <span className="flex items-center gap-1 font-medium text-red-500">
                                    <DollarSign className="w-4 h-4" /> {totatlAmountCalculate(date, rentAmountPerMonth).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Pay",
                header: "Pay",
                cell: ({ row }) => {
                    return row?.original.status === "approve" && row?.original?.paymentStatus === "UNPAID" ? (
                        <Button
                            variant="outline"
                            type="button"
                            disabled={row?.original?.status === "approve" || row?.original?.paymentStatus === "UNPAID" ? false : true}
                            className="px-4 py-2 bg-green-600 text-white hover:text-white duration-300 rounded hover:bg-green-700 transition"
                            onClick={() => router.push(`/tenant/pay-request/${row.original._id}`)}
                        >
                            Pay Now
                        </Button>
                    ) : row?.original.status === "approve" && row?.original?.paymentStatus === "PAID" ?
                        (
                            <span className="flex items-center gap-2 text-green-600 font-semibold">
                                <CircleCheckBig className="w-5 h-5" />
                                Paid
                            </span>
                        ) : row?.original.status === "pending" ? (
                            <span className="flex items-center gap-2 text-amber-600 font-semibold">
                                <Timer className="w-5 h-5" />
                                Pending
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-rose-600 font-semibold">
                                <CircleAlert className="w-5 h-5" />
                                Rejected
                            </span>
                        );
                },
            },
        ],
        [router, copiedPhone]
    );

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await getRequestForTenant();

                setData(res?.data || []);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to fetch requests");

            } finally {
                setLoading(false);
            }

        };
        fetchRequests();
    }, []);
    if (loading) {
        return (
            <div className=" flex justify-center items-center min-h-[calc(100vh-110px)]">
                <Spinner variant="ring" />
            </div>
        );
    }
    return (
        <div className="p-5 space-y-4 min-h-[calc(100vh-110px)]">
            <SectionHeader title="All Request" description="Tenant can view all request of rent houses and pay" />
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default ViewAllRequestPage;
