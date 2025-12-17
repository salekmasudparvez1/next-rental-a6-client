"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPropertiesPublicFunction } from "@/service/post/postService";
import { RentalHouseFormData } from "@/types/post";
import { Bed, DollarSign, MapPinIcon } from "lucide-react";
import { RentalCardSkeleton } from "@/components/core/data-table/card/RentalCardSkeleton";

export default function HeroSection() {
  const [rentals, setRentals] = useState<Array<RentalHouseFormData>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState({
    location: "",
    price: "",
    bedrooms: "",
  });


  // Example Rental Houses (Replace with real DB later)
  // const rentals = [
  //   {
  //     id: 1,
  //     image: "/house1.jpg",
  //     location: "Dhanmondi, Dhaka",
  //     price: "৳20,000/month",
  //     bedrooms: "2",
  //     desc: "Family-friendly apartment close to schools & markets."
  //   },
  //   {
  //     id: 2,
  //     image: "/house2.jpg",
  //     location: "Mirpur 10, Dhaka",
  //     price: "৳15,500/month",
  //     bedrooms: "1",
  //     desc: "Affordable home with nearby transport & shopping malls."
  //   },
  //   {
  //     id: 3,
  //     image: "/house3.jpg",
  //     location: "Uttara Sector 4, Dhaka",
  //     price: "৳28,000/month",
  //     bedrooms: "3",
  //     desc: "Luxury flat with spacious rooms and secure parking."
  //   }
  // ];
  useEffect(() => {
    const getFilteredRentals = async () => {
      const res = await getAllPropertiesPublicFunction()
      setRentals(res?.data?.data);
      setLoading(false);
    }
    getFilteredRentals();
  }, [])

  return (
    <div className="w-full pb-8 xs:pb-10 sm:pb-16 md:pb-20">

      {/* 🔥 HERO SECTION */}
      <section className="min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] w-full flex flex-col items-center justify-center text-center px-3 xs:px-4 sm:px-6 py-8 xs:py-10 sm:py-12 bg-linear-to from-red-400 to-red-700 text-white">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 xs:mb-4 sm:mb-5 leading-tight">
          Find Your Perfect Rental House Today!
        </h1>

        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-4 xs:mb-5 sm:mb-6 max-w-2xl px-2">
          Search by location, budget, and bedrooms — Get the right home instantly.
        </p>

        <Button asChild size="sm" className="bg-white text-red-700 font-semibold hover:bg-gray-100 text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 h-8 xs:h-9 sm:h-10 md:h-11">
          <Link href="/post-rental">Post Rental House Info</Link>
        </Button>
      </section>

      {/* 🔎 SEARCH FILTER SECTION */}
      <div className="max-w-5xl mx-auto transition-all w-full duration-300 [box-shadow:0px_2px_rgb(82_82_82)] border bg-white shadow-lg -mt-6 xs:-mt-8 sm:-mt-10 rounded-lg xs:rounded-xl px-3 xs:px-4 sm:px-5 py-3 xs:py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">

        <Input
          placeholder="Location"
          className="border border-gray-300 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <Select onValueChange={(v) => setFilters({ ...filters, price: v })}>
          <SelectTrigger className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm gg" >
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10000-20000" className="text-xs xs:text-sm">10k - 20k</SelectItem>
            <SelectItem value="20000-30000" className="text-xs xs:text-sm">20k - 30k</SelectItem>
            <SelectItem value="30000-40000" className="text-xs xs:text-sm">30k - 40k</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setFilters({ ...filters, bedrooms: v })}>
          <SelectTrigger className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" className="text-xs xs:text-sm">1 Bedroom</SelectItem>
            <SelectItem value="2" className="text-xs xs:text-sm">2 Bedrooms</SelectItem>
            <SelectItem value="3" className="text-xs xs:text-sm">3 Bedrooms</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full bg-red-600 hover:bg-red-700 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm sm:text-base">
          Search
        </Button>
      </div>

      {/*  RENTAL CARDS LIST */}
      <div className="max-w-6xl mx-auto mt-6 xs:mt-8 sm:mt-10 px-3 xs:px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
        {loading ? (<>
         { [1,2,3,4,5,6].map((index) => <RentalCardSkeleton key={index} />)}
          </>
        ) : rentals?.slice(0, 6).map((house) => (
          <Card
            key={house?._id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <Image
                src={house.images?.[0] || "/placeholder-house.jpg"}
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
                <Link href={`/${house._id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>


        ))}
      </div>
    </div>
  );
}
