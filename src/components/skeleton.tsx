"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md bg-neutral-800/50",
                className
            )}
            {...props}
        >
            {/* Enhanced shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-4"
                    style={{ width: i === lines - 1 ? "75%" : "100%" }}
                />
            ))}
        </div>
    );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };
    return <Skeleton className={cn("rounded-full", sizeClasses[size])} />;
}

export function SkeletonCard() {
    return (
        <div className="p-6 rounded-xl bg-black border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
                <SkeletonAvatar />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="relative h-full bg-black border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 mt-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20">
            <div className="max-w-2xl space-y-8">
                <Skeleton className="h-8 w-40 rounded-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-3/4" />
                <Skeleton className="h-6 w-2/3" />
            </div>
            <Skeleton className="hidden md:block w-64 h-80 rounded-xl" />
        </section>
    );
}

export function BlogCardSkeleton() {
    return (
        <div className="p-6 rounded-xl bg-black border border-white/10">
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}
