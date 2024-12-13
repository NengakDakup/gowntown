import React from 'react'

const UserListSkeletonLoader = () => {
  return (
    <div className="animate-pulse my-4">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

export default UserListSkeletonLoader