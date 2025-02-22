import { useRouter } from "next/router";
import { NavBar } from "@/components/ui/nav-bar";
import Footer from "./ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const allowedRoutes = ["/dashboard", "/achievements", "/community"];
    const shouldRender = allowedRoutes.includes(router.pathname);

    return (
        <div className="relative min-h-screen">
            {shouldRender ? <NavBar /> : null}
            <div className="pb-[calc(4rem+400px)] md:pb-[calc(4rem+300px)] lg:pb-[calc(4rem+280px)]">
                <main>
                    {shouldRender ? (
                        <div className="lg:pl-64">{children}</div>
                    ) : (
                        children
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}