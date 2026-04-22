import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2, MoreHorizontal, Eye, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for content items
const contentItems = [
  {
    id: "1",
    title: "Transformational vs. Transactional Leadership",
    moduleId: "leadership-styles",
    moduleName: "Leadership and Management Styles",
    type: "chapter",
    status: "published",
    lastUpdated: "2023-05-10",
  },
  {
    id: "2",
    title: "Servant and Situational Leadership",
    moduleId: "leadership-styles",
    moduleName: "Leadership and Management Styles",
    type: "chapter",
    status: "published",
    lastUpdated: "2023-05-12",
  },
  {
    id: "3",
    title: "Autocratic, Democratic, and Laissez-Faire",
    moduleId: "leadership-styles",
    moduleName: "Leadership and Management Styles",
    type: "chapter",
    status: "draft",
    lastUpdated: "2023-05-14",
  },
  {
    id: "4",
    title: "Matching Leadership Styles to Organizational Needs",
    moduleId: "leadership-styles",
    moduleName: "Leadership and Management Styles",
    type: "chapter",
    status: "published",
    lastUpdated: "2023-05-15",
  },
  {
    id: "5",
    title: "Leadership Styles Quiz",
    moduleId: "leadership-styles",
    moduleName: "Leadership and Management Styles",
    type: "quiz",
    status: "published",
    lastUpdated: "2023-05-16",
  },
]

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage all content across modules and topics</p>
        </div>
        <Button asChild>
          <Link href="/admin/content/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Content
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search content..." className="w-full pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="chapter">Chapters</SelectItem>
            <SelectItem value="quiz">Quizzes</SelectItem>
            <SelectItem value="exercise">Exercises</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.moduleName}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "published" ? "default" : item.status === "draft" ? "outline" : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Preview</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
