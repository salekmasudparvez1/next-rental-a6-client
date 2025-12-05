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
    <div className="w-full pb-20">

      {/* 🔥 HERO SECTION */}
      <section className="h-[60vh] w-full flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Perfect Rental House Today!
        </h1>

        <p className="text-lg md:text-xl opacity-90 mb-6">
          Search by location, budget, and bedrooms — Get the right home instantly.
        </p>

        <Button asChild size="lg" className="bg-white text-blue-700 font-semibold hover:bg-gray-100">
          <Link href="/post-rental">Post Rental House Info</Link>
        </Button>
      </section>

      {/* 🔎 SEARCH FILTER SECTION */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg -mt-10 rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">

        <Input
          placeholder="Search by Location"
          className="border border-gray-300"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <Select onValueChange={(v) => setFilters({ ...filters, price: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10000-20000">10k - 20k</SelectItem>
            <SelectItem value="20000-30000">20k - 30k</SelectItem>
            <SelectItem value="30000+">30k+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setFilters({ ...filters, bedrooms: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Search
        </Button>
      </div>

      {/* 🏠 RENTAL CARDS LIST */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {rentals.map((house) => (
          <Card key={house.id} className="shadow-md">
            <Image
              src={house.image}
              width={400} height={250}
              alt={house.location}
              className="rounded-t-xl h-48 w-full object-cover"
            />

            <CardHeader>
              <CardTitle className="text-lg">{house.location}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600">{house.desc}</p>
              <p className="font-semibold mt-2">Rent: {house.price}</p>
              <p className="font-medium">Bedrooms: {house.bedrooms}</p>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/rentals/${house.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
