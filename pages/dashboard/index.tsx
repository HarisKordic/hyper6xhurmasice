"use client";

import { BadgeCheck, Globe2, Leaf, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Charts from "./components/charts";
import TopTable from "./components/top-table";

type StatCard = {
 title: string;
 value: string;
 change: string;
 progress: number;
 icon: React.ReactNode;
};

const stats: StatCard[] = [
 {
  title: "Carbon Footprint",
  value: "~20 kg CO₂",
  change: "-12% from last month",
  progress: 65,
  icon: <Leaf className="h-5 w-5" />,
 },
 {
  title: "Local Air Quality",
  value: "Moderate",
  change: "Main pollutant: PM2.511 µg/m³",
  progress: 85,
  icon: <Globe2 className="h-5 w-5" />,
 },
 {
  title: "Community Rank",
  value: "#42",
  change: "Top 10% in your area",
  progress: 90,
  icon: <Users className="h-5 w-5" />,
 },
 {
  title: "Eco Points",
  value: "1,234",
  change: "+234 this month",
  progress: 72,
  icon: <BadgeCheck className="h-5 w-5" />,
 },
];

export default function Dashboard() {
 const { data: session } = useSession();

 return (
  <div className="min-h-screen bg-background space-y-8">
   <div>
    <h1 className="text-2xl font-semibold text-foreground">Welcome back, {session?.user?.name}</h1>
    <p className="text-muted-foreground text-sm">
     Your environmental impact stats for {new Date().toLocaleDateString()}
    </p>
   </div>

   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
     <Card key={index} className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6">
       <div className="flex items-center justify-between mb-4">
        <span className="p-2 bg-primary/10 rounded-full text-primary">{stat.icon}</span>
        <Progress value={stat.progress} className="w-16" />
       </div>
       <div className="space-y-1">
        <h2 className="text-sm font-medium text-muted-foreground">{stat.title}</h2>
        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        <p className="text-xs text-muted-foreground">{stat.change}</p>
       </div>
      </CardContent>
     </Card>
    ))}
   </div>

   <Charts />

   <div className="bg-card rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-primary">Top Community Members</h2>
    <TopTable />
   </div>
  </div>
 );
}
