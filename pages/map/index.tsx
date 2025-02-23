"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Bike, Zap } from "lucide-react";
import { useQuery } from "react-query";
import Map, { Marker } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type MapUser = {
  id: number;
  name: string;
  avatar: string;
  latitude: number;
  longitude: number;
  activity: string;
  timestamp: string;
  iconType: string;
  emission_amount: number;
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
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["mapUsers"],
    queryFn: fetchUsers,
  });

  const [viewState, setViewState] = useState({
    longitude: 17.8078,
    latitude: 43.3438,
    zoom: 12,
  });

  useEffect(() => {
    if (!mapRef.current || !users || users.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    users.forEach((user) => {
      if (user.longitude && user.latitude) {
        bounds.extend([user.longitude, user.latitude]);
      }
    });

    if (bounds.isEmpty()) return;

    mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
  }, [users]);

  if (isLoading) {
    return (
      <Card className="absolute top-4 right-4 md:w-80 bg-black/80 backdrop-blur-md border-zinc-800 z-50 shadow-lg p-4">
        <ScrollArea className="h-48 rounded-lg">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 mb-4 p-2 rounded-lg bg-zinc-800/30 animate-pulse"
            >
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
    <div className="h-screen w-full bg-black text-white relative">
      <Card className="absolute top-32 lg:top-2 left-1/2 lg:left-auto lg:right-2 transform -translate-x-1/2 lg:translate-x-0 w-96 bg-white/80 backdrop-blur-md border-zinc-800 z-50 shadow-lg">
        <ScrollArea className="h-48 lg:h-72 rounded-lg p-4">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex space-x-4 mb-4 p-4 rounded-lg transition-colors items-center cursor-pointer ${selectedUser?.id === user.id
                ? "shadow-[1px_1px_10px_rgba(0,0,0,0.13)]"
                : "hover:bg-zinc-400/30"
                }`}
              onClick={() => {
                setSelectedUser(user);
                if (mapRef.current) {
                  mapRef.current.flyTo({
                    center: [user.longitude, user.latitude],
                    zoom: 15,
                    duration: 2000,
                  });
                }
              }}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-black">
                    {user.name}
                  </h3>
                  <span className="text-xs text-black">
                    {new Date(user.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-black">{user.activity}</p>
                <div className="flex items-center mt-1">
                  {getIcon(user.iconType)}
                  <span className="text-xs text-green-600 ml-1">
                    {user.emission_amount ? `${user.emission_amount}kg CO2` : "0kg CO2"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        ref={(map) => {
          if (map) mapRef.current = map.getMap();
        }}
      >
        {users?.map((user) => (
          <Marker
            key={user.id}
            longitude={user.longitude}
            latitude={user.latitude}
            anchor="bottom"
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
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
          </Marker>
        ))}
      </Map>
    </div>
  );
}
