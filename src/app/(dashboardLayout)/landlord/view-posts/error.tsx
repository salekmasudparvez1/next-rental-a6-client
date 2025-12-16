"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCcw } from "lucide-react"

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error
  onRetry?: () => void
}

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-8 text-center space-y-4">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />

          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          {process.env.NODE_ENV === "development" && error?.message && (
            <pre className="text-xs bg-muted p-3 rounded text-left overflow-auto">
              {error.message}
            </pre>
          )}

          {onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
