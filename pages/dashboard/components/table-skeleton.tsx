import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

function TableSkeleton() {
  return (
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
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableSkeleton;