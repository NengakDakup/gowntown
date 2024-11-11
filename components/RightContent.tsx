import React from 'react'
import UserSuggestions from './UserSuggestions'
import JobSuggestions from './JobSuggestions'

const RightContent = () => {
  return (
    <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background sticky top-0">
      {/* Suggested Connections */}
      <UserSuggestions />

      {/* Job Suggestions */}
      <JobSuggestions />
    </div>
  )
}

export default RightContent