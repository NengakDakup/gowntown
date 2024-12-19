import React, { useState } from 'react'
import { Briefcase, Calendar, ImageIcon, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/context/AuthContext'
import QuillEditor from './editor/Editor'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import { SpinningIcon } from './custom-icons'
import { createPost } from '@/lib/firebase-utils'

interface ImageFile {
  file: File;
  preview: string;
}

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageFile[]>([])
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
    const newImages = files.map(file => ({
      file: file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prevImages => [...prevImages, ...newImages]);
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

  const uploadImages = async (images: ImageFile[]) => {
    try {
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', image.file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed for ${image.file.name}`);
        }

        const data = await response.json();
        return data.url;
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (getWordCount() < 20) {
      toast({
        title: 'Post too short',
        description: 'Your post must be at least 20 words long',
        variant: 'destructive',
      })
    }
    setIsLoading(true)
    var uploadedImages: string[] = []
    if (images.length > 1) {
      uploadedImages = await uploadImages(images)
    }
    const contentHTML = document.querySelector('.ql-editor') as HTMLElement;
    const postId = await createPost({
      userID: user?.uid || '',
      content: contentHTML.innerHTML,
      images: uploadedImages,
    });
    if (!postId) {
      setIsLoading(false)
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Post created',
      description: 'Your post has been created',
    })
    contentHTML.innerHTML = '';
    setContent('')
    setImages([])
    setIsLoading(false)

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
            <img src={image.preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
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
        disabled={isLoading}
        className="w-full"
        size="sm"
      >
        {isLoading ? <><SpinningIcon /> Submitting...</> : 'Submit Post'}

      </Button>
    </div>
  )
}

export default CreatePost