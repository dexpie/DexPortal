"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function NeonCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the trailing ring
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", updateMousePosition);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.style.cursor = 'auto';
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Main Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] -translate-x-1/2 -translate-y-1/2"
            />

            {/* Trailing Ring */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
                className="absolute top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
            />
        </div>
    );
}
