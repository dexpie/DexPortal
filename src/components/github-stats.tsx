"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Users, BookOpen, Loader2 } from "lucide-react";

interface Stats {
    public_repos: number;
    followers: number;
    following: number;
    totalStars: number;
}

interface GitHubStatsWidgetProps {
    username: string;
}

export function GitHubStatsWidget({ username }: GitHubStatsWidgetProps) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch(`/api/github/stats?t=${Date.now()}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statItems = stats ? [
        { icon: BookOpen, label: "Repositories", value: stats.public_repos, color: "text-blue-400" },
        { icon: Star, label: "Total Stars", value: stats.totalStars, color: "text-yellow-400" },
        { icon: Users, label: "Followers", value: stats.followers, color: "text-cyan-400" },
        { icon: GitFork, label: "Following", value: stats.following, color: "text-purple-400" },
    ] : [];

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm flex items-center justify-center min-h-[200px]"
            >
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <img
                    src={`https://github.com/${username}.png`}
                    alt={username}
                    className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
                />
                <div>
                    <h3 className="font-bold text-white">@{username}</h3>
                    <p className="text-xs text-neutral-500">GitHub Statistics</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {statItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <item.icon size={14} className={item.color} />
                            <span className="text-xs text-neutral-500">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{item.value}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
