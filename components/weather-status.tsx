import { Sun, CloudSun, Cloud, CloudRain } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { WeatherStatus } from "@/lib/data";

const statusConfig = {
 excellent: {
  icon: Sun,
  color: "text-yellow-500",
  label: "Excellent Activity",
  bgColor: "bg-yellow-500/10",
 },
 normal: {
  icon: CloudSun,
  color: "text-blue-400",
  label: "Normal Activity",
  bgColor: "bg-blue-500/10",
 },
 below: {
  icon: Cloud,
  color: "text-gray-400",
  label: "Below Target",
  bgColor: "bg-gray-500/10",
 },
 poor: {
  icon: CloudRain,
  color: "text-blue-600",
  label: "Poor Activity",
  bgColor: "bg-blue-600/10",
 },
};

interface WeatherStatusProps {
 status: WeatherStatus;
 lastActivity: Date;
}

export function WeatherStatus({ status, lastActivity }: WeatherStatusProps) {
 const config = statusConfig[status];
 const Icon = config.icon;
 const daysAgo = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

 return (
  <TooltipProvider>
   <Tooltip>
    <TooltipTrigger>
     <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
      <Icon className={`h-5 w-5 ${config.color}`} />
     </div>
    </TooltipTrigger>
    <TooltipContent>
     <div className="text-sm">
      <p className="font-semibold">{config.label}</p>
      <p className="text-muted-foreground">Last active: {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</p>
     </div>
    </TooltipContent>
   </Tooltip>
  </TooltipProvider>
 );
}
