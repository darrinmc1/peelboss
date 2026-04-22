import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function CheatSheetsLoading() {
  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="bg-gray-100 -mt-6 -mx-6 p-6 mb-4">
                <Skeleton className="h-6 w-[180px]" />
              </div>
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[120px] mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-[80px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
