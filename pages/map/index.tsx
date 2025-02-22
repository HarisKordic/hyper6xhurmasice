"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Bike, Zap } from "lucide-react";

// Mock data for users and their activities
const mockUsers = [
  {
    id: 1,
    name: "Sarah K.",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 43.3438, lng: 17.8078 }, // Near Mostar
    activity: "Drove to Mostar in Tesla Model 3",
    timestamp: "2 mins ago",
    icon: <Car className="w-4 h-4 text-green-500" />,
    emission: "-2.5kg CO2",
  },
  {
    id: 2,
    name: "Alex M.",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 43.3538, lng: 17.8178 },
    activity: "Rode e-scooter to work",
    timestamp: "5 mins ago",
    icon: <Bike className="w-4 h-4 text-green-500" />,
    emission: "-1.2kg CO2",
  },
  {
    id: 3,
    name: "Mike R.",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 43.3338, lng: 17.8278 },
    activity: "Charged EV at green station",
    timestamp: "10 mins ago",
    icon: <Zap className="w-4 h-4 text-green-500" />,
    emission: "-3.0kg CO2",
  },
];

export default function EcoMap() {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers>();

  return (
    <div className="h-screen w-full bg-black text-white relative">
      {/* Map Container */}
      <div className="h-full w-full bg-zinc-900 rounded-lg overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11572.419444416332!2d17.807796!3d43.343783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1635774243541!5m2!1sen!2s"
          className="w-full h-full border-0 filter contrast-75"
          loading="lazy"></iframe>

        {/* User Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(user.location.lng - 17.8078) * 1000 + 50}%`,
                top: `${(user.location.lat - 43.3438) * 1000 + 50}%`,
              }}>
              <div
                className="relative group cursor-pointer pointer-events-auto"
                onClick={() => setSelectedUser(user)}>
                <Avatar className="w-10 h-10 border-2 border-green-500 transition-transform transform hover:scale-110">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-black">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-black">
                  {user.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/80 backdrop-blur-md border-zinc-800">
        <ScrollArea className="h-48 rounded-lg p-4">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-start space-x-4 mb-4 p-2 rounded-lg transition-colors ${selectedUser?.id === user.id
                ? "bg-zinc-800/50"
                : "hover:bg-zinc-800/30"
                }`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-white">{user.name}</h3>
                  <span className="text-xs text-zinc-400">
                    {user.timestamp}
                  </span>
                </div>
                <p className="text-sm text-zinc-300">{user.activity}</p>
                <div className="flex items-center mt-1">
                  {user.icon}
                  <span className="text-xs text-green-500 ml-1">
                    {user.emission}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
}
