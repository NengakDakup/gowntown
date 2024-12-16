import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getUserData } from '@/lib/firebase-utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { format } from 'timeago.js'

interface Message {
  id: string;
  participants: string[];
  messages: any[];
}

interface ProfileData {
  name: string;
  photoURL: string;
  institutionName: string;
}

interface MessagePreviewProps {
  message: Message;
  charactersLimit: number;
}

const MessagePreview = ({ message, charactersLimit }: MessagePreviewProps) => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);
  const { user } = useAuth()

  const receiverId = message.participants[0] === user?.uid ? message.participants[1] : message.participants[0]

  useEffect(() => {
    fetchProfile()
  }, [receiverId])

  const fetchProfile = async () => {
    try {
      const data = await getUserData(receiverId);
      setProfileData(data as ProfileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      key={message.id}
      className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer"
      onClick={() => {
        router.push(`/messages/${receiverId}`)
      }}
    >
      <Avatar className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold">
        <AvatarImage className="rounded-full w-12 h-12 object-cover" src={profileData?.photoURL} alt={"User"} />
        <AvatarFallback className="text-lg">{profileData?.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{profileData?.name}</h3>
        <p className="text-sm text-muted-foreground">
          <strong>{message.messages[message.messages.length - 1].senderId === user?.uid ? "You: " : ""}</strong>{message.messages[message.messages.length - 1].message.slice(0, charactersLimit)}
        </p>
      </div>
      <span className="text-xs text-muted-foreground">{format(message.messages[message.messages.length - 1].timestamp)}</span>
    </div>
  )
}

export default MessagePreview