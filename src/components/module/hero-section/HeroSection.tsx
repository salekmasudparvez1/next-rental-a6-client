"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPropertiesPublicFunction } from "@/service/post/postService";
import { RentalHouseFormData } from "@/types/post";
import { ArrowDown, Bed, DollarSign, Eye, Filter, FilterIcon, MapPinIcon, SearchCheck } from "lucide-react";
import { RentalCardSkeleton } from "@/components/core/data-table/card/RentalCardSkeleton";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";


export default function HeroSection() {
  const [rentals, setRentals] = useState<Array<RentalHouseFormData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFilter, setOpenFiletr] = useState(false)
  const router = useRouter()





  useEffect(() => {
    const getFilteredRentals = async () => {
      const res = await getAllPropertiesPublicFunction()
      setRentals(res?.data?.data);
      setLoading(false);
    }
    getFilteredRentals();
  }, [])

  return (
    <div className="w-full  border-b border-b-gray-400 border-dashed">

      {/* 🔥 HERO SECTION */}
      <section className="mt-4 font-medium transition-all duration-300
              [box-shadow:5px_5px_rgb(82_82_82)] border border-gray-500 rounded-3xl min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] w-full flex flex-col items-center justify-center text-center px-3 xs:px-4 sm:px-6 py-8 xs:py-10 sm:py-12 bg-linear-to from-red-400 to-red-700 text-white" >
        <h1 className="text-xl xs:text-2xl sm:text-3xl [box-shadow:5px_5px_rgb(82_82_82)] bg-red-500 md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 xs:mb-4 sm:mb-5 leading-tight" >
          Find Your Perfect Rental House Today!
        </h1>

        <p className="text-xs text-gray-400 font-light xs:text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-4 xs:mb-5 sm:mb-6 max-w-2xl px-2">
          Search by location, budget, and bedrooms — Get the right home instantly.
        </p>

        <Button asChild size="sm" className="bg-white border text-red-700 font-semibold hover:bg-gray-100 text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 h-8 xs:h-9 sm:h-10 md:h-11">
          <Link href="/post-rental">Post Rental House Info</Link>
        </Button>
      </section>

      {/* 🔎 SEARCH FILTER SECTION */}
      <div

        className="w-[90%] max-w-5xl mx-auto rounded-2xl   border bg-white shadow-lg -mt-6 xs:-mt-8 sm:-mt-10 overflow-hidden xs:rounded-xl px-3 xs:px-4 sm:px-5 py-3 xs:py-4 sm:py-5 flex justify-center items-end gap-2 xs:gap-3 sm:gap-4 flex-col [box-shadow:3px_5px_rgb(82_82_82)]">


        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpenFiletr(!openFilter)}
          className="text-sm font-medium"
        >
          <Filter className={`size-4 transition-all duration-300 ${openFilter ? "fill-red-500" : "fill-none"}`} />
          <span>Filter</span>
          <ArrowDown className="size-4" />
        </Button>
        {/* ============filter all fields part==========*/}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: openFilter ? "auto" : 0,
            opacity: openFilter ? 1 : 0
          }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full space-y-2 overflow-hidden">
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between">
            {/* location */}
            <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-100 px-2 py-3 rounded-2xl" >
              <div className="text-sm font-light text-left text-gray-500 rounded-full border px-2">Select Location</div>
              <NativeSelect className="w-48 bg-white">
                <NativeSelectOption value="">Select Division</NativeSelectOption>
                <NativeSelectOption value="dhaka">Dhaka</NativeSelectOption>
              </NativeSelect>

              <NativeSelect className="w-48 bg-white">
                <NativeSelectOption value="">Select District</NativeSelectOption>
                <NativeSelectOption value="dhaka">Dhaka</NativeSelectOption>
              </NativeSelect>

              <NativeSelect className="w-48 bg-white">
                <NativeSelectOption value="">Select Upozela</NativeSelectOption>
                <NativeSelectOption value="dhaka">Dhaka</NativeSelectOption>
              </NativeSelect>
            </div>



            {/* price */}
            <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-100 px-2 py-3 rounded-2xl ">
              <div className="text-sm font-light text-left text-gray-500 rounded-full border px-2">Select price range</div>
              <Input className="w-48 bg-white text-black dark:bg-white " type="number" placeholder="Enter min price" />
              <Input className="w-48 bg-white text-black dark:bg-white" type="number" placeholder="Enter max price" />
            </div>


            {/* bedroom */}
            <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-100 px-2 py-3 rounded-2xl" >
              <div className="text-sm font-light text-left text-gray-500 rounded-full border px-2">Select Bedroomnumber</div>
              <Input
                className="w-48 bg-white text-black dark:bg-white"
                type="number"
                placeholder="Enter number of Bedroom"
              />
            </div>

          </div>

          <div className="flex justify-end gap-2 w-full p-3">
            <Button className="w-20" variant="outline">
              <FilterIcon />
              cancel
            </Button>
            <Button className="w-20" variant="destructive">
              <SearchCheck />
              Done
            </Button>


          </div>
        </motion.div>




      </div>

      {/*  RENTAL CARDS LIST */}
      <div className="max-w-6xl mx-auto mt-6 xs:mt-8 sm:mt-10 px-3 xs:px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
        {loading ? (<>
          {[1, 2, 3, 4, 5, 6].map((index) => <RentalCardSkeleton key={index} />)}
        </>
        ) : rentals?.slice(0, 6).map((house) => (
          <Card
            key={house?._id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:translate-y-1 hover:shadow-none"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <Image
                src={house.images?.[0] || "https://res.cloudinary.com/dncnvqrc6/image/upload/v1766069556/landscape-placeholder_k5uqlb.svg"}
                width={400}
                height={260}
                alt={house.title}
                className="h-44 sm:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Status */}
              <span
                className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow backdrop-blur
        ${house.status === "available"
                    ? "bg-emerald-600/90"
                    : "bg-rose-600/90"
                  }
      `}
              >
                {house.status}
              </span>

              {/* Price */}
              <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow">
                ৳ {house.rentAmount}
                <span className="text-xs font-medium text-gray-500"> /mo</span>
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="space-y-2 px-4 pt-4">
              {/* Title */}
              <h3 className="line-clamp-1 text-sm sm:text-base font-semibold text-gray-900">
                {house.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                <MapPinIcon className="h-4 w-4 shrink-0 text-red-500" />
                <span className="line-clamp-1">
                  {house.location.district}, {house.location.subDistrict}
                </span>
              </div>

              {/* Description */}
              <p className="line-clamp-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                {house.description}
              </p>

              {/* Divider */}
              <div className="my-2 h-px bg-gray-100" />

              {/* Info */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Bed className="h-4 w-4 text-indigo-500" />
                  <span>{house.bedroomNumber} Bedrooms</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-700">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span>৳ {house.rentAmount}</span>
                </div>
              </div>
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="px-4 pb-4 pt-3">
              <Button
                asChild
                className="h-9 w-full rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group-hover:bg-primary/90"
              >
                <Link href={`/view-details-post/${house._id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>


        ))}
      </div>
      <div className="flex justify-center items-center py-6">
        <Button onClick={() => router.push('/view')} variant='outline'>
          <Eye /> View All
        </Button>
      </div>
    </div>
  );
}
