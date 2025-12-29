"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StatusMonitor() {
    const [isOnline, setIsOnline] = useState(true);
    // Simulating a ping check. in real world this would fetch an API
    useEffect(() => {
        const checkStatus = () => {
            // Randomly fluctuate for demo purposes or keep true for "production feel"
            setIsOnline(navigator.onLine);
        };
        window.addEventListener('online', checkStatus);
        window.addEventListener('offline', checkStatus);
        return () => {
            window.removeEventListener('online', checkStatus);
            window.removeEventListener('offline', checkStatus);
        }
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm">
            <div className="relative flex h-2 w-2">
                <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isOnline ? "bg-green-400" : "bg-red-400"
                )}></span>
                <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    isOnline ? "bg-green-500" : "bg-red-500"
                )}></span>
            </div>
            <span className="text-xs font-medium text-neutral-400">
                {isOnline ? "All Systems Operational" : "System Outage"}
            </span>
        </div>
    );
}
