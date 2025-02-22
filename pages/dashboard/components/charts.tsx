"use client";

import { ErrorAlert } from "@/components/error-alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "react-query";
import { Legend, Tooltip } from "recharts";

const fetchDashboardData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`);
  if (!response.ok) {
    throw new Error("Error fetching dashboard data");
  }
  return response.json();
};

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="h-[240px]">
        <Skeleton className="h-full w-full" />
      </div>
    </CardContent>
  </Card>
);

const Charts = () => {
  const { data, error, isLoading } = useQuery(
    "dashboardData",
    fetchDashboardData
  );

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorAlert message="Failed to load dashboard data. Please try again later." />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Monthly Carbon Footprint
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Your carbon emissions over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.carbonFootprint}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-muted/30"
                />
                <XAxis
                  dataKey="month"
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary)/.1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Local Pollution Levels
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Air quality metrics in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.pollutionLevels}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-muted/30"
                />
                <XAxis
                  dataKey="pollutant"
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <Tooltip />
                <Legend wrapperStyle={{ display: "none" }} />
                <Bar
                  dataKey="level"
                  fill="hsl(var(--primary)/.8)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
