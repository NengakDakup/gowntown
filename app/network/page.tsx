'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { Settings, UserPlus } from "lucide-react"
import Image from "next/image"

export default function Network() {
  return (
    <MainLayout>
      <div className="bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">My Network</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {[1, 2, 3, 4].map((connection) => (
            <div
              key={connection}
              className="p-4 border rounded-lg hover:bg-muted/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Image
                    src="/assets/images/user.png"
                    width={64}
                    height={64}
                    alt="Profile picture"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">User {connection}</h3>
                  <p className="text-sm text-muted-foreground">Software Engineer at Company {connection}</p>
                  <Button className="mt-2" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 