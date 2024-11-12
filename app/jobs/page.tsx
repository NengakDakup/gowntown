'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { Bookmark, Settings } from "lucide-react"

export default function Jobs() {
  return (
    <MainLayout>
      <div className="bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Jobs</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4].map((job) => (
            <div
              key={job}
              className="p-4 hover:bg-muted cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Software Engineer</h3>
                  <p className="text-sm text-muted-foreground">Company {job}</p>
                  <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                  <p className="text-xs text-muted-foreground mt-2">Posted 2d ago • 100 applicants</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 