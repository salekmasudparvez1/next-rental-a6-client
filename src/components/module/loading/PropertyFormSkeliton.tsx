import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function PropertyFormSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <Card className="shadow-lg">
        <CardContent className="pt-6 space-y-10">

          {/* ===== SECTION 1: Basic Info ===== */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-28 w-full" />
            </div>
          </div>

          {/* ===== SECTION 2: Location ===== */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-44 w-full rounded-lg" />
            </div>
          </div>

          {/* ===== SECTION 3: Property Details ===== */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-52" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* ===== SECTION 4: Features ===== */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />

            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-20" />
            </div>

            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* ===== SECTION 5: Images ===== */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* ===== Action Buttons ===== */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
