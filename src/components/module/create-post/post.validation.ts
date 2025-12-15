import z from "zod";

const locationSchema = z.object({
    division: z.string().min(2, "Division is required"),
    district: z.string().min(2, "District is required"),
    subDistrict: z.string().min(2, "Sub-district is required"),
    streetAddress: z.string().min(5, "Street address must be at least 5 characters"),
    map: z.object({
        lat: z.number().refine((val) => val >= -90 && val <= 90, {
            message: "Latitude must be between -90 and 90",
        }),
        lng: z.number().refine((val) => val >= -180 && val <= 180, {
            message: "Longitude must be between -180 and 180",
        }),
    }),
});
// Zod Schema
export const RentalHouseCreateZodSchema = z.object({
    title: z.string().min(2, "Title is required"),
    location: locationSchema,
    description: z.string().min(5, "Description must be at least 5 characters"),
    status: z.enum(["available", "rented", "maintenance"]),
    isPublished: z.boolean().optional(),
    rentAmount: z.number().positive("Rent must be a positive number"),
    images: z.array(z.string().url("Each image must be a valid URL")).optional(),
    bedroomNumber: z.number().min(1).max(20, "Bedrooms must be between 1–20"),
    features: z.array(z.object({
        name: z.string().min(1, "Feature name is required"),
        color: z.string().min(1, "Color is required"),
    })).max(5, "You can add up to 5 features only").optional(),
});
