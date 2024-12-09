'use client'
import React from 'react'
import { Home as HomeIcon, Users, Briefcase, Mail, Bell, Pencil } from "lucide-react"
import { Button } from './ui/button'
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
      </div>
    </div>
  )
}

export default LeftSidebar