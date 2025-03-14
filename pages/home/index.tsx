"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { ArrowRight, Globe2, Leaf, LineChart, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type User = {
 id: number;
 email: string;
 emailVerified: boolean;
 image: string;
 name: string;
};

const Home = () => {
 const { data: session } = useSession();
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [storageReady, setStorageReady] = useState(false);
 const [isMenuOpen] = useState(false);
 const [isDarkMode] = useState(false);

 const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${session?.user?.email}
`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
 };

 const { data: user } = useQuery({
  queryKey: ["user"],
  queryFn: fetchUsers,
  enabled: !!session,
 });

 useEffect(() => {
  if (user) {
   sessionStorage.setItem("user", JSON.stringify(user));
   setStorageReady(true);
  }
 }, [user]);

 if (session) {
  return (
   <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
       <Leaf className="h-7 w-7 text-green-500" />
       <span className="font-bold text-2xl">EcoTracker</span>
      </div>
      <div className="flex items-center gap-4">
       <span className="hidden text-sm text-muted-foreground sm:block">Welcome, {session.user?.name}</span>
       <Button variant="outline" onClick={() => signOut()}>
        Sign Out
       </Button>
      </div>
     </div>
    </header>
    <main className="flex-1 bg-gradient-to-b from-background to-muted">
     <section className="space-y-6 pb-12 pt-16 md:pb-20 md:pt-24 lg:py-32 justify-center flex">
      <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="container flex flex-col items-center gap-4 text-center"
      >
       <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Ready to make an impact?</h1>
       <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Your dashboard is waiting. Continue tracking your environmental impact and earning achievements.
       </p>
       <Link href={storageReady ? "/dashboard" : "#"}>
        <Button size="lg" className="gap-2" disabled={!storageReady}>
         Go to Dashboard
         <ArrowRight className="h-4 w-4" />
        </Button>
       </Link>
      </motion.div>
     </section>
    </main>
   </div>
  );
 }
 return (
  <div className={`flex min-h-screen flex-col sm:pb-0 ${isDarkMode ? "dark" : ""}`}>
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 md:px-8">
     <div className="flex items-center gap-3">
      <Leaf className="h-7 w-7 text-green-500" />
      <span className="font-bold text-2xl">EcoTracker</span>
     </div>
     <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-8">
       <Link href="#features" className="text-sm font-medium hover:text-primary">
        Features
       </Link>
       <Link href="#achievements" className="text-sm font-medium hover:text-primary">
        Achievements
       </Link>
       <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Sign In</Button>
      </nav>
     </div>
    </div>
    {isMenuOpen && (
     <AnimatePresence>
      <motion.div
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ duration: 0.2 }}
       className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
      >
       <nav className="container py-6 flex flex-col gap-6 px-4 md:px-8">
        <Link href="#features" className="text-sm font-medium hover:text-primary">
         Features
        </Link>
        <Link href="#achievements" className="text-sm font-medium hover:text-primary">
         Achievements
        </Link>
        <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="w-full">
         Sign In
        </Button>
       </nav>
      </motion.div>
     </AnimatePresence>
    )}
   </header>
   <main>
    <section className="relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 -z-10" />
     <div className="space-y-6 pb-12 pt-16 md:pb-20 md:pt-24 lg:py-32 justify-center flex">
      <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="container flex flex-col items-center gap-6 text-center"
      >
       <div className="rounded-2xl bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
        Join Our Environmental Movement
       </div>
       <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Track Your Environmental <br className="hidden sm:inline" />
        Impact and Make a Change
       </h1>
       <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Join our gamified platform to monitor your carbon footprint, track local pollution levels, and compete with your
        community for a better environment.
       </p>
       <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button size="lg" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="gap-2">
         Get Started
         <ArrowRight className="h-4 w-4" />
        </Button>
       </motion.div>
      </motion.div>
     </div>
    </section>

    <section id="features" className="container max-w-7xl mx-auto space-y-6 py-8 md:py-12 lg:py-24">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
     >
      <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
       Everything you need to track and improve your environmental impact.
      </p>
     </motion.div>
     <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      {[
       {
        icon: LineChart,
        title: "Carbon Tracking",
        description: "Monitor your daily carbon footprint and see your impact over time.",
        color: "text-green-500",
       },
       {
        icon: Globe2,
        title: "Local Pollution Data",
        description: "Real-time tracking of air quality and pollution levels in your area.",
        color: "text-blue-500",
       },
       {
        icon: Users,
        title: "Community Impact",
        description: "Join local communities and compete for a better environment.",
        color: "text-indigo-500",
       },
      ].map((feature, index) => (
       <motion.div
        key={feature.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
       >
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
         <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
           <feature.icon className={`h-12 w-12 ${feature.color} transition-transform group-hover:scale-110`} />
           <h3 className="text-xl font-bold">{feature.title}</h3>
           <p className="text-center text-muted-foreground">{feature.description}</p>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      ))}
     </div>
    </section>

    <section id="achievements" className="relative overflow-hidden py-8 md:py-12 lg:py-24">
     <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white dark:from-slate-950 dark:to-background -z-10" />
     <div className="container max-w-7xl mx-auto space-y-6">
      <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5 }}
       className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
      >
       <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Achievements</h2>
       <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Earn badges and rewards for your environmental contributions.
       </p>
      </motion.div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-4">
       {[
        {
         title: "Carbon Reducer",
         icon: "🌱",
         description: "Reduce your carbon footprint",
        },
        {
         title: "Community Leader",
         icon: "👥",
         description: "Lead local initiatives",
        },
        {
         title: "Zero Waste Hero",
         icon: "♻️",
         description: "Achieve zero waste goals",
        },
        {
         title: "Energy Saver",
         icon: "⚡",
         description: "Reduce energy consumption",
        },
       ].map((achievement, index) => (
        <motion.div
         key={achievement.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
        >
         <Card className="group hover:shadow-lg transition-all">
          <CardContent className="pt-6">
           <div className="flex flex-col items-center space-y-4">
            <div className="text-4xl transform transition-transform group-hover:scale-110">{achievement.icon}</div>
            <h3 className="font-semibold">{achievement.title}</h3>
            <p className="text-sm text-center text-muted-foreground">{achievement.description}</p>
           </div>
          </CardContent>
         </Card>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    <section className="container max-w-7xl mx-auto space-y-6 py-8 md:py-12 lg:py-24">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
     >
      <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Join Today</h2>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
       Start your journey towards a more sustainable future.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
       <Button size="lg" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="gap-2">
        Sign In with Google
        <ArrowRight className="h-4 w-4" />
       </Button>
      </motion.div>
     </motion.div>
    </section>
   </main>
  </div>
 );
};

export default Home;
