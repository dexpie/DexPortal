"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, CheckCircle2, Cpu } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

const TECH_STACK = [
    { name: "Next.js 16", status: "Detected", color: "text-white" },
    { name: "React 19", status: "Detected", color: "text-blue-400" },
    { name: "Tailwind CSS", status: "Detected", color: "text-cyan-400" },
    { name: "Framer Motion", status: "Detected", color: "text-purple-400" },
    { name: "Supabase", status: "Connected", color: "text-green-400" },
    { name: "TypeScript", status: "Verified", color: "text-blue-500" },
];

export function TechScanner() {
    const [active, setActive] = useState(false);
    const [scanning, setScanning] = useState(false);
    const { zenMode } = useSysConfig();

    // Toggle with Ctrl+Shift+S
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
                setActive(prev => !prev);
                setScanning(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (active && scanning) {
            const timer = setTimeout(() => setScanning(false), 2000); // 2s scan duration
            return () => clearTimeout(timer);
        }
    }, [active, scanning]);

    if (zenMode) return null;

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setActive(false)}
                >
                    <div
                        className="bg-black border border-cyan-500/30 rounded-xl p-8 max-w-md w-full relative overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Scan Line Animation */}
                        {scanning && (
                            <motion.div
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                className="absolute left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_20px_#06b6d4] z-10"
                            />
                        )}

                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Scan className={scanning ? "text-cyan-400 animate-pulse" : "text-neutral-400"} />
                                TECH_SCANNER
                            </h2>
                            <span className="font-mono text-xs text-neutral-500">v1.0.4</span>
                        </div>

                        <div className="space-y-4">
                            {TECH_STACK.map((tech, i) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: scanning ? 0.5 : 1,
                                        x: 0
                                    }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5"
                                >
                                    <span className="flex items-center gap-3 font-medium">
                                        <Cpu size={16} className={tech.color} />
                                        {tech.name}
                                    </span>
                                    {!scanning && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-1.5 text-xs text-green-400 font-mono"
                                        >
                                            <CheckCircle2 size={12} />
                                            {tech.status}
                                        </motion.span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 text-center">
                            <p className="text-xs text-neutral-500 font-mono">
                                PRESS <kbd className="bg-white/10 px-1 rounded text-white">ESC</kbd> TO CLOSE
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
