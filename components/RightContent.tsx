import React from 'react'
import UserSuggestions from './UserSuggestions'

const RightContent = () => {
  return (
    <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background sticky top-0">
      {/* Suggested Connections */}
      <UserSuggestions />

      {/* Job Suggestions */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Recommended Jobs</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((job) => (
            <div key={job} className="space-y-1">
              <h4 className="text-sm font-medium">Job Title</h4>
              <p className="text-xs text-muted-foreground">Company Name</p>
              <p className="text-xs text-muted-foreground">Location</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightContent