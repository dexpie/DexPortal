"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = ["✨", "🚀", "💻", "🔥", "🎉", "👾", "🌈", "⚡"];

interface Sparkle {
    id: number;
    x: number;
    y: number;
    emoji: string;
}

export const EmojiBurst = () => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    const addSparkles = useCallback((e: MouseEvent) => {
        // Only burst on interactive elements or if specifically requested
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a, button, [role="button"]');

        if (isInteractive) {
            const count = 5;
            const newSparkles = Array.from({ length: count }).map((_, i) => ({
                id: Date.now() + i,
                x: e.clientX,
                y: e.clientY,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
            }));

            setSparkles(prev => [...prev, ...newSparkles]);

            setTimeout(() => {
                setSparkles(prev => prev.slice(count));
            }, 1000);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("click", addSparkles);
        return () => window.removeEventListener("click", addSparkles);
    }, [addSparkles]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
            <AnimatePresence>
                {sparkles.map((sparkle, i) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ scale: 0, x: sparkle.x, y: sparkle.y }}
                        animate={{
                            scale: [0, 1.5, 0],
                            x: sparkle.x + (Math.random() - 0.5) * 100,
                            y: sparkle.y + (Math.random() - 0.5) * 100,
                            rotate: Math.random() * 360
                        }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute text-xl"
                        style={{ left: 0, top: 0 }}
                    >
                        {sparkle.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
