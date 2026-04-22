import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function CheatSheetLoading() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6">
        <Skeleton className="h-8 w-[150px]" />
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-100">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[450px] mt-2" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-[200px]" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Skeleton className="h-6 w-[150px] mb-2" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>

            <Skeleton className="h-[150px] w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}
