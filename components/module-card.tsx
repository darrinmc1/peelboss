"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, Clock, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Module } from "@/data/modules"

type ModuleCardData = Module & {
  progress: number
  status: string
}

interface ModuleCardProps {
  module: ModuleCardData
  className?: string
}

export function ModuleCard({ module, className }: ModuleCardProps) {
  const isCompleted = module.status === "completed"
  const inProgress = module.progress > 0 && module.progress < 100

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted/60",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Decorative Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-0" />
        
        {/* Module Image */}
        <Image
          src={module.image || "/placeholder.svg?height=300&width=600"}
          alt={module.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 z-10"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 z-30 flex gap-2">
          <Badge 
            variant={isCompleted ? "secondary" : "default"} 
            className={cn(
              "px-2 py-0.5 capitalize shadow-sm backdrop-blur-md border-white/20",
              isCompleted ? "bg-green-500/90 text-white hover:bg-green-600/90" : "bg-primary/90 text-white"
            )}
          >
            {isCompleted ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </span>
            ) : (
              module.category
            )}
          </Badge>
          
          {module.level && (
            <Badge variant="outline" className="bg-white/10 text-white backdrop-blur-md border-white/20 shadow-sm">
              {module.level}
            </Badge>
          )}
        </div>

        {/* Duration/Popularity Info - Visible on Hover */}
        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {module.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            {module.progress > 0 ? `${module.progress}% done` : "Start Now"}
          </span>
        </div>
      </div>

      <CardHeader className="p-5 pb-2">
        <CardTitle className="line-clamp-1 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {module.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-grow">
        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {module.description}
        </p>
        
        {/* Progress bar logic */}
        {(module.progress > 0 || isCompleted) && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Overall Progress</span>
              <span>{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-1.5 shadow-inner" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button 
          asChild 
          className={cn(
            "w-full gap-2 font-semibold transition-all duration-300 shadow-sm",
            isCompleted ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary hover:shadow-primary/25"
          )}
        >
          <Link href={`/modules/${module.id}/overview`}>
            {inProgress ? "Continue Learning" : isCompleted ? "Review Module" : "View Module"}
            <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", inProgress && "animate-pulse")} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
