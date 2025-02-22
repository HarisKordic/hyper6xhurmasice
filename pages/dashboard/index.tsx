"use client";

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

export default function Dashboard() {
 return (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
   {/* Main Content */}
   <main className="p-6">
    <div className="mb-8">
     <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
     <p className="text-muted-foreground">Your environmental impact dashboard for July 2024</p>
    </div>

    {/* Stats Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
     <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
       <Leaf className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">2.4 tons</div>
       <p className="text-xs text-muted-foreground">-12% from last month</p>
       <Progress value={65} className="mt-3" />
      </CardContent>
     </Card>
     <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">Local Air Quality</CardTitle>
       <Globe2 className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">Good</div>
       <p className="text-xs text-muted-foreground">AQI: 42 (Low pollution)</p>
       <Progress value={85} className="mt-3" />
      </CardContent>
     </Card>
     <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
       <Users className="h-4 w-4 text-indigo-500" />
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">#42</div>
       <p className="text-xs text-muted-foreground">Top 10% in your area</p>
       <Progress value={90} className="mt-3" />
      </CardContent>
     </Card>
     <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
       <BadgeCheck className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">1,234</div>
       <p className="text-xs text-muted-foreground">+234 this month</p>
       <Progress value={72} className="mt-3" />
      </CardContent>
     </Card>
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
         <AreaChart
          data={[
           { month: "Jan", amount: 3.2 },
           { month: "Feb", amount: 3.0 },
           { month: "Mar", amount: 2.8 },
           { month: "Apr", amount: 2.7 },
           { month: "May", amount: 2.5 },
           { month: "Jun", amount: 2.4 },
           { month: "Jul", amount: 2.4 },
          ]}
         >
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
         <BarChart
          data={[
           { pollutant: "PM2.5", level: 35 },
           { pollutant: "PM10", level: 42 },
           { pollutant: "NO2", level: 28 },
           { pollutant: "SO2", level: 15 },
           { pollutant: "CO", level: 20 },
          ]}
         >
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
