import { BlogCardSkeleton } from "@/components/skeleton";

export default function BlogLoading() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Navbar Placeholder */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/50 border-b border-white/5" />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <div className="mb-12">
                    <div className="h-4 w-32 bg-neutral-800 rounded mb-6 animate-pulse" />
                    <div className="h-12 w-64 bg-neutral-800 rounded mb-4 animate-pulse" />
                    <div className="h-5 w-96 bg-neutral-800 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <BlogCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
