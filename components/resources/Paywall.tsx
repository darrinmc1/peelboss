"use client"

import { Check, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SUBSCRIPTION_TIERS } from "@/lib/subscription-tiers"
import { useBadgeStore } from "@/lib/badge-store"

export type PaywallTrigger = "download_limit" | "premium_template" | "premium_roleplay"

type PaywallProps = {
  isOpen: boolean
  onClose: () => void
  trigger: PaywallTrigger
  /** name of the resource that prompted the paywall — used in copy */
  resourceName?: string
}

const MESSAGES: Record<PaywallTrigger, { title: string; description: (n?: string) => string }> = {
  download_limit: {
    title: "You've used your free downloads this month 📥",
    description: (n) =>
      n
        ? `Download "${n}" plus everything else with unlimited access.`
        : "Upgrade to keep downloading templates this month.",
  },
  premium_template: {
    title: "This is a Premium Template 👑",
    description: (n) => (n ? `"${n}" is available to Premium members.` : "This resource is Premium-only."),
  },
  premium_roleplay: {
    title: "Premium Role-Play Scenario 🎭",
    description: (n) =>
      n ? `Unlock "${n}" and the rest of the advanced practice library.` : "Advanced role-plays are Premium-only.",
  },
}

export function Paywall({ isOpen, onClose, trigger, resourceName }: PaywallProps) {
  const { title, description } = MESSAGES[trigger]
  // Dev-only: flip premium in the store so the user can test the post-upgrade flow
  // without real billing. Replace with real checkout link when billing is added.
  const setPremium = useBadgeStore((s) => s.setPremium)

  const monthly = SUBSCRIPTION_TIERS.premium_monthly
  const annual = SUBSCRIPTION_TIERS.premium_annual
  const pack = SUBSCRIPTION_TIERS.template_pack

  const handleMockUpgrade = () => {
    setPremium(true)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-amber-600" />
          </div>
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {description(resourceName)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {/* Monthly */}
          <TierCard
            name={monthly.name}
            tagline={monthly.tagline}
            price={`$${monthly.price}`}
            cadence="/month"
            features={monthly.features}
            ctaLabel="Upgrade to Premium"
            onClick={handleMockUpgrade}
          />

          {/* Annual — highlighted */}
          <TierCard
            name={annual.name}
            tagline={annual.tagline}
            price={`$${annual.price}`}
            cadence="/year"
            features={annual.features}
            ctaLabel="Get Premium Annual"
            highlight
            highlightLabel="BEST VALUE"
            onClick={handleMockUpgrade}
          />

          {/* One-time pack */}
          <TierCard
            name="Just want templates?"
            tagline={pack.tagline}
            price={`$${pack.price}`}
            cadence="one-time"
            features={pack.features}
            ctaLabel="Buy Template Pack"
            variant="subtle"
            onClick={handleMockUpgrade}
          />
        </div>

        <Button variant="ghost" onClick={onClose} className="mt-2">
          Maybe later
        </Button>
      </DialogContent>
    </Dialog>
  )
}

// ---- Tier card subcomponent ----

function TierCard({
  name,
  tagline,
  price,
  cadence,
  features,
  ctaLabel,
  onClick,
  highlight,
  highlightLabel,
  variant = "default",
}: {
  name: string
  tagline?: string
  price: string
  cadence: string
  features: string[]
  ctaLabel: string
  onClick: () => void
  highlight?: boolean
  highlightLabel?: string
  variant?: "default" | "subtle"
}) {
  const border = highlight
    ? "border-2 border-emerald-500"
    : variant === "subtle"
      ? "border border-muted bg-muted/30"
      : "border-2 border-amber-400"

  return (
    <div className={`relative rounded-lg p-4 transition-shadow hover:shadow-md ${border}`}>
      {highlight && highlightLabel && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
          {highlightLabel}
        </span>
      )}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold">{name}</h4>
          {tagline && <p className="text-xs text-muted-foreground">{tagline}</p>}
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums">{price}</div>
          <div className="text-xs text-muted-foreground">{cadence}</div>
        </div>
      </div>
      <ul className="mb-3 space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            {i === 0 ? (
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            ) : (
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={onClick}
        className={`w-full ${highlight ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
        variant={variant === "subtle" ? "outline" : "default"}
      >
        {ctaLabel}
      </Button>
    </div>
  )
}
