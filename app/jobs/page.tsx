'use client'
import MainLayout from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getAllJobs } from "@/lib/firebase-utils"
import { format } from "timeago.js"

export default function Jobs() {
  const router = useRouter()
  const jobs = getAllJobs()

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1100px] py-8 px-2">
        <div className="bg-background border-2 rounded-lg">
          <div className="p-4">
            <h1 className="text-xl font-semibold">More jobs for you</h1>
            <p>Based on your profile, preferences and activity like applies, searches and saves.</p>
          </div>
          <div className="divide-y">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => router.push(`/jobs/${job.id}`)}
                className="p-4 hover:bg-muted cursor-pointer flex items-start"
              >
                <div className="w-16 h-16 rounded-full mr-4">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt="Company logo"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-primary rounded-full mr-4 flex items-center justify-center text-white font-semibold text-xl">
                      {job.company.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                  <p className="text-xs text-muted-foreground mt-2">Posted {format(job.date)}</p>
                </div>
                <Button size="sm" className="ml-auto">
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 