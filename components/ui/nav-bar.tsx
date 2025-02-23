import { useRouter } from "next/router";
import { Leaf, LogOut, CircleDashed, Medal, MapPin, Users2Icon } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  const user = sessionStorage.getItem("user");
  const router = useRouter();

  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div
      className="a
    flex flex-row justify-between p-4 z-50 fixed top-4 w-[90%] border border-black/20 rounded-3xl left-1/2 -translate-x-1/2 bg-background/40 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 
    lg:left-0 lg:translate-x-0 lg:top-0 lg:w-64 lg:h-full lg:flex-col lg:rounded-none lg:border-r "
    >
      <div className="p-2 flex flex-row w-full lg:flex-col items-center justify-between gap-8">
        <div className="flex items-start gap-4 w-full lg:px-4 lg:py-2">
          <Leaf className="h-8 w-8 text-green-500" />
          <span className="font-semibold text-lg text-black sm:block">EcoTracker</span>
        </div>
        <Avatar className="w-24 lg:w-full h-12 lg:h-full flex items-center justify-center">
          <AvatarImage
            className="w-12 lg:w-28 h-12 lg:h-28 border-[3px] border-[#16a249] rounded-full "
            src={parsedUser?.image}
            alt={parsedUser?.name}
          />
        </Avatar>
        <nav className="hidden flex-row lg:flex-col gap-1 w-full justify-end lg:justify-start lg:flex">
          <Link href="/dashboard">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/dashboard"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <CircleDashed className="h-6 w-6" />
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
              <Medal className="h-6 w-6" />
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
              <Users2Icon className="h-6 w-6" />
              <span className="hidden lg:inline">Community</span>
            </div>
          </Link>

          <Link href="/map">
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${router.pathname === "/map"
                ? "shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"
                : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                }`}
            >
              <MapPin className="h-6 w-6" />
              <span className="hidden lg:inline">Map</span>
            </div>
          </Link>

          <div className="lg:hidden flex items-center gap-3 px-4 py-2 rounded-lg transition-colors">
            <LogOut className="h-6 w-6" onClick={() => signOut()} />
          </div>
        </nav>
      </div>
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
