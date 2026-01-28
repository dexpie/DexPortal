"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useVisitorCount } from "@/hooks/use-visitor-count";

export function StatusMonitor() {
    const { count, loading } = useVisitorCount();
    const isOnline = !loading && count > 0;

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 dark:bg-black/40 border border-border dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none min-w-[140px] justify-between group cursor-help transition-all hover:bg-white/5" title={`Live Visitor Count: ${count}`}>
            <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                    <span className={cn(
                        "absolute inline-flex h-full w-full rounded-full opacity-75",
                        isOnline ? "bg-green-400 animate-ping" : "bg-neutral-600"
                    )}></span>
                    <span className={cn(
                        "relative inline-flex rounded-full h-2 w-2",
                        isOnline ? "bg-green-500" : "bg-neutral-500"
                    )}></span>
                </div>
                <span className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    {isOnline ? "SYSTEM_LIVE" : "CONNECTING"}
                </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-500 group-hover:text-cyan-400 transition-colors">
                {loading ? "..." : count.toLocaleString()}
            </span>
        </div>
    );
}
