"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Users, BookOpen, Loader2, Code2, Activity } from "lucide-react";

interface Language {
    name: string;
    percentage: number;
    count: number;
}

interface Stats {
    public_repos: number;
    followers: number;
    following: number;
    totalStars: number;
    topLanguages: Language[];
    heatmapData: number[];
}

interface GitHubStatsWidgetProps {
    username: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    HTML: "bg-orange-500",
    CSS: "bg-blue-400",
    Shell: "bg-neutral-500",
    // defaults
};

// Heatmap colors (0-4)
const HEATMAP_COLORS = [
    "bg-neutral-900/50", // 0
    "bg-cyan-900/30",    // 1
    "bg-cyan-700/50",    // 2
    "bg-cyan-500/70",    // 3
    "bg-cyan-400",       // 4
];

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
                className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm flex items-center justify-center min-h-[400px]"
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
            className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm shadow-2xl shadow-cyan-900/5"
        >
            {/* Header */}
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

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {statItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors group"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <item.icon size={14} className={item.color} />
                            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{item.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Top Languages */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Code2 size={14} className="text-cyan-400" />
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Top Languages</h4>
                </div>
                <div className="space-y-3">
                    {stats?.topLanguages?.map((lang, index) => (
                        <div key={lang.name}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white font-mono">{lang.name}</span>
                                <span className="text-neutral-500">{lang.percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${lang.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                    className={`h-full rounded-full ${LANGUAGE_COLORS[lang.name] || "bg-cyan-500"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contribution Heatmap (Simplified Visual) */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-green-400" />
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Yearly Activity</h4>
                </div>
                <div className="flex flex-wrap gap-1 opacity-80 hover:opacity-100 transition-opacity">
                    {stats?.heatmapData?.slice(0, 168).map((level, i) => ( // Show first ~5 months of data blocks to fit UI
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.005 }}
                            className={`w-2.5 h-2.5 rounded-sm ${HEATMAP_COLORS[level]}`}
                        />
                    ))}
                </div>
                <p className="text-[10px] text-neutral-600 mt-2 text-right font-mono">
                    LESS <span className="mx-1">□ □ ■ ■ ■</span> MORE
                </p>
            </div>
        </motion.div>
    );
}
