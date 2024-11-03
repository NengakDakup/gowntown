import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon, Users, Briefcase, BookOpen, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between py-4 border-b">
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

        <div className="grid grid-cols-12 gap-6 py-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-4">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-col space-y-3">
                <a href="#" className="flex items-center space-x-2 text-primary hover:underline">
                  <HomeIcon className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <Users className="w-5 h-5" />
                  <span>My Network</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <Briefcase className="w-5 h-5" />
                  <span>Jobs</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <BookOpen className="w-5 h-5" />
                  <span>Learning</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <Calendar className="w-5 h-5" />
                  <span>Events</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6 space-y-6">
            {/* Create Post */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <input
                type="text"
                placeholder="Start a post..."
                className="w-full rounded-full border bg-background px-4 py-2"
              />
            </div>

            {/* Posts */}
            {[1, 2, 3].map((post) => (
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
          <div className="col-span-3 space-y-6">
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