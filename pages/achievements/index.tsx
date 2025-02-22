"use client";

import type React from "react";

import { Search } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShareButton from "@/components/ui/share-button";

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: string;
  points: number;
  progress: number;
  unlocked: boolean;
  level: string;
};

type AchievementsData = {
  environmental: Achievement[];
  community: Achievement[];
  sustainable: Achievement[];
  special: Achievement[];
};

const achievements: AchievementsData = {
  environmental: [
    {
      id: "env-1",
      name: "Carbon Footprint Reducer",
      description: "Reduce your carbon footprint by 10%",
      icon: "🌱",
      rarity: "rare",
      points: 50,
      progress: 75,
      unlocked: true,
      level: "gold",
    },
    {
      id: "env-2",
      name: "Recycling Hero",
      description: "Recycle 50 items",
      icon: "♻️",
      rarity: "uncommon",
      points: 25,
      progress: 100,
      unlocked: true,
      level: "bronze",
    },
  ],
  community: [
    {
      id: "com-1",
      name: "Community Clean-Up",
      description: "Participate in a community clean-up event",
      icon: "🤝",
      rarity: "epic",
      points: 75,
      progress: 50,
      unlocked: false,
      level: "silver",
    },
    {
      id: "com-2",
      name: "Volunteer Hours",
      description: "Volunteer 10 hours to an environmental cause",
      icon: "🧑‍ volunteer",
      rarity: "rare",
      points: 50,
      progress: 25,
      unlocked: false,
      level: "bronze",
    },
  ],
  sustainable: [
    {
      id: "sus-1",
      name: "Sustainable Shopper",
      description: "Buy locally sourced products for a month",
      icon: "🛍️",
      rarity: "legendary",
      points: 100,
      progress: 100,
      unlocked: true,
      level: "gold",
    },
    {
      id: "sus-2",
      name: "Energy Saver",
      description: "Reduce energy consumption by 20%",
      icon: "💡",
      rarity: "uncommon",
      points: 25,
      progress: 60,
      unlocked: true,
      level: "silver",
    },
  ],
  special: [
    {
      id: "spec-1",
      name: "Earth Day Advocate",
      description: "Participate in Earth Day activities",
      icon: "🌍",
      rarity: "epic",
      points: 75,
      progress: 100,
      unlocked: true,
      level: "silver",
    },
    {
      id: "spec-2",
      name: "Climate Change Champion",
      description: "Attend a climate change rally",
      icon: "📣",
      rarity: "rare",
      points: 50,
      progress: 0,
      unlocked: false,
      level: "bronze",
    },
  ],
};

export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState("");

  const getBadgeColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-primary/20 text-primary";
      case "epic":
        return "bg-primary/15 text-primary";
      case "rare":
        return "bg-primary/10 text-primary";
      case "uncommon":
        return "bg-primary/5 text-primary";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "gold":
        return "bg-primary/10 border-primary/20";
      case "silver":
        return "bg-secondary/10 border-secondary/20";
      case "bronze":
        return "bg-muted/10 border-muted/20";
      default:
        return "bg-muted/10 border-muted/20";
    }
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card
      className={`relative overflow-hidden border transition-all hover:shadow-md ${getLevelStyle(
        achievement.level
      )}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl 
            ${achievement.unlocked ? "opacity-100" : "opacity-40"}`}>
            {achievement.icon}
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-medium">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge className={getBadgeColor(achievement.rarity)}>
                {achievement.rarity}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {achievement.points} pts
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Progress value={achievement.progress} className="h-1" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{achievement.progress}%</span>
          </div>
        </div>
      </CardContent>
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px]">
          <Badge
            variant="secondary"
            className="pointer-events-none select-none">
            🔒 Locked
          </Badge>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-muted-foreground text-sm">
            Track your environmental impact milestones
          </p>
        </div>
        <div className="relative w-full md:w-64">
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

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold">12/20</div>
            <p className="text-sm text-muted-foreground">Total Achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-500">
              5
            </div>
            <p className="text-sm text-muted-foreground">Gold Badges</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-400">
              4
            </div>
            <p className="text-sm text-muted-foreground ">Silver Badges</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold" text-orange-600>
              3
            </div>
            <p className="text-sm text-muted-foreground">Bronze Badges</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary">
                New Achievement!
              </Badge>
              <h2 className="text-xl font-bold">Zero Waste Champion 🏆</h2>
              <p className="text-sm text-muted-foreground">
                Congratulations! You have achieved zero waste status for 30 days
                straight.
              </p>
            </div>
            <ShareButton />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="environmental" className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
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
