import React from 'react'

const RightContent = () => {
  return (
    <div className="hidden md:block md:col-span-3 space-y-6 border-l h-screen p-4 bg-background sticky top-0">
      {/* Suggested Connections */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h3 className="font-semibold mb-4">People You May Know</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((person) => (
            <div key={person} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Suggested Person</h4>
                <p className="text-xs text-muted-foreground">Professional Title</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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