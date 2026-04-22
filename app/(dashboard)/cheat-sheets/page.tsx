import Link from "next/link"
import { cheatSheets } from "@/data/cheat-sheets"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheatSheetsPage() {
  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Management Cheat Sheets</h1>
          <p className="text-muted-foreground mt-1">
            Quick reference guides for when you need to sound competent in a hurry
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cheatSheets).map(([id, sheet]) => (
          <Card key={id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 -mt-6 -mx-6 p-6 mb-4">
                <CardTitle className="text-xl font-bold">{sheet.title}</CardTitle>
              </div>
              <CardDescription className="text-base">{sheet.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">A quick reference guide covering:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {sheet.sections.map((section, index) => (
                    <li key={index}>{section.title}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="flex items-center text-sm text-muted-foreground">
                <Coffee className="h-4 w-4 mr-1" />
                <span>One-pager</span>
              </div>
              <Link href={`/cheat-sheets/${id}`} passHref>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  <span>View</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Pro tip: Keep these cheat sheets handy for your next workplace crisis or when you need to impress someone in a
          meeting.
        </p>
      </div>
    </div>
  )
}
