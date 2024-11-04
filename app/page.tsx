'use client'
import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon, Users, Briefcase, BookOpen, Calendar, Menu, MessageSquare, LetterText, Mail, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"


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
      <div className="w-full">

        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-2 space-y-4 sticky">
            <div className="border-r bg-card h-screen">
              <div className="flex flex-col py-8">
                <a href="#" className="flex p-4 py-4 items-center space-x-4 text-primary hover:text-primary hover:bg-muted">
                  <HomeIcon className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
                  <Users className="w-5 h-5" />
                  <span>My Network</span>
                </a>
                <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
                  <Briefcase className="w-5 h-5" />
                  <span>Jobs</span>
                </a>
                <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
                  <Mail className="w-5 h-5" />
                  <span>Messages</span>
                </a>
                <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </a>
              </div>
            </div>
          </div>

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
          <div className="col-span-1 md:col-span-7 space-y-6 p-8 mx-auto max-w-[1400px]">
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
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background">
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