import { useRouter } from "next/router";
import { Home, LineChart, Users, Map, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const BottomNavBar: React.FC<{ className?: string }> = ({ className }) => {
 const router = useRouter();

 return (
  <div
   className={clsx("fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-4 z-50", className)}
  >
   <Link href="/dashboard">
    <div
     className={`flex flex-col items-center ${router.pathname === "/dashboard" ? "text-blue-500" : "text-gray-500"}`}
    >
     <Home className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/achievements">
    <div
     className={`flex flex-col items-center ${router.pathname === "/achievements" ? "text-blue-500" : "text-gray-500"}`}
    >
     <LineChart className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/community">
    <div
     className={`flex flex-col items-center ${router.pathname === "/community" ? "text-blue-500" : "text-gray-500"}`}
    >
     <Users className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/map">
    <div className={`flex flex-col items-center ${router.pathname === "/map" ? "text-blue-500" : "text-gray-500"}`}>
     <Map className="h-6 w-6" />
    </div>
   </Link>

   <button onClick={() => signOut()} className="flex flex-col items-center text-gray-500">
    <LogOut className="h-6 w-6" />
   </button>
  </div>
 );
};

export { BottomNavBar };
