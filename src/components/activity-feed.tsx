"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Globe, Heart, Eye, Music } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

const LOCATIONS = [
    "Jakarta, ID", "Tokyo, JP", "New York, US", "London, UK",
    "Seoul, KR", "Berlin, DE", "Surabaya, ID", "Singapore, SG",
    "Toronto, CA", "Sydney, AU", "Amsterdam, NL"
];

const ACTIONS = [
    { text: "viewed Projects", icon: Eye },
    { text: "is listening to music", icon: Music },
    { text: "liked a blog post", icon: Heart },
    { text: "viewed About page", icon: Eye },
    { text: "is reading the Guestbook", icon: Globe },
];

export function ActivityFeed() {
    const { zenMode } = useSysConfig();

    useEffect(() => {
        if (zenMode) return;

        const interval = setInterval(() => {
            // 30% chance to skew randomization (don't spam)
            if (Math.random() > 0.3) {
                const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
                const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                const Icon = action.icon;

                toast(
                    <div className="flex items-center gap-2 text-xs">
                        <Icon size={14} className="text-cyan-400" />
                        <span>
                            <span className="font-semibold text-white">Someone from {location}</span>
                            <span className="text-neutral-400"> {action.text}</span>
                        </span>
                    </div>,
                    {
                        duration: 3000,
                        position: "bottom-left",
                        className: "bg-black/80 border-white/10 backdrop-blur-md w-fit min-w-0"
                    }
                );
            }
        }, 8000 + Math.random() * 5000); // Random interval 8-13s

        return () => clearInterval(interval);
    }, [zenMode]);

    return null; // Headless component
}
