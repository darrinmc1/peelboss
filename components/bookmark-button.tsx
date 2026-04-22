"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBookmarks } from "@/lib/bookmark-store"

interface BookmarkButtonProps {
  moduleId: string
  chapterId: string
  title: string
  description?: string
}

export function BookmarkButton({ moduleId, chapterId, title, description = "" }: BookmarkButtonProps) {
  const { bookmarks, addBookmark } = useBookmarks()
  const [isOpen, setIsOpen] = useState(false)
  const [bookmarkTitle, setBookmarkTitle] = useState(title)
  const [bookmarkDescription, setBookmarkDescription] = useState(description)
  const [tags, setTags] = useState("")

  // Check if this content is already bookmarked
  const isBookmarked = bookmarks.some((bookmark) => bookmark.moduleId === moduleId && bookmark.chapterId === chapterId)

  const handleSaveBookmark = () => {
    // Split tags by comma and trim whitespace
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    addBookmark({
      moduleId,
      chapterId,
      title: bookmarkTitle,
      description: bookmarkDescription,
      tags: tagList,
    })

    setIsOpen(false)
  }

  if (isBookmarked) {
    return (
      <Button variant="ghost" size="sm" className="gap-1 text-green-600">
        <BookmarkCheck className="h-4 w-4" />
        Bookmarked
      </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Bookmark className="h-4 w-4" />
          Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Bookmark</DialogTitle>
          <DialogDescription>Save this content to your bookmarks for quick access later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={bookmarkTitle} onChange={(e) => setBookmarkTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={bookmarkDescription}
              onChange={(e) => setBookmarkDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="leadership, communication, strategy"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveBookmark}>Save Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
