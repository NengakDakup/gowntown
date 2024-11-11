import { ArrowRight, ArrowRightCircle, MapPinIcon, Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const JobSuggestions = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="font-semibold mb-4">Recommended Jobs</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((job) => (
          <div key={job} className="flex items-center space-x-3 border-t py-2">
            <div className="w-10 h-10 rounded-sm bg-muted" >
              <Image src="/assets/images/user.png" className='rounded-sm' alt="" width={40} height={40} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-primary ">Software Engineer</h4>
              <p className="text-xs">Interswitch</p>
              <p className="text-xs text-muted-foreground inline-flex items-center"><MapPinIcon className='w-4 h-4 mr-1' /> Remote</p>
              <p><Link href="#" className=' inline-flex items-center hover:underline text-xs'>View Job <ArrowRightCircle className='w-5 h-5 pl-1' /> </Link></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobSuggestions