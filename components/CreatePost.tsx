import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import { Briefcase, Calendar, ImageIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/context/AuthContext'
import QuillEditor from './editor/Editor'

const Delta = Quill.import('delta');

const CreatePost = () => {
  const [content, setContent] = React.useState('')
  const quillRef = useRef();
  const { user } = useAuth()

  useEffect(() => {
    console.log(content);
  }, [content]);


  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
      <div className="flex flex-row gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage className='w-12 h-12 object-cover' src={user?.photoURL || ''} alt="User avatar" />
          <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col h-max">
          <QuillEditor
            value={content}
            onChange={setContent}
            placeholder="Write your content here..."
            className="my-custom-class"
          />
        </div>
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