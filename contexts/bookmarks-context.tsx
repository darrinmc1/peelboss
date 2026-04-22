"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface Bookmark {
  id: string
  userId: string
  moduleId: string
  chapterId: string
  sectionId: string
  sectionTitle: string
  createdAt: string
  note?: string
}

interface BookmarksContextType {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void
  removeBookmark: (bookmarkId: string) => void
  updateBookmark: (bookmarkId: string, note: string) => void
  hasBookmark: (sectionId: string) => boolean
  getBookmark: (sectionId: string) => Bookmark | undefined
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined)

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks")
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks))
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage", error)
      }
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (bookmarkData: Omit<Bookmark, "id" | "createdAt">) => {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setBookmarks((prev) => [...prev, newBookmark])
  }

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== bookmarkId))
  }

  const updateBookmark = (bookmarkId: string, note: string) => {
    setBookmarks((prev) => prev.map((bookmark) => (bookmark.id === bookmarkId ? { ...bookmark, note } : bookmark)))
  }

  const hasBookmark = (sectionId: string) => {
    return bookmarks.some((bookmark) => bookmark.sectionId === sectionId)
  }

  const getBookmark = (sectionId: string) => {
    return bookmarks.find((bookmark) => bookmark.sectionId === sectionId)
  }

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, updateBookmark, hasBookmark, getBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }
  return context
}
