import { AuthCarousel } from "@/components/auth/auth-carousel"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <AuthCarousel />
      </div>
      <main className="flex items-center justify-center p-2 md:p-8 overflow-y-auto max-h-screen">
        <div className="mx-auto w-full space-y-6">{children}</div>
      </main>
    </div>
  )
}