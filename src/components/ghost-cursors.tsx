"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

interface Ghost {
    id: number;
    x: number;
    y: number;
    color: string;
    label: string;
}

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7", "#06b6d4"];
const LABELS = ["Guest", "Recruiter", "Dev", "Anon", "Fan"];

export function GhostCursors() {
    // Only show on desktop for performance & ux
    const [ghosts, setGhosts] = useState<Ghost[]>([]);
    const { zenMode } = useSysConfig();

    useEffect(() => {
        // Disable in zen mode or if reduced motion
        if (zenMode) {
            setGhosts([]);
            return;
        }

        // Initialize 2 ghosts
        const initGhosts = Array.from({ length: 2 }).map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            label: `${LABELS[Math.floor(Math.random() * LABELS.length)]} #${Math.floor(Math.random() * 99)}`
        }));
        setGhosts(initGhosts);

        const interval = setInterval(() => {
            setGhosts(prev => prev.map(g => ({
                ...g,
                // Random walk
                x: Math.max(0, Math.min(window.innerWidth, g.x + (Math.random() - 0.5) * 300)),
                y: Math.max(0, Math.min(window.innerHeight, g.y + (Math.random() - 0.5) * 300)),
            })));
        }, 2000); // Update target every 2s

        return () => clearInterval(interval);
    }, [zenMode]);

    if (zenMode) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden lg:block">
            {ghosts.map(ghost => (
                <GhostCursor key={ghost.id} ghost={ghost} />
            ))}
        </div>
    );
}

function GhostCursor({ ghost }: { ghost: Ghost }) {
    return (
        <motion.div
            initial={{ x: ghost.x, y: ghost.y, opacity: 0 }}
            animate={{ x: ghost.x, y: ghost.y, opacity: 0.7 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0"
        >
            <MousePointer2
                className="w-4 h-4 fill-current transform -rotate-12"
                style={{ color: ghost.color }}
            />
            <div
                className="ml-4 -mt-2 px-2 py-0.5 rounded-full text-[10px] text-white font-medium whitespace-nowrap shadow-sm"
                style={{ backgroundColor: ghost.color }}
            >
                {ghost.label}
            </div>
        </motion.div>
    );
}
