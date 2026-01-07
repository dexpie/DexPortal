"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/5",
                className
            )}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="p-6 rounded-xl bg-neutral-900/50 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    );
}

export function SkeletonProjectCard() {
    return (
        <div className="p-6 rounded-xl bg-black border border-white/10">
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-5 w-5 rounded" />
            </div>
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
            <div className="mt-6 pt-4 border-t border-white/5">
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}
