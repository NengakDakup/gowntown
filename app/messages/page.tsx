'use client'
import MainLayout from "@/components/layouts/MainLayout"
import MessagePreview from "@/components/MessagePreview";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface Message {
  id: string;
  participants: string[];
  messages: any[];
}

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    fetchMessages();
  }, [user])

  const fetchMessages = async () => {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", user?.uid));

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));    
    setMessages(messages as Message[]);
  }

  return (
    <MainLayout>
      <div className="h-full">
        <div className="bg-background mx-auto max-w-[1100px] mt-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">Messaging</h1>
          </div>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="divide-y">
            {messages.map((message) => (
              <MessagePreview key={message.id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 