"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RentalHouseCreateZodSchema } from './post.validation';
import ImageHandlaer from './ImageHandlaer';

type RentalHouseFormData = z.infer<typeof RentalHouseCreateZodSchema>;

const CreatePostFrom = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<RentalHouseFormData>({
        resolver: zodResolver(RentalHouseCreateZodSchema),
        defaultValues: {
            status: "available",
            isPublished: false,},
    });

    const status = watch("status");
    

    const onSubmit = async (data: RentalHouseFormData) => {
        try {
            console.log("Form Data:", data);
            toast.success("Rental house created successfully!");
            // Add your API call here
        } catch (error) {
            toast.error("Failed to create rental house");
            console.error(error);
        }
    };

    return (
        <div className='p-5 space-y-4 '>
           

            <Card>
                <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <CardDescription>Fill in the information about your rental property</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Property Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Modern 2BR Apartment in Downtown"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                placeholder="e.g., 123 Main St, New York, NY"
                                {...register("location")}
                            />
                            {errors.location && (
                                <p className="text-sm text-red-500">{errors.location.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <textarea
                                id="description"
                                placeholder="Describe your property..."
                                rows={4}
                                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Rent Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="rentAmount">Monthly Rent ($) *</Label>
                                <Input
                                    id="rentAmount"
                                    type="number"
                                    placeholder="e.g., 1200"
                                    {...register("rentAmount", { valueAsNumber: true })}
                                />
                                {errors.rentAmount && (
                                    <p className="text-sm text-red-500">{errors.rentAmount.message}</p>
                                )}
                            </div>

                            {/* Bedroom Number */}
                            <div className="space-y-2">
                                <Label htmlFor="bedroomNumber">Number of Bedrooms *</Label>
                                <Input
                                    id="bedroomNumber"
                                    type="number"
                                    min="1"
                                    max="20"
                                    placeholder="e.g., 2"
                                    {...register("bedroomNumber", { valueAsNumber: true })}
                                />
                                {errors.bedroomNumber && (
                                    <p className="text-sm text-red-500">{errors.bedroomNumber.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Property Status *</Label>
                            <Select
                                value={status}
                                onValueChange={(value) => setValue("status", value as "available" | "rented" | "maintenance")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="rented">Rented</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-500">{errors.status.message}</p>
                            )}
                        </div>

                       {/* image handler */}
                        <ImageHandlaer/>
                      
                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Property"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreatePostFrom;
