"use client";

import { BadgeCheck, Globe2, Leaf, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Charts from "./components/charts";
import TopTable from "./components/top-table";

// Add these type definitions
type StatCard = {
 title: string;
 value: string;
 change: string;
 progress: number;
 icon: React.ReactNode;
 iconColor: string;
};

// Stats data
const stats: StatCard[] = [
 {
  title: "Carbon Footprint",
  value: "~20 kg CO₂",
  change: "-12% from last month",
  progress: 65,
  icon: <Leaf className="h-4 w-4" />,
  iconColor: "text-green-500",
 },
 {
  title: "Local Air Quality",
  value: "Moderate",
  change: "Main pollutant: PM2.511  µg/ m³",
  progress: 85,
  icon: <Globe2 className="h-4 w-4" />,
  iconColor: "text-blue-500",
 },
 {
  title: "Community Rank",
  value: "#42",
  change: "Top 10% in your area",
  progress: 90,
  icon: <Users className="h-4 w-4" />,
  iconColor: "text-indigo-500",
 },
 {
  title: "Eco Points",
  value: "1,234",
  change: "+234 this month",
  progress: 72,
  icon: <BadgeCheck className="h-4 w-4" />,
  iconColor: "text-yellow-500",
 },
];

// Modify your Dashboard component to use the data
export default function Dashboard() {
 const { data: session } = useSession();

 return (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-72 sm:pb-0">
   {/* Main Content */}
   <div className="mb-8">
    <h1 className="text-3xl font-bold mb-2">
     Welcome back,
     <span className="block sm:inline"> {session?.user?.name}</span>
    </h1>
    <p className="text-muted-foreground">Your environmental impact stats for {new Date().toDateString()}</p>
   </div>

   {/* Stats Grid */}
   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
    {stats.map((stat, index) => (
     <Card key={index}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
       <span className={stat.iconColor}>{stat.icon}</span>
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">{stat.value}</div>
       <p className="text-xs text-muted-foreground">{stat.change}</p>
       <Progress value={stat.progress} className="mt-3" />
      </CardContent>
     </Card>
    ))}
   </div>

   {/* Charts */}
   <Charts />

   {/* Community Leaderboard */}
   <TopTable />
  </div>
 );
}
