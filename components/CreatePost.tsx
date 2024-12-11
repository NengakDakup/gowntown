import React from 'react'
import { Textarea } from './ui/textarea'
import { Briefcase, Calendar, ImageIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/context/AuthContext'

const CreatePost = () => {
  const { user } = useAuth()

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
      <div className="flex flex-row gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.photoURL || ''} alt="User avatar" />
          <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <Textarea placeholder='Create a new post...' />
      </div>
      <div className="flex flex-row text-sm">
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-blue-700'>
          <ImageIcon className='w-4 h-4' />
          <span>Add Images</span>
        </div>
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-amber-700'>
          <Calendar className='w-4 h-4' />
          <span>Create Event</span>
        </div>
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-purple-800'>
          <Briefcase className='w-4 h-4' />
          <span>Post Job</span>
        </div>
      </div>
    </div>
  )
}

export default CreatePost