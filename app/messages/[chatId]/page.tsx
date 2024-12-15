'use client'

import { useEffect, useRef, useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserData } from "@/lib/firebase-utils"

interface ChatPageProps {
  params: {
    chatId: string
  }
}

interface UserProfileData {
  name: string;
  photoURL: string;
  institutionName: string;
}

interface ChatData {
  message: string;
  timestamp: string;
  senderId: string;
}

export default function ChatPage({ params }: ChatPageProps) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [messages, setMessages] = useState<ChatData[]>([
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      timestamp: "2023-08-01T12:34:56",
      senderId: "CWVST9OK0jPD4Id3fWIRpDPcEMe2",
    },
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: "2023-08-01T12:34:56",
      senderId: "CWVST9OK0jPD4Id3fWIRpDPcEMe2",
    },
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: "2023-08-01T12:34:56",
      senderId: "vdcUtpVWYASdTaWj69y8xboz0h52",
    }
  ]);
  const chatWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [chatWindowRef])

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserData(params.chatId);

        setProfileData(data as UserProfileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [params.chatId]);

  const isReceived = (id: string) => id === params.chatId;

  return (
    <MainLayout>
      <div className="p-3 h-full">
        <div className="bg-background border-2 rounded-lg mx-auto max-w-[1100px] mt-0 md:mt-4 h-[600px]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold">
                <AvatarImage className="rounded-full w-12 h-12" src={profileData?.photoURL} alt={"User"} />
                <AvatarFallback className="text-lg">{profileData?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <span className="font-semibold">{profileData?.name}</span>
                <span className="text-sm text-muted-foreground">
                  {profileData?.institutionName}
                </span>
              </div>
            </div>
            <Link href="/messages">
              <Button className="text-sm" variant="link" size="sm">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Go back
              </Button>
            </Link>
          </div>
          <div className="border-t-2 overflow-y-scroll h-[450px]" ref={chatWindowRef}>
            <div className="flex flex-col space-y-4 p-4">
              {messages.map((message, index) => (
                <div className={`flex ${isReceived(message.senderId) ? "justify-start" : "justify-end"}`}>
                  <div className={`${isReceived(message.senderId) ? "bg-primary text-white" : "bg-background border-2 border-primary text-foreground"} p-2 rounded-md w-full max-w-[600px]`}>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-t-2">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full pl-4 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="ml-2">Send</Button>

          </div>
        </div>
      </div>
    </MainLayout>
  )
}
