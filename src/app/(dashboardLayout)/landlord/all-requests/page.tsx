"use client";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

import {
    getRequestForLandlord,
    updateRequestStatus,
} from "@/service/post/postService";
import { IRequestOfLandlord } from "@/types/request";
import { ColumnDef } from "@tanstack/react-table";
import {
    CircleCheck,
    Clock,
    Mail,
    PhoneCall,
    UsersRound,
    XCircleIcon,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AllRequestPage = () => {
    const [requests, setRequests] = useState<IRequestOfLandlord[]>([]);
    const [loading, setLoading] = useState(true);

    const handleStatusChange = async (
        requestId: string,
        status: "approve" | "reject" | "pending"
    ) => {
        // setLoading(true)

        try {
            const result = await updateRequestStatus(requestId, status);
            if (result?.success) {
                toast.success(`Status has been change to ${status} `);
                setRequests((preRequest) =>
                    preRequest.map((req) =>
                        req?._id === requestId ? { ...req, status: status } : req
                    )
                );
            }
        } catch (error) {
            toast.error((error as Error).message || `Status failed to to change `);
        } finally {
            //   setLoading(false)
        }
    };

    const columns = useMemo<ColumnDef<IRequestOfLandlord>[]>(
        () => [
            {
                accessorKey: "No.",
                header: "No.",
                cell: ({ row }) =>(
                    <div className="flex text-xs font-medium items-center gap-2 flex-nowrap">
                       <span className="border rounded-[100%] w-6 h-6 flex justify-center items-center border-gray-200 inset-shadow shadow-2xs"> {row.index + 1}</span>
                       <h1 className="text-gray-500 tracking-widest">-{row?.original?.rentalHouseId?.title}</h1>
                    </div>
                ),
            },
            {
                accessorKey: "rentalHouseId.title",
                header: "House Title",
            },

            {
                accessorKey: "Days",
                header: "Days",
                cell: ({ row }) => {
                    const startDate = new Date(row?.original?.date?.from);
                    const endDate = new Date(row?.original?.date?.to);
                    const timeDiff = endDate.getTime() - startDate.getTime();
                    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    // const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    return <span>{daysDiff} days</span>;
                },
            },
            {
                accessorKey: "Tenant Info",
                header: "Tenant Info",
                cell: ({ row }) => {
                    const tenant = row?.original?.tenantId;
                    return (
                        <div className="p-4 w-full h-full bg-transparent rounded-none flex flex-col items-start gap-3  ">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={tenant?.photoURL} alt={tenant?.username} />
                                    <AvatarFallback>
                                        {tenant?.username
                                            ?.split(" ")
                                            .map((n) => n.charAt(0).toUpperCase())
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-base flex items-center gap-2">
                                        <UsersRound className="w-5 h-5 text-gray-700" /> @
                                        {tenant?.username}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" /> {tenant?.email}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <PhoneCall className="w-4 h-4 text-gray-400" />{" "}
                                        {tenant?.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                    <div className="relative inline-block">
                        <select
                            value={row?.original?.status}
                            onChange={(e) =>
                                handleStatusChange(
                                    row?.original?._id,
                                    e.target.value as "approve" | "reject" | "pending"
                                )
                            }
                            className={`appearance-none
                                        pl-10 pr-9 py-2.5
                                        rounded-full
                                        font-semibold text-sm text-white
                                        cursor-pointer
                                        transition-all duration-300 ease-in-out
                                        shadow-md hover:shadow-lg
                                        transform hover: scale-105
                                        focus:outline-none focus:ring-3 focus:ring-offset-2
                                        ${row?.original?.status === "approve"
                                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-400"
                                    : row?.original?.status === "pending"
                                        ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
                                        : "bg-red-600 hover:bg-red-700 focus:ring-red-400"
                                }`}
                            style={{ minWidth: "150px" }}
                        >
                            <option
                                value="approve"
                                className="bg-white text-green-700 font-semibold"
                            >
                                ✓ Approve
                            </option>
                            <option
                                value="pending"
                                className="bg-white text-yellow-700 font-semibold"
                            >
                                ⏱ Pending
                            </option>
                            <option
                                value="reject"
                                className="bg-white text-red-700 font-semibold"
                            >
                                ✕ Reject
                            </option>
                        </select>

                        {/* Animated Icon */}
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            {row?.original?.status === "approve" ? (
                                <CircleCheck className="w-5 h-5 text-white animate-pulse" />
                            ) : row?.original?.status === "pending" ? (
                                <Clock
                                    className="w-5 h-5 text-white animate-spin"
                                    style={{ animationDuration: "3s" }}
                                />
                            ) : (
                                <XCircleIcon className="w-5 h-5 text-white" />
                            )}
                        </div>

                        {/* Chevron */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-white/80"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                ),
            },
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await getRequestForLandlord();
            setRequests(result?.data || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loader-overlay flex justify-center items-center">
                <Spinner variant="ring" />
            </div>
        );
    }

    return (
        <div className="p-5 space-y-4">
            <SectionHeader
                title="All Rental Requests"
                subtitle="Manage all rental requests from tenants"
                description="Review, approve, or reject rental requests submitted by tenants for your listed properties."
            />
            <DataTable columns={columns} data={requests} />
        </div>
    );
};

export default AllRequestPage;
