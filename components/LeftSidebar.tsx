import React from 'react'
import { Home as HomeIcon, Users, Briefcase, Mail, Bell, Pencil, EllipsisVertical } from "lucide-react"
import { Button } from './ui/button'
import Image from 'next/image'


const LeftSidebar = () => {
  return (
    <div className="hidden md:block md:col-span-2 space-y-4">
      <div className="flex flex-col justify-between border-r bg-card h-screen sticky top-0">
        <div className="flex flex-col py-8">
          <a href="#" className="flex p-4 py-4 items-center space-x-4 text-primary hover:text-primary hover:bg-muted">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
            <Users className="w-5 h-5" />
            <span>My Network</span>
          </a>
          <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </a>
          <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
            <Mail className="w-5 h-5" />
            <span>Messages</span>
          </a>
          <a href="#" className="flex p-4 py-4 items-center space-x-4 text-muted-foreground hover:text-primary hover:bg-muted">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </a>
          <div className="py-4 px-2">
            <Button className="rounded-full w-full py-0 gap-x-1">
              <Pencil className="w-4 h-4" /> Create Post
            </Button>

          </div>
        </div>
        <div className='flex flex-row justify-between items-center mb-24 px-3'>

          <div className='flex flex-row gap-2'>
            <div className="w-12 h-12 rounded-full bg-muted shrink-0">
              <Image src="/assets/images/user.png" width={48} height={48} alt='user profile image' className='w-12 h-12 rounded-full' />
            </div>
            <div>
              <p>Amedu Faith</p>
              <p className='text-sm text-primary hover:underline cursor-pointer'>@amedu_faith</p>
            </div>
          </div>
          <EllipsisVertical />
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar