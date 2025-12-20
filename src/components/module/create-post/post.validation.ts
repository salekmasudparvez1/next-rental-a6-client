import z from "zod/v3";


export const RentalHouseCreateZodSchema = z.object({
  // Basic Fields
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["available", "rented", "maintenance"]),
  rentAmount: z.number().positive("Rent must be a positive number"),
  bedroomNumber: z.number().min(1).max(20, "Bedrooms must be between 1–20"),
  
  // Location Object
  location: z.object({
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    subDistrict: z.string().min(1, "Sub-district is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    map: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),

  // Features (Optional Array)
  features: z.array(z.object({
    name: z.string().min(1, "Feature name is required"),
    color: z.string().min(1, "Color is required"),
  })).optional(),

  // Comments (Changed to optional to match form usage)
  comments: z.array(z.object({
    userId: z.string().min(1, "User ID is required"),
    comment: z.string().min(1, "Comment is required"),
    rating: z.number().min(1).max(5)
  })).optional(),

  // Images (Optional Array)
  images: z.array(z.string().url()).optional(),

  // Metadata Fields
  _id: z.string().optional(),
  landloardId: z.union([z.string(), z.any()]).optional(),
  landloardDetails: z.any().optional(), 
});

// ADD THIS: Infer the type from the schema
export type RentalHouseFormData = z.infer<typeof RentalHouseCreateZodSchema>;
