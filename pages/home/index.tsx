import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Home = () => {
  // TODO: No sidebar on home page if not signed in
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl">Hello, {session.user?.name}</h1>
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <Button 
          variant="outline"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl">Welcome</h1>
      <Button
        onClick={() => signIn('google')}
      >
        Sign In
      </Button>
    </div>
  )
}

export default Home