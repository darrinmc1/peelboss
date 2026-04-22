"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, CheckCircle, Circle, BookOpen, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Module } from "@/data/modules"

interface LessonNavigationSidebarProps {
  module: Module
  currentChapterId: string
}

export function LessonNavigationSidebar({ module, currentChapterId }: LessonNavigationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Calculate which chapters should be locked (future implementation could use real progress data)
  // For now, we'll just simulate by locking chapters after the current one
  const currentChapterIndex = module.chapters.findIndex((chapter) => chapter.id === currentChapterId)

  return (
    <div
      className={cn(
        "h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[60px]" : "w-[280px]",
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <h3 className="font-medium truncate">
            <Link href={`/modules/${module.id}/overview`} className="hover:underline">
              {module.title}
            </Link>
          </h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {module.chapters.map((chapter, index) => {
            const isActive = chapter.id === currentChapterId
            const isCompleted = chapter.completed
            const isLocked = index > currentChapterIndex + 1 && !isCompleted

            return (
              <TooltipProvider key={chapter.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size={isCollapsed ? "icon" : "default"}
                        className={cn(
                          "w-full justify-start mb-1",
                          isCollapsed ? "h-10 w-10 p-0" : "h-10 px-2",
                          isLocked && "opacity-50 cursor-not-allowed",
                        )}
                        asChild={!isLocked}
                        disabled={isLocked}
                      >
                        {!isLocked ? (
                          <Link href={`/modules/${module.id}/chapters/${chapter.id}`}>
                            {isCollapsed ? (
                              <div className="flex items-center justify-center">
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <BookOpen className="h-4 w-4" />
                                )}
                              </div>
                            ) : (
                              <>
                                <div className="mr-2 flex h-5 w-5 items-center justify-center">
                                  {isCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : isActive ? (
                                    <BookOpen className="h-4 w-4" />
                                  ) : (
                                    <Circle className="h-4 w-4" />
                                  )}
                                </div>
                                <span className="truncate">{chapter.title}</span>
                              </>
                            )}
                          </Link>
                        ) : (
                          <div>
                            {isCollapsed ? (
                              <div className="flex items-center justify-center">
                                <Lock className="h-4 w-4" />
                              </div>
                            ) : (
                              <>
                                <div className="mr-2 flex h-5 w-5 items-center justify-center">
                                  <Lock className="h-4 w-4" />
                                </div>
                                <span className="truncate">{chapter.title}</span>
                              </>
                            )}
                          </div>
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={cn(!isCollapsed && "hidden")}>
                    <p>{chapter.title}</p>
                    {isLocked && <p className="text-xs text-muted-foreground">Complete previous chapters first</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </ScrollArea>

      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium">Navigation Tips:</p>
            <p className="mt-1">• Click chapter titles to navigate</p>
            <p>• Completed chapters are marked with ✓</p>
            <p>• Collapse this sidebar for more space</p>
            <p className="italic mt-2">
              Remember: Management is a journey, not a destination... unless that destination is a corner office.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
