"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, Leaf, LineChart, Users } from "lucide-react"
import { generateUsers, allCommunities, type User } from "@/lib/data"
import { signOut } from "next-auth/react"

const ITEMS_PER_PAGE = 10


export default function Community() {
    const [users, setUsers] = useState<User[]>(() => generateUsers(1000))
    const [selectedCommunity, setSelectedCommunity] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setUsers((currentUsers) => {
                const newUsers = [...currentUsers]
                // Randomly update some users' eco points
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * newUsers.length)
                    newUsers[randomIndex] = {
                        ...newUsers[randomIndex],
                        ecoPoints: newUsers[randomIndex].ecoPoints + Math.floor(Math.random() * 100) - 50,
                    }
                }
                return newUsers.sort((a, b) => b.ecoPoints - a.ecoPoints)
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const filteredUsers = users.filter((user) => selectedCommunity === "all" || user.community === selectedCommunity)

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 hidden lg:block border-r bg-card">
                <div className="flex flex-col h-dvh justify-between">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-8">
                            <Leaf className="h-6 w-6 text-green-500" />
                            <span className="font-semibold text-lg">EcoTracker</span>
                        </div>
                        <nav className="space-y-2">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-secondary-foreground transition-colors hover:bg-secondary"
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/analytics"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/80"
                            >
                                <LineChart className="h-4 w-4" />
                                Analytics
                            </Link>
                            <Link
                                href="/community"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/80 bg-secondary/80"
                            >
                                <Users className="h-4 w-4" />
                                Community
                            </Link>
                        </nav>
                    </div>
                    <div className="p-6 w-full">
                        <Button className="w-full" variant="outline" onClick={() => signOut()}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="lg:pl-64">
                <div className="container py-6 px-4 md:px-6 mx-auto max-w-7xl">
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
                                        setSelectedCommunity(value)
                                        setCurrentPage(1)
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
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    <TableHead className="w-[100px]">Rank</TableHead>
                                    <TableHead className="w-[200px]">User</TableHead>
                                    <TableHead className="w-[200px]">Community</TableHead>
                                    <TableHead className="w-[150px]">Carbon Reduction</TableHead>
                                    <TableHead className="w-[150px]">Eco Points</TableHead>
                                    <TableHead className="min-w-[150px]">Achievements</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence initial={false} mode="wait">
                                    {paginatedUsers.map((user, index) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            layout
                                            className="border-b transition-colors data-[state=selected]:bg-muted hover:shadow-[2px_2px_10px_rgba(0,0,0,0.13)]"
                                        >
                                            <TableCell className="font-medium">
                                                #{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{user.community}</Badge>
                                            </TableCell>
                                            <TableCell className="text-green-500">-{user.carbonReduction}%</TableCell>
                                            <TableCell>
                                                <motion.span
                                                    key={user.ecoPoints}
                                                    initial={{ scale: 1.2 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {user.ecoPoints.toLocaleString()}
                                                </motion.span>
                                            </TableCell>
                                            <TableCell>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex -space-x-2">
                                                                {user.achievements.map((achievement, i) => (
                                                                    <Badge
                                                                        key={i}
                                                                        className="h-6 w-6 rounded-full bg-primary text-primary-foreground"
                                                                    >
                                                                        {achievement.icon}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{user.achievements.map((a) => a.name).join(", ")}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>

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
        </div >
    )
}

