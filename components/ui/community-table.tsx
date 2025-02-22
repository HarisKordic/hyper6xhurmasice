"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@/lib/data";
const ITEMS_PER_PAGE = 10;

function CommunityTable({ paginatedUsers, currentPage }: { paginatedUsers: User[]; currentPage: number }) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
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
                            <TableCell className="font-medium">#{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
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
                                            <div className="flex space-x-1">
                                                {user.achievements.map((achievement, i) => (
                                                    <Badge
                                                        key={i}
                                                        className="h-8 w-8 rounded-full bg-secondary text-primary-foreground flex items-center justify-center"
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
    )
}

export default CommunityTable