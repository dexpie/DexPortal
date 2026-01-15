"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface RippleEffect {
    id: number;
    x: number;
    y: number;
}

export function NeonCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [ripples, setRipples] = useState<RippleEffect[]>([]);
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
    const rippleIdRef = useRef(0);
    const trailIdRef = useRef(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        let lastTrailTime = 0;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);

            // Add trail particles (throttled)
            const now = Date.now();
            if (now - lastTrailTime > 30) {
                lastTrailTime = now;
                trailIdRef.current++;
                setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailIdRef.current }]);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleMouseDown = (e: MouseEvent) => {
            setIsClicking(true);
            rippleIdRef.current++;
            setRipples(prev => [...prev, { id: rippleIdRef.current, x: e.clientX, y: e.clientY }]);
            setTimeout(() => {
                setRipples(prev => prev.slice(1));
            }, 600);
        };

        const handleMouseUp = () => setIsClicking(false);

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, input, textarea, [role="button"], [onclick]');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mousemove", handleHover);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.style.cursor = 'none';

        // Clean up trail periodically
        const cleanup = setInterval(() => {
            setTrail(prev => prev.slice(-5));
        }, 100);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mousemove", handleHover);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.style.cursor = 'auto';
            clearInterval(cleanup);
        };
    }, [mouseX, mouseY]);

    // Clear old trail particles
    useEffect(() => {
        const timer = setTimeout(() => {
            if (trail.length > 0) {
                setTrail(prev => prev.slice(1));
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [trail]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
            {/* Trail Particles */}
            <AnimatePresence>
                {trail.map((particle, i) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0.6, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 0.1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ left: particle.x, top: particle.y }}
                        className="absolute w-1 h-1 bg-cyan-400/50 rounded-full -translate-x-1/2 -translate-y-1/2"
                    />
                ))}
            </AnimatePresence>

            {/* Click Ripples */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 0.8, scale: 0 }}
                        animate={{ opacity: 0, scale: 3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ left: ripple.x, top: ripple.y }}
                        className="absolute w-8 h-8 border-2 border-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                    />
                ))}
            </AnimatePresence>

            {/* Main Dot */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgb(34, 211, 238)" : "rgb(34, 211, 238)",
                }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.9)] -translate-x-1/2 -translate-y-1/2"
            />

            {/* Trailing Ring */}
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.5)",
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
            />

            {/* Hover Glow */}
            {isHovering && (
                <motion.div
                    style={{ x: smoothX, y: smoothY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-0 left-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"
                />
            )}
        </div>
    );
}
