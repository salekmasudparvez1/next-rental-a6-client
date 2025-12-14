import z from "zod";

// Zod Schema
export const RentalHouseCreateZodSchema = z.object({
    title: z.string().min(2, "Title is required"),
    location: z.string().min(2, "Location is required"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    status: z.enum(["available", "rented", "maintenance"]),
    isPublished: z.boolean().optional(),
    rentAmount: z.number().positive("Rent must be a positive number"),
    images: z.array(z.string().url("Each image must be a valid URL")).optional(),
    bedroomNumber: z.number().min(1).max(20, "Bedrooms must be between 1–20"),
});
