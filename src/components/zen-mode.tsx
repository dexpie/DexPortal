"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export function ZenMode() {
    const [isZen, setIsZen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isZen) {
            root.classList.add("zen-mode");
            document.body.style.overflow = "hidden"; // Optional for strict focus
        } else {
            root.classList.remove("zen-mode");
            document.body.style.overflow = "";
        }

        // Cleanup
        return () => {
            root.classList.remove("zen-mode");
            document.body.style.overflow = "";
        };
    }, [isZen]);

    // Keyboard shortcut: Shift+Z to toggle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === "z") {
                setIsZen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Custom event listener for external triggers (like CommandMenu)
    useEffect(() => {

        // Note: attaching to window for custom event, make sure the type matches
        // But for simplicity with CommandMenu, let's just use the keyboard event dispatch there
        // which we already did in command-menu.tsx.
        // Or if we want a custom event "toggle-zen-mode"
        const handleGlobalEvent = () => setIsZen(prev => !prev);
        window.addEventListener("toggle-zen-mode", handleGlobalEvent);
        return () => window.removeEventListener("toggle-zen-mode", handleGlobalEvent);
    }, []);

    return (
        <AnimatePresence>
            {isZen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black pointer-events-none mix-blend-multiply opacity-90"
                />
            )}

            <div className="fixed bottom-6 left-6 z-[101]">
                {/* Visual indicator when Zen Mode is ON */}
                {isZen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setIsZen(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors pointer-events-auto"
                    >
                        <Eye size={16} />
                        <span className="text-sm font-medium">Exit Zen Mode</span>
                        <kbd className="ml-2 text-[10px] bg-white/10 px-1 rounded">Shift+Z</kbd>
                    </motion.button>
                )}
            </div>
        </AnimatePresence>
    );
}
