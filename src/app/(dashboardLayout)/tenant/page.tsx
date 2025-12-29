"use client";
import { BadgeDollarSign, Calendar as CalendarIcon, CreditCard, Home, Wallet } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import React, { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { getTransactionByStatus } from '@/service/pay';
import toast from 'react-hot-toast';
import { ITransaction } from '@/types/pay';

const Page = () => {
    const [loading, setLoading] = React.useState(false);
    const [getData, setGetData] = React.useState<ITransaction[] | []>([]);
    const data = getData[0];
    const [date, setDate] = React.useState<{ from: Date | null; to: Date | null } | null>({
        from: null,
        to: null,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTransactionByStatus()
                setGetData(res.data || []);
                if (res.data) {
                    setDate({
                        from: new Date(res.data.fromDate),
                        to: new Date(res.data.toDate),
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error(error instanceof Error ? error.message : "Failed to fetch transaction status");
            } finally {
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    if (loading) {
        return (
            <div className=" flex justify-center items-center min-h-[calc(100vh-110px)]">
                <Spinner variant="ring" />
            </div>
        );
    }
    return (
        <div className="p-5 space-y-6 min-h-[calc(100vh-110px)]">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

                {/* Tenant Info */}
                <div className="border border-gray-200 rounded-sm hover:shadow-none h-full transition-all duration-500 [box-shadow:5px_5px_rgb(82_82_82)] p-4 space-y-4">
                    <div className="flex items-center gap-2 font-bold text-red-700">
                        <Home className="w-5 h-5" />
                        Tenant Information
                    </div>

                    {!getData.length ? (
                        <div className="bg-red-50 p-3 rounded-sm flex justify-center items-center w-full min-h-20">
                            No Booking Found
                        </div>
                    ) : (
                        <div className="bg-red-50 p-3 rounded-sm flex justify-between w-full">
                            <span className="text-sm font-medium text-gray-700">
                                Current Property:
                            </span>
                            <span className="text-sm text-gray-600">
                                {data?.requestId?.rentalHouseId?.title || "N/A"}
                            </span>
                        </div>
                    )}
                </div>

                {/* Date Info */}
                <div className="border border-gray-200 rounded-sm hover:shadow-none transition-all duration-500 [box-shadow:5px_5px_rgb(82_82_82)] p-4 space-y-4 bg-white">
                    <div className="flex items-center gap-2 font-bold text-red-700">
                        <CalendarIcon className="w-5 h-5" />
                        Date Information
                    </div>

                    {!getData.length ? (
                        <div className="bg-red-50 p-3 rounded-sm flex justify-center items-center w-full min-h-20">
                            No Booking Found
                        </div>
                    ) : (
                        <>
                            <div className="bg-red-50 p-3 rounded-sm flex justify-between w-full">
                                <span className="text-sm font-medium text-gray-700">
                                    Move-in Date
                                </span>
                                <span className="text-sm text-gray-600">
                                    {date?.from ? date.from.toLocaleDateString() : "N/A"}
                                </span>
                            </div>

                            <div className="bg-red-50 p-3 rounded-sm flex justify-between w-full">
                                <span className="text-sm font-medium text-gray-700">
                                    Move-out Date
                                </span>
                                <span className="text-sm text-gray-600">
                                    {date?.to ? date.to.toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* Payment Summary */}
                <div className="border border-gray-200 rounded-sm hover:shadow-none transition-all duration-500 [box-shadow:5px_5px_rgb(82_82_82)] p-4 space-y-4 bg-white">
                    <div className="flex items-center gap-2 font-bold text-red-700">
                        <CreditCard className="w-5 h-5" />
                        Payment Summary
                    </div>

                    {!getData.length ? (
                        <div className="bg-red-50 p-3 rounded-sm flex justify-center items-center w-full min-h-20">
                            No Booking Found
                        </div>
                    ) : (
                        <>
                            <div className="bg-red-50 p-3 rounded-sm flex justify-between items-center w-full">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <BadgeDollarSign className="w-4 h-4 text-red-600" />
                                    Rental Amount
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {data?.amount ? `$ ${data.amount}` : "$ 0"}
                                </span>
                            </div>

                            <div className="bg-red-50 p-3 rounded-sm flex justify-between items-center w-full">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Wallet className="w-4 h-4 text-red-600" />
                                    Due Amount
                                </div>
                                <span className="text-sm font-semibold text-green-600">
                                    ৳ 0
                                </span>
                            </div>

                            <div className="bg-red-50 p-3 rounded-sm flex justify-between items-center w-full">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CreditCard className="w-4 h-4 text-red-600" />
                                    Paid Amount
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {data?.amount ? `$ ${data.amount}` : "$ 0"}
                                </span>
                            </div>
                        </>
                    )}
                </div>

            </div>

            {/* Calendar */}
            <div className="border border-gray-200 md:w-1/2 rounded-sm hover:shadow-none transition-all duration-500 [box-shadow:5px_5px_rgb(82_82_82)] p-4 space-y-4 bg-white">
                <div className="flex items-center gap-2 font-bold text-red-700">
                    <CalendarIcon className="w-5 h-5" />
                    Booking Date Range
                </div>
                {!getData.length ? (
                    <div className="bg-red-50 p-3 rounded-sm flex justify-center items-center w-full min-h-20">
                        No Booking Found
                    </div>
                ) : (
                    <Calendar
                        defaultMonth={date?.from ?? undefined}
                        selected={date ? [date.from, date.to].filter((d): d is Date => d !== null) : []}
                        numberOfMonths={1}
                        className="rounded-md [box-shadow:5px_5px_rgb(82_82_82)] w-full pointer-events-none"
                        captionLayout="dropdown"
                    />
                )}
            </div>
        </div>




    );
}

export default Page;
