"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Video, X, LinkIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VideoUploader() {
  const [uploadMethod, setUploadMethod] = useState("file")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState("")

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setThumbnailPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const clearThumbnail = () => {
    setThumbnailPreview("")
  }

  return (
    <div className="space-y-6">
      <Tabs value={uploadMethod} onValueChange={setUploadMethod}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">Upload File</TabsTrigger>
          <TabsTrigger value="url">External URL</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upload Video File</CardTitle>
              <CardDescription>Upload an MP4 video file (max 500MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="video-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">MP4 (MAX. 500MB)</p>
                  </div>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/mp4"
                    className="hidden"
                    onChange={handleVideoFileChange}
                  />
                </label>
              </div>

              {videoFile && (
                <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{videoFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setVideoFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="video-url">Video URL</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="video-url"
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  className="pl-8"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Enter a direct link to an MP4 file or a YouTube/Vimeo URL</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="video-duration">Duration (minutes)</Label>
        <Input id="video-duration" type="number" min="1" placeholder="Enter video duration" className="w-32" />
      </div>

      <div className="space-y-2">
        <Label>Video Thumbnail</Label>
        <div className="flex items-center gap-4">
          {thumbnailPreview ? (
            <div className="relative w-40 h-24 rounded-md overflow-hidden">
              <img
                src={thumbnailPreview || "/placeholder.svg"}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={clearThumbnail}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="w-40 h-24 flex items-center justify-center bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">No thumbnail</p>
            </div>
          )}

          <div>
            <Input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
            <Button type="button" variant="outline" size="sm" asChild>
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                Upload Thumbnail
              </label>
            </Button>
            <p className="text-xs text-muted-foreground mt-1">Recommended: 16:9 ratio, JPG or PNG</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="video-transcript">Transcript</Label>
        <Textarea id="video-transcript" placeholder="Enter video transcript or captions" rows={5} />
        <p className="text-xs text-muted-foreground">Adding a transcript improves accessibility and searchability</p>
      </div>
    </div>
  )
}
