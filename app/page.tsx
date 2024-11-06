'use client'
import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon, Users, Briefcase, BookOpen, Calendar, Menu, MessageSquare, LetterText, Mail, Bell, Pencil, ShareIcon, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LeftSidebar from "@/components/LeftSidebar"


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // router.push('/login')
  }, [])

  return (
    <main className="min-h-screen bg-muted">
      <div className="w-full border-b bg-white dark:bg-background">
        <nav className="flex mx-auto px-8 max-w-[1400px] items-center justify-between py-4">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
            <ThemeToggle />
          </div>

        </nav>
      </div>
      <div className="w-full relative">

        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Mobile Navigation */}
          <div className="md:hidden flex overflow-x-auto space-x-4 pb-4">
            <Button variant="ghost" className="flex items-center space-x-2">
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Network</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Jobs</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Learn</span>
            </Button>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-7">
            <div className="w-full flex flex-row bg-background border-b h-14">
              <div className="w-1/2 flex justify-center bg-muted border-r hover:bg-muted hover:text-primary cursor-pointer">
                <p className="flex justify-center items-center border-b-4 border-primary text-primary">For You</p>
              </div>
              <div className="w-1/2 flex justify-center hover:bg-muted hover:text-primary cursor-pointer">
                <div className="flex justify-center items-center">Following</div>
              </div>
            </div>

            <div className="p-3 md:p-8 mx-auto max-w-[1400px] space-y-6">
              {/* Create Post */}
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <input
                  type="text"
                  placeholder="Start a post..."
                  className="w-full rounded-full border bg-background px-4 py-2"
                />
              </div>

              {/* Posts */}
              {[1, 2, 3, 4, 5, 6, 7].map((post) => (
                <div key={post} className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div>
                      <h3 className="font-semibold">User Name</h3>
                      <p className="text-sm text-muted-foreground">Posted 2h ago</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">This is a sample post content. It could be about anything - work updates, industry news, or professional achievements.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <img src="https://www.socialpilot.co/wp-content/uploads/2022/02/Best-Times-to-Post-on-Social-Media-in-2022.jpg" alt="Post Image 1" className="w-full h-auto" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTURdDqelvoGcV40VcdM29WaGXWHp9FpkNy8dKTGK5Q8IZ5Q17t5EV-rJSKkKbDVrjgm4&usqp=CAU" alt="Post Image 2" className="w-full h-auto" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEh5yWWzmA0YoMZezhJlPI_LKPKmJB0ge1vI4WHcj5l4HZVxFIHu5nXREu8LfkUGlji0&usqp=CAU" alt="Post Image 3" className="w-full h-auto" />
                    <img src="https://media.istockphoto.com/id/521747273/vector/work-for-life.jpg?s=612x612&w=0&k=20&c=bLjt357WizASD-zcNYiaSqI8JeQBCda2ovuOgDmsXi8=" alt="Post Image 4" className="w-full h-auto" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button className="text-primary hover:text-primary-foreground">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="ml-2">Like</span>
                    </button>
                    <button className="text-primary hover:text-primary-foreground">
                      <MessageSquare className="w-5 h-5" />
                      <span className="ml-2">Comment</span>
                    </button>
                    <button className="text-primary hover:text-primary-foreground">
                      <ShareIcon className="w-5 h-5" />
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background sticky top-0">
            {/* Suggested Connections */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-semibold mb-4">People You May Know</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((person) => (
                  <div key={person} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Suggested Person</h4>
                      <p className="text-xs text-muted-foreground">Professional Title</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Suggestions */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-semibold mb-4">Recommended Jobs</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="space-y-1">
                    <h4 className="text-sm font-medium">Job Title</h4>
                    <p className="text-xs text-muted-foreground">Company Name</p>
                    <p className="text-xs text-muted-foreground">Location</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}