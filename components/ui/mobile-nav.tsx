import { useRouter } from "next/router";
import { LogOut, CircleDashed, Medal, MapPin, Users2 } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const BottomNavBar: React.FC<{ className?: string }> = ({ className }) => {
 const router = useRouter();

 return (
  <div
   className={clsx(
    "fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-md shadow-lg border rounded-full flex justify-around py-3 px-6 z-50",
    className
   )}
  >
   <Link href="/achievements">
    <div
     className={`flex flex-col items-center ${router.pathname === "/achievements" ? "text-blue-500" : "text-gray-500"}`}
    >
     <Medal className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/community">
    <div
     className={`flex flex-col items-center ${router.pathname === "/community" ? "text-blue-500" : "text-gray-500"}`}
    >
     <Users2 className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/dashboard">
    <div
     className={`flex flex-col items-center ${router.pathname === "/dashboard" ? "text-blue-500" : "text-gray-500"}`}
    >
     <CircleDashed className="h-6 w-6" />
    </div>
   </Link>

   <Link href="/map">
    <div className={`flex flex-col items-center ${router.pathname === "/map" ? "text-blue-500" : "text-gray-500"}`}>
     <MapPin className="h-6 w-6" />
    </div>
   </Link>

   <button onClick={() => signOut()} className="flex flex-col items-center text-gray-500">
    <LogOut className="h-6 w-6" />
   </button>
  </div>
 );
};

export { BottomNavBar };
