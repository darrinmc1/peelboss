import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ModuleProgress = {
  moduleId: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
  lastAccessed: Date
}

export type UserProgressState = {
  modules: Record<string, ModuleProgress>
  streak: number
  lastActive: Date | null

  // Actions
  updateModuleProgress: (moduleId: string, progress: number) => void
  completeModule: (moduleId: string) => void
  startModule: (moduleId: string) => void
  updateStreak: () => void
  getOverallProgress: () => number
}

export const useUserProgress = create<UserProgressState>()(
  persist(
    (set, get) => ({
      modules: {},
      streak: 0,
      lastActive: null,

      updateModuleProgress: (moduleId, progress) =>
        set((state) => {
          const currentModule = state.modules[moduleId] || {
            moduleId,
            progress: 0,
            status: "not-started" as const,
            lastAccessed: new Date(),
          }

          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...currentModule,
                progress: progress,
                status: progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "not-started",
                lastAccessed: new Date(),
              },
            },
          }
        }),

      completeModule: (moduleId) =>
        set((state) => {
          const currentModule = state.modules[moduleId] || {
            moduleId,
            progress: 0,
            status: "not-started" as const,
            lastAccessed: new Date(),
          }

          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...currentModule,
                progress: 100,
                status: "completed",
                lastAccessed: new Date(),
              },
            },
          }
        }),

      startModule: (moduleId) =>
        set((state) => {
          if (state.modules[moduleId]?.progress > 0) return state

          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                moduleId,
                progress: 1,
                status: "in-progress",
                lastAccessed: new Date(),
              },
            },
          }
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date()
          const lastActive = state.lastActive ? new Date(state.lastActive) : null

          // Reset date times to compare just the dates
          today.setHours(0, 0, 0, 0)
          if (lastActive) lastActive.setHours(0, 0, 0, 0)

          // If last active was yesterday, increment streak
          if (lastActive) {
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)

            if (lastActive.getTime() === yesterday.getTime()) {
              return { streak: state.streak + 1, lastActive: new Date() }
            }

            // If last active was today, keep streak
            if (lastActive.getTime() === today.getTime()) {
              return state
            }

            // Otherwise reset streak
            return { streak: 1, lastActive: new Date() }
          }

          // First time active
          return { streak: 1, lastActive: new Date() }
        }),

      getOverallProgress: () => {
        const state = get()
        const modules = Object.values(state.modules)

        if (modules.length === 0) return 0

        const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0)
        return Math.round(totalProgress / modules.length)
      },
    }),
    {
      name: "user-progress-storage",
    },
  ),
)
