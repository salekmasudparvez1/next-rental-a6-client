"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    ArrowDown,
    Filter,
    X,
    SearchCheck,
    MapPinIcon,
    Bed,
    DollarSign,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDivision } from '@/hooks/use-bdinfo';
import { TComboOption } from '../create-post/InputCombo';
import { TDistrict, TDivision, TUpazila } from '@/types/bd-data';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { RentalCardSkeleton } from '@/components/core/data-table/card/RentalCardSkeleton';
import { RentalHouseFormData } from '@/types/post';
import { getAllPropertiesPublicFunction } from '@/service/post/postService';
import { IQueryParamsAllPost } from '@/types';

// --- TYPES ---
type FilterFormData = {
    division: string;
    district: string;
    subDistrict: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
};

interface IDivisionData {
    divisions: TDivision[];
}



const AllPost = () => {
    // 1. Setup local form
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { isSubmitting },
    } = useForm<FilterFormData>({
        defaultValues: {
            division: "",
            district: "",
            subDistrict: "",
            minPrice: "",
            maxPrice: "",
            bedrooms: "",
        },
    });

    const [rentals, setRentals] = useState<Array<RentalHouseFormData>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openFilter, setOpenFilter] = useState(false);

    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Options State
    const [divisionOptions, setDivisionOptions] = useState<TComboOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<TComboOption[]>([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState<TComboOption[]>([]);

    const rawDivisionData = useDivision();
    const divisionData = rawDivisionData as unknown as IDivisionData | undefined;

    const selectedDivision = watch("division");
    const selectedDistrict = watch("district");

    // Watch all fields to pass to API when pagination changes
    const allFilterValues = watch();

    // 3. Initialize Divisions
    useEffect(() => {
        if (divisionData?.divisions && Array.isArray(divisionData.divisions)) {
            const options = divisionData.divisions.map((div: TDivision) => ({
                label: div.name,
                value: div.name,
            }));
            setDivisionOptions(options);
        }
    }, [divisionData]);

    // 4. Handle Division Change
    useEffect(() => {
        if (!selectedDivision) {
            setDistrictOptions([]);
            setSubDistrictOptions([]);
            return;
        }
        const currentDivData = divisionData?.divisions?.find(
            (d: TDivision) => d.name === selectedDivision
        );
        if (currentDivData?.districts) {
            const options = currentDivData.districts.map((dist: TDistrict) => ({
                label: dist.name,
                value: dist.name,
            }));
            setDistrictOptions(options);
        } else {
            setDistrictOptions([]);
        }
        setValue("district", "");
        setValue("subDistrict", "");
    }, [selectedDivision, divisionData, setValue]);

    // 5. Handle District Change
    useEffect(() => {
        if (!selectedDistrict || !selectedDivision) {
            setSubDistrictOptions([]);
            return;
        }
        const currentDivData = divisionData?.divisions?.find(
            (d: TDivision) => d.name === selectedDivision
        );
        const currentDistData = currentDivData?.districts?.find(
            (d: TDistrict) => d.name === selectedDistrict
        );
        if (currentDistData?.upazilas) {
            const options = currentDistData.upazilas.map((sub: TUpazila | string) => {
                const label = typeof sub === 'string' ? sub : sub.name;
                return { label, value: label };
            });
            setSubDistrictOptions(options);
        } else {
            setSubDistrictOptions([]);
        }
        setValue("subDistrict", "");
    }, [selectedDistrict, selectedDivision, divisionData, setValue]);

    // --- FETCH DATA FUNCTION ---
    const getFilteredRentals = async (page: number, filters: FilterFormData) => {
        setLoading(true);
        try {
            // NOTE: Modify your service to accept query params:
            // getAllPropertiesPublicFunction({ page, limit: ITEMS_PER_PAGE, ...filters })
            const ITEMS_PER_PAGE = 6; // Number of items per page
            const queryParams : IQueryParamsAllPost = {
                page: page,
                limit: ITEMS_PER_PAGE,
                bedrooms: filters?.bedrooms,
                district: filters?.district,
                division: filters?.division,
                maxPrice: filters?.maxPrice,
                minPrice: filters?.minPrice,
                subDistrict: filters?.subDistrict,
        };
       
      
      

        // Assuming your service accepts an object. Adjust if it expects a query string.
        const res = await getAllPropertiesPublicFunction(queryParams);

        if (res?.data) {
            setRentals(res.data.data);

            // Assuming backend returns meta info (total, totalPages, etc.)
            // Adjust 'res.data.meta.totalPage' based on your actual API response structure
            const backendTotalPages = res?.data?.meta?.totalPage || Math.ceil((res?.data?.meta?.total || 0) / ITEMS_PER_PAGE) || 1;
            setTotalPages(backendTotalPages);
        }
        console.log(res);
    } catch (error) {
        console.error("Failed to fetch posts", error);
    } finally {
        setLoading(false);
    }
};

// Initial Load & Pagination Change
useEffect(() => {
    // We pass the current form values (allFilterValues) so pagination keeps filters active
    getFilteredRentals(currentPage, allFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentPage]);

// Filter Submit
const onSubmit = (data: FilterFormData) => {
    setCurrentPage(1); // Reset to page 1 on new filter
    getFilteredRentals(1, data); // Fetch immediately
    setOpenFilter(false);
};

const handleReset = () => {
    reset();
    setCurrentPage(1);
    getFilteredRentals(1, {} as FilterFormData);
    setOpenFilter(false);
};

// Pagination Handler
const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        // Scroll to top of grid smoothly
        window.scrollTo({ top: 300, behavior: 'smooth' });
    }
};

return (
    <div className='py-5 flex flex-col'>
        {/* 🔎 SEARCH FILTER SECTION */}
        <div className="w-full mx-auto rounded-2xl border bg-white shadow-lg -mt-6 xs:-mt-8 sm:-mt-10 overflow-hidden xs:rounded-xl px-3 xs:px-4 sm:px-5 py-3 xs:py-4 sm:py-5 flex justify-center items-end gap-2 xs:gap-3 sm:gap-4 flex-col [box-shadow:3px_5px_rgb(82_82_82)]">

            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenFilter(!openFilter)}
                className="text-sm font-medium"
            >
                <Filter className={`size-4 transition-all duration-300 ${openFilter ? "fill-red-500" : "fill-none"}`} />
                <span>Filter</span>
                <ArrowDown className={`size-4 transition-transform duration-300 ${openFilter ? "rotate-180" : ""}`} />
            </Button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: openFilter ? "auto" : 0,
                    opacity: openFilter ? 1 : 0
                }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full space-y-2 overflow-hidden"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between">
                        {/* Location Group */}
                        <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-50 px-2 py-3 rounded-2xl border border-gray-100">
                            <div className="text-sm font-medium text-left text-gray-500 rounded-full border px-3 py-0.5 bg-white">Location</div>
                            <NativeSelect className="w-full bg-white" {...register("division")}>
                                <NativeSelectOption value="">All Divisions</NativeSelectOption>
                                {divisionOptions.map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                            </NativeSelect>
                            <NativeSelect className="w-full bg-white" {...register("district")} disabled={!selectedDivision}>
                                <NativeSelectOption value="">All Districts</NativeSelectOption>
                                {districtOptions.map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                            </NativeSelect>
                            <NativeSelect className="w-full bg-white" {...register("subDistrict")} disabled={!selectedDistrict}>
                                <NativeSelectOption value="">All Upazilas</NativeSelectOption>
                                {subDistrictOptions.map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        {/* Price Group */}
                        <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-50 px-2 py-3 rounded-2xl border border-gray-100">
                            <div className="text-sm font-medium text-left text-gray-500 rounded-full border px-3 py-0.5 bg-white">Price Range</div>
                            <Input className="w-full bg-white text-black" type="number" placeholder="Min Price (BDT)" min={0} {...register("minPrice")} />
                            <Input className="w-full bg-white text-black" type="number" placeholder="Max Price (BDT)" min={0} {...register("maxPrice")} />
                        </div>

                        {/* Features Group */}
                        <div className="gap-3 w-full flex flex-col justify-start items-center bg-gray-50 px-2 py-3 rounded-2xl border border-gray-100">
                            <div className="text-sm font-medium text-left text-gray-500 rounded-full border px-3 py-0.5 bg-white">Property Details</div>
                            <Input className="w-full bg-white text-black" type="number" placeholder="No. of Bedrooms" min={0} {...register("bedrooms")} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 w-full p-3 pt-4">
                        <Button type="button" className="w-24" variant="outline" onClick={handleReset}>
                            <X className="mr-2 size-4" /> Clear
                        </Button>
                        <Button type="submit" className="w-24" disabled={isSubmitting}>
                            <SearchCheck className="mr-2 size-4" /> Apply
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>

        {/* ALL POST SECTION */}
        <div className="max-w-6xl mx-auto mt-6 xs:mt-8 sm:mt-10 px-3 xs:px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mb-10">
            {loading ? (
                [1, 2, 3, 4, 5, 6].map((index) => <RentalCardSkeleton key={index} />)
            ) : rentals.length > 0 ? (
                rentals.map((house) => (
                    <Card
                        key={house?._id}
                        className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-none"
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
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                            <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow backdrop-blur ${house.status === "available" ? "bg-emerald-600/90" : "bg-rose-600/90"}`}>
                                {house.status}
                            </span>
                            <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow">
                                ৳ {house.rentAmount}<span className="text-xs font-medium text-gray-500"> /mo</span>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <CardContent className="space-y-2 px-4 pt-4">
                            <h3 className="line-clamp-1 text-sm sm:text-base font-semibold text-gray-900">{house.title}</h3>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                                <MapPinIcon className="h-4 w-4 shrink-0 text-red-500" />
                                <span className="line-clamp-1">{house.location.district}, {house.location.subDistrict}</span>
                            </div>
                            <p className="line-clamp-2 text-xs sm:text-sm text-gray-500 leading-relaxed">{house.description}</p>
                            <div className="my-2 h-px bg-gray-100" />
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                                <div className="flex items-center gap-1.5 text-gray-700">
                                    <Bed className="h-4 w-4 text-indigo-500" /><span>{house.bedroomNumber} Bedrooms</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-700">
                                    <DollarSign className="h-4 w-4 text-green-600" /><span>৳ {house.rentAmount}</span>
                                </div>
                            </div>
                        </CardContent>

                        {/* FOOTER */}
                        <CardFooter className="px-4 pb-4 pt-3">
                            <Button asChild className="h-9 w-full rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group-hover:bg-primary/90">
                                <Link href={`/view-details-post/${house._id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-500">
                    <p className="text-lg font-medium">No properties found.</p>
                    <p className="text-sm">Try adjusting your filters.</p>
                </div>
            )}
        </div>

        {/* 🔽 PAGINATION SECTION 🔽 */}
        {!loading && rentals.length > 0 && (
            <div className="flex justify-center items-center gap-2 pb-10 mt-auto">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10 rounded-full"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                </Button>

                {/* Page Numbers */}
                {/* This creates a simple array of page numbers. For very large page counts, you'd need a more complex logic to show ... ellipsis */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1)) // Show current, 1 prev, 1 next (simplified view)
                        .map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => handlePageChange(page)}
                                className={`h-10 w-10 rounded-full font-medium ${currentPage === page ? "shadow-md" : "text-gray-600"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}
                </div>

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 rounded-full"
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                </Button>
            </div>
        )}
    </div>
);
}

export default AllPost;