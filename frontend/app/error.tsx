"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 to-primary/5">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-destructive">Error</h1>
          <h2 className="text-3xl font-bold">Something went wrong!</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>
        <div className="space-y-2">
          <Button onClick={reset} size="lg" className="bg-primary hover:bg-primary-light text-primary-foreground">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            variant="outline"
            className="bg-transparent ml-2"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
