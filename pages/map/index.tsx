"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Bike, Zap } from "lucide-react";
import { useQuery } from "react-query";

type MapUser = {
  id: number;
  name: string;
  avatar: string;
  latitude: number;
  longitude: number;
  activity: string;
  timestamp: string;
  iconType: string;
  emission: number;
};

const fetchUsers = async (): Promise<MapUser[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/map/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

const getIcon = (type: string) => {
  const iconProps = "w-4 h-4 text-green-500";
  switch (type) {
    case "car":
      return <Car className={iconProps} />;
    case "bike":
      return <Bike className={iconProps} />;
    case "zap":
      return <Zap className={iconProps} />;
    default:
      return <Zap className={iconProps} />;
  }
};

export default function EcoMap() {
  const [selectedUser, setSelectedUser] = useState<MapUser | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["mapUsers"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Card className="absolute top-4 right-4 md:w-80 bg-black/80 backdrop-blur-md border-zinc-800 z-50 shadow-lg p-4">
        <ScrollArea className="h-48 rounded-lg">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 mb-4 p-2 rounded-lg bg-zinc-800/30 animate-pulse">
              <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>

              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-zinc-700 rounded"></div>
                <div className="w-5/6 h-3 bg-zinc-700 rounded"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <div className="w-10 h-3 bg-zinc-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-y-hidden">
      <Card className="absolute top-4 right-4 md:w-80 bg-black/80 backdrop-blur-md border-zinc-800 z-40 shadow-lg">
        <ScrollArea className="h-48 rounded-lg p-4">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex items-start space-x-4 mb-4 p-2 rounded-lg transition-colors ${
                selectedUser?.id === user.id
                  ? "bg-zinc-800/50"
                  : "hover:bg-zinc-800/30"
              }`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-white">
                    {user.name}
                  </h3>
                  <span className="text-xs text-zinc-400">
                    {new Date(user.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-300">{user.activity}</p>
                <div className="flex items-center mt-1">
                  {getIcon(user.iconType)}
                  <span className="text-xs text-green-500 ml-1">
                    {user.emission ? `-${user.emission}kg CO2` : "0kg CO2"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      <div className="h-screen w-full bg-zinc-900 overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11572.419444416332!2d17.807796!3d43.343783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1635774243541!5m2!1sen!2s"
          className="w-full h-full border-0 filter contrast-75"
          loading="lazy"></iframe>

        <div className="absolute inset-0 pointer-events-none">
          {users?.map((user) => (
            <div
              key={user.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(user.longitude - 17.8078) * 1000 + 50}%`,
                top: `${(user.latitude - 43.3438) * 1000 + 50}%`,
              }}>
              <div
                className="relative group cursor-pointer pointer-events-auto"
                onClick={() => setSelectedUser(user)}>
                <Avatar className="w-10 h-10 border-2 border-green-500 transition-transform transform hover:scale-110">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-black">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-black">
                  {getIcon(user.iconType)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
