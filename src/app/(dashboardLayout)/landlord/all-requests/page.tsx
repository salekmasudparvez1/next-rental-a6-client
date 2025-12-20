"use client";
import { DataTable } from "@/components/core/data-table/Table";
import SectionHeader from "@/components/module/sectionHeader/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

import { getRequestForLandlord, updateRequestStatus } from "@/service/post/postService";
import { IRequestOfLandlord } from "@/types/request";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Clock, Mail, PhoneCall, UsersRound, XCircleIcon } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";


const AllRequestPage = () => {
    const [requests, setRequests] = useState<IRequestOfLandlord[]>([]);
    const [loading, setLoading] = useState(true);

    const handleStatusChange = async (requestId: string, status: 'approve' | 'reject' | 'pending') => {
        setLoading(true)

        try {
            const result = await updateRequestStatus(requestId, status);
            if (result?.success) {
                toast.success(`Status has been change to ${status} `)
                setRequests((preRequest) =>
                    preRequest.map((req) =>
                        req?._id === requestId ? { ...req, status: status } : req
                    )
                )

            }

        } catch (error) {
            toast.error((error as Error).message || `Status failed to to change `)
        }finally{
          setLoading(false)
        }
    }


    const columns = useMemo<ColumnDef<IRequestOfLandlord>[]>(

        () => [
            {
                accessorKey: "No.",
                header: "No.",
                cell: ({ row }) => row.index + 1,
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
                                        <UsersRound className="w-5 h-5 text-gray-700" /> @{tenant?.username}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" /> {tenant?.email}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <PhoneCall className="w-4 h-4 text-gray-400" /> {tenant?.phoneNumber}
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
                    <div className="w-full flex items-center justify-center">
                        <Select
                            value={row?.original?.status}
                            onValueChange={(e) => handleStatusChange(row?.original?._id, e as 'approve' | 'reject' | 'pending')}
                        >
                            <SelectTrigger
                                className={`w-45 font-medium ${row?.original?.status === "approve"
                                        ? "bg-green-600 text-white hover:bg-green-700"
                                        : row?.original?.status === "pending"
                                            ? "bg-yellow-500 text-white hover:bg-yellow-700"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                    }`}
                            >
                                <SelectValue className="text-white">
                                    {row?.original?.status
                                        ? row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)
                                        : "Select Status"}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent className="rounded-xl border border-gray-200 bg-white shadow-lg">
                                <SelectGroup>
                                    <SelectLabel className="px-2 py-1 text-xs font-semibold text-gray-500">
                                        Select Status
                                    </SelectLabel>

                                    <SelectItem value="approve" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 focus:bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="font-medium text-green-700">Approve</span>
                                    </SelectItem>

                                    <SelectItem value="pending" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-yellow-50 focus:bg-yellow-50">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span className="font-medium text-yellow-700">Pending</span>
                                    </SelectItem>

                                    <SelectItem value="reject" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 focus:bg-red-50">
                                        <XCircleIcon className="h-4 w-4 text-red-600" />
                                        <span className="font-medium text-red-700">Reject</span>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>


                    </div>

                ),
            },

        ],
        []
    );

    useEffect(() => {

        const fetchData = async () => {
            const result = await getRequestForLandlord()
            setRequests(result?.data || []);
            setLoading(false);
            ;
        }
        fetchData()

    }, []);

    if (loading) {
        return (
            <div className="loader-overlay flex justify-center items-center">
                <Spinner variant="ring" />
            </div>
        )
    }


    return (
        <div className="p-5 space-y-4">
            <SectionHeader
                title="All Rental Requests"
                subtitle="Manage all rental requests from tenants"
                description="Review, approve, or reject rental requests submitted by tenants for your listed properties."
            />
            <DataTable
                columns={columns}
                data={requests}
            />
        </div>
    );
}

export default AllRequestPage;
