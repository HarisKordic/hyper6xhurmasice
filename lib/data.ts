export type User = {
  lastActivity: string;
  activityStatus: WeatherStatus;
  id: string;
  name: string;
  community: string;
  carbonReduction: number;
  ecoPoints: number;
  achievements: Array<{
    icon: string;
    name: string;
  }>;
};

export type WeatherStatus = "excellent" | "normal" | "below" | "poor";

const communities = [
  "Green Valley",
  "Eco Warriors",
  "Solar Squad",
  "Ocean Guardians",
  "Forest Friends",
];
const firstNames = [
  "Sarah",
  "Mike",
  "Emma",
  "John",
  "Lisa",
  "David",
  "Anna",
  "James",
  "Maria",
  "Alex",
];
const lastNames = ["K.", "R.", "T.", "M.", "L.", "S.", "P.", "D.", "W.", "C."];
const achievements = [
  { icon: "🌱", name: "Plant Master" },
  { icon: "🚲", name: "Cycle Champion" },
  { icon: "♻️", name: "Recycling Pro" },
  { icon: "💧", name: "Water Saver" },
  { icon: "🔋", name: "Energy Saver" },
  { icon: "🌞", name: "Solar Pioneer" },
];

const date = ["Today", "Yesterday", "4 days ago", "Month ago", "2 months ago"];

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i}`,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    community: communities[Math.floor(Math.random() * communities.length)],
    carbonReduction: Math.floor(Math.random() * 50) + 20,
    ecoPoints: Math.floor(Math.random() * 3000) + 500,
    achievements: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => achievements[Math.floor(Math.random() * achievements.length)]
    ),
    lastActivity: date[Math.floor(Math.random() * date.length)],
    activityStatus: ["excellent", "normal", "below", "poor"][
      Math.floor(Math.random() * 4)
    ] as WeatherStatus,
  }));
}

export const allCommunities = communities;
