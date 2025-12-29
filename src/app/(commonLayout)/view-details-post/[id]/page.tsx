"use client";

import { createRequest, getAllPropertiesPublicFunction, getSingleRequestForTenantByInfo } from "@/service/post/postService";
import { RentalHouseFormData } from "@/types/post";
import { AlertCircle, AlertTriangle, Bed, BookOpen, CheckCircle, CircleCheckBig, DollarSign, Pin, Send, X, XCircle, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UseerContext";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { IRequestOfTenant } from "@/types/request";
import { Spinner } from "@/components/ui/spinner";

const ViewDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [data, setData] = useState<RentalHouseFormData>();
  const [openZoomPic, setOpenZoomPic] = useState<{ url: string; open: boolean }>({ url: "", open: false });
  const [openBookingDialog, setOpenBookingDialog] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [requestData, setRequestData] = useState<IRequestOfTenant | null>(null);
  const [reFetchRequestData, setReFetchRequestData] = useState(0);

  const { user } = useUser();
  const router = useRouter();
  const param: { id: string } = useParams();
  const id = param?.id;

  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllPropertiesPublicFunction(undefined, undefined, id);
        setData(result?.data?.data[0] || undefined);
      } catch {
        setData(undefined);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Fetch tenant request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const result = await getSingleRequestForTenantByInfo(id);
        setRequestData(result?.data ?? null);
        if (result?.data?.date) {
          setDateRange({ from: result.data.date.from, to: result.data.date.to });
        }
      } catch {
        setRequestData(null);
      } finally {
        setLoading(false);
        setLoadingRequest(false);
      }
    };
    fetchRequest();
  }, [id, reFetchRequestData]);

  const handleSendRequest = async (propertyId: string, date: DateRange | undefined) => {
    if (!user) return toast.error("Please login first");
    if (!date) return toast.error("Please select date");
    setLoadingRequest(true);
    try {
      const res = await createRequest(propertyId, date);
      if (res.success) toast.success("Your request has been sent");
      setDateRange(undefined);
      setOpenBookingDialog({ id: "", open: false });
      setReFetchRequestData((prev) => prev + 1);
    } catch (error) {
      toast.error((error as Error).message || "Request failed");
    } finally {
      setLoadingRequest(false);
    }
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (loading || loadingRequest) {
    return (
      <div className="loader-overlay h-[calc(100vh-64px)] flex justify-center items-center">
        <Spinner variant="ring" />
      </div>
    );
  }

  // --- BUTTON LOGIC FIXED ---
  const renderBookingButton = () => {
    if (!user) return null;

    if (data?.status === "available") {
      if (!requestData) {
        return <Button onClick={() => setOpenBookingDialog({ id: data?._id || "", open: true })} variant="destructive" className="w-full">Book Now</Button>;
      }

      switch (requestData.status) {
        case "pending":
          return <Button disabled variant="destructive" className="w-full">Requested</Button>;
        case "reject":
          return <Button disabled variant="destructive" className="w-full">Request Rejected</Button>;
        case "approve":
          switch (requestData.paymentStatus) {
            case "PAID":
              return <span className="flex items-center justify-center w-full py-2 text-green-600 border border-green-600 font-semibold"><CircleCheckBig className="w-5 h-5 mr-2" /> Paid</span>;
            case "UNPAID":
            default:
              return <Button onClick={() => router.push(`/tenant/pay-request/${requestData._id}`)} className="w-full bg-green-600 hover:bg-green-700">Pay Now</Button>;
          }
        default:
          return null;
      }
    } else if (data?.status === "rented") {
      return <Button disabled variant="destructive" className="w-full">Not Available Now</Button>;
    } else if (data?.status === "maintenance") {
      return <Button disabled variant="destructive" className="w-full">Under Maintenance</Button>;
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 my-10 gap-5">
      {/* Property Images */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <Image
          src={data?.images?.[0] || "https://res.cloudinary.com/dncnvqrc6/image/upload/v1766069556/landscape-placeholder_k5uqlb.svg"}
          alt="property image"
          width={400}
          height={400}
          className="w-full transition-transform duration-300"
        />
        <div className="flex gap-3 border py-4 px-2 border-gray-300 [box-shadow:5px_5px_rgb(82_82_82)]">
          {data?.images?.slice(0, 4).map((image, index) => (
            <div key={index} className="relative group overflow-hidden cursor-pointer">
              <Image src={image} alt="property image" width={100} height={100} className="object-cover transition-transform duration-300 group-hover:scale-110" />
              <button
                onClick={() => setOpenZoomPic({ url: image, open: true })}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 border border-black rounded-full"
              >
                <ZoomIn className="text-red-500 hover:text-red-800 transition-colors duration-300 w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Property Info & Booking */}
      <div className="flex flex-col gap-4">
        <div className="relative pb-4 pt-8 px-2 border border-gray-200 rounded-md [box-shadow:3px_3px_rgb(82_82_82)]">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p className="text-sm text-gray-500">{data?.description}</p>
          <Badge
            variant={data?.status === "available" ? "default" : data?.status === "rented" ? "destructive" : "outline"}
            className="absolute top-1 right-1"
          >
            {data?.status === "available" ? <CheckCircle className="w-4 h-4 mr-1" /> : data?.status === "rented" ? <XCircle className="w-4 h-4 mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
            {data?.status}
          </Badge>
        </div>

        {/* Features & Bedroom */}
        <div className="relative p-4 border border-gray-200 rounded-md [box-shadow:3px_3px_rgb(82_82_82)] bg-white">
          <h2 className="mb-2 flex items-center gap-2 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
            <BookOpen /> Features
          </h2>
          <div className="flex flex-wrap gap-2">{data?.features?.map((f, i) => <div key={i} className="px-3 py-1 rounded-full text-xs md:text-sm text-white" style={{ backgroundColor: f.color }}>{f.name}</div>)}</div>

          <div className="flex items-center justify-start border-b border-gray-200 py-2 mt-4">
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <Bed className="w-4 h-4 text-gray-500" /> Bedroom
            </div>
            <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm">{data?.bedroomNumber}</span>
          </div>
        </div>

        {/* Location & Booking */}
        <div className="rounded-md border border-gray-200 bg-white p-4 [box-shadow:3px_3px_rgb(82_82_82)]">
          <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
            <Pin /> Location
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between"><span className="font-medium text-gray-500">Division</span><span className="font-semibold">{data?.location?.division}</span></div>
            <div className="flex justify-between"><span className="font-medium text-gray-500">District</span><span className="font-semibold">{data?.location?.district}</span></div>
            <div className="flex justify-between"><span className="font-medium text-gray-500">Upazila</span><span className="font-semibold">{data?.location?.subDistrict}</span></div>
          </div>

          <div className="flex py-3 mt-3 border-t border-t-gray-600 items-center text-red-500 text-sm font-semibold">
            <span>Price:</span><DollarSign className="w-4 h-4 ml-1 mr-1" /><span>{data?.rentAmount}/month</span>
          </div>

          <div className="mt-4">{renderBookingButton()}</div>

          {!user && (
            <p className="text-gray-500 text-center bg-gray-200 flex justify-center w-full items-center gap-2 font-extralight py-1 px-2 text-sm mt-2">
              <AlertCircle className="w-4" />
              Please <button onClick={() => router.push("/auth/login")} className="font-bold hover:text-red-500">Login</button> or <button onClick={() => router.push("/auth/register")} className="font-bold hover:text-red-500">Register</button>
            </p>
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <AnimatePresence>
        {openBookingDialog.open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenBookingDialog({ id: "", open: false })}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-md [box-shadow:5px_5px_rgb(82_82_82)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <Button onClick={() => setOpenBookingDialog({ id: "", open: false })} variant="outline"><X /></Button>
              </div>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="w-full rounded-lg border-none"
                disabled={isPast}
              />
              <Button
                disabled={!dateRange?.from || !dateRange?.to || !!requestData}
                onClick={() => handleSendRequest(openBookingDialog.id, dateRange)}
                className="w-full mt-2 rounded-none"
              >
                {loadingRequest ? <Spinner /> : <Send />}
                {loadingRequest ? "Request is sending..." : requestData ? "Already Requested" : "Send Request"}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Zoom Image */}
      <AnimatePresence>
        {openZoomPic.open && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vh-200px)] px-2 py-10 bg-white [box-shadow:5px_5px_rgb(82_82_82)] border z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="flex justify-end mb-3">
              <Button onClick={() => setOpenZoomPic({ url: "", open: false })} variant="outline"><X /></Button>
            </div>
            <Image
              src={openZoomPic.url || "https://res.cloudinary.com/dncnvqrc6/image/upload/v1766069556/landscape-placeholder_k5uqlb.svg"}
              alt="Property image"
              width={400}
              height={300}
              className="w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewDetailsPage;
