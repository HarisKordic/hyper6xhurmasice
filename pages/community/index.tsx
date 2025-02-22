"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateUsers, allCommunities, type User } from "@/lib/data";
import { WeatherStatus } from "@/components/ui/weather-status";

const ITEMS_PER_PAGE = 10;

export default function Community() {
  const [users, setUsers] = useState<User[]>(() => generateUsers(1000));
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [, setUpdateCount] = useState(0);
  const generateRandomUpdate = (currentPoints: number) => {
    // Generate a random change between -100 and 200 with higher probability of positive changes
    const change = Math.floor(Math.random() * 300) - 100;

    // Add some variance to make bigger jumps occasionally
    const multiplier = Math.random() < 0.2 ? Math.random() * 2 + 1 : 1;

    return Math.max(0, currentPoints + Math.floor(change * multiplier));
  };

  // Enhanced real-time updates
  useEffect(() => {
    // Create multiple update intervals with different frequencies
    const intervals = [
      // Frequent small updates
      setInterval(() => {
        setUsers((currentUsers) => {
          const newUsers = [...currentUsers];
          // Update 2-5 random users
          const updateCount = Math.floor(Math.random() * 4) + 2;

          for (let i = 0; i < updateCount; i++) {
            const randomIndex = Math.floor(Math.random() * newUsers.length);
            newUsers[randomIndex] = {
              ...newUsers[randomIndex],
              ecoPoints: generateRandomUpdate(newUsers[randomIndex].ecoPoints),
            };
          }
          return newUsers.sort((a, b) => b.ecoPoints - a.ecoPoints);
        });
        setUpdateCount((count) => count + 1);
      }, 2000),

      // Less frequent larger updates
      setInterval(() => {
        setUsers((currentUsers) => {
          const newUsers = [...currentUsers];
          // Update 5-10 random users with bigger changes
          const updateCount = Math.floor(Math.random() * 6) + 5;

          for (let i = 0; i < updateCount; i++) {
            const randomIndex = Math.floor(Math.random() * newUsers.length);
            const multiplier = Math.random() * 3 + 1; // Bigger multiplier for larger changes
            newUsers[randomIndex] = {
              ...newUsers[randomIndex],
              ecoPoints:
                generateRandomUpdate(newUsers[randomIndex].ecoPoints) *
                multiplier,
            };
          }
          return newUsers.sort((a, b) => b.ecoPoints - a.ecoPoints);
        });
      }, 5000),

      // Occasional "event" updates that affect multiple users in the same community
      setInterval(() => {
        setUsers((currentUsers) => {
          const newUsers = [...currentUsers];
          // Pick a random community
          const randomCommunity =
            allCommunities[Math.floor(Math.random() * allCommunities.length)];

          // Update all users in that community
          newUsers.forEach((user, index) => {
            if (user.community === randomCommunity && Math.random() < 0.7) {
              newUsers[index] = {
                ...user,
                ecoPoints: generateRandomUpdate(user.ecoPoints),
              };
            }
          });
          return newUsers.sort((a, b) => b.ecoPoints - a.ecoPoints);
        });
      }, 10000),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      selectedCommunity === "all" || user.community === selectedCommunity
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex-1 py-4 w-full">
        <Card className="h-[770px] flex flex-col border-0 shadow-none">
          <CardHeader className="border-b p-0 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle>Community Leaderboard</CardTitle>
                <CardDescription>Top performers in your area</CardDescription>
              </div>
              <Select
                value={selectedCommunity}
                onValueChange={(value) => {
                  setSelectedCommunity(value);
                  setCurrentPage(1);
                }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Communities</SelectItem>
                  {allCommunities.map((community) => (
                    <SelectItem key={community} value={community}>
                      {community}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead className="w-[200px]">Community</TableHead>
                  <TableHead className="w-[150px]">Carbon Reduction</TableHead>
                  <TableHead className="w-[150px]">Eco Points</TableHead>
                  <TableHead className="w-[150px]">Achievements</TableHead>
                  <TableHead className="min-w-[150px]">Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[600px]">
                <AnimatePresence initial={false} mode="wait">
                  {paginatedUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      layout
                      className="border-b transition-colors hover:shadow-[1px_1px_10px_1px_rgba(0,0,0,0.13)]">
                      <TableCell className="font-medium">
                        #{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.community}</Badge>
                      </TableCell>
                      <TableCell className="text-green-500">
                        -{user.carbonReduction}%
                      </TableCell>
                      <TableCell>
                        <motion.span
                          key={user.ecoPoints}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}>
                          {user.ecoPoints.toLocaleString()}
                        </motion.span>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex space-x-1">
                                {user.achievements.map((achievement, i) => (
                                  <Badge
                                    key={i}
                                    className="h-8 w-8 rounded-full bg-secondary text-primary-foreground flex items-center justify-center">
                                    {achievement.icon}
                                  </Badge>
                                ))}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {user.achievements
                                  .map((a) => a.name)
                                  .join(", ")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <WeatherStatus
                          status={user.activityStatus}
                          lastActivity={user.lastActivity}
                        />
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
              <TableFooter className="bg-transparent text-transparent">
                <>1</>
              </TableFooter>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden max-h-[480px] overflow-y-auto scrollbar-hide">
            <AnimatePresence initial={false} mode="wait">
              {paginatedUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            #{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                          </span>
                          <h3 className="font-semibold">{user.name}</h3>
                        </div>
                        <Badge variant="secondary">{user.community}</Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Carbon Reduction
                          </span>
                          <span className="text-green-500">
                            -{user.carbonReduction}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Eco Points
                          </span>
                          <motion.span
                            key={user.ecoPoints}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="font-semibold">
                            {user.ecoPoints.toLocaleString()}
                          </motion.span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Achievements
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex space-x-1">
                                  {user.achievements.map((achievement, i) => (
                                    <Badge
                                      key={i}
                                      className="h-8 w-8 rounded-full bg-secondary text-primary-foreground flex items-center justify-center">
                                      {achievement.icon}
                                    </Badge>
                                  ))}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {user.achievements
                                    .map((a) => a.name)
                                    .join(", ")}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Activity
                          </span>
                          <WeatherStatus
                            status={user.activityStatus}
                            lastActivity={user.lastActivity}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </p>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
