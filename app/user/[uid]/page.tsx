import MainLayout from "@/components/layouts/MainLayout"
import { UserProfile } from "@/components/user/UserProfile"

interface UserPageProps {
  params: {
    uid: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <MainLayout showRightContent={false}>
      <div className="container px-3 md:px-8 mx-auto py-6">
        <UserProfile userId={params.uid} />
      </div>
    </MainLayout>
  )
}
