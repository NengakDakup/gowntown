'use client'
import Header from "@/components/Header"
import LeftSidebar from "@/components/LeftSidebar"
import MobileNavigation from "@/components/MobileNavigation"
import RightContent from "@/components/RightContent"
import ChatWindow from "@/components/chat/ChatWindow"
import { useState } from "react"

export default function Network() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-muted">
      <Header />
      <div className="w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          <LeftSidebar />
          <MobileNavigation />
          <div className="col-span-1 md:col-span-7">
            <div className="p-3 md:p-8 mx-auto max-w-[1400px]">
              <h1 className="text-2xl font-bold mb-6">My Network</h1>
              {/* Add network content here */}
            </div>
          </div>
          <RightContent />
        </div>
      </div>
      <ChatWindow isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </main>
  )
} 