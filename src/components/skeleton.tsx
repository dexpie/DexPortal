import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-neutral-800/50",
                className
            )}
            {...props}
        />
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="relative h-full bg-neutral-900 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
                <Skeleton className="h-4 w-24" />
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
        <div className="p-6 rounded-xl bg-neutral-900/50 border border-white/5">
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
