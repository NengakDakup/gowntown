'use client'
import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon, Users, Briefcase, BookOpen, Calendar, Menu, MessageSquare, LetterText, Mail, Bell, Pencil, ShareIcon, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LeftSidebar from "@/components/LeftSidebar"
import MobileNavigation from "@/components/MobileNavigation"
import RightContent from "@/components/RightContent"
import Post from "@/components/Post"


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
          <MobileNavigation />

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
                <Post post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <RightContent />
        </div>
      </div>
    </main>
  )
}