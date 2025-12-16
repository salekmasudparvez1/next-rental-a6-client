"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {

  const [filters, setFilters] = useState({
    location: "",
    price: "",
    bedrooms: "",
  });

  // Example Rental Houses (Replace with real DB later)
  const rentals = [
    {
      id: 1,
      image: "/house1.jpg",
      location: "Dhanmondi, Dhaka",
      price: "৳20,000/month",
      bedrooms: "2",
      desc: "Family-friendly apartment close to schools & markets."
    },
    {
      id: 2,
      image: "/house2.jpg",
      location: "Mirpur 10, Dhaka",
      price: "৳15,500/month",
      bedrooms: "1",
      desc: "Affordable home with nearby transport & shopping malls."
    },
    {
      id: 3,
      image: "/house3.jpg",
      location: "Uttara Sector 4, Dhaka",
      price: "৳28,000/month",
      bedrooms: "3",
      desc: "Luxury flat with spacious rooms and secure parking."
    }
  ];

  return (
    <div className="w-full pb-8 xs:pb-10 sm:pb-16 md:pb-20">

      {/* 🔥 HERO SECTION */}
      <section className="min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] w-full flex flex-col items-center justify-center text-center px-3 xs:px-4 sm:px-6 py-8 xs:py-10 sm:py-12 bg-gradient-to-br from-red-400 to-red-700 text-white">
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
      <div className="max-w-5xl mx-auto bg-white shadow-lg -mt-6 xs:-mt-8 sm:-mt-10 rounded-lg xs:rounded-xl px-3 xs:px-4 sm:px-5 py-3 xs:py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">

        <Input
          placeholder="Location"
          className="border border-gray-300 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <Select onValueChange={(v) => setFilters({ ...filters, price: v })}>
          <SelectTrigger className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10000-20000" className="text-xs xs:text-sm">10k - 20k</SelectItem>
            <SelectItem value="20000-30000" className="text-xs xs:text-sm">20k - 30k</SelectItem>
            <SelectItem value="30000+" className="text-xs xs:text-sm">30k+</SelectItem>
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

      {/* 🏠 RENTAL CARDS LIST */}
      <div className="max-w-6xl mx-auto mt-6 xs:mt-8 sm:mt-10 px-3 xs:px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
        {rentals.map((house) => (
          <Card key={house.id} className="shadow-md overflow-hidden">
            <Image
              src={house.image}
              width={400} height={250}
              alt={house.location}
              className="rounded-t-lg xs:rounded-t-xl h-32 xs:h-40 sm:h-48 w-full object-cover"
            />

            <CardHeader className="p-3 xs:p-4 sm:p-6">
              <CardTitle className="text-sm xs:text-base sm:text-lg leading-tight">{house.location}</CardTitle>
            </CardHeader>

            <CardContent className="p-3 xs:p-4 sm:p-6 pt-0">
              <p className="text-gray-600 text-xs xs:text-sm leading-snug">{house.desc}</p>
              <p className="font-semibold mt-2 text-xs xs:text-sm sm:text-base">Rent: {house.price}</p>
              <p className="font-medium text-xs xs:text-sm">Bedrooms: {house.bedrooms}</p>
            </CardContent>

            <CardFooter className="p-3 xs:p-4 sm:p-6 pt-0">
              <Button asChild className="w-full h-8 xs:h-9 sm:h-10 text-xs xs:text-sm">
                <Link href={`/rentals/${house.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
