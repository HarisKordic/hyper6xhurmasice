import { useRouter } from "next/router";
import { Home, Leaf, LineChart, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
 const router = useRouter();

 return (
  <div className="fixed inset-y-0 left-0 w-64 transition-all border-r bg-card flex flex-col justify-between">
   <div className="p-4 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-8">
     <Leaf className="h-6 w-6 text-green-500" />
     <span className="font-semibold text-lg">EcoTracker</span>
    </div>
    <nav className="space-y-2 w-full">
     <Link href="/dashboard">
      <div
       className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        router.pathname === "/dashboard"
         ? "shadow-[2px_2px_10px_rgba(0,0,0,0.2)]"
         : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.07)]"
       }`}
      >
       <Home className="h-6 w-6" />
       Dashboard
      </div>
     </Link>
     <Link href="/achievements">
      <div
       className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        router.pathname === "/achievements"
         ? "shadow-[2px_2px_10px_rgba(0,0,0,0.2)]"
         : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.07)]"
       }`}
      >
       <LineChart className="h-6 w-6" />
       Achievements
      </div>
     </Link>
     <Link href="/community">
      <div
       className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        router.pathname === "/community"
         ? "shadow-[2px_2px_10px_rgba(0,0,0,0.2)]"
         : "text-muted-foreground hover:shadow-[2px_2px_10px_rgba(0,0,0,0.07)]"
       }`}
      >
       <Users className="h-6 w-6" />
       Community
      </div>
     </Link>
    </nav>
   </div>
   <div className="p-4 w-full">
    <Button className="w-full flex items-center gap-3" variant="outline" onClick={() => signOut()}>
     <LogOut className="h-6 w-6" />
     Sign Out
    </Button>
   </div>
  </div>
 );
};

export { NavBar };
