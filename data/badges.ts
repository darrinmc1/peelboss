// =============================================================================
// BANANA LEADERSHIP BADGE SYSTEM
// Progression: Sprout 🌱 → Green Banana 🟢 → Ripe Banana 🟡 → Perfect Banana 🍌 → Golden Banana 👑
// =============================================================================

export type BadgeTier = "sprout" | "green" | "ripe" | "perfect" | "golden"

export type Badge = {
  id: string
  name: string
  emoji: string
  tier: BadgeTier
  topicId: string
  topicName: string
  description: string
  xpRequired: number
  lessonsRequired: number
  color: string
}

export type SpecialBadge = {
  id: string
  name: string
  emoji: string
  description: string
  condition: string
  category: "achievement" | "humor" | "streak" | "milestone"
  color: string
}

export const TIER_CONFIG: Record<BadgeTier, { label: string; emoji: string; color: string; border: string; bgGradient: string }> = {
  sprout: {
    label: "Sprout",
    emoji: "🌱",
    color: "#90EE90",
    border: "border-green-300",
    bgGradient: "from-green-100 to-green-200",
  },
  green: {
    label: "Green Banana",
    emoji: "🟢",
    color: "#32CD32",
    border: "border-green-500",
    bgGradient: "from-green-200 to-green-300",
  },
  ripe: {
    label: "Ripe Banana",
    emoji: "🟡",
    color: "#FFD700",
    border: "border-yellow-400",
    bgGradient: "from-yellow-100 to-yellow-300",
  },
  perfect: {
    label: "Perfect Banana",
    emoji: "🍌",
    color: "#FFA500",
    border: "border-orange-400",
    bgGradient: "from-yellow-300 to-orange-300",
  },
  golden: {
    label: "Golden Banana",
    emoji: "👑",
    color: "#FFD700",
    border: "border-yellow-500",
    bgGradient: "from-yellow-400 to-amber-400",
  },
}

// XP + lesson thresholds per tier
const TIER_REQUIREMENTS: Record<BadgeTier, { xp: number; lessons: number }> = {
  sprout: { xp: 100, lessons: 1 },
  green: { xp: 300, lessons: 2 },
  ripe: { xp: 600, lessons: 3 },
  perfect: { xp: 1200, lessons: 4 },
  golden: { xp: 2500, lessons: 5 },
}

type TopicBadgeNames = {
  topicId: string
  topicName: string
  tiers: Record<BadgeTier, string>
}

