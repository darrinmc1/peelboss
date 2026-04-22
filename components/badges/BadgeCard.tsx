"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TIER_CONFIG, type Badge, type BadgeTier, type SpecialBadge } from "@/data/badges"
import { useBadgeStore } from "@/lib/badge-store"

interface BadgeCardProps {
  badge: Badge | SpecialBadge
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

function isTopic(badge: Badge | SpecialBadge): badge is Badge {
  return "tier" in badge
}

const TIER_BORDER_STYLES: Record<BadgeTier, string> = {
  sprout: "ring-green-300 shadow-green-200/50",
  green: "ring-green-500 shadow-green-300/50",
  ripe: "ring-yellow-400 shadow-yellow-300/50",
  perfect: "ring-orange-400 shadow-orange-300/50",
  golden: "ring-yellow-500 shadow-yellow-400/60",
}

const TIER_BG_STYLES: Record<BadgeTier, string> = {
  sprout: "bg-gradient-to-br from-green-100 to-green-200",
  green: "bg-gradient-to-br from-green-200 to-green-300",
  ripe: "bg-gradient-to-br from-yellow-100 to-yellow-300",
  perfect: "bg-gradient-to-br from-yellow-300 to-orange-300",
  golden: "bg-gradient-to-br from-yellow-400 to-amber-400",
}

const SIZE_MAP = {
  sm: { container: "w-16 h-16", emoji: "text-2xl", text: "text-[10px]" },
  md: { container: "w-24 h-24", emoji: "text-4xl", text: "text-xs" },
  lg: { container: "w-32 h-32", emoji: "text-5xl", text: "text-sm" },
}

export function BadgeCard({ badge, size = "md", showTooltip = true, className }: BadgeCardProps) {
  const { isBadgeUnlocked } = useBadgeStore()
  const unlocked = isBadgeUnlocked(badge.id)
  const tier = isTopic(badge) ? badge.tier : null
  const sizeStyles = SIZE_MAP[size]

  const content = (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 group cursor-default",
        className
      )}
    >
      {/* Badge circle */}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-300",
          sizeStyles.container,
          unlocked
            ? cn(
                "ring-2",
                tier ? TIER_BORDER_STYLES[tier] : "ring-purple-400 shadow-purple-200/50",
                tier ? TIER_BG_STYLES[tier] : "bg-gradient-to-br from-purple-100 to-purple-200",
                "shadow-lg group-hover:scale-110 group-hover:shadow-xl"
              )
            : "bg-muted/60 ring-1 ring-muted-foreground/20 grayscale opacity-50"
        )}
      >
        <span className={cn(sizeStyles.emoji, !unlocked && "opacity-30")}>
          {badge.emoji}
        </span>

        {/* Golden shimmer animation for golden tier */}
        {unlocked && tier === "golden" && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer overflow-hidden" />
        )}
      </div>

      {/* Badge name */}
      <span
        className={cn(
          "text-center font-medium leading-tight max-w-[100px] line-clamp-2",
          sizeStyles.text,
          unlocked ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {badge.name}
      </span>

      {/* Tier label for topic badges */}
      {tier && (
        <span
          className={cn(
            "text-[9px] uppercase tracking-widest font-bold",
            unlocked ? "text-muted-foreground" : "text-muted-foreground/50"
          )}
        >
          {TIER_CONFIG[tier].label}
        </span>
      )}
    </div>
  )

  if (!showTooltip) return content

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-center">
          <p className="font-semibold">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {isTopic(badge) && (
            <p className="text-[10px] text-muted-foreground mt-1">
              {badge.xpRequired} XP &bull; {badge.lessonsRequired} lessons
            </p>
          )}
          {unlocked && (
            <p className="text-[10px] text-green-600 mt-1 font-medium">Unlocked!</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
