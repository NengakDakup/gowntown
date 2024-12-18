import { ArrowRightCircle, MapPinIcon, Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getAllJobs } from '@/lib/firebase-utils'

const JobSuggestions = () => {
  const jobs = getAllJobs()
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="font-semibold mb-4">Recommended Jobs</h3>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center space-x-3 border-t py-2">
            {job.logo ? (
              <Image
                src={job.logo}
                alt="Company logo"
                width={40}
                height={40}
                className="rounded-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center text-white font-semibold text-xl">
                {job.company.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-sm text-primary ">{job.title}</h4>
              <p className="text-xs">{job.company}</p>
              <p className="text-xs text-muted-foreground inline-flex items-center"><MapPinIcon className='w-4 h-4 mr-1' /> {job.location}</p>
              <p><Link href={`/jobs/${job.id}`} className=' inline-flex items-center hover:underline text-xs'>View Job <ArrowRightCircle className='w-5 h-5 pl-1' /> </Link></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobSuggestions