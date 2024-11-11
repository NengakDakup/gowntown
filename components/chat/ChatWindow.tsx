'use client'
import { useState } from 'react'
import { MessageSquare, X, Minimize2, Maximize2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatWindowProps {
  isOpen: boolean
  onToggle: () => void
}

export default function ChatWindow({ isOpen, onToggle }: ChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)

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
              <div className="h-[400px] overflow-y-auto p-4">
                {/* Chat list */}
                {[1, 2, 3].map((chat) => (
                  <div
                    key={chat}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="font-medium">User {chat}</p>
                      <p className="text-sm text-muted-foreground">Last message...</p>
                    </div>
                  </div>
                ))}
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