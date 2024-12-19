import React, { useState } from 'react'
import { Briefcase, Calendar, ImageIcon, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/context/AuthContext'
import QuillEditor from './editor/Editor'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import { get } from 'react-hook-form'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 4) {
      toast({
        title: 'Too many images',
        description: 'You can only upload a maximum of 4 images',
        variant: 'destructive',
      })
      return
    }
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prevImages => [...prevImages, ...newImages])
  }

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const comingSoon = () => {
    toast({
      title: 'Coming Soon',
      description: 'This feature is coming soon',
      variant: 'destructive',
    })
  }

  const getWordCount = (): number => {
    const temp = document.querySelector('.ql-editor') as HTMLElement;
    const text = temp.textContent || '';
    // Split by whitespace and filter out empty strings
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = () => {
    if (getWordCount() < 20) {
      toast({
        title: 'Post too short',
        description: 'Your post must be at least 20 words long',
        variant: 'destructive',
      })
    }
    const contentHTML = document.querySelector('.ql-editor') as HTMLElement;
    console.log('Post submitted:', contentHTML.innerHTML, images)
  }

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
        <label htmlFor="image-upload" className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-blue-700'>
          <ImageIcon className='w-4 h-4' />
          <span>Add Images</span>
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />

        <div onClick={comingSoon} className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-amber-700'>
          <Calendar className='w-4 h-4' />
          <span>Create Event</span>
        </div>
        <div onClick={comingSoon} className='flex flex-1 flex-col md:flex-row items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-muted py-2 text-purple-800'>
          <Briefcase className='w-4 h-4' />
          <span>Post Job</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full"
        size="sm"
      >
        Submit Post
      </Button>
    </div>
  )
}

export default CreatePost