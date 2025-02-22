import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "@/components/layout";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </AuthWrapper>
    </SessionProvider>
  );
}
