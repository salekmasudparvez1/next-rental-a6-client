"use client"

import { useEffect, useState } from "react"
import { RentalHouseFormData } from "@/types/post"

export const useCreatePost = (initialData?: Partial<RentalHouseFormData>) => {
  const STORAGE_KEY = "create-post-form-data"

  const [formData, setFormData] = useState<RentalHouseFormData>(() => {
    if (typeof window === "undefined") {
      return initialData as RentalHouseFormData
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : {}

    return {
      title: initialData?.title ?? parsed.title ?? "",
      description: initialData?.description ?? parsed.description ?? "",
      location: {
        division: initialData?.location?.division ?? parsed.location?.division ?? "",
        district: initialData?.location?.district ?? parsed.location?.district ?? "",
        subDistrict: initialData?.location?.subDistrict ?? parsed.location?.subDistrict ?? "",
        streetAddress:
          initialData?.location?.streetAddress ?? parsed.location?.streetAddress ?? "",
        map: {
          lat: initialData?.location?.map?.lat ?? parsed.location?.map?.lat ?? 0,
          lng: initialData?.location?.map?.lng ?? parsed.location?.map?.lng ?? 0,
        },
      },
      status: initialData?.status ?? parsed.status ?? "available",
      rentAmount: initialData?.rentAmount ?? parsed.rentAmount ?? 0,
      bedroomNumber: initialData?.bedroomNumber ?? parsed.bedroomNumber ?? 1,
      features: initialData?.features ?? parsed.features ?? [],
      images: initialData?.images ?? [],
    }
  })

  const updateFormData = (data: Partial<RentalHouseFormData>) => {
    setFormData((pre) => ({ ...pre, ...data }))
  }

  const updateLocation = (
    locationData: Partial<RentalHouseFormData["location"]>
  ) => {
    setFormData((pre) => ({
      ...pre,
      location: {
        ...pre.location,
        ...locationData,
      },
    }))
  }

  const updateMap = (
    mapData: Partial<RentalHouseFormData["location"]["map"]>
  ) => {
    setFormData((pre) => ({
      ...pre,
      location: {
        ...pre.location,
        map: {
          ...pre.location.map,
          ...mapData,
        },
      },
    }))
  }

  const updateFeatures = (features: Array<{ name: string; color: string }>) => {
    setFormData((pre) => ({
      ...pre,
      features,
    }))
  }

  const clearForm = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, ...rest } = formData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
  }, [formData])

  return {
    formData,
    updateFormData,
    updateLocation,
    updateMap,
    updateFeatures,
    clearForm,
    setFormData,
  }
}
