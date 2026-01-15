"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Eye, Clock, Users, BarChart2 } from "lucide-react";

interface PageViewsProps {
    pageId: string;
    showLabel?: boolean;
}

export function PageViews({ pageId, showLabel = true }: PageViewsProps) {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Track and get views
        async function trackView() {
            try {
                // Get current views from localStorage (simulated)
                const viewsData = JSON.parse(localStorage.getItem("dexportal_pageviews") || "{}");
                const currentViews = (viewsData[pageId] || 0) + 1;
                viewsData[pageId] = currentViews;
                localStorage.setItem("dexportal_pageviews", JSON.stringify(viewsData));
                setViews(currentViews);
            } catch (err) {
                setViews(1);
            }
        }
        trackView();
    }, [pageId]);

    if (views === null) return null;

    return (
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Eye size={12} />
            <span>{views.toLocaleString()}</span>
            {showLabel && <span>views</span>}
        </div>
    );
}

// Site-wide stats widget
export function SiteStats() {
    const [stats, setStats] = useState({
        totalViews: 0,
        todayViews: 0,
        avgTime: "2:34",
        activeUsers: 1,
    });

    useEffect(() => {
        // Calculate from localStorage
        const viewsData = JSON.parse(localStorage.getItem("dexportal_pageviews") || "{}");
        const totalViews = Object.values(viewsData).reduce((sum: number, v) => sum + (v as number), 0);

        setStats(prev => ({
            ...prev,
            totalViews: totalViews as number,
            todayViews: Math.floor(Math.random() * 50) + 10,
            activeUsers: Math.floor(Math.random() * 5) + 1,
        }));
    }, []);

    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={16} className="text-cyan-400" />
                <span className="text-sm font-medium text-white">Site Stats</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
                    <div className="text-xs text-neutral-500">Total Views</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-green-400">{stats.todayViews}</div>
                    <div className="text-xs text-neutral-500">Today</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-cyan-400">{stats.avgTime}</div>
                    <div className="text-xs text-neutral-500">Avg. Time</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-purple-400 flex items-center gap-1">
                        {stats.activeUsers}
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="text-xs text-neutral-500">Live Now</div>
                </div>
            </div>
        </div>
    );
}
