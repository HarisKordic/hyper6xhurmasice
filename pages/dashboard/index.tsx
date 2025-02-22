"use client";

import { useSession } from "next-auth/react";
import { BadgeCheck, Globe2, Leaf, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
 Area,
 AreaChart,
 Bar,
 BarChart,
 CartesianGrid,
 ResponsiveContainer,
 XAxis,
 YAxis,
} from "@/components/ui/chart";
import { useMemo } from "react";

// Add these type definitions
type StatCard = {
 title: string;
 value: string;
 change: string;
 progress: number;
 icon: React.ReactNode;
 iconColor: string;
};

type ChartData = {
 carbonFootprint: Array<{ month: string; amount: number }>;
 pollutionLevels: Array<{ pollutant: string; level: number }>;
};

// Add this section before your Dashboard component
const useEnvironmentalData = () => {
 // Stats data
 const stats: StatCard[] = useMemo(
  () => [
   {
    title: "Carbon Footprint",
    value: "2.4 tons",
    change: "-12% from last month",
    progress: 65,
    icon: <Leaf className="h-4 w-4" />,
    iconColor: "text-green-500",
   },
   {
    title: "Local Air Quality",
    value: "Good",
    change: "AQI: 42 (Low pollution)",
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
  ],
  []
 );

 // Charts data
 const chartData: ChartData = useMemo(
  () => ({
   carbonFootprint: [
    { month: "Jan", amount: 3.2 },
    { month: "Feb", amount: 3.0 },
    { month: "Mar", amount: 2.8 },
    { month: "Apr", amount: 2.7 },
    { month: "May", amount: 2.5 },
    { month: "Jun", amount: 2.4 },
    { month: "Jul", amount: 2.4 },
   ],
   pollutionLevels: [
    { pollutant: "PM2.5", level: 35 },
    { pollutant: "PM10", level: 42 },
    { pollutant: "NO2", level: 28 },
    { pollutant: "SO2", level: 15 },
    { pollutant: "CO", level: 20 },
   ],
  }),
  []
 );

 return { stats, chartData };
};

// Modify your Dashboard component to use the data
export default function Dashboard() {
 const { data: session } = useSession();
 const { stats, chartData } = useEnvironmentalData();

 return (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
   {/* Main Content */}
   <main className="p-6">
    <div className="mb-8">
     <h1 className="text-3xl font-bold mb-2">
      Welcome back,
      <span className="block sm:inline"> {session?.user?.name}</span>
     </h1>
     <p className="text-muted-foreground">Your environmental impact dashboard for July 2024</p>
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
    <div className="grid gap-6 md:grid-cols-2 mb-6">
     <Card>
      <CardHeader>
       <CardTitle>Monthly Carbon Footprint</CardTitle>
       <CardDescription>Your carbon emissions over time</CardDescription>
      </CardHeader>
      <CardContent>
       <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
         <AreaChart data={chartData.carbonFootprint}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-sm" />
          <YAxis className="text-sm" />
          <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/.1)" />
         </AreaChart>
        </ResponsiveContainer>
       </div>
      </CardContent>
     </Card>
     <Card>
      <CardHeader>
       <CardTitle>Local Pollution Levels</CardTitle>
       <CardDescription>Air quality metrics in your area</CardDescription>
      </CardHeader>
      <CardContent>
       <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
         <BarChart data={chartData.pollutionLevels}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="pollutant" className="text-sm" />
          <YAxis className="text-sm" />
          <Bar dataKey="level" fill="hsl(var(--primary))" />
         </BarChart>
        </ResponsiveContainer>
       </div>
      </CardContent>
     </Card>
    </div>

    {/* Community Leaderboard */}
    <Card>
     <CardHeader>
      <CardTitle>Community Leaderboard</CardTitle>
      <CardDescription>Top performers in your area</CardDescription>
     </CardHeader>
     <CardContent>
      <Table>
       <TableHeader>
        <TableRow>
         <TableHead>Rank</TableHead>
         <TableHead>User</TableHead>
         <TableHead>Community</TableHead>
         <TableHead>Carbon Reduction</TableHead>
         <TableHead>Eco Points</TableHead>
         <TableHead>Achievements</TableHead>
        </TableRow>
       </TableHeader>
       <TableBody>
        <TableRow>
         <TableCell className="font-medium">#1</TableCell>
         <TableCell>Sarah K.</TableCell>
         <TableCell>
          <Badge variant="secondary">Green Valley</Badge>
         </TableCell>
         <TableCell className="text-green-500">-45%</TableCell>
         <TableCell>2,345</TableCell>
         <TableCell>
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger>
             <div className="flex -space-x-2">
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">🌱</Badge>
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">🚲</Badge>
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">♻️</Badge>
             </div>
            </TooltipTrigger>
            <TooltipContent>
             <p>Plant Master, Cycle Champion, Recycling Pro</p>
            </TooltipContent>
           </Tooltip>
          </TooltipProvider>
         </TableCell>
        </TableRow>
        <TableRow>
         <TableCell className="font-medium">#2</TableCell>
         <TableCell>Mike R.</TableCell>
         <TableCell>
          <Badge variant="secondary">Eco Warriors</Badge>
         </TableCell>
         <TableCell className="text-green-500">-42%</TableCell>
         <TableCell>2,142</TableCell>
         <TableCell>
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger>
             <div className="flex -space-x-2">
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">🌱</Badge>
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">💧</Badge>
             </div>
            </TooltipTrigger>
            <TooltipContent>
             <p>Plant Master, Water Saver</p>
            </TooltipContent>
           </Tooltip>
          </TooltipProvider>
         </TableCell>
        </TableRow>
        <TableRow>
         <TableCell className="font-medium">#3</TableCell>
         <TableCell>Emma T.</TableCell>
         <TableCell>
          <Badge variant="secondary">Green Valley</Badge>
         </TableCell>
         <TableCell className="text-green-500">-38%</TableCell>
         <TableCell>1,985</TableCell>
         <TableCell>
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger>
             <div className="flex -space-x-2">
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">🌱</Badge>
              <Badge className="h-6 w-6 rounded-full bg-primary text-primary-foreground">🔋</Badge>
             </div>
            </TooltipTrigger>
            <TooltipContent>
             <p>Plant Master, Energy Saver</p>
            </TooltipContent>
           </Tooltip>
          </TooltipProvider>
         </TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </CardContent>
    </Card>
   </main>
  </div>
 );
}
