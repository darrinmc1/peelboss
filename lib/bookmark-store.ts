import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Bookmark = {
  id: string
  moduleId: string
  chapterId: string
  title: string
  description: string
  createdAt: Date
  tags: string[]
}

type BookmarkState = {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void
  removeBookmark: (id: string) => void
  getBookmarksByModule: (moduleId: string) => Bookmark[]
  getBookmarksByTag: (tag: string) => Bookmark[]
}

export const useBookmarks = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks,
            {
              ...bookmark,
              id: `bookmark-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              createdAt: new Date(),
            },
          ],
        })),

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        })),

      getBookmarksByModule: (moduleId) => {
        return get().bookmarks.filter((bookmark) => bookmark.moduleId === moduleId)
      },

      getBookmarksByTag: (tag) => {
        return get().bookmarks.filter((bookmark) => bookmark.tags.includes(tag))
      },
    }),
    {
      name: "bookmarks-storage",
    },
  ),
)
