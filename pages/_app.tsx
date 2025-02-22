import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";

import Layout from "@/components/layout";

// Auth guard component
function AuthWrapper({ children }: { children: React.ReactNode }) {
 const { data: session, status } = useSession();
 const router = useRouter();
 const isLoading = status === "loading";
 const isPublicPath = router.pathname === "/home";

 if (isLoading) return null;

 if (!session && !isPublicPath) {
  router.replace("/home");
  return null;
 }

 return <>{children}</>;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
 return (
  <SessionProvider session={session}>
   <AuthWrapper>
    <Layout>
     <Component {...pageProps} />
    </Layout>
   </AuthWrapper>
  </SessionProvider>
 );
}
