"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Star, GitFork, Eye, Clock, Loader2 } from "lucide-react";

interface GitHubEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
    payload?: {
        commits?: { message: string }[];
        action?: string;
    };
}

function getEventIcon(type: string) {
    switch (type) {
        case "PushEvent":
            return GitCommit;
        case "WatchEvent":
            return Star;
        case "ForkEvent":
            return GitFork;
        default:
            return Eye;
    }
}

function getEventDescription(event: GitHubEvent) {
    switch (event.type) {
        case "PushEvent":
            const commit = event.payload?.commits?.[0];
            return commit ? `Pushed: "${commit.message.slice(0, 40)}..."` : "Pushed commits";
        case "WatchEvent":
            return `Starred ${event.repo.name}`;
        case "ForkEvent":
            return `Forked ${event.repo.name}`;
        case "CreateEvent":
            return `Created ${event.repo.name}`;
        default:
            return `Activity on ${event.repo.name}`;
    }
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

export function ActivityFeed() {
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`/api/github/activity?t=${Date.now()}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError("Could not load activity");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm flex items-center justify-center min-h-[300px]"
            >
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-sm flex items-center justify-center min-h-[300px]"
            >
                <p className="text-neutral-500">{error}</p>
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
            <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                    <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </div>
                <h3 className="font-bold text-white text-sm">Live Activity</h3>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {events.slice(0, 8).map((event, index) => {
                    const Icon = getEventIcon(event.type);
                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                                <Icon size={12} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-neutral-300 truncate">
                                    {getEventDescription(event)}
                                </p>
                                <p className="text-xs text-neutral-500 flex items-center gap-1">
                                    <Clock size={10} />
                                    {formatTimeAgo(event.created_at)}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
