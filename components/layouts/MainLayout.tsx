'use client'
import { useState } from "react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/LeftSidebar"
import MobileNavigation from "@/components/MobileNavigation"
import RightContent from "@/components/RightContent"
import ChatWindow from "@/components/chat/ChatWindow"

interface MainLayoutProps {
  children: React.ReactNode
  showRightContent?: boolean
}

export default function MainLayout({ children, showRightContent = false }: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-muted">
      <Header />
      <div className="w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-12 pb-6">
          <LeftSidebar />
          <MobileNavigation />
          <div className={`col-span-1 ${showRightContent ? 'md:col-span-7' : 'md:col-span-10'}`}>
            {children}
          </div>
          {showRightContent && <RightContent />}
        </div>
      </div>
      <ChatWindow isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </main>
  )
} 