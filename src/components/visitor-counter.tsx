"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Users } from "lucide-react";

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                // Check if this is a new session
                const hasVisited = sessionStorage.getItem("dexportal_visited");

                if (!hasVisited) {
                    setIsNew(true);
                    sessionStorage.setItem("dexportal_visited", "true");
                }

                const res = await fetch("/api/visitors", {
                    method: hasVisited ? "GET" : "POST",
                });
                const data = await res.json();
                setCount(data.count);
            } catch (error) {
                // Fallback to local storage
                const localCount = parseInt(localStorage.getItem("visitor_count") || "0") + 1;
                localStorage.setItem("visitor_count", localCount.toString());
                setCount(localCount);
            }
        };

        trackVisitor();
    }, []);

    if (count === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono"
        >
            <Users size={12} className="text-cyan-400" />
            <span className="text-neutral-400">Visitors:</span>
            <motion.span
                key={count}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-400 font-bold"
            >
                {count.toLocaleString()}
            </motion.span>
            {isNew && (
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px]"
                >
                    NEW
                </motion.span>
            )}
        </motion.div>
    );
}
