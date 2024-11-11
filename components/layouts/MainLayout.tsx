'use client'
import { useState } from "react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/LeftSidebar"
import MobileNavigation from "@/components/MobileNavigation"
import RightContent from "@/components/RightContent"
import ChatWindow from "@/components/chat/ChatWindow"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-muted">
      <Header />
      <div className="w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          <LeftSidebar />
          <MobileNavigation />
          <div className="col-span-1 md:col-span-7">
            {children}
          </div>
          <RightContent />
        </div>
      </div>
      <ChatWindow isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </main>
  )
} 