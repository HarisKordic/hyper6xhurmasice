import { useSession, signIn, signOut } from "next-auth/react"
import { ArrowRight, Globe2, Leaf, LineChart, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const Home = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="font-semibold">EcoTracker</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {session.user?.name}</span>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="space-y-6 pb-12 pt-16 md:pb-20 md:pt-24 lg:py-32">
            <div className="container flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Ready to make an impact?</h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Your dashboard is waiting. Continue tracking your environmental impact and earning achievements.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="font-semibold">EcoTracker</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-12 pt-16 md:pb-20 md:pt-24 lg:py-32">
          <div className="container flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600">
              Join Our Environmental Movement
            </div>
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Track Your Environmental <br className="hidden sm:inline" />
              Impact and Make a Change
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Join our gamified platform to monitor your carbon footprint, track local pollution levels, and compete
              with your community for a better environment.
            </p>
            <Button size="lg" onClick={() => signIn("google")} className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Everything you need to track and improve your environmental impact.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <LineChart className="h-12 w-12 text-green-500" />
                  <h3 className="text-xl font-bold">Carbon Tracking</h3>
                  <p className="text-center text-muted-foreground">
                    Monitor your daily carbon footprint and see your impact over time.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Globe2 className="h-12 w-12 text-blue-500" />
                  <h3 className="text-xl font-bold">Local Pollution Data</h3>
                  <p className="text-center text-muted-foreground">
                    Real-time tracking of air quality and pollution levels in your area.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-12 w-12 text-indigo-500" />
                  <h3 className="text-xl font-bold">Community Impact</h3>
                  <p className="text-center text-muted-foreground">
                    Join local communities and compete for a better environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Achievements</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Earn badges and rewards for your environmental contributions.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Carbon Reducer", icon: "🌱", description: "Reduce your carbon footprint" },
              { title: "Community Leader", icon: "👥", description: "Lead local initiatives" },
              { title: "Zero Waste Hero", icon: "♻️", description: "Achieve zero waste goals" },
              { title: "Energy Saver", icon: "⚡", description: "Reduce energy consumption" },
            ].map((achievement) => (
              <Card key={achievement.title}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl">{achievement.icon}</div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-center text-muted-foreground">{achievement.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Join Today</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Start your journey towards a more sustainable future.
            </p>
            <Button size="lg" onClick={() => signIn("google")} className="gap-2">
              Sign In with Google
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Leaf className="h-6 w-6 text-green-500" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built for a sustainable future. Join our community today.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

