"use client"

import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useBadgeStore } from "@/lib/badge-store"
import { getBadgeById, getSpecialBadgeById, TIER_CONFIG, type Badge, type SpecialBadge } from "@/data/badges"
import { X } from "lucide-react"

// Simple confetti particle
function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  const left = Math.random() * 100
  const animDuration = 1.5 + Math.random() * 1.5
  const size = 6 + Math.random() * 6

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: "-10px",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animation: `confettiFall ${animDuration}s ease-in ${delay}s forwards`,
        opacity: 0,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  )
}

// Confetti container
function Confetti() {
  const colors = ["#FFD700", "#FFA500", "#FF6347", "#90EE90", "#32CD32", "#FF69B4", "#DDA0DD", "#87CEEB"]
  const particles = Array.from({ length: 50 }, (_, i) => ({
    delay: Math.random() * 0.5,
    color: colors[i % colors.length],
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((p, i) => (
        <ConfettiParticle key={i} delay={p.delay} color={p.color} />
      ))}
    </div>
  )
}

export function BadgeNotification() {
  const { pendingNotifications, dismissNotification } = useBadgeStore()
  const [currentBadge, setCurrentBadge] = useState<(Badge | SpecialBadge) | null>(null)
  const [visible, setVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleDismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      if (currentBadge) {
        dismissNotification(currentBadge.id)
      }
      setCurrentBadge(null)
      setShowConfetti(false)
    }, 300)
  }, [currentBadge, dismissNotification])

  useEffect(() => {
    if (pendingNotifications.length > 0 && !currentBadge) {
      const badgeId = pendingNotifications[0]
      const badge = getBadgeById(badgeId) || getSpecialBadgeById(badgeId)
      if (badge) {
        setCurrentBadge(badge)
        // Small delay to trigger enter animation
        requestAnimationFrame(() => {
          setVisible(true)
          setShowConfetti(true)
        })

        // Auto-dismiss after 6 seconds
        const timer = setTimeout(handleDismiss, 6000)
        return () => clearTimeout(timer)
      }
    }
  }, [pendingNotifications, currentBadge, handleDismiss])

  if (!currentBadge) return null

  const isTopic = "tier" in currentBadge
  const tier = isTopic ? (currentBadge as Badge).tier : null
  const tierConfig = tier ? TIER_CONFIG[tier] : null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-center p-4 sm:items-start sm:justify-end sm:p-6">
      {showConfetti && <Confetti />}

      <div
        className={cn(
          "pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl transition-all duration-300",
          "bg-gradient-to-br from-yellow-50 via-white to-orange-50 border border-yellow-200",
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95"
        )}
      >
        {/* Top accent bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: tier
              ? `linear-gradient(90deg, ${tierConfig?.color}80, ${tierConfig?.color})`
              : "linear-gradient(90deg, #DDA0DD80, #DDA0DD)",
          }}
        />

        <div className="p-5">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4">
            {/* Badge icon */}
            <div
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl",
                "shadow-lg animate-bounce-once",
                tier
                  ? `bg-gradient-to-br ${TIER_CONFIG[tier].bgGradient}`
                  : "bg-gradient-to-br from-purple-100 to-purple-200"
              )}
              style={tier ? { boxShadow: `0 8px 24px ${tierConfig?.color}40` } : {}}
            >
              {currentBadge.emoji}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-0.5">
                Badge Unlocked!
              </p>
              <p className="font-bold text-lg leading-tight truncate">
                {currentBadge.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                {currentBadge.description}
              </p>

              {tier && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: tierConfig?.color + "20",
                      color: tierConfig?.color === "#FFD700" ? "#B8860B" : tierConfig?.color,
                    }}
                  >
                    {tierConfig?.emoji} {tierConfig?.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs">
              Awesome! 🎉
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
