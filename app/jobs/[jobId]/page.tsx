import MainLayout from '@/components/layouts/MainLayout'
import { Card } from '@/components/ui/card'
import { ArrowRight, ArrowRightCircle, MoreHorizontal, Share2, Star } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getJobById } from '@/lib/firebase-utils'
import { format } from 'timeago.js'



const JobDetailsPage = ({ params }: { params: { jobId: string } }) => {
  const job = getJobById(parseInt(params.jobId))
  if (!job) {
    return (
      <MainLayout showRightContent={false}>
        Not Found
      </MainLayout>
    )
  }

  return (
    <MainLayout showRightContent={false}>
      <div className="mx-auto max-w-[1100px] py-8 px-2">
        <div className="bg-background border-2 rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt="Company logo"
                  className="w-12 h-12 rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
              )
              }

              <div>
                <h1 className="text-xl font-semibold">{job.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{format(job.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="rounded-md">{job.location}</Badge>
              <span className="text-sm text-gray-600">• {job.level}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Skills:</span>
                <div className="flex flex-wrap gap-2 text-primary">
                  {job.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className="text-sm font-semibold">
                {job.salary}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button>
                Apply <ArrowRightCircle className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="outline">
                Share <Share2 className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* About Section */}
          <Card className="p-6">
            <div>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default JobDetailsPage