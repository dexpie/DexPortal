"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyPress {
    id: string;
    key: string;
}

export function KeyboardVisualizer() {
    const [keys, setKeys] = useState<KeyPress[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    // Only show if engaged via specific command or always on for demo?
    // Let's make it respond to a specific key combo "Shift+K" to toggle visibility
    useEffect(() => {
        const toggleVisibility = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === "k") {
                setIsVisible(prev => !prev);
            }
        };
        window.addEventListener("keydown", toggleVisibility);
        return () => window.removeEventListener("keydown", toggleVisibility);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const handleDown = (e: KeyboardEvent) => {
            // Filter out repetitive keys if held down?
            const id = `${Date.now()}-${Math.random()}`;
            const displayKey = getDisplayKey(e);

            setKeys(prev => [...prev.slice(-4), { id, key: displayKey }]);

            // Auto remove after delay
            setTimeout(() => {
                setKeys(prev => prev.filter(k => k.id !== id));
            }, 2000);
        };

        window.addEventListener("keydown", handleDown);
        return () => window.removeEventListener("keydown", handleDown);
    }, [isVisible]);

    const getDisplayKey = (e: KeyboardEvent) => {
        if (e.key === " ") return "Space";
        if (e.key === "Control") return "Ctrl";
        if (e.key === "Shift") return "Shift";
        if (e.key === "Alt") return "Alt";
        if (e.key === "Meta") return "Cmd";
        if (e.key === "Escape") return "Esc";
        if (e.key === "Enter") return "↵";
        if (e.key === "Backspace") return "⌫";
        return e.key.toUpperCase();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {keys.map((k) => (
                    <motion.div
                        key={k.id}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.5 }}
                        className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-mono font-bold text-lg shadow-xl min-w-[3rem] text-center"
                    >
                        {k.key}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
