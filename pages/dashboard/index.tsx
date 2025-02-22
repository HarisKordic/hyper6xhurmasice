"use client";

import type React from "react";
import { BadgeCheck, Globe2, Leaf, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import CommunityTable from "@/components/ui/community-table";
import { generateUsers, type User } from "@/lib/data";
import { useState } from "react";
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
    icon: <Leaf className="h-4 w-4" />,
  },
  {
    title: "Local Air Quality",
    value: "Moderate",
    change: "Main pollutant: PM2.511 µg/m³",
    progress: 85,
    icon: <Globe2 className="h-4 w-4" />,
  },
  {
    title: "Community Rank",
    value: "#42",
    change: "Top 10% in your area",
    progress: 90,
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Eco Points",
    value: "1,234",
    change: "+234 this month",
    progress: 72,
    icon: <BadgeCheck className="h-4 w-4" />,
  },
];

export default function Dashboard() {
  const [users] = useState<User[]>(() => generateUsers(3));
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="text-muted-foreground text-sm">
          Your environmental impact stats for {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary">{stat.icon}</span>
                <Progress value={stat.progress} className="w-16" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Charts />

      <CommunityTable paginatedUsers={users} currentPage={1} />
    </div>
  );
}
