import { useRouter } from "next/router";
import { NavBar } from "@/components/ui/nav-bar";
import { BottomNavBar } from "./ui/mobile-nav";
import Footer from "./ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
 const router = useRouter();
 const allowedRoutes = ["/dashboard", "/achievements", "/community", "/map"];
 const shouldRender = allowedRoutes.includes(router.pathname);

 const isMap = router.pathname === "/map";

 return (
  <div className="min-h-screen">
   {shouldRender && <NavBar />}
   {shouldRender && <BottomNavBar className="lg:hidden fixed bottom-0 w-full" />}
   {isMap ? (
    <main>{shouldRender ? <div className="lg:pl-64">{children}</div> : children}</main>
   ) : (
    <div className="pb-[calc(4rem+30px)] sm:pb-[calc(4rem+30px)]  md:pb-[calc(4rem+30px)] lg:pb-[calc(4rem+30px)] xl:pb-[calc(4rem+30px)]">
     <main>
      {shouldRender ? (
       <div className="p-6">
        <div className="lg:pl-64 pt-24 lg:pt-0">{children}</div>
       </div>
      ) : (
       children
      )}
     </main>
    </div>
   )}
   {isMap ? null : <Footer />}
  </div>
 );
}
