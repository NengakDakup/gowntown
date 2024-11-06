import { BookOpen, Briefcase, HomeIcon, Users } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const MobileNavigation = () => {
  return (
    <div className="md:hidden flex overflow-x-auto space-x-4 pb-4">
      <Button variant="ghost" className="flex items-center space-x-2">
        <HomeIcon className="w-5 h-5" />
        <span>Home</span>
      </Button>
      <Button variant="ghost" className="flex items-center space-x-2">
        <Users className="w-5 h-5" />
        <span>Network</span>
      </Button>
      <Button variant="ghost" className="flex items-center space-x-2">
        <Briefcase className="w-5 h-5" />
        <span>Jobs</span>
      </Button>
      <Button variant="ghost" className="flex items-center space-x-2">
        <BookOpen className="w-5 h-5" />
        <span>Learn</span>
      </Button>
    </div>
  )
}

export default MobileNavigation