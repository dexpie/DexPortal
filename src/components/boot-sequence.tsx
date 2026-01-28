"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Cpu, Wifi, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const bootMessages = [
    { text: "BIOS_CHECK_INTEGRITY...", icon: Shield, color: "text-blue-400" },
    { text: "LOADING_KERNEL_MODULES", icon: Cpu, color: "text-cyan-400" },
    { text: "ESTABLISHING_SECURE_UPLINK", icon: Wifi, color: "text-emerald-400" },
    { text: "DECRYPTING_USER_PROFILE", icon: Lock, color: "text-purple-400" },
    { text: "MOUNTING_VIRTUAL_DOM...", icon: ChevronRight, color: "text-neutral-400" },
    { text: "SYSTEM_READY", icon: Shield, color: "text-green-500 font-bold" },
];

export function BootSequence() {
    const [isBooting, setIsBooting] = useState(true);
    const [currentLine, setCurrentLine] = useState(0);
    const [progress, setProgress] = useState(0);
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
        // Check if already booted this session
        if (sessionStorage.getItem("dexportal_booted")) {
            setIsBooting(false);
            return;
        }

        // 1. Progress Bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);

        // 2. Message Lines
        const lineInterval = setInterval(() => {
            setCurrentLine((prev) => {
                if (prev < bootMessages.length - 1) return prev + 1;
                clearInterval(lineInterval);
                return prev;
            });
        }, 400);

        // 3. Access Granted Sequence
        setTimeout(() => {
            setAccessGranted(true);
            // Play success sound here if sound system allowed
        }, 2500);

        // 4. Finish
        const finishTimeout = setTimeout(() => {
            sessionStorage.setItem("dexportal_booted", "true");
            setIsBooting(false);
        }, 3500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(lineInterval);
            clearTimeout(finishTimeout);
        };
    }, []);

    const skipBoot = () => {
        sessionStorage.setItem("dexportal_booted", "true");
        setIsBooting(false);
    };

    return (
        <AnimatePresence>
            {isBooting && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    onClick={skipBoot}
                >
                    {/* Background Grid Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

                    <div className="w-full max-w-md relative z-10 p-6">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-between items-end mb-8 border-b border-cyan-900/50 pb-2"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs text-cyan-700">SYSTEM_BOOT_SEQUENCE</span>
                                <span className="text-xl font-bold text-cyan-500 tracking-widest">DEXPORTAL_OS</span>
                            </div>
                            <span className="text-xs text-cyan-700">v2.0.4</span>
                        </motion.div>

                        {/* Terminal Output */}
                        <div className="space-y-3 mb-8 min-h-[200px]">
                            {bootMessages.slice(0, currentLine + 1).map((msg, idx) => {
                                const Icon = msg.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3"
                                    >
                                        <Icon size={14} className={cn("shrink-0", msg.color)} />
                                        <span className={cn("text-sm tracking-wide", msg.color)}>
                                            {msg.text}
                                            {idx < bootMessages.length - 1 && <span className="animate-pulse">_</span>}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-2 flex justify-between text-xs text-cyan-600">
                            <span>LOADING_ASSETS</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-cyan-950 rounded-full overflow-hidden mb-8">
                            <motion.div
                                className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Access Granted Badge */}
                        <AnimatePresence>
                            {accessGranted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-x-0 bottom-20 flex justify-center"
                                >
                                    <div className="border border-green-500/50 bg-green-500/10 px-6 py-2 rounded text-green-400 font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm">
                                        ACCESS GRANTED
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Skip Hint */}
                        <div className="mt-12 text-center">
                            <span className="text-[10px] text-neutral-600 animate-pulse">Click anywhere to skip initialization</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
