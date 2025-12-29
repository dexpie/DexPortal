"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const bootMessages = [
    "DEXPORTAL BIOS v10.4",
    "Copyright (c) 2024 Dex Ecosystem",
    "",
    "Initializing system components...",
    "Loading neural interface... OK",
    "Mounting project database... OK",
    "Establishing secure connection... OK",
    "Calibrating neon matrix... OK",
    "",
    "All systems operational.",
    "Welcome, User.",
];

export function BootSequence() {
    const [isBooting, setIsBooting] = useState(true);
    const [currentLine, setCurrentLine] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if already booted this session
        if (sessionStorage.getItem("dexportal_booted")) {
            setIsBooting(false);
            return;
        }

        // Animate boot messages
        const lineInterval = setInterval(() => {
            setCurrentLine((prev) => {
                if (prev < bootMessages.length - 1) {
                    return prev + 1;
                }
                clearInterval(lineInterval);
                return prev;
            });
        }, 200);

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 2;
                }
                clearInterval(progressInterval);
                return 100;
            });
        }, 50);

        // End boot sequence
        const timeout = setTimeout(() => {
            sessionStorage.setItem("dexportal_booted", "true");
            setIsBooting(false);
        }, 4000);

        // Skip on any key press
        const handleKeyDown = () => {
            sessionStorage.setItem("dexportal_booted", "true");
            setIsBooting(false);
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
            clearTimeout(timeout);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <AnimatePresence>
            {isBooting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 font-mono"
                >
                    {/* Terminal Output */}
                    <div className="w-full max-w-2xl space-y-1 text-left mb-8">
                        {bootMessages.slice(0, currentLine + 1).map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`text-sm ${index === 0
                                    ? "text-cyan-400 text-lg font-bold"
                                    : index === 1
                                        ? "text-neutral-500"
                                        : line.includes("OK")
                                            ? "text-green-400"
                                            : line.includes("Welcome")
                                                ? "text-cyan-400 font-bold"
                                                : "text-neutral-300"
                                    }`}
                            >
                                {line || "\u00A0"}
                            </motion.div>
                        ))}

                        {/* Blinking Cursor */}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-cyan-500"
                        />
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-2xl">
                        <div className="flex justify-between text-xs text-neutral-500 mb-2">
                            <span>LOADING DEXPORTAL</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Skip Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 text-xs text-neutral-600"
                    >
                        Press any key to skip...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
