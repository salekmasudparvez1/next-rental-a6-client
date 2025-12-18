"use client"

import { getAllPropertiesPublicFunction } from "@/service/post/postService";
import { RentalHouseFormData } from "@/types/post";
import { AlertCircle, AlertTriangle, Bed, BookOpen, CheckCircle, DollarSign, Pin, X, XCircle, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UseerContext";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";



const ViewDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<RentalHouseFormData>();
    const [openZoomPic, setOpenZoomPic] = useState<{ url: string, open: boolean; }>({ url: '', open: false });
    const [openBookingDialog, setOpenBookingDialog] = useState<{
        id: string;
        open: boolean;
    }>({
        id: "",
        open: false,
    });
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 5, 12),
        to: new Date(2025, 6, 15),
    })

    const { user } = useUser()
    const router = useRouter()

    const param: { id: string } = useParams();
    const id = param?.id


    useEffect(() => {
        let pageIndex
        let pageLimit
        const fetchData = async () => {
            const result = await getAllPropertiesPublicFunction(pageIndex, pageLimit, id)
            setData(result?.data?.data[0] || {})
            setLoading(false)
        }

        fetchData()


    }, [id])
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(user);

    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 my-10 ">
            {/*=======image show part-1 ============*/}
            <div className="lg:col-span-2  p-3 flex flex-col gap-5 justify-start items-start">
                <div className=" w-full">
                    <Image
                        src={data?.images ? data?.images[0] : ""}
                        alt="property image"
                        width={400}
                        height={400}
                        className="w-full transition-transform duration-300 "
                    />
                </div>
                <div className="flex justify-start items-center gap-3 border py-4 px-2 border-gray-300 [box-shadow:5px_5px_rgb(82_82_82)]">

                    {
                        data?.images &&
                        data?.images?.slice(0, 4)?.map((image, index) => {
                            console.log('images', image);
                            return (
                                <div key={index} className="relative group overflow-hidden cursor-pointer ">
                                    <Image
                                        src={image}
                                        alt="property image"
                                        width={100}
                                        height={100}
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                    <button onClick={() => setOpenZoomPic({ url: image, open: true })} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 border border-black rounded-full">
                                        <ZoomIn className="text-red-500 hover:text-red-800 transition-colors duration-300 w-6 h-6" />
                                    </button>
                                </div>


                            )
                        })
                    }

                </div>


            </div>
            {/*=======show post info - part-2 ============*/}
            <div className=" flex flex-col gap-4">
                <div className="relative pb-4 pt-8 px-2 border border-gray-200 rounded-md [box-shadow:3px_3px_rgb(82_82_82)]">
                    <h1 className="text-2xl text-wrap font-bold ">{data?.title}</h1>
                    <p className="text-sm text-gray-500">
                        {data?.description}
                    </p>
                    <Badge
                        variant={
                            data?.status === "available"
                                ? "default"
                                : data?.status === "rented"
                                    ? "destructive"
                                    : data?.status === "maintenance"
                                        ? "outline"
                                        : "secondary"
                        }
                        className="absolute top-1 right-1"

                    >
                        {data?.status === "available" ? (
                            <CheckCircle className="w-4 h-4 mr-1" />
                        ) : data?.status === "rented" ? (
                            <XCircle className="w-4 h-4 mr-1" />
                        ) : data?.status === "maintenance" ? (
                            <AlertTriangle className="w-4 h-4 mr-1" />
                        ) : null}

                        {data?.status}
                    </Badge>
                </div>
                <div className="relative p-4 border border-gray-200 rounded-md [box-shadow:3px_3px_rgb(82_82_82)] bg-white">
                    {/* Features Section */}
                    <div className="mb-4">
                        <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            <BookOpen /> Features
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data?.features?.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 py-1 rounded-full text-xs md:text-sm text-white"
                                    style={{ backgroundColor: feature?.color }}
                                >
                                    {feature?.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bedroom Section */}
                    <div className="flex items-center justify-start border-b border-gray-200 py-2 mb-4">
                        <div className="flex items-center gap-2 font-bold text-gray-700">
                            <Bed className="w-4 h-4 text-gray-500" /> Bedroom
                        </div>
                        <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm">{data?.bedroomNumber}</span>
                    </div>


                </div>
                {/* Location Section */}
                <div className=" rounded-md border border-gray-200 bg-white p-4 [box-shadow:3px_3px_rgb(82_82_82)]">
                    <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                        <Pin /> Location
                    </h2>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Division</span>
                            <span className="font-semibold">{data?.location?.division}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">District</span>
                            <span className="font-semibold">{data?.location?.district}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Upazila</span>
                            <span className="font-semibold">{data?.location?.subDistrict}</span>
                        </div>
                    </div>
                    {/* Price Section */}
                    <div className="flex py-3 mt-3 border-t border-t-gray-600 items-center text-red-500 text-sm font-semibold">
                        <span>Price:</span>
                        <DollarSign className="w-4 h-4 ml-1 mr-1" />
                        <span>{data?.rentAmount}/month</span>
                    </div>
                    <div
                        className="mb-4 flex-wrap flex items-center gap-2  border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                        <Button onClick={() => setOpenBookingDialog({ id: data?._id || "", open: true })} disabled={loading || !user} variant="destructive" className="w-full"> Book Now</Button>
                        {!user && <p className="text-gray-500 text-center bg-gray-200 flex justify-center w-full items-center gap-2 font-extralight py-1 px-2 text-sm">
                            <AlertCircle className="w-4" />
                            Please <button className="font-bold hover:border-b transition-all cursor-pointer duration-300 hover:text-red-500 text-black" onClick={() => router.push("/auth/login")}>Login</button> or <button className="font-bold hover:border-b transition-all duration-300 hover:text-red-500 text-black cursor-pointer" onClick={() => router.push('/auth/register')}>Regsiter</button>
                        </p>}
                    </div>
                </div>


            </div>

            {/* ===Booking dialog======== */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 px-2 py-10 bg-white [box-shadow:5px_5px_rgb(82_82_82)] border"
                initial={{ opacity: 0, scale: 0 }}
                animate={{

                    opacity: openBookingDialog?.open ? 1 : 0,
                    scale: openBookingDialog?.open ? 1 : 0,
                }}

                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="w-full rounded-lg border shadow-sm horizontal-calendar"
                />


            </motion.div>
            {/* ======zoom pic show dialog======= */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[calc(100vh-200px)] -translate-x-1/2 px-2 py-10 bg-white [box-shadow:5px_5px_rgb(82_82_82)] border"
                initial={{ opacity: 0, scale: 0 }}
                animate={{

                    opacity: openZoomPic?.open ? 1 : 0,
                    scale: openZoomPic?.open ? 1 : 0,
                }}

                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className="flex justify-end -mt-4 pb-3">
                    <Button onClick={() => setOpenZoomPic({ url: '', open: false })} variant="outline" ><X /></Button>
                </div>
                <Image
                    className="w-full"
                    src={openZoomPic?.url || "https://res.cloudinary.com/dncnvqrc6/image/upload/v1766069556/landscape-placeholder_k5uqlb.svg"}
                    alt="Property image"
                    width={400}
                    height={300}
                />

            </motion.div>

        </div>
    );
}

export default ViewDetailsPage;
