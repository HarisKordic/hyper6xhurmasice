"use client";

import { useEffect, useState } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateUsers, allCommunities, type User } from "@/lib/data";
import CommunityTable from "@/components/ui/community-table";

const ITEMS_PER_PAGE = 10;

export default function Community() {
    const [users, setUsers] = useState<User[]>(() => generateUsers(1000));
    const [selectedCommunity, setSelectedCommunity] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setUsers((currentUsers) => {
                const newUsers = [...currentUsers];
                // Randomly update some users' eco points
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * newUsers.length);
                    newUsers[randomIndex] = {
                        ...newUsers[randomIndex],
                        ecoPoints: newUsers[randomIndex].ecoPoints + Math.floor(Math.random() * 100) - 50,
                    };
                }
                return newUsers.sort((a, b) => b.ecoPoints - a.ecoPoints);
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const filteredUsers = users.filter((user) => selectedCommunity === "all" || user.community === selectedCommunity);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="container p-6">
                <Card className="max-h-[800px] flex flex-col">
                    <CardHeader className="border-b">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>Community Leaderboard</CardTitle>
                                <CardDescription>Top performers in your area</CardDescription>
                            </div>
                            <Select
                                value={selectedCommunity}
                                onValueChange={(value) => {
                                    setSelectedCommunity(value);
                                    setCurrentPage(1);
                                }}
                            >
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

                    <CommunityTable paginatedUsers={paginatedUsers} currentPage={currentPage} />

                    <div className="flex items-center justify-between px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} entries
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
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
