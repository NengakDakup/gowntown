'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Messages() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="h-full">
        <div className="bg-background mx-auto max-w-[1100px] mt-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">Messaging</h1>
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
                onClick={() => {
                  router.push(`/messages/${message}`)
                }}
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
      </div>
    </MainLayout>
  )
} 