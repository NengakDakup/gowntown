'use client'
import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon, Users, Briefcase, BookOpen, Calendar, Menu, MessageSquare, LetterText, Mail, Bell, Pencil, ShareIcon, ThumbsUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LeftSidebar from "@/components/LeftSidebar"
import MobileNavigation from "@/components/MobileNavigation"
import RightContent from "@/components/RightContent"
import Post from "@/components/Post"
import Header from "@/components/Header"
import CreatePost from "@/components/CreatePost"


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // router.push('/login')
  }, [])

  return (
    <main className="min-h-screen bg-muted">
      <Header />
      <div className="w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          <LeftSidebar />
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
              <CreatePost />

              {/* Posts */}
              {[1, 2, 3].map((post) => (
                <Post post={post} />
              ))}
              <div className="w-full text-center pt-6">
                <span className="text-primary inline-flex text-sm cursor-pointer hover:underline">Show More <ChevronDown className="" /> </span>
              </div>
            </div>
          </div>
          <RightContent />
        </div>
      </div>
    </main>
  )
}