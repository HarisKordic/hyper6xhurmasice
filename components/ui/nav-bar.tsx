import { useRouter } from "next/router";
import { Home, Leaf, LineChart, Users, LogOut, Map } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 w-full lg:w-64 lg:h-full border-b lg:border-r bg-backgourn/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 flex flex-row lg:flex-col justify-between p-4 z-30">
      {/* Logo & Navigation Section */}
      <div className="p-4 flex flex-row w-full lg:flex-col items-center justify-between gap-16">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-500" />
          <span className="font-semibold text-lg">EcoTracker</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-row lg:flex-col gap-1 w-full justify-end lg:justify-start">
          <Link href="/dashboard">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/dashboard"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <Home className="h-6 w-6" />
              <span className="hidden lg:inline">Dashboard</span>
            </div>
          </Link>

          <Link href="/achievements">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/achievements"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <LineChart className="h-6 w-6" />
              <span className="hidden lg:inline">Achievements</span>
            </div>
          </Link>

          <Link href="/community">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/community"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <Users className="h-6 w-6" />
              <span className="hidden lg:inline">Community</span>
            </div>
          </Link>

          <Link href="/map">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/community"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <Map className="h-6 w-6" />
              <span className="hidden lg:inline">Map</span>
            </div>
          </Link>

          <div className="lg:hidden flex items-center gap-3 px-4 py-2 rounded-lg transition-colors">
            <LogOut className="h-6 w-6" onClick={() => signOut()} />
          </div>
        </nav>
      </div>
      {/* Sign Out Button */}
      <div className="hidden lg:block">
        <Button className="w-full flex items-center gap-3" variant="outline" onClick={() => signOut()}>
          <LogOut className="h-6 w-6" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export { NavBar };
