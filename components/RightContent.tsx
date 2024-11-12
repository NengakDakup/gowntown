import React from 'react'
import UserSuggestions from './UserSuggestions'
import JobSuggestions from './JobSuggestions'
import { Search } from 'lucide-react'

const RightContent = () => {
  return (
    <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background sticky top-0">
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for People, Jobs"
            className="w-full pl-9 pr-4 py-2 bg-background border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      {/* Suggested Connections */}
      <UserSuggestions />

      {/* Job Suggestions */}
      <JobSuggestions />
    </div>
  )
}

export default RightContent