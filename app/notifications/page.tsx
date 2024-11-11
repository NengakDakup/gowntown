'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Settings, ThumbsUp, MessageSquare, UserPlus, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      icon: ThumbsUp,
      content: 'John Doe liked your post',
      time: '2h ago'
    },
    {
      id: 2,
      type: 'comment',
      icon: MessageSquare,
      content: 'Jane Smith commented on your post',
      time: '4h ago'
    },
    {
      id: 3,
      type: 'connection',
      icon: UserPlus,
      content: 'Mike Johnson accepted your connection request',
      time: '1d ago'
    },
    {
      id: 4,
      type: 'job',
      icon: Briefcase,
      content: 'New jobs matching your preferences are available',
      time: '2d ago'
    }
  ]

  return (
    <MainLayout>
      <div className="bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Notifications</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 hover:bg-muted cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{notification.content}</p>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 