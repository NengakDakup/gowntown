'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Messages() {
  return (
    <MainLayout>
      <div className="bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Messaging</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-9 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((message) => (
            <div
              key={message}
              className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-semibold">U{message}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">User {message}</h3>
                <p className="text-sm text-muted-foreground">
                  Last message preview...
                </p>
              </div>
              <span className="text-xs text-muted-foreground">2d ago</span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 