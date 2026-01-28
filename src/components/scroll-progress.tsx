"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Rainbow hue shift based on scroll
    const hue = useTransform(scrollYProgress, [0, 1], [180, 320]);

    return (
        <>
            {/* Main Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
                style={{
                    scaleX,
                    background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)",
                }}
            />

            {/* Glow Effect */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 origin-left z-[99] blur-sm opacity-70"
                style={{
                    scaleX,
                    background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)",
                }}
            />

            {/* Rocket Ship */}
            <motion.div
                className="fixed top-[-6px] left-0 z-[101] text-xl filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]),
                    translateX: "-50%",
                    rotate: 90
                }}
            >
                🚀
            </motion.div>

            {/* Percentage Indicator */}
            <motion.div
                className="fixed top-4 right-4 z-[100] text-[10px] font-mono font-bold text-cyan-500 bg-black/50 backdrop-blur px-2 py-1 rounded border border-cyan-500/30 opacity-0 hover:opacity-100 transition-opacity"
                style={{ opacity: useTransform(scrollYProgress, [0, 0.02], [0, 1]) }}
            >
                <motion.span>
                    {Math.round(scrollYProgress.get() * 100)}%
                </motion.span>
            </motion.div>
        </>
    );
}
