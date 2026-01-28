"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function CyberCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.classList.contains('cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Hide default cursor on body (usually done in CSS, but checking here)
    useEffect(() => {
        document.documentElement.classList.add("cyber-cursor-active");
        return () => {
            document.documentElement.classList.remove("cyber-cursor-active");
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block">
            {/* Main Cursor (Exact Position) */}
            <motion.div
                className={cn(
                    "absolute w-4 h-4 rounded-full border border-cyan-500 bg-cyan-500/20 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out",
                    isHovering ? "w-12 h-12 bg-cyan-500/5 border-cyan-400" : "",
                    isClicking ? "scale-75 bg-cyan-500/40" : ""
                )}
                style={{ x: mouseX, y: mouseY }}
            >
                <div className="absolute inset-0 rounded-full animate-spin-slow border-t border-cyan-200/50 opacity-50" />
            </motion.div>

            {/* Trailing Cursor (Spring) */}
            <motion.div
                className="absolute w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2"
                style={{ x: cursorX, y: cursorY }}
            />
        </div>
    );
}
