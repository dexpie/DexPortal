"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

export function ZenMode() {
    const { zenMode, toggleZenMode } = useSysConfig();

    useEffect(() => {
        const root = document.documentElement;
        if (zenMode) {
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
    }, [zenMode]);

    // Keyboard shortcut: Shift+Z to toggle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === "z") {
                toggleZenMode();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleZenMode]);

    // Custom event listener for external triggers (like CommandMenu)
    useEffect(() => {
        const handleGlobalEvent = () => toggleZenMode();
        window.addEventListener("toggle-zen-mode", handleGlobalEvent);
        return () => window.removeEventListener("toggle-zen-mode", handleGlobalEvent);
    }, [toggleZenMode]);

    return (
        <AnimatePresence>
            {zenMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black pointer-events-none mix-blend-multiply opacity-90"
                />
            )}

            <div className="fixed bottom-6 left-6 z-[101]">
                {/* Visual indicator when Zen Mode is ON */}
                {zenMode && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={toggleZenMode}
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
