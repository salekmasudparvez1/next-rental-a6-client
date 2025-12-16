"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ViewPostSkeleton() {
  return (
    <div className="p-5 space-y-4">
      {/* Section Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Table Skeleton */}
      <Card className="shadow-lg">
        <CardContent className="p-2">
          {/* Header row */}
          <div className="grid grid-cols-6 gap-4 p-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>

          {/* Data rows */}
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-6 gap-4 p-2 items-center">
              <Skeleton className="h-8 w-8 rounded-full col-span-1" /> {/* Avatar */}
              <Skeleton className="h-5 w-full col-span-2" /> {/* Title / Address */}
              <Skeleton className="h-5 w-full col-span-1" /> {/* Rent */}
              <Skeleton className="h-5 w-full col-span-1" /> {/* Bedrooms */}
              <Skeleton className="h-5 w-full col-span-1" /> {/* Status */}
              <Skeleton className="h-8 w-8 col-span-1" /> {/* Actions */}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dialog Skeleton */}
      <Card className="shadow-lg mt-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" /> {/* Avatar */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-16 w-full" />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>

          {/* Images gallery */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-32 w-full rounded-md" />
              ))}
            </div>
          </div>

          {/* Close button */}
          <Skeleton className="h-10 w-24 mt-4" />
        </CardContent>
      </Card>
    </div>
  )
}
