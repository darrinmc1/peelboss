"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, Printer, Share2, Coffee, LightbulbIcon, Wand2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CheatSheetProps {
  title: string
  subtitle: string
  sections: {
    title: string
    items: {
      label: string
      description: string
    }[]
  }[]
  quickTips: string[]
  humorousQuote: string
}

export function CheatSheet({ title, subtitle, sections, quickTips, humorousQuote }: CheatSheetProps) {
  const [showPrintView, setShowPrintView] = useState(false)

  const handlePrint = () => {
    setShowPrintView(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => setShowPrintView(false), 500)
    }, 300)
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("In a production app, this would download a PDF version of the cheat sheet")
  }

  return (
    <div className={`${showPrintView ? "print-view bg-white p-8 max-w-4xl mx-auto" : ""}`}>
      <Card className="overflow-hidden border-2 print:border-0 print:shadow-none">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{title} Cheat Sheet</CardTitle>
              <CardDescription className="text-base">{subtitle}</CardDescription>
            </div>
            {!showPrintView && (
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={handlePrint} title="Print">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownload} title="Download">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 print:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
            {sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                    {index + 1}
                  </div>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm">
                      <span className="font-medium">{item.label}:</span> {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Alert className="col-span-2 bg-amber-50 border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <LightbulbIcon className="h-4 w-4 text-amber-500" />
                <h3 className="font-medium">Quick Tips & Tricks</h3>
              </div>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1">
                  {quickTips.map((tip, index) => (
                    <li key={index} className="text-sm">
                      {tip}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium text-sm">The Last Word</h3>
              </div>
              <p className="text-sm italic">{humorousQuote}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 px-6 py-3 text-xs text-muted-foreground border-t print:hidden">
          <div className="flex items-center justify-between w-full">
            <div>Life's too short for boring management. Make it count.</div>
            <div className="flex items-center gap-1">
              <Wand2 className="h-3 w-3" />
              <span>Management Master™</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      {!showPrintView && (
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <p>
            Pro tip: Pin these cheat sheets to your office wall or slip them into your notebook for emergency management
            situations.
          </p>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-view, .print-view * {
            visibility: visible;
          }
          .print-view {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
