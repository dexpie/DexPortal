"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, TrendingUp, Zap, Calendar } from "lucide-react";

export function StreakCounter() {
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [isNewDay, setIsNewDay] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("dexportal_streak") || "{}");
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (data.lastVisit === today) {
            // Already visited today
            setStreak(data.currentStreak || 0);
            setBestStreak(data.bestStreak || 0);
        } else if (data.lastVisit === yesterday) {
            // Streak continues!
            const newStreak = (data.currentStreak || 0) + 1;
            const newBest = Math.max(newStreak, data.bestStreak || 0);
            setStreak(newStreak);
            setBestStreak(newBest);
            setIsNewDay(true);

            localStorage.setItem("dexportal_streak", JSON.stringify({
                currentStreak: newStreak,
                bestStreak: newBest,
                lastVisit: today,
            }));
        } else {
            // Streak broken, start fresh
            setStreak(1);
            setBestStreak(Math.max(1, data.bestStreak || 0));
            setIsNewDay(data.lastVisit ? true : false);

            localStorage.setItem("dexportal_streak", JSON.stringify({
                currentStreak: 1,
                bestStreak: Math.max(1, data.bestStreak || 0),
                lastVisit: today,
            }));
        }
    }, []);

    return (
        <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            {/* Streak Icon */}
            <motion.div
                className="relative"
                animate={isNewDay ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
            >
                <Flame size={28} className="text-orange-400" />
                {streak >= 7 && (
                    <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Zap size={12} className="text-yellow-400" />
                    </motion.div>
                )}
            </motion.div>

            {/* Stats */}
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-400">{streak}</span>
                    <span className="text-xs text-neutral-500">day streak</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <TrendingUp size={10} />
                    <span>Best: {bestStreak} days</span>
                </div>
            </div>

            {/* New Day Celebration */}
            <AnimatePresence>
                {isNewDay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400"
                    >
                        +1 🔥
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
