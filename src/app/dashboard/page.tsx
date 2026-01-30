import { getGithubRepos } from "@/lib/github";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VisitorCounter } from "@/components/visitor-counter";
import { LocalTime } from "@/components/local-time";
import { GitHubStatsWidget } from "@/components/github-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { DiscordStatus } from "@/components/discord-status";
import { QuoteOfTheDay } from "@/components/quote-of-the-day";
import { GitHubRepos } from "@/components/github-repos";

export const metadata = {
    title: "Dashboard | DexPortal",
    description: "Live statistics and activity feed.",
};

export default async function DashboardPage() {
    const githubRepos = await getGithubRepos("dexpie");

    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-mono">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
                            DASHBOARD
                        </h1>
                        <p className="text-neutral-400">Live Statistics & Activity Monitor</p>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <div className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Visitor Count</div>
                        <VisitorCounter />
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <div className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Local Time</div>
                        <LocalTime />
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 lg:col-span-2 hover:border-cyan-500/50 transition-colors flex flex-col justify-center">
                        <div className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Daily Insight</div>
                        <QuoteOfTheDay />
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* GitHub Activity - High Priority */}
                        <section className="p-8 rounded-xl bg-neutral-900/50 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                                GITHUB ACTIVITY
                            </h3>
                            <GitHubStatsWidget username="dexpie" />
                            <div className="mt-8 border-t border-white/10 pt-8">
                                <ActivityFeed />
                            </div>
                        </section>

                        {/* Repositories */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 text-purple-400 flex items-center gap-2">
                                REPOSITORIES
                            </h3>
                            <GitHubRepos repos={githubRepos} />
                        </section>
                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-8">
                        {/* Status Card */}
                        <section className="p-8 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                                SYSTEM STATUS
                            </h3>
                            <DiscordStatus />
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
