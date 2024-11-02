import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-5xl">
        <nav className="flex justify-end mb-8">
          <ThemeToggle />
        </nav>
        <div className="space-y-8">
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to Next.js</h1>
            <p className="text-muted-foreground text-lg">
              A production-ready template with Next.js, Tailwind CSS, and shadcn/ui
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Next.js 13",
                description: "App Router, Server Components, and more",
              },
              {
                title: "Tailwind CSS",
                description: "A utility-first CSS framework",
              },
              {
                title: "shadcn/ui",
                description: "Beautifully designed components",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}