"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Cpu, Database, Command, RefreshCw } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

interface AdminOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminOverlay({ isOpen, onClose }: AdminOverlayProps) {
    const [fps, setFps] = useState(0);
    const [memory, setMemory] = useState<any>(null);
    const [supabaseStatus, setSupabaseStatus] = useState("Checking...");

    useEffect(() => {
        if (!isOpen) return;

        // FPS Counter
        let lastTime = performance.now();
        let frames = 0;
        let animationFrameId: number;

        const loop = () => {
            const now = performance.now();
            frames++;
            if (now - lastTime >= 1000) {
                setFps(frames);
                frames = 0;
                lastTime = now;
            }
            // Memory (if available in Chrome)
            if ((performance as any).memory) {
                setMemory((performance as any).memory);
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        // Check Supabase
        setSupabaseStatus(isSupabaseConfigured() ? "Connected" : "Not Configured");

        return () => cancelAnimationFrame(animationFrameId);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md pointer-events-auto flex items-center justify-center font-mono text-cyan-400 p-8"
                >
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <div className="relative w-full max-w-4xl border border-cyan-500/30 bg-black/90 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30 bg-cyan-950/20">
                            <div className="flex items-center gap-3">
                                <Cpu className="animate-pulse" />
                                <h2 className="text-xl font-bold tracking-widest">GOD MODE // OVERSEER</h2>
                            </div>
                            <button onClick={onClose} className="hover:text-white transition-colors">
                                <X />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* System Stats */}
                            <div className="space-y-6">
                                <div className="p-4 border border-cyan-500/20 rounded bg-cyan-900/10">
                                    <h3 className="text-sm text-cyan-500 mb-4 flex items-center gap-2">
                                        <Activity size={16} /> SYSTEM VITALS
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-3xl font-bold text-white mb-1">{fps}</div>
                                            <div className="text-xs text-cyan-600">FPS</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-white mb-1">
                                                {memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : "N/A"}
                                            </div>
                                            <div className="text-xs text-cyan-600">MB MEMORY</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border border-cyan-500/20 rounded bg-cyan-900/10">
                                    <h3 className="text-sm text-cyan-500 mb-4 flex items-center gap-2">
                                        <Database size={16} /> DATABASE STATUS
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${supabaseStatus === "Connected" ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500"}`} />
                                        <span className="text-white">{supabaseStatus}</span>
                                    </div>
                                    <p className="text-xs text-cyan-600 mt-2">
                                        {supabaseStatus === "Connected" ? "Supabase client is active." : "env vars missing."}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-6">
                                <div className="p-4 border border-cyan-500/20 rounded bg-cyan-900/10 h-full">
                                    <h3 className="text-sm text-cyan-500 mb-4 flex items-center gap-2">
                                        <Command size={16} /> QUICK ACTIONS
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => window.location.href = '/admin'}
                                            className="flex items-center justify-between p-3 border border-cyan-500/20 rounded hover:bg-cyan-500/10 transition-colors group"
                                        >
                                            <span>Enter Admin Panel</span>
                                            <span className="opacity-0 group-hover:opacity-100">→</span>
                                        </button>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="flex items-center justify-between p-3 border border-cyan-500/20 rounded hover:bg-cyan-500/10 transition-colors group"
                                        >
                                            <span>Force Reload (HMR)</span>
                                            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-2 border-t border-cyan-500/30 bg-cyan-950/20 text-[10px] text-cyan-700 font-mono text-right">
                            SESSION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
