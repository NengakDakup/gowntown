'use client'
import React from 'react'
import { Home as HomeIcon, Users, Briefcase, Mail, Bell, Pencil, EllipsisVertical, Flag, Copy, Bookmark, PowerIcon, Settings, User } from "lucide-react"
import { Button } from './ui/button'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LeftSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="hidden md:block md:col-span-2 space-y-4">
      <div className="flex flex-col justify-between border-r bg-card h-screen sticky top-0">
        <div className="flex flex-col py-8">
          <Link
            href="/"
            className={`flex p-4 py-4 items-center space-x-4 ${pathname === '/' ? 'text-primary bg-muted' : 'text-muted-foreground'} hover:text-primary hover:bg-muted`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/network"
            className={`flex p-4 py-4 items-center space-x-4 ${pathname === '/network' ? 'text-primary bg-muted' : 'text-muted-foreground'} hover:text-primary hover:bg-muted`}
          >
            <Users className="w-5 h-5" />
            <span>My Network</span>
          </Link>
          <Link
            href="/jobs"
            className={`flex p-4 py-4 items-center space-x-4 ${pathname === '/jobs' ? 'text-primary bg-muted' : 'text-muted-foreground'} hover:text-primary hover:bg-muted`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </Link>
          <Link
            href="/messages"
            className={`flex p-4 py-4 items-center space-x-4 ${pathname === '/messages' ? 'text-primary bg-muted' : 'text-muted-foreground'} hover:text-primary hover:bg-muted`}
          >
            <Mail className="w-5 h-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="/notifications"
            className={`flex p-4 py-4 items-center space-x-4 ${pathname === '/notifications' ? 'text-primary bg-muted' : 'text-muted-foreground'} hover:text-primary hover:bg-muted`}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <div className="py-4 px-2">
            <Button className="rounded-full w-full py-0 gap-x-1">
              <Pencil className="w-4 h-4" /> Create Post
            </Button>
          </div>
        </div>
        <div className='flex flex-row justify-between items-center mb-24 px-3'>
          <div className='flex flex-row gap-2'>
            <div className="w-12 h-12 rounded-full bg-muted">
              <Image src="/assets/images/user.png" width={48} height={48} alt='user profile image' className='w-12 h-12 rounded-full' />
            </div>
            <div>
              <p>Amedu Faith</p>
              <p className='text-sm text-primary hover:underline cursor-pointer'>@amedu_faith</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='hover:bg-muted rounded-full p-1'><EllipsisVertical /> </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-primary border-primary text-white'>
              <DropdownMenuItem className='cursor-pointer hover:bg-white hover:text-black p-2'><User className='pr-1' /> View Profile</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer hover:bg-white hover:text-black p-2'><Settings className='pr-1' /> Account Settings</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer hover:bg-white hover:text-black p-2'><PowerIcon className='pr-1' /> Log Out </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar