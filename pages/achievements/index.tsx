"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShareButton from "@/components/ui/share-button";

type Achievement = {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: string;
  level: "gold" | "silver" | "bronze" | "none";
  points: number;
  progress: number;
  unlocked: boolean;
};

type AchievementsData = {
  environmental: Achievement[];
  community: Achievement[];
  sustainable: Achievement[];
  special: Achievement[];
};

// Achievement data structure
const achievements: AchievementsData = {
  environmental: [
    {
      id: 1,
      name: "Carbon Reducer",
      description: "Reduce your carbon footprint by 25%",
      icon: "🌱",
      progress: 85,
      points: 500,
      rarity: "Common",
      unlocked: true,
      level: "gold",
    },
    {
      id: 2,
      name: "Tree Hugger",
      description: "Plant 10 trees in your community",
      icon: "🌳",
      progress: 60,
      points: 1000,
      rarity: "Rare",
      unlocked: true,
      level: "silver",
    },
    {
      id: 3,
      name: "Energy Saver",
      description: "Reduce energy consumption by 30%",
      icon: "⚡",
      progress: 45,
      points: 750,
      rarity: "Uncommon",
      unlocked: false,
      level: "bronze",
    },
  ],
  community: [
    {
      id: 4,
      name: "Community Leader",
      description: "Lead a local environmental initiative",
      icon: "👥",
      progress: 100,
      points: 2000,
      rarity: "Epic",
      unlocked: true,
      level: "gold",
    },
    {
      id: 5,
      name: "Eco Influencer",
      description: "Inspire 50 people to join your cause",
      icon: "🌟",
      progress: 72,
      points: 1500,
      rarity: "Rare",
      unlocked: true,
      level: "silver",
    },
  ],
  sustainable: [
    {
      id: 6,
      name: "Zero Waste Hero",
      description: "Achieve zero waste for a month",
      icon: "♻️",
      progress: 90,
      points: 1000,
      rarity: "Epic",
      unlocked: true,
      level: "gold",
    },
    {
      id: 7,
      name: "Sustainable Shopper",
      description: "Make 20 eco-friendly purchases",
      icon: "🛍️",
      progress: 30,
      points: 500,
      rarity: "Common",
      unlocked: false,
      level: "bronze",
    },
  ],
  special: [
    {
      id: 8,
      name: "Earth Day Champion",
      description: "Participate in Earth Day events",
      icon: "🌍",
      progress: 100,
      points: 2500,
      rarity: "Legendary",
      unlocked: true,
      level: "gold",
    },
    {
      id: 9,
      name: "Climate Warrior",
      description: "Join 5 climate action campaigns",
      icon: "⚔️",
      progress: 40,
      points: 1500,
      rarity: "Epic",
      unlocked: false,
      level: "silver",
    },
  ],
};

export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState("");

  const getBadgeColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-gradient-to-r from-orange-500 to-yellow-500 text-white";
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "uncommon":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default:
        return "bg-gradient-to-r from-slate-500 to-gray-500 text-white";
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "gold":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "silver":
        return "bg-slate-500/10 border-slate-500/20";
      case "bronze":
        return "bg-orange-500/10 border-orange-500/20";
      default:
        return "bg-slate-500/10 border-slate-500/20";
    }
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card
      className={`relative overflow-hidden border-2 transition-all hover:scale-[1.02] ${getLevelStyle(achievement.level)}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl text-4xl 
              ${achievement.unlocked ? "opacity-100" : "opacity-40"}`}
            >
              {achievement.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="secondary" className={getBadgeColor(achievement.rarity)}>
                  {achievement.rarity}
                </Badge>
                <Badge variant="outline">{achievement.points} pts</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{achievement.progress}%</span>
          </div>
          <Progress value={achievement.progress} className="h-2" />
        </div>
      </CardContent>
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px]">
          <Badge variant="secondary" className="pointer-events-none select-none">
            🔒 Locked
          </Badge>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground text-sm md:text-base">Track your environmental impact milestones</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search achievements..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Achievement Progress Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">12/20</div>
              <p className="text-sm md:text-base text-muted-foreground">Total Achievements</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500">5</div>
              <p className="text-sm md:text-base text-muted-foreground">Gold Badges</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-400">4</div>
              <p className="text-sm md:text-base text-muted-foreground">Silver Badges</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">3</div>
              <p className="text-sm md:text-base text-muted-foreground">Bronze Badges</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievement */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/5 to-secondary/5 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-2 bg-green-500/10 text-green-500">New Achievement!</Badge>
            <h2 className="text-xl md:text-2xl font-bold">Zero Waste Champion 🏆</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Congratulations! You have achieved zero waste status for 30 days straight.
            </p>
          </div>
          <ShareButton />
        </div>
      </div>

      {/* Achievement Categories */}
      <Tabs defaultValue="environmental" className="space-y-4">
        <TabsList className="overflow-auto flex md:justify-center scrollbar-hide">
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="sustainable">Sustainable Living</TabsTrigger>
          <TabsTrigger value="special">Special Events</TabsTrigger>
        </TabsList>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.environmental.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.community.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sustainable" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.sustainable.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.special.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
