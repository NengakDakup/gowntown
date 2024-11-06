import { PlusIcon, ShareIcon } from 'lucide-react'
import { MessageSquare } from 'lucide-react'
import { ThumbsUp } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Post = ({ post }: { post: any }) => {
  return (
    <div key={post} className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-muted">
          <Image src="/assets/images/user.png" width={48} height={48} alt='user profile image' className='w-12 h-12 rounded-full' />
        </div>
        <div>
          <h3 className="font-semibold">Abu Joy . <span className='text-primary inline-flex underline text-xs cursor-pointer'>Follow <PlusIcon className='w-4 h-4' /></span></h3>
          <p className='text-sm text-muted-foreground'>Chief Marketing Officer @ Binance</p>
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