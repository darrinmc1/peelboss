"use client"

import { BadgeGrid } from "@/components/badges/BadgeGrid"
import { BadgeProgress } from "@/components/badges/BadgeProgress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBadgeStore } from "@/lib/badge-store"
import { useUserProgress } from "@/lib/user-progress-store"
import { ALL_TOPIC_IDS, TOPIC_BADGES, SPECIAL_BADGES, TIER_CONFIG, type BadgeTier } from "@/data/badges"
import { modules } from "@/data/modules"
import { Trophy, Target, Flame, TrendingUp } from "lucide-react"

export default function BadgesPage() {
  const { totalXP, getUnlockedCount, getTotalBadgeCount, topicXP, unlockedBadges } = useBadgeStore()
  const { streak } = useUserProgress()

  const unlockedCount = getUnlockedCount()
  const totalCount = getTotalBadgeCount()
  const completionPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0

  // Calculate highest tier achieved
  const tierOrder: BadgeTier[] = ["golden", "perfect", "ripe", "green", "sprout"]
  let highestTier: BadgeTier | null = null
  for (const tier of tierOrder) {
    if (TOPIC_BADGES.some((b) => b.tier === tier && unlockedBadges[b.id])) {
      highestTier = tier
      break
    }
  }

  // Get topics with progress
  const activeTopics = ALL_TOPIC_IDS.filter((id) => topicXP[id]?.xp > 0)

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          🍌 Badge Showcase
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your banana leadership journey from Sprout to Golden Banana
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unlockedCount}</p>
              <p className="text-xs text-muted-foreground">Badges Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100">
              <Flame className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completionPercent}%</p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highest tier banner */}
      {highestTier && (
        <Card className="overflow-hidden">
          <div
            className="p-4 flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${TIER_CONFIG[highestTier].color}15, ${TIER_CONFIG[highestTier].color}30)`,
            }}
          >
            <span className="text-4xl">{TIER_CONFIG[highestTier].emoji}</span>
            <div>
              <p className="font-bold text-lg">Highest Rank: {TIER_CONFIG[highestTier].label}</p>
              <p className="text-sm text-muted-foreground">Keep going to reach the next tier!</p>
            </div>
          </div>
        </Card>
      )}

      {/* Main content tabs */}
      <Tabs defaultValue="collection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="collection">All Badges</TabsTrigger>
          <TabsTrigger value="progress">Topic Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="collection">
          <BadgeGrid />
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {activeTopics.length > 0 ? (
              activeTopics.map((topicId) => {
                const mod = modules[topicId]
                return (
                  <Card key={topicId}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{mod?.title ?? topicId}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BadgeProgress topicId={topicId} />
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                <p className="text-4xl mb-3">🌱</p>
                <p className="font-medium">No topics started yet</p>
                <p className="text-sm">Complete lessons to see your badge progress here</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
