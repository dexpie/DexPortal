"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Play, Pause, RefreshCw, X, Coffee, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type TimerMode = "focus" | "break";

export function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<TimerMode>("focus");
    const [isVisible, setIsVisible] = useState(false);

    // Listen for custom event to open timer
    useEffect(() => {
        const handleOpen = () => setIsVisible(true);
        window.addEventListener("open-pomodoro", handleOpen);
        return () => window.removeEventListener("open-pomodoro", handleOpen);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play notification sound here
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-64 bg-black/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md"
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Allow small movement or refine
        >
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Timer size={14} className="text-cyan-400" />
                    <span>Focus Timer</span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-neutral-500 hover:text-white transition-colors"
                >
                    <X size={14} />
                </button>
            </div>

            <div className="p-4">
                <div className="flex justify-center gap-2 mb-6 bg-white/5 p-1 rounded-lg">
                    <button
                        onClick={() => switchMode("focus")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition-all",
                            mode === "focus" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"
                        )}
                    >
                        <Brain size={12} /> Focus
                    </button>
                    <button
                        onClick={() => switchMode("break")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition-all",
                            mode === "break" ? "bg-green-500/20 text-green-400" : "text-neutral-500 hover:text-white"
                        )}
                    >
                        <Coffee size={12} /> Break
                    </button>
                </div>

                <div className="text-center mb-6">
                    <div className="text-5xl font-mono font-bold text-white tracking-wider">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className={cn(
                            "w-12 h-12 flex items-center justify-center rounded-full transition-all",
                            isActive
                                ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                : "bg-cyan-500 text-black hover:bg-cyan-400"
                        )}
                    >
                        {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-white/5">
                <motion.div
                    className={cn("h-full", mode === "focus" ? "bg-cyan-500" : "bg-green-500")}
                    initial={{ width: "100%" }}
                    animate={{
                        width: `${(timeLeft / (mode === "focus" ? 25 * 60 : 5 * 60)) * 100}%`
                    }}
                    transition={{ ease: "linear", duration: 1 }}
                />
            </div>
        </motion.div>
    );
}