// All 42 module topics with banana-themed badge names per tier
const TOPIC_BADGE_NAMES: TopicBadgeNames[] = [
  // ---- Leadership & Management ----
  { topicId: "leadership-styles", topicName: "Leadership Styles", tiers: { sprout: "Seedling Commander", green: "Green General", ripe: "Ripe Ruler", perfect: "Perfect Captain", golden: "Golden Leader" } },
  { topicId: "strategic-management", topicName: "Strategic Management", tiers: { sprout: "Plan Planter", green: "Green Strategist", ripe: "Ripe Tactician", perfect: "Master Planner", golden: "Golden Visionary" } },
  { topicId: "project-management", topicName: "Project Management", tiers: { sprout: "Task Sprout", green: "Green Gantt", ripe: "Ripe Deliverer", perfect: "Perfect PM", golden: "Golden Closer" } },
  { topicId: "change-management", topicName: "Change Management", tiers: { sprout: "Change Seedling", green: "Green Shifter", ripe: "Ripe Transformer", perfect: "Perfect Pivot", golden: "Golden Catalyst" } },
  { topicId: "operations-management", topicName: "Operations Management", tiers: { sprout: "Ops Sprout", green: "Green Machine", ripe: "Ripe Optimizer", perfect: "Perfect Process", golden: "Golden Operator" } },
  { topicId: "human-resource-management", topicName: "Human Resources", tiers: { sprout: "People Sprout", green: "Green Recruiter", ripe: "Ripe HR Ninja", perfect: "Perfect People Pro", golden: "Golden Culture King" } },
  { topicId: "financial-management", topicName: "Financial Management", tiers: { sprout: "Penny Sprout", green: "Green Accountant", ripe: "Ripe Treasurer", perfect: "Budget Banana", golden: "Golden CFO" } },
  { topicId: "marketing-management", topicName: "Marketing Management", tiers: { sprout: "Brand Seedling", green: "Green Marketer", ripe: "Ripe Campaigner", perfect: "Perfect Pitch", golden: "Golden Brand Boss" } },
  { topicId: "risk-management", topicName: "Risk Management", tiers: { sprout: "Risk Sprout", green: "Green Guardian", ripe: "Ripe Risk Ranger", perfect: "Perfect Mitigator", golden: "Golden Shield" } },
  { topicId: "innovation-product-management", topicName: "Innovation & Product", tiers: { sprout: "Idea Seedling", green: "Green Inventor", ripe: "Ripe Creator", perfect: "Perfect Innovator", golden: "Golden Disruptor" } },
  // ---- Skills & Soft Skills ----
  { topicId: "time-productivity", topicName: "Time & Productivity", tiers: { sprout: "Clock Sprout", green: "Green Timer", ripe: "Ripe Hustler", perfect: "Perfect Planner", golden: "Golden Timekeeper" } },
  { topicId: "customer-relationship", topicName: "Customer Relationships", tiers: { sprout: "Service Seedling", green: "Green Helper", ripe: "Ripe Relationship", perfect: "Customer Whisperer", golden: "Golden CX Champion" } },
  { topicId: "conflict-resolution", topicName: "Conflict Resolution", tiers: { sprout: "Peace Sprout", green: "Green Mediator", ripe: "Ripe Peacemaker", perfect: "Zen Banana", golden: "Golden Diplomat" } },
  { topicId: "decision-making", topicName: "Decision Making", tiers: { sprout: "Choice Sprout", green: "Green Decider", ripe: "Split Decision", perfect: "Perfect Judgment", golden: "Golden Oracle" } },
  { topicId: "performance-management", topicName: "Performance Management", tiers: { sprout: "Review Sprout", green: "Green Evaluator", ripe: "Ripe Reviewer", perfect: "Perfect Appraiser", golden: "Golden Benchmark" } },
  { topicId: "organizational-behavior", topicName: "Organizational Behavior", tiers: { sprout: "Culture Sprout", green: "Green Observer", ripe: "Ripe Analyst", perfect: "Behavior Guru", golden: "Golden Culture Architect" } },
  { topicId: "supply-chain-logistics", topicName: "Supply Chain & Logistics", tiers: { sprout: "Chain Sprout", green: "Green Shipper", ripe: "Ripe Logistics Pro", perfect: "Perfect Pipeline", golden: "Golden Supply Czar" } },
  { topicId: "digital-transformation", topicName: "Digital Transformation", tiers: { sprout: "Digital Seedling", green: "Green Techie", ripe: "Ripe Digitizer", perfect: "Transformation Ace", golden: "Golden Digital Deity" } },
  { topicId: "ethics-csr", topicName: "Ethics & CSR", tiers: { sprout: "Ethics Sprout", green: "Green Conscience", ripe: "Ripe Integrity", perfect: "Perfect Principles", golden: "Golden Moral Compass" } },
  { topicId: "global-cross-cultural", topicName: "Global & Cross-Cultural", tiers: { sprout: "Globe Sprout", green: "Green Traveler", ripe: "Ripe Ambassador", perfect: "World Banana", golden: "Golden Global Guru" } },
  // ---- Finance ----
  { topicId: "budgeting-financial-planning", topicName: "Budgeting & Planning", tiers: { sprout: "Budget Sprout", green: "Green Budgeter", ripe: "Ripe Forecaster", perfect: "Perfect Planner", golden: "Golden Fiscal Wizard" } },
  { topicId: "investment-basics", topicName: "Investment Basics", tiers: { sprout: "Investor Seedling", green: "Green Investor", ripe: "Ripe Portfolio", perfect: "Perfect Returns", golden: "Golden Bull" } },
  { topicId: "financial-risk-management", topicName: "Financial Risk", tiers: { sprout: "Risk Seedling", green: "Green Hedger", ripe: "Ripe Risk Hawk", perfect: "Perfect Hedge Pro", golden: "Golden Risk Titan" } },
  // ---- Strategy ----
  { topicId: "competitive-analysis", topicName: "Competitive Analysis", tiers: { sprout: "Spy Sprout", green: "Green Scout", ripe: "Ripe Analyst", perfect: "Market Maven", golden: "Golden Competitor Crusher" } },
  { topicId: "business-model-innovation", topicName: "Business Model Innovation", tiers: { sprout: "Model Sprout", green: "Green Modeler", ripe: "Ripe Disruptor", perfect: "Canvas King", golden: "Golden Pivot Master" } },
  { topicId: "strategic-planning-execution", topicName: "Strategic Planning", tiers: { sprout: "Strategy Seedling", green: "Green Executor", ripe: "Ripe Strategist", perfect: "Plan Perfectionist", golden: "Golden Strategy Sage" } },
  // ---- Marketing Deep Dives ----
  { topicId: "digital-marketing-strategies", topicName: "Digital Marketing", tiers: { sprout: "Click Sprout", green: "Green Clicker", ripe: "Ripe Ad Runner", perfect: "Funnel Master", golden: "Golden Growth Hacker" } },
  { topicId: "brand-management", topicName: "Brand Management", tiers: { sprout: "Brand Seedling", green: "Green Brander", ripe: "Ripe Brand Builder", perfect: "Brand Guru", golden: "Golden Brand Legend" } },
  { topicId: "marketing-analytics", topicName: "Marketing Analytics", tiers: { sprout: "Data Sprout", green: "Green Tracker", ripe: "Ripe Analyst", perfect: "Metrics Master", golden: "Golden Data Wizard" } },
  { topicId: "content-marketing", topicName: "Content Marketing", tiers: { sprout: "Content Seedling", green: "Green Writer", ripe: "Ripe Storyteller", perfect: "Content King", golden: "Golden Wordsmith" } },
  { topicId: "social-media-marketing", topicName: "Social Media Marketing", tiers: { sprout: "Social Sprout", green: "Green Poster", ripe: "Ripe Influencer", perfect: "Viral Banana", golden: "Golden Social Guru" } },
  { topicId: "marketing-research", topicName: "Marketing Research", tiers: { sprout: "Research Sprout", green: "Green Surveyor", ripe: "Ripe Researcher", perfect: "Insight Pro", golden: "Golden Research Titan" } },
  { topicId: "pricing-strategies", topicName: "Pricing Strategies", tiers: { sprout: "Price Sprout", green: "Green Pricer", ripe: "Ripe Negotiator", perfect: "Value Ninja", golden: "Golden Price Sage" } },
  { topicId: "international-marketing", topicName: "International Marketing", tiers: { sprout: "Export Sprout", green: "Green Globalist", ripe: "Ripe Exporter", perfect: "Market Expander", golden: "Golden World Marketer" } },
  // ---- Innovation Deep Dives ----
  { topicId: "design-thinking", topicName: "Design Thinking", tiers: { sprout: "Design Sprout", green: "Green Thinker", ripe: "Ripe Designer", perfect: "Empathy Expert", golden: "Golden Design Deity" } },
  { topicId: "innovation-culture", topicName: "Innovation Culture", tiers: { sprout: "Culture Seedling", green: "Green Pioneer", ripe: "Ripe Innovator", perfect: "Culture Catalyst", golden: "Golden Innovation Architect" } },
  { topicId: "disruptive-innovation", topicName: "Disruptive Innovation", tiers: { sprout: "Disrupt Sprout", green: "Green Challenger", ripe: "Ripe Disruptor", perfect: "Industry Shaker", golden: "Golden Disruption Lord" } },
  { topicId: "open-innovation", topicName: "Open Innovation", tiers: { sprout: "Open Sprout", green: "Green Collaborator", ripe: "Ripe Networker", perfect: "Open Source Sage", golden: "Golden Ecosystem Builder" } },
  { topicId: "innovation-metrics", topicName: "Innovation Metrics", tiers: { sprout: "Metric Sprout", green: "Green Measurer", ripe: "Ripe Metric Pro", perfect: "Innovation Analyst", golden: "Golden Metric Maestro" } },
  { topicId: "sustainable-innovation", topicName: "Sustainable Innovation", tiers: { sprout: "Eco Sprout", green: "Green Sustainer", ripe: "Ripe Eco-Warrior", perfect: "Sustainability Star", golden: "Golden Green Genius" } },
  { topicId: "technology-adoption", topicName: "Technology Adoption", tiers: { sprout: "Tech Sprout", green: "Green Adopter", ripe: "Ripe Early Adopter", perfect: "Tech Evangelist", golden: "Golden Tech Prophet" } },
  { topicId: "service-innovation", topicName: "Service Innovation", tiers: { sprout: "Service Sprout", green: "Green Service Agent", ripe: "Ripe Service Star", perfect: "Service Virtuoso", golden: "Golden Service Legend" } },
]

// Generate all topic badges
function generateTopicBadges(): Badge[] {
  const badges: Badge[] = []
  const tiers: BadgeTier[] = ["sprout", "green", "ripe", "perfect", "golden"]

  for (const topic of TOPIC_BADGE_NAMES) {
    for (const tier of tiers) {
      badges.push({
        id: `${topic.topicId}-${tier}`,
        name: topic.tiers[tier],
        emoji: TIER_CONFIG[tier].emoji,
        tier,
        topicId: topic.topicId,
        topicName: topic.topicName,
        description: `Reach ${TIER_CONFIG[tier].label} level in ${topic.topicName}`,
        xpRequired: TIER_REQUIREMENTS[tier].xp,
        lessonsRequired: TIER_REQUIREMENTS[tier].lessons,
        color: TIER_CONFIG[tier].color,
      })
    }
  }

  return badges
}

// Special achievement badges
export const SPECIAL_BADGES: SpecialBadge[] = [
  // Achievement badges
  { id: "top-banana", name: "Top Banana", emoji: "🍌", description: "Reach #1 on the leaderboard", condition: "leaderboard_rank_1", category: "achievement", color: "#FFD700" },
  { id: "banana-bunch-boss", name: "Banana Bunch Boss", emoji: "🍌🍌🍌", description: "Complete 10 modules", condition: "modules_completed_10", category: "achievement", color: "#FFA500" },
  { id: "smoothie-operator", name: "Smoothie Operator", emoji: "🥤", description: "Complete 5 modules without failing any quiz", condition: "perfect_quizzes_5", category: "achievement", color: "#FF69B4" },
  { id: "banana-split-master", name: "Banana Split Master", emoji: "🍨", description: "Complete modules in 3 different categories", condition: "categories_3", category: "achievement", color: "#DDA0DD" },
  { id: "overachiever-banana", name: "Overachiever Banana", emoji: "🏆", description: "Earn 10,000 total XP", condition: "total_xp_10000", category: "achievement", color: "#FFD700" },
  { id: "speed-peel", name: "Speed Peel", emoji: "⚡", description: "Complete a module in under 30 minutes", condition: "fast_completion", category: "achievement", color: "#00BFFF" },
  { id: "early-bird-banana", name: "Early Bird Banana", emoji: "🌅", description: "Complete a lesson before 7 AM", condition: "early_morning", category: "achievement", color: "#FFA07A" },
  { id: "night-owl-banana", name: "Night Owl Banana", emoji: "🦉", description: "Complete a lesson after midnight", condition: "late_night", category: "achievement", color: "#4B0082" },
  { id: "completionist", name: "The Completionist", emoji: "💯", description: "Complete every single module", condition: "all_modules_completed", category: "achievement", color: "#FFD700" },
  { id: "bookworm-banana", name: "Bookworm Banana", emoji: "📚", description: "Bookmark 20 sections", condition: "bookmarks_20", category: "achievement", color: "#8B4513" },

  // Humor badges
  { id: "banana-peel-survivor", name: "Banana Peel Survivor", emoji: "🍌💨", description: "Fail a quiz but come back and ace it", condition: "quiz_redemption", category: "humor", color: "#FF6347" },
  { id: "circus-banana", name: "Circus Banana", emoji: "🎪", description: "Have 5 modules in-progress at the same time", condition: "juggling_5", category: "humor", color: "#FF4500" },
  { id: "juggling-banana", name: "Juggling Banana", emoji: "🤹", description: "Switch between 3 modules in one session", condition: "module_hopping", category: "humor", color: "#DA70D6" },
  { id: "drama-llama-tamer", name: "Drama Llama Tamer", emoji: "🦙", description: "Complete the Conflict Resolution module", condition: "complete_conflict-resolution", category: "humor", color: "#9370DB" },
  { id: "meeting-survivor", name: "Meeting Survivor", emoji: "💀", description: "Spend over 2 hours in a single session", condition: "marathon_session", category: "humor", color: "#696969" },
  { id: "panic-button-presser", name: "Panic Button Presser", emoji: "🚨", description: "Use the panic button 3 times", condition: "panic_3", category: "humor", color: "#DC143C" },
  { id: "procrastination-pro", name: "Procrastination Pro", emoji: "🐌", description: "Start a module, leave for 7+ days, then come back", condition: "procrastination_return", category: "humor", color: "#A9A9A9" },

  // Streak badges
  { id: "streak-7", name: "Week Warrior", emoji: "🔥", description: "Maintain a 7-day learning streak", condition: "streak_7", category: "streak", color: "#FF4500" },
  { id: "streak-30", name: "Monthly Banana", emoji: "🔥🔥", description: "Maintain a 30-day learning streak", condition: "streak_30", category: "streak", color: "#FF6600" },
  { id: "streak-100", name: "Century Banana", emoji: "🔥🔥🔥", description: "Maintain a 100-day learning streak", condition: "streak_100", category: "streak", color: "#FF0000" },
  { id: "streak-365", name: "Year of the Banana", emoji: "🍌🎆", description: "Maintain a 365-day learning streak", condition: "streak_365", category: "streak", color: "#FFD700" },

  // Milestone badges
  { id: "first-lesson", name: "First Bite", emoji: "🍴", description: "Complete your very first lesson", condition: "first_lesson", category: "milestone", color: "#98FB98" },
  { id: "first-module", name: "First Bunch", emoji: "🍌", description: "Complete your first full module", condition: "first_module", category: "milestone", color: "#FFDAB9" },
  { id: "halfway-hero", name: "Halfway Hero", emoji: "🏃", description: "Complete 50% of all available modules", condition: "half_modules", category: "milestone", color: "#87CEEB" },
  { id: "xp-1000", name: "Thousand Club", emoji: "🎯", description: "Earn 1,000 total XP", condition: "total_xp_1000", category: "milestone", color: "#DDA0DD" },
  { id: "xp-5000", name: "Five Thousand Fanatic", emoji: "⭐", description: "Earn 5,000 total XP", condition: "total_xp_5000", category: "milestone", color: "#FFD700" },
  { id: "quiz-master", name: "Quiz Master", emoji: "🧠", description: "Score 100% on 10 quizzes", condition: "perfect_quizzes_10", category: "milestone", color: "#7B68EE" },
]

// Export generated badges
export const TOPIC_BADGES: Badge[] = generateTopicBadges()

// Helper to get badges for a specific topic
export function getBadgesForTopic(topicId: string): Badge[] {
  return TOPIC_BADGES.filter((b) => b.topicId === topicId)
}

// Helper to get badge by ID
export function getBadgeById(badgeId: string): Badge | undefined {
  return TOPIC_BADGES.find((b) => b.id === badgeId)
}

// Helper to get special badge by ID
export function getSpecialBadgeById(badgeId: string): SpecialBadge | undefined {
  return SPECIAL_BADGES.find((b) => b.id === badgeId)
}

// All topic IDs for iteration
export const ALL_TOPIC_IDS = TOPIC_BADGE_NAMES.map((t) => t.topicId)
