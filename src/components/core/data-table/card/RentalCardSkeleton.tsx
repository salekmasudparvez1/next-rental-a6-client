import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RentalCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl bg-white shadow-md">
      {/* IMAGE */}
      <div className="relative">
        <Skeleton className="h-44 sm:h-52 w-full rounded-none" />

        {/* Status badge */}
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />

        {/* Price badge */}
        <Skeleton className="absolute bottom-3 right-3 h-7 w-24 rounded-xl" />
      </div>

      {/* CONTENT */}
      <CardContent className="space-y-2 px-4 pt-4">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Location */}
        <Skeleton className="h-3.5 w-2/3" />

        {/* Description */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        {/* Divider */}
        <div className="my-2 h-px bg-gray-100" />

        {/* Info */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="px-4 pb-4 pt-3">
        <Skeleton className="h-9 w-full rounded-xl" />
      </CardFooter>
    </Card>
  )
}
