import { HeroSkeleton, ProjectCardSkeleton } from "@/components/skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Navbar Placeholder */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/50 border-b border-white/5" />

            <HeroSkeleton />

            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col items-center mb-16">
                    <div className="h-1 w-20 bg-neutral-800 mb-6 animate-pulse" />
                    <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <ProjectCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
