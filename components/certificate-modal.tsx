"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CompletionCertificate, type CertificateProps } from "@/components/completion-certificate"

interface CertificateModalProps extends CertificateProps {
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({ isOpen, onClose, ...certificateProps }: CertificateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Your Certificate of Completion</DialogTitle>
        </DialogHeader>
        <CompletionCertificate {...certificateProps} />
      </DialogContent>
    </Dialog>
  )
}
