"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  LinkIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Eye,
} from "lucide-react"

export function ContentEditor() {
  const [content, setContent] = useState("")
  const [activeTab, setActiveTab] = useState("write")

  const handleInsertFormatting = (format: string) => {
    // This is a simplified example - in a real app, you'd use a proper rich text editor
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**bold text**`
        break
      case "italic":
        formattedText = `*italic text*`
        break
      case "h1":
        formattedText = `# Heading 1`
        break
      case "h2":
        formattedText = `## Heading 2`
        break
      case "h3":
        formattedText = `### Heading 3`
        break
      case "ul":
        formattedText = `- List item 1\n- List item 2\n- List item 3`
        break
      case "ol":
        formattedText = `1. List item 1\n2. List item 2\n3. List item 3`
        break
      case "link":
        formattedText = `[link text](https://example.com)`
        break
      case "image":
        formattedText = `![alt text](https://example.com/image.jpg)`
        break
      case "code":
        formattedText = "```\ncode block\n```"
        break
      default:
        formattedText = ""
    }

    setContent((prev) => prev + formattedText)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("h1")}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("h2")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("h3")}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("ul")}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("ol")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("link")}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("image")}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleInsertFormatting("code")}>
          <Code className="h-4 w-4" />
        </Button>
        <div className="flex-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab(activeTab === "write" ? "preview" : "write")}
        >
          <Eye className="h-4 w-4 mr-1" />
          {activeTab === "write" ? "Preview" : "Edit"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-0">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here using Markdown..."
            className="min-h-[400px] font-mono"
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }} />
            ) : (
              <p className="text-muted-foreground">Preview will appear here...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Key Takeaways</h3>
        <Textarea placeholder="Enter key takeaways (one per line)" rows={3} />
      </div>
    </div>
  )
}
