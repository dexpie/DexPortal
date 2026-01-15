"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setProgress(percentage);
            setIsVisible(scrollTop > 200);
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-20 z-30 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 border border-white/10 backdrop-blur-md"
        >
            {/* Circular Progress */}
            <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-white/10"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 14}`}
                        strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                        className="text-cyan-400 transition-all duration-150"
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-cyan-400">
                    {Math.round(progress)}%
                </span>
            </div>

            <span className="text-xs text-neutral-400">Read</span>
        </motion.div>
    );
}
