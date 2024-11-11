'use client'
import MainLayout from "@/components/layouts/MainLayout"
import Post from "@/components/Post"
import CreatePost from "@/components/CreatePost"
import { ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full flex flex-row bg-background border-b h-14">
        <div className="w-1/2 flex justify-center bg-muted border-r hover:bg-muted hover:text-primary cursor-pointer">
          <p className="flex justify-center items-center border-b-4 border-primary text-primary">For You</p>
        </div>
        <div className="w-1/2 flex justify-center hover:bg-muted hover:text-primary cursor-pointer">
          <div className="flex justify-center items-center">Following</div>
        </div>
      </div>

      <div className="p-3 md:p-8 mx-auto max-w-[1400px] space-y-6">
        <CreatePost />
        {[1, 2, 3].map((post) => (
          <Post post={post} key={post} />
        ))}
        <div className="w-full text-center pt-6">
          <span className="text-primary inline-flex text-sm cursor-pointer hover:underline">
            Show More <ChevronDown />
          </span>
        </div>
      </div>
    </MainLayout>
  )
}