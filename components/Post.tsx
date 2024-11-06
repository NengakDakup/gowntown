import React from 'react'
import { Bookmark, Copy, Ellipsis, Flag, FlagOffIcon, Globe, GlobeIcon, PlusIcon, ShareIcon } from 'lucide-react'
import { MessageSquare } from 'lucide-react'
import { ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Post = ({ post }: { post: any }) => {
  return (
    <div key={post} className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
      <div className="flex flex-row justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-muted">
            <Image src="/assets/images/user.png" width={48} height={48} alt='user profile image' className='w-12 h-12 rounded-full' />
          </div>
          <div>
            <h3 className="font-semibold">Abu Joy . <span className='text-primary inline-flex underline text-xs cursor-pointer'>Follow <PlusIcon className='w-4 h-4' /></span></h3>
            <p className='text-sm text-muted-foreground'>Chief Marketing Officer @ Binance</p>
            <p className="text-sm text-muted-foreground inline-flex">2h ago . <GlobeIcon className='w-5 h-5 pl-1' /> </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger><Ellipsis /> </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='cursor-pointer p-2'><Bookmark className='pr-1' /> Save</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer p-2'><Copy className='pr-1' /> Copy Link To Post</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer p-2'><Flag className='pr-1' /> Report Post </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



      </div>

      <p className="text-muted-foreground">This is a sample post content. It could be about anything - work updates, industry news, or professional achievements.</p>
      <div className="grid grid-cols-2 gap-4">
        <img src="https://www.socialpilot.co/wp-content/uploads/2022/02/Best-Times-to-Post-on-Social-Media-in-2022.jpg" alt="Post Image 1" className="w-full h-auto" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTURdDqelvoGcV40VcdM29WaGXWHp9FpkNy8dKTGK5Q8IZ5Q17t5EV-rJSKkKbDVrjgm4&usqp=CAU" alt="Post Image 2" className="w-full h-auto" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEh5yWWzmA0YoMZezhJlPI_LKPKmJB0ge1vI4WHcj5l4HZVxFIHu5nXREu8LfkUGlji0&usqp=CAU" alt="Post Image 3" className="w-full h-auto" />
        <img src="https://media.istockphoto.com/id/521747273/vector/work-for-life.jpg?s=612x612&w=0&k=20&c=bLjt357WizASD-zcNYiaSqI8JeQBCda2ovuOgDmsXi8=" alt="Post Image 4" className="w-full h-auto" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button variant="ghost" className="text-primary hover:text-primary-foreground">
          <ThumbsUp className="w-5 h-5" />
          <span className="ml-2">Like</span>
        </Button>
        <Button variant="ghost" className="text-primary hover:text-primary-foreground">
          <MessageSquare className="w-5 h-5" />
          <span className="ml-2">Comment</span>
        </Button>
        <Button variant="ghost" className="text-primary hover:text-primary-foreground">
          <ShareIcon className="w-5 h-5" />
          <span className="ml-2">Share</span>
        </Button>
      </div>
    </div>
  )
}

export default Post