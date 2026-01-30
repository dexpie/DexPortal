"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LivePresenceProps {
    className?: string;
}

export function LivePresence({ className }: LivePresenceProps) {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const next = prev + change;
                return next < 2 ? 2 : next > 15 ? 15 : next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm", className)}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Users size={10} />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                    >
                        {count}
                    </motion.span>
                </AnimatePresence>
                <span className="hidden sm:inline">ONLINE</span>
            </span>
        </div>
    );
}
