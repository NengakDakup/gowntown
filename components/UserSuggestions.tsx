import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'

const UserSuggestions = () => {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <h3 className="font-semibold mb-4 px-4 pt-4">People You May Know</h3>
      <div className="space-y-4 px-4">
        {[1, 2, 3].map((person) => (
          <div key={person} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-muted" >
              <Image src="/assets/images/user.png" className='rounded-full' alt="" width={40} height={40} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Rejoice John</h4>
              <p className="text-xs text-muted-foreground">Graphic Designer @ Kuda</p>
              <Link href="#" className='text-primary inline-flex items-center hover:underline text-xs'>View Profile <ArrowRightCircle className='w-5 h-5 pl-1' /> </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center bg-muted py-2 text-sm cursor-pointer mt-2 hover:bg-primary hover:text-white rounded-b-lg'>
        View more <ArrowRight className='w-5 h-5 pl-1' />
      </div>
    </div>
  )
}

export default UserSuggestions