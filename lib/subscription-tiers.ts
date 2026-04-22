// =============================================================================
// SUBSCRIPTION TIERS
// Display-only pricing + limits surface. Actual "is the user premium?" state
// lives on the badge-store (`isPremium`) until real billing is wired up.
// =============================================================================

export type TierLimits = {
  templatesPerMonth: number
  roleplaysUnlimited: boolean
  exercisesUnlimited: boolean
  premiumTemplates: boolean
  premiumRoleplays: boolean
  prioritySupport?: boolean
  bonusContent?: boolean
}

export type TierDefinition = {
  id: "free" | "premium_monthly" | "premium_annual" | "template_pack"
  name: string
  price: number
  /** Display cadence; "one_time" for lifetime products. */
  billing: "monthly" | "annual" | "one_time" | "none"
  tagline?: string
  features: string[]
  limits: TierLimits
}

export const SUBSCRIPTION_TIERS: Record<TierDefinition["id"], TierDefinition> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    billing: "none",
    features: [
      "Access to all role-plays and exercises",
      "2 template downloads per month",
      "All lesson content and quizzes",
    ],
    limits: {
      templatesPerMonth: 2,
      roleplaysUnlimited: true,
      exercisesUnlimited: true,
      premiumTemplates: false,
      premiumRoleplays: false,
    },
  },

  premium_monthly: {
    id: "premium_monthly",
    name: "Premium Monthly",
    price: 19,
    billing: "monthly",
    tagline: "Cancel anytime",
    features: [
      "Unlimited template downloads",
      "All premium templates & role-plays",
      "Priority support",
    ],
    limits: {
      templatesPerMonth: Number.POSITIVE_INFINITY,
      roleplaysUnlimited: true,
      exercisesUnlimited: true,
      premiumTemplates: true,
      premiumRoleplays: true,
      prioritySupport: true,
    },
  },

  premium_annual: {
    id: "premium_annual",
    name: "Premium Annual",
    price: 190,
    billing: "annual",
    tagline: "Save $38 — 2 months free",
    features: [
      "Everything in Premium Monthly",
      "Exclusive bonus content",
      "Early access to new features",
    ],
    limits: {
      templatesPerMonth: Number.POSITIVE_INFINITY,
      roleplaysUnlimited: true,
      exercisesUnlimited: true,
      premiumTemplates: true,
      premiumRoleplays: true,
      prioritySupport: true,
      bonusContent: true,
    },
  },

  template_pack: {
    id: "template_pack",
    name: "Template Pack",
    price: 49,
    billing: "one_time",
    tagline: "One-time purchase — templates only",
    features: [
      "Unlimited template downloads forever",
      "All current & future templates",
    ],
    limits: {
      templatesPerMonth: Number.POSITIVE_INFINITY,
      roleplaysUnlimited: false,
      exercisesUnlimited: false,
      premiumTemplates: true,
      premiumRoleplays: false,
    },
  },
}
