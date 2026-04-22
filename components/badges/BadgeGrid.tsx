"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BadgeCard } from "./BadgeCard"
import { TOPIC_BADGES, SPECIAL_BADGES, TIER_CONFIG, type Badge as TopicBadge, type BadgeTier, type SpecialBadge } from "@/data/badges"
import { useBadgeStore } from "@/lib/badge-store"
import { Search, Trophy, Flame, Star, Laugh } from "lucide-react"

type FilterTab = "all" | "unlocked" | "locked" | "special"

export function BadgeGrid() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterTab>("all")
  const [tierFilter, setTierFilter] = useState<BadgeTier | "all">("all")
  const { isBadgeUnlocked, getUnlockedCount, getTotalBadgeCount } = useBadgeStore()

  const unlockedCount = getUnlockedCount()
  const totalCount = getTotalBadgeCount()

  // Filter topic badges
  let filteredTopicBadges = TOPIC_BADGES.filter((b) => {
    const matchesSearch = search === "" || b.name.toLowerCase().includes(search.toLowerCase()) || b.topicName.toLowerCase().includes(search.toLowerCase())
    const matchesTier = tierFilter === "all" || b.tier === tierFilter
    const matchesFilter =
      filter === "all" ||
      (filter === "unlocked" && isBadgeUnlocked(b.id)) ||
      (filter === "locked" && !isBadgeUnlocked(b.id))
    return matchesSearch && matchesTier && (filter !== "special") && matchesFilter
  })

  // Filter special badges
  let filteredSpecialBadges = SPECIAL_BADGES.filter((b) => {
    const matchesSearch = search === "" || b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      filter === "special" ||
      (filter === "unlocked" && isBadgeUnlocked(b.id)) ||
      (filter === "locked" && !isBadgeUnlocked(b.id))
    return matchesSearch && matchesFilter
  })

  // Group topic badges by topic
  const groupedByTopic = filteredTopicBadges.reduce<Record<string, TopicBadge[]>>((acc, badge) => {
    if (!acc[badge.topicName]) acc[badge.topicName] = []
    acc[badge.topicName].push(badge)
    return acc
  }, {})

  // Group special badges by category
  const specialByCategory = filteredSpecialBadges.reduce<Record<string, SpecialBadge[]>>((acc, badge) => {
    if (!acc[badge.category]) acc[badge.category] = []
    acc[badge.category].push(badge)
    return acc
  }, {})

  const categoryLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    achievement: { label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
    streak: { label: "Streaks", icon: <Flame className="h-4 w-4" /> },
    milestone: { label: "Milestones", icon: <Star className="h-4 w-4" /> },
    humor: { label: "Fun & Humor", icon: <Laugh className="h-4 w-4" /> },
  }

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Badge Collection</h2>
          <p className="text-muted-foreground text-sm">
            {unlockedCount} of {totalCount} badges earned
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-1.5 bg-yellow-50 border-yellow-300 text-yellow-800">
          {unlockedCount} / {totalCount} 🍌
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search badges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unlocked">Earned</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tier quick filter (only for topic badges) */}
      {filter !== "special" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTierFilter("all")}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
              tierFilter === "all" ? "bg-foreground text-background border-foreground" : "bg-muted border-muted-foreground/20 hover:bg-muted/80"
            )}
          >
            All Tiers
          </button>
          {(Object.keys(TIER_CONFIG) as BadgeTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                tierFilter === tier
                  ? "bg-foreground text-background border-foreground"
                  : "bg-muted border-muted-foreground/20 hover:bg-muted/80"
              )}
            >
              {TIER_CONFIG[tier].emoji} {TIER_CONFIG[tier].label}
            </button>
          ))}
        </div>
      )}

      {/* Topic badges grid */}
      {filter !== "special" && Object.keys(groupedByTopic).length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedByTopic).map(([topicName, badges]) => (
            <div key={topicName}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                {topicName}
                <span className="text-xs text-muted-foreground font-normal">
                  ({badges.filter((b) => isBadgeUnlocked(b.id)).length}/{badges.length})
                </span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {badges
                  .sort((a, b) => {
                    const order: BadgeTier[] = ["sprout", "green", "ripe", "perfect", "golden"]
                    return order.indexOf(a.tier) - order.indexOf(b.tier)
                  })
                  .map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} size="md" />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Special badges */}
      {(filter === "all" || filter === "special" || filter === "unlocked" || filter === "locked") &&
        Object.keys(specialByCategory).length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold tracking-tight pt-4 border-t">Special Badges</h2>
            {Object.entries(specialByCategory).map(([category, badges]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {categoryLabels[category]?.icon}
                  {categoryLabels[category]?.label ?? category}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {badges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Empty state */}
      {filteredTopicBadges.length === 0 && filteredSpecialBadges.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🍌</p>
          <p className="font-medium">No badges found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
