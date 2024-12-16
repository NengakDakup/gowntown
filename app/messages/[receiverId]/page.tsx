'use client'

import { useEffect, useRef, useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ArrowLeft, SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserData } from "@/lib/firebase-utils"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/lib/firebase"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"

interface ChatPageProps {
  params: {
    receiverId: string
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
  const [chatInput, setChatInput] = useState("");
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatData[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom();
  }, [chatWindowRef])

  useEffect(() => {
    const unsubscribe = fetchMessages();
  
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, [user?.uid, params.receiverId]);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserData(params.receiverId);

        setProfileData(data as UserProfileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [params.receiverId]);

  const isReceived = (senderId: string) => senderId === params.receiverId;

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    if (!user) return;
    const timestamp = new Date().toISOString();
    const newMessage: ChatData = {
      message: chatInput,
      timestamp: timestamp,
      senderId: user?.uid
    };
    setChatInput("");


    const chatID = generateChatId(user?.uid as string, params.receiverId);
    const chatRef = doc(db, "chats", chatID);
    await setDoc(chatRef, {
      participants: [user?.uid, params.receiverId],
      messages: [...messages, newMessage]
    }, { merge: true });
    setMessages([...messages, newMessage]);
    scrollToBottom();
  }

  const generateChatId = (user1: string, user2: string) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  const fetchMessages = () => {
    const chatID = generateChatId(user?.uid as string, params.receiverId);
    const chatRef = doc(db, "chats", chatID);
  
    // Use onSnapshot to listen to real-time updates
    const unsubscribe = onSnapshot(chatRef, (chatDoc) => {
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        const messages: ChatData[] = chatData.messages;
        setMessages(messages);
      }
    }, (error) => {
      // Optional error handling
      console.error("Error fetching messages:", error);
    });
  
    // Return the unsubscribe function to allow cleanup
    return unsubscribe;
  };

  return (
    <MainLayout>
      <div className="p-3 h-full">
        <div className="bg-background border-2 rounded-lg mx-auto max-w-[1100px] mt-0 md:mt-4 h-[600px]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Link href={`/user/${params.receiverId}`}>
                <Avatar className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold">
                  <AvatarImage className="rounded-full w-12 h-12 object-cover" src={profileData?.photoURL} alt={"User"} />
                  <AvatarFallback className="text-lg">{profileData?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
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
                <div key={index} className={`flex ${isReceived(message.senderId) ? "justify-start" : "justify-end"}`}>
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
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button className="ml-2 text-white" onClick={() => sendMessage()}>Send <SendHorizontal className="w-5 h-5 pl-1" /></Button>

          </div>
        </div>
      </div>
    </MainLayout>
  )
}
