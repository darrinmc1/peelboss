// =============================================================================
// ACTIVITY DATA LOADER
// Central registry for role-play scenarios, exercises, templates, and guides.
// =============================================================================

import type {
  GuideDefinition,
  RolePlayScenario,
  TemplateDefinition,
} from "@/types/activities"
import rolePlayScenariosJson from "./roleplay-scenarios.json"
import templatesCatalogJson from "./templates-catalog.json"

// ---- Role-plays ----

// JSON literal inference is narrower than our unions (e.g. "Intermediate"
// becomes `string`). Bridge via `unknown` — we trust the author to keep the
// JSON aligned with the type; the engine throws loudly on shape drift.
export const ROLEPLAY_SCENARIOS: Record<string, RolePlayScenario> =
  rolePlayScenariosJson as unknown as Record<string, RolePlayScenario>

export function getRolePlayScenario(id: string): RolePlayScenario | undefined {
  return ROLEPLAY_SCENARIOS[id]
}

export function listRolePlayScenarios(): RolePlayScenario[] {
  return Object.values(ROLEPLAY_SCENARIOS)
}

/**
 * Map a chapter to a role-play scenario ID. Explicit wiring (not inferred)
 * so scenarios can be authored independently of the modules config.
 */
export const CHAPTER_ROLEPLAY_MAP: Record<string, string> = {
  "transformational-vs-transactional": "disengaged-employee",
  "servant-situational": "disengaged-employee",
}

export function getRolePlayForChapter(chapterId: string): RolePlayScenario | undefined {
  const scenarioId = CHAPTER_ROLEPLAY_MAP[chapterId]
  return scenarioId ? ROLEPLAY_SCENARIOS[scenarioId] : undefined
}

// ---- Templates ----

export const TEMPLATES_CATALOG: Record<string, TemplateDefinition> =
  templatesCatalogJson as unknown as Record<string, TemplateDefinition>

export function getTemplate(id: string): TemplateDefinition | undefined {
  return TEMPLATES_CATALOG[id]
}

export function listTemplates(): TemplateDefinition[] {
  return Object.values(TEMPLATES_CATALOG)
}

export function listTemplateTopics(): string[] {
  const set = new Set<string>()
  for (const t of listTemplates()) set.add(t.topic)
  return ["All", ...Array.from(set).sort()]
}

export function listTemplateFileTypes(): string[] {
  const set = new Set<string>()
  for (const t of listTemplates()) set.add(t.fileType)
  return ["All", ...Array.from(set).sort()]
}

// ---- Guides (stub — catalog empty until content is authored) ----

export const GUIDES_CATALOG: Record<string, GuideDefinition> = {}

export function listGuides(): GuideDefinition[] {
  return Object.values(GUIDES_CATALOG)
}
