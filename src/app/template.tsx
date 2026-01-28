"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Initial load animation
    useEffect(() => {
        const timer = setTimeout(() => setIsTransitioning(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Page Content */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
                {children}
            </motion.div>

            {/* Cyber Shutter Blades */}
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[100] bg-black pointer-events-none origin-top"
            />
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="fixed inset-0 z-[100] bg-cyan-950/20 pointer-events-none origin-bottom"
            />

            {/* Grid Line Overlay Scan */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[101] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10"
            />
        </>
    );
}
