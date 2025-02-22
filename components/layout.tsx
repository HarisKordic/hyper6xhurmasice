import { useRouter } from "next/router";
import { NavBar } from "@/components/ui/nav-bar";
import Footer from "./ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
 const router = useRouter();
 const allowedRoutes = ["/dashboard", "/achievements", "/community", "/map"];
 const shouldRender = allowedRoutes.includes(router.pathname);

 return (
  <div className="relative min-h-screen">
   {shouldRender ? <NavBar /> : null}
   <div className="pb-[calc(4rem+750px)] sm:pb-[calc(4rem+450px)]  md:pb-[calc(4rem+450px)] lg:pb-[calc(4rem+310px)] xl:pb-[calc(4rem+270px)]">
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
   <Footer />
  </div>
 );
}
