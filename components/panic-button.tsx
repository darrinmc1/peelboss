"use client"

import { useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PanicButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          variant="destructive"
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform animate-pulse"
          title="In Case of Impostor Syndrome"
        >
          <AlertCircle className="h-8 w-8 text-white" />
        </Button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">STOP GIVING A &*%# FOR 5 MINUTES</h2>
              <div className="relative w-full h-64 mb-6 bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="/images/yogi-banana.png" 
                  alt="Zen Banana" 
                  className="max-h-full object-contain drop-shadow-xl animate-bounce"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              <p className="text-xl text-gray-600 italic">
                "Management is just herding cats that have MBAs. You're doing fine. Just be a banana."
              </p>
              <p className="mt-6 text-sm text-gray-400">
                (Click anywhere to return to the chaos)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
