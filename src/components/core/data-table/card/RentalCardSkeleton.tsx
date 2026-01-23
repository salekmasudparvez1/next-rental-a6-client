import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RentalCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden rounded-2xl bg-white border-none [box-shadow:2px_2px_rgb(82_82_82)]">
      {/* IMAGE SECTION */}
      <div className="relative">
        {/* Main Image - matches h-44 sm:h-52 */}
        <Skeleton className="h-44 sm:h-52 w-full rounded-none" />

        {/* Status Badge (Top Left) */}
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />

        {/* Price Badge (Bottom Right) */}
        <Skeleton className="absolute bottom-3 right-3 h-8 w-24 rounded-xl" />
      </div>

      {/* CONTENT SECTION - matches space-y-2 px-4 pt-4 */}
      <CardContent className="space-y-2 px-4 pt-4">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />

        {/* Location (Icon + Text) */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 shrink-0 rounded-full" /> {/* Icon */}
          <Skeleton className="h-3.5 w-3/5 rounded-md" /> {/* Text */}
        </div>

        {/* Description (2 lines) */}
        <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-5/6 rounded-full" />
        </div>

        {/* Divider */}
        <div className="my-2 h-px w-full bg-gray-100" />

        {/* Info Row (Bedrooms & Price) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
             <Skeleton className="h-4 w-4 rounded-md" />
             <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-1.5">
             <Skeleton className="h-4 w-4 rounded-md" />
             <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </CardContent>

      {/* FOOTER SECTION - matches px-4 pb-4 pt-3 */}
      <CardFooter className="px-4 pb-4 pt-3">
        <Skeleton className="h-9 w-full rounded-xl" />
      </CardFooter>
    </Card>
  )
}