"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Archive,
  ArchiveX,
  ChevronDown,
  Clock,
  Forward,
  GripVertical,
  Inbox,
  LayoutGrid,
  LogOut,
  Mail,
  MessageSquare,
  MoreVertical,
  PenBox,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Trash2,
  Undo,
  User,
  Paperclip,
  ExternalLink,
} from "lucide-react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

interface Email {
  id: number
  sender: string
  subject: string
  preview: string
  time: string
  tags?: string[]
  replyTo?: string
  attachments?: { name: string; size: string }[]
}

export default function EmailClient() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: "William Smith",
      subject: "Meeting Tomorrow",
      preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share.",
      time: "Oct 22, 2023, 9:00:00 AM",
      tags: ["work", "important"],
      replyTo: "williamsmith@example.com",
      attachments: [
        { name: "project_overview.pdf", size: "2.3 MB" },
        { name: "meeting_agenda.docx", size: "156 KB" }
      ]
    },
    {
      id: 2,
      sender: "Bob Johnson",
      subject: "Weekend Plans",
      preview: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun...",
      time: "Oct 21, 2023, 3:45:00 PM",
      tags: ["personal"],
      attachments: []
    },
    {
      id: 3,
      sender: "Emily Davis",
      subject: "Re: Question about Budget",
      preview: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've...",
      time: "Oct 21, 2023, 11:30:00 AM",
      tags: ["work", "budget"],
      attachments: []
    },
    {
      id: 4,
      sender: "Michael Wilson",
      subject: "Important Announcement",
      preview: "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the...",
      time: "Oct 20, 2023, 4:15:00 PM",
      tags: ["work", "urgent"],
      attachments: []
    },
    {
      id: 5,
      sender: "Sarah Thompson",
      subject: "Project Update",
      preview: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a...",
      time: "Oct 20, 2023, 10:00:00 AM",
      tags: ["work", "important"],
      attachments: []
    }
  ])

  const [selectedEmail, setSelectedEmail] = useState<Email>(emails[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFolder, setActiveFolder] = useState("Inbox")

  const folders = [
    { icon: <Inbox className="w-4 h-4" />, name: "Inbox", count: 128 },
    { icon: <PenBox className="w-4 h-4" />, name: "Drafts", count: 9 },
    { icon: <Send className="w-4 h-4" />, name: "Sent" },
    { icon: <ArchiveX className="w-4 h-4" />, name: "Junk", count: 23 },
    { icon: <Trash2 className="w-4 h-4" />, name: "Trash" },
    { icon: <Archive className="w-4 h-4" />, name: "Archive" },
  ]

  const categories = [
    { icon: <User className="w-4 h-4" />, name: "Social", count: 972 },
    { icon: <Clock className="w-4 h-4" />, name: "Updates", count: 342 },
    { icon: <MessageSquare className="w-4 h-4" />, name: "Forums", count: 128 },
    { icon: <ShoppingCart className="w-4 h-4" />, name: "Shopping", count: 8 },
    { icon: <LayoutGrid className="w-4 h-4" />, name: "Promotions", count: 21 },
  ]

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-screen">
      <ResizablePanel defaultSize={20} minSize={15}>
        {/* Left Sidebar */}
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center gap-2">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Brand Logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-lg">MailMaster</span>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                {folders.map((folder) => (
                  <Button
                    key={folder.name}
                    variant={activeFolder === folder.name ? "secondary" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setActiveFolder(folder.name)}
                  >
                    <div className="flex items-center gap-2">
                      {folder.icon}
                      {folder.name}
                    </div>
                    {folder.count && (
                      <span className="text-muted-foreground">{folder.count}</span>
                    )}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      {category.name}
                    </div>
                    {category.count && (
                      <span className="text-muted-foreground">{category.count}</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Alicia Koch
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle>
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      <ResizablePanel defaultSize={30} minSize={20}>
        {/* Middle Section (Inbox) */}
        <div className="flex flex-col h-full border-r">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost">All mail</Button>
              <Button variant="ghost">Unread</Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <div className="divide-y">
              {filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer ${
                    selectedEmail.id === email.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {email.sender[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{email.sender}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {email.subject}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      {email.time}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {email.preview}
                  </div>
                  {email.tags && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {email.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {email.attachments && email.attachments.length > 0 && (
                    <div className="mt-1 flex items-center text-sm font-medium text-primary">
                      <Paperclip className="h-4 w-4 mr-1 flex-shrink-0" />
                      {email.attachments.length} attachment{email.attachments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle>
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      <ResizablePanel defaultSize={50} minSize={30}>
        {/* Right Section (Email Content) */}
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Undo className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Forward className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Star thread</DropdownMenuItem>
                <DropdownMenuItem>Add label</DropdownMenuItem>
                <DropdownMenuItem>Mute thread</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="flex-grow p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {selectedEmail.sender[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg truncate">
                    {selectedEmail.sender}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {selectedEmail.replyTo && `Reply-To: ${selectedEmail.replyTo}`}
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                  <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                  {selectedEmail.time}
                </div>
              </div>
              <div className="space-y-4">
                <p>{selectedEmail.preview}</p>
                <p>
                  Please come prepared with any questions or insights you may have.
                  Looking forward to our meeting!
                </p>
                <p>Best regards, {selectedEmail.sender.split(' ')[0]}</p>
              </div>
              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-semibold mb-2">Attachments ({selectedEmail.attachments.length})</h3>
                  <div className="space-y-2">
                    {selectedEmail.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <div className="flex items-center min-w-0">
                          <Paperclip className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{attachment.name}</span>
                        </div>
                        <div className="flex items-center ml-2">
                          <span className="text-sm text-muted-foreground mr-2 whitespace-nowrap">{attachment.size}</span>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Open</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}