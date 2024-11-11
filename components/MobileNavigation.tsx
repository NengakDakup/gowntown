import { BookOpen, Briefcase, HomeIcon, Users } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const MobileNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="md:hidden flex overflow-x-auto justify-between py-4">
      <Link href="/">
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${pathname === '/' ? 'text-primary bg-muted' : 'text-muted-foreground'}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Button>
      </Link>
      <Link href="/network">
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${pathname === '/network' ? 'text-primary bg-muted' : 'text-muted-foreground'}`}
        >
          <Users className="w-5 h-5" />
          <span>Network</span>
        </Button>
      </Link>
      <Link href="/jobs">
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${pathname === '/jobs' ? 'text-primary bg-muted' : 'text-muted-foreground'}`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Jobs</span>
        </Button>
      </Link>
    </div>
  )
}

export default MobileNavigation