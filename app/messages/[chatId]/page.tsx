'use client'

import MainLayout from "@/components/layouts/MainLayout"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <MainLayout>
      <div className="h-full p-3">
        <div className="bg-background border-2 rounded-lg mx-auto max-w-[1100px] mt-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={""} alt={"User"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <span className="font-semibold">Username</span>
                <span className="text-sm text-muted-foreground">
                  About me
                </span>
              </div>
            </div>
            <Button variant="link" size="sm">
              <ArrowLeft className="mr-2" />
              Go back
            </Button>

          </div>
          <div className="bg-muted border-y-2 h-full">
            <div className="flex flex-col space-y-4 p-4">
              <div className="flex justify-start">
                <div className="bg-primary p-2 rounded-md w-full max-w-[600px]">
                  <p className="text-sm text-primary-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-background p-2 rounded-md w-full max-w-[600px] border-2 border-primary">
                  <p className="text-sm text-accent-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-primary p-2 rounded-md w-full max-w-[600px]">
                  <p className="text-sm text-primary-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-background p-2 rounded-md w-full max-w-[600px] border-2 border-primary">
                  <p className="text-sm text-accent-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
