"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, Sun, Moon, Cloud, CloudRain } from "lucide-react";

export function LiveClock() {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const isDay = hours >= 6 && hours < 18;

    const formatNumber = (n: number) => n.toString().padStart(2, "0");

    // Get greeting based on time
    const getGreeting = () => {
        if (hours < 6) return "Good Night 🌙";
        if (hours < 12) return "Good Morning ☀️";
        if (hours < 18) return "Good Afternoon 🌤️";
        return "Good Evening 🌙";
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
        >
            {/* Icon */}
            <div className={`p-2 rounded-lg ${isDay ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"}`}>
                {isDay ? <Sun size={20} /> : <Moon size={20} />}
            </div>

            {/* Time Display */}
            <div className="font-mono">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{formatNumber(hours)}</span>
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-2xl font-bold text-cyan-400"
                    >
                        :
                    </motion.span>
                    <span className="text-2xl font-bold text-white">{formatNumber(minutes)}</span>
                    <span className="text-sm text-neutral-500 ml-1">{formatNumber(seconds)}</span>
                </div>
                <p className="text-xs text-neutral-500">{getGreeting()}</p>
            </div>
        </motion.div>
    );
}
