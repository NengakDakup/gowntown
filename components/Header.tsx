import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { ArrowRight, Lock, LogIn, LogOut, User2Icon, UserPlus2 } from 'lucide-react'

const Header = () => {
  return (
    <div className="w-full border-b bg-white dark:bg-background">
      <nav className="flex mx-auto px-8 max-w-[1400px] items-center justify-between py-4">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Sign In <User2Icon className='w-5 h-5 pl-1' /> </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up <Lock className='w-5 h-5 pl-1' /> </Link>
          </Button>
          <ThemeToggle />
        </div>

      </nav>
    </div>
  )
}

export default Header