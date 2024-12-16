'use client'
import { useEffect, useState } from 'react'
import { MessageSquare, X, Minimize2, Maximize2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import MessagePreview from '../MessagePreview'

interface ChatWindowProps {
  isOpen: boolean
  onToggle: () => void
}

interface Message {
  id: string;
  participants: string[];
  messages: any[];
}

export default function ChatWindow({ isOpen, onToggle }: ChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
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
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border border-primary rounded-lg shadow-lg md:w-[380px] w-[320px]">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">Messaging</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={onToggle}
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-[400px] overflow-y-auto py-4">
                <div className="divide-y">
                  {messages.map((message) => (
                    <MessagePreview key={message.id} message={message} charactersLimit={30} />
                  ))}
                </div>

              </div>
            </>
          )}
        </div>
      ) : (
        <div
          onClick={onToggle}
          className="bg-background border rounded-lg shadow-lg border-primary w-[320px] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-primary" />
              <h3 className="font-semibold">Messaging</h3>
            </div>
            <Maximize2 size={14} />
          </div>
        </div>
      )}
    </div>
  )
} 