import { useRouter } from "next/router";
import { NavBar } from "@/components/ui/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
 const router = useRouter();

 const allowedRoutes = ["/dashboard", "/achievements", "/community"];

 const shouldRender = allowedRoutes.includes(router.pathname);

 console.log(router.pathname);

 return (
  <>
   {shouldRender ? <NavBar /> : <> </>}
   <main>{shouldRender ? <div className="lg:pl-64">{children}</div> : <>{children}</>}</main>
  </>
 );
}
