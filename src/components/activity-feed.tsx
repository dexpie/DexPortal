"use client";

import { useEffect, useState } from "react";
import { Globe, Heart, Eye, Music } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

const LOCATIONS = [
    "Surabaya, ID", "Tokyo, JP", "New York, US", "London, UK",
    "Seoul, KR", "Berlin, DE", "Singapore, SG",
    "Toronto, CA", "Sydney, AU", "Amsterdam, NL"
];

const ACTIONS = [
    { text: "viewed Projects", icon: Eye },
    { text: "is listening to music", icon: Music },
    { text: "liked a blog post", icon: Heart },
    { text: "viewed About page", icon: Eye },
    { text: "is reading the Guestbook", icon: Globe },
];

type Activity = {
    id: number;
    text: string;
    location: string;
    icon: LucideIcon;
    time: string;
};

const INITIAL_ACTIVITIES: Activity[] = [
    { id: 1, text: "viewed Projects", location: "Surabaya, ID", icon: Eye, time: "Just now" },
    { id: 2, text: "is listening to music", location: "Tokyo, JP", icon: Music, time: "2m ago" },
    { id: 3, text: "viewed About page", location: "London, UK", icon: Eye, time: "5m ago" },
];

export function ActivityFeed() {
    const { zenMode } = useSysConfig();

    const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

    useEffect(() => {
        if (zenMode) return;

        const interval = setInterval(() => {
            const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

            setActivities(prev => {
                const newActivity = {
                    id: Date.now(),
                    text: action.text,
                    location: location,
                    icon: action.icon,
                    time: "Just now"
                };
                return [newActivity, ...prev.slice(0, 4)];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [zenMode]);

    if (zenMode) return null;

    return (
        <div className="space-y-4">
            {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                    <div key={activity.id} className="flex items-start gap-3 text-sm animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="mt-1 p-1.5 rounded-full bg-cyan-500/10 text-cyan-400">
                            <Icon size={12} />
                        </div>
                        <div className="flex-1">
                            <p className="text-neutral-300">
                                <span className="font-semibold text-white">Someone from {activity.location}</span> {activity.text}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">{activity.time}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
