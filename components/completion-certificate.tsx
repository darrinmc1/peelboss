"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Printer } from "lucide-react"
import { formatDate } from "@/lib/utils"

export interface CertificateProps {
  userName: string
  moduleName: string
  chapterName?: string
  completionDate: Date
  score: number
  totalPossible: number
}

export function CompletionCertificate({
  userName,
  moduleName,
  chapterName,
  completionDate,
  score,
  totalPossible,
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const content = certificateRef.current
    if (!content) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const html = `
      <html>
        <head>
          <title>Certificate of Completion</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .certificate-container {
              width: 800px;
              height: 600px;
              margin: 0 auto;
              padding: 20px;
              position: relative;
              background-color: #fff;
              border: 20px solid #f0f0f0;
            }
            .certificate-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .certificate-title {
              font-size: 36px;
              color: #2563eb;
              margin-bottom: 10px;
              font-weight: bold;
            }
            .certificate-subtitle {
              font-size: 18px;
              color: #666;
              margin-bottom: 40px;
            }
            .certificate-body {
              text-align: center;
              margin-bottom: 40px;
            }
            .recipient-name {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #333;
            }
            .certificate-text {
              font-size: 18px;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .certificate-details {
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
            }
            .certificate-date, .certificate-score {
              font-size: 16px;
              color: #666;
            }
            .certificate-footer {
              margin-top: 60px;
              text-align: center;
            }
            .certificate-signature {
              font-size: 24px;
              font-family: 'Brush Script MT', cursive;
              margin-bottom: 10px;
            }
            .certificate-border {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border: 2px solid #ddd;
              pointer-events: none;
              z-index: 1;
            }
            .certificate-seal {
              position: absolute;
              bottom: 30px;
              right: 40px;
              width: 100px;
              height: 100px;
              background: radial-gradient(circle, #f0f0f0, #ddd);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: #666;
              border: 2px solid #ccc;
              transform: rotate(-15deg);
              text-align: center;
            }
            .certificate-ribbon {
              position: absolute;
              top: -10px;
              left: 30px;
              width: 140px;
              height: 140px;
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><path d="M0,0 L140,0 L140,140 Z" fill="%232563eb"/></svg>');
              background-size: contain;
              z-index: 0;
            }
            .score-highlight {
              font-weight: bold;
              color: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="certificate-border"></div>
            <div class="certificate-ribbon"></div>
            <div class="certificate-header">
              <div class="certificate-title">Certificate of Completion</div>
              <div class="certificate-subtitle">Leadership & Management Training</div>
            </div>
            <div class="certificate-body">
              <div class="recipient-name">${userName}</div>
              <div class="certificate-text">
                has successfully completed the<br/>
                <strong>${moduleName}</strong><br/>
                ${chapterName ? `<strong>${chapterName}</strong><br/>` : ""}
                module with a score of <span class="score-highlight">${score} out of ${totalPossible} (${Math.round((score / totalPossible) * 100)}%)</span>
              </div>
            </div>
            <div class="certificate-details">
              <div class="certificate-date">Date: ${formatDate(completionDate)}</div>
              <div class="certificate-score">Certificate ID: MGT-${Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}</div>
            </div>
            <div class="certificate-footer">
              <div class="certificate-signature">Jane Doe</div>
              <div>Jane Doe, Chief Learning Officer</div>
              <div>Management Mastery Academy</div>
            </div>
            <div class="certificate-seal">
              OFFICIAL<br/>CERTIFICATE
            </div>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()

    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  const handleDownload = () => {
    const content = certificateRef.current
    if (!content) return

    // Create a canvas from the certificate div
    import("html2canvas").then((html2canvas) => {
      html2canvas
        .default(content, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
        })
        .then((canvas) => {
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (!blob) return

            // Create download link
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${moduleName.replace(/\s+/g, "-").toLowerCase()}-certificate.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
          }, "image/png")
        })
    })
  }

  const scorePercentage = Math.round((score / totalPossible) * 100)

  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <div
          ref={certificateRef}
          className="relative w-full bg-white p-8 border-[20px] border-gray-100"
          style={{ aspectRatio: "1.414/1" }}
        >
          {/* Certificate Border */}
          <div className="absolute inset-0 border-2 border-gray-200 pointer-events-none"></div>

          {/* Ribbon Corner */}
          <div className="absolute -top-5 -left-5 w-28 h-28 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rotate-45 origin-bottom-right transform translate-y-[-50%]"></div>
          </div>

          {/* Certificate Content */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-blue-600">Certificate of Completion</h2>
              <p className="text-gray-500">Leadership & Management Training</p>
            </div>

            <div className="text-center space-y-6 my-8">
              <h3 className="text-2xl font-bold">{userName}</h3>
              <p className="text-lg">
                has successfully completed the
                <br />
                <span className="font-semibold">{moduleName}</span>
                {chapterName && (
                  <>
                    <br />
                    <span className="font-semibold">{chapterName}</span>
                  </>
                )}
                <br />
                module with a score of{" "}
                <span className="font-bold text-blue-600">
                  {score} out of {totalPossible} ({scorePercentage}%)
                </span>
              </p>
            </div>

            <div className="w-full flex justify-between text-sm text-gray-500">
              <div>Date: {formatDate(completionDate)}</div>
              <div>
                Certificate ID: MGT-
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="font-script text-3xl font-bold mt-4">John Smith</div>
              <div className="text-sm">Jane Doe, Chief Learning Officer</div>
              <div className="text-sm">Management Mastery Academy</div>
            </div>

            {/* Certificate Seal */}
            <div className="absolute bottom-6 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500 text-center transform -rotate-12">
              OFFICIAL
              <br />
              CERTIFICATE
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Certificate
        </Button>
        <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
      </div>
    </div>
  )
}
