
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableSkeletonProps {
    columnCount?: number
    rowCount?: number
    showActions?: boolean
}

export function TableSkeleton({
    columnCount = 5,
    rowCount = 10,
    showActions = true,
}: TableSkeletonProps) {
    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between py-4">
                {/* Search bar skeleton */}
                <Skeleton className="h-10 w-[250px]" />
                {/* Buttons/Filter skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>
            <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: columnCount }).map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-6 w-full" />
                                </TableHead>
                            ))}
                            {showActions && <TableHead className="w-[50px]"></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rowCount }).map((_, i) => (
                            <TableRow key={i}>
                                {Array.from({ length: columnCount }).map((_, j) => (
                                    <TableCell key={j}>
                                        <Skeleton className="h-6 w-full" />
                                    </TableCell>
                                ))}
                                {showActions && (
                                    <TableCell>
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
        </div>
    )
}
