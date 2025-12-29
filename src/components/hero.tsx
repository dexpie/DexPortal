"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { CreatorCard } from "./creator-card";

export function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            x.set(e.clientX / innerWidth - 0.5);
            y.set(e.clientY / innerHeight - 0.5);
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    // Transform background movement opposite to mouse
    const moveX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
    const moveY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

    return (
        <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 overflow-hidden">
            {/* Background Elements */}
            <motion.div
                style={{ x: moveX, y: moveY }}
                className="absolute inset-0 bg-[radial-gradient(circle_800px_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background pointer-events-none"
            />
            <motion.div
                style={{ x: moveX, y: moveY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl text-left space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Welcome to the Nexus
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500 leading-tight"
                >
                    Your Portal to <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">The Dex Ecosystem</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-neutral-400 max-w-lg"
                >
                    Seamlessly navigate through all my projects. From Manga reading to PDF management, experience a unified digital workspace.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex gap-4 items-center text-sm text-neutral-500"
                >
                    <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                    <span>to search projects instantly</span>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 hidden md:block"
            >
                <CreatorCard />
            </motion.div>
        </section>
    );
}
