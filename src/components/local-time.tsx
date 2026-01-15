"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export function LocalTime() {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }));
            setDate(now.toLocaleDateString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono"
        >
            <div className="flex items-center gap-1.5">
                <MapPin size={10} className="text-cyan-400" />
                <span className="text-neutral-500">ID</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-green-400" />
                <span className="text-neutral-300">{date}</span>
                <motion.span
                    key={time}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-cyan-400 tabular-nums"
                >
                    {time}
                </motion.span>
                <span className="text-neutral-600">WIB</span>
            </div>
        </motion.div>
    );
}
