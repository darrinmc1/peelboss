"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Bookmark, Clock, Filter, Search, Tag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBookmarks } from "@/lib/bookmark-store"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags from bookmarks
  const allTags = Array.from(new Set(bookmarks.flatMap((bookmark) => bookmark.tags)))

  // Filter bookmarks based on search and selected tag
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag ? bookmark.tags.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  // Sort bookmarks by date (newest first)
  const sortedBookmarks = [...filteredBookmarks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Bookmarks</h1>
        <p className="text-muted-foreground">Save and organize important content for quick reference</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookmarks..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {allTags.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                {selectedTag ? `Tag: ${selectedTag}` : "Filter by Tag"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedTag(null)}>All Tags</DropdownMenuItem>
              {allTags.map((tag) => (
                <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="all">All Bookmarks</TabsTrigger>
          {/* Add more tabs if needed */}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {sortedBookmarks.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No bookmarks found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {bookmarks.length === 0
                  ? "Bookmark important content as you learn to save it here"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedBookmarks.map((bookmark) => {
                return (
                  <Card key={bookmark.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeBookmark(bookmark.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">{bookmark.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {bookmark.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Saved on {new Date(bookmark.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild className="w-full gap-1">
                        <Link href={`/modules/${bookmark.moduleId}/chapters/${bookmark.chapterId}`}>
                          Go to Content
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
