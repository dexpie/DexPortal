"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";

const shortcuts = [
    { keys: ["⌘", "K"], description: "Open Command Menu" },
    { keys: ["?"], description: "Show this panel" },
    { keys: ["G", "H"], description: "Go to Home" },
    { keys: ["G", "P"], description: "Go to Projects" },
    { keys: ["G", "B"], description: "Go to Blog" },
    { keys: ["G", "G"], description: "Go to Guestbook" },
    { keys: ["Esc"], description: "Close dialogs" },
    { keys: ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"], description: "Konami code (Easter egg)" },
];

export function KeyboardShortcuts() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === "?") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-cyan-950/20">
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Keyboard size={16} />
                                    <span className="text-sm font-mono font-bold">KEYBOARD SHORTCUTS</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded hover:bg-white/10 transition-colors"
                                >
                                    <X size={16} className="text-neutral-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-3">
                                    {shortcuts.map((shortcut, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                                        >
                                            <span className="text-sm text-neutral-300">{shortcut.description}</span>
                                            <div className="flex items-center gap-1">
                                                {shortcut.keys.map((key, j) => (
                                                    <kbd
                                                        key={j}
                                                        className="px-2 py-1 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-cyan-400 min-w-[24px] text-center"
                                                    >
                                                        {key}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-white/10 bg-white/5">
                                <p className="text-[10px] text-neutral-500 text-center">
                                    Press <kbd className="px-1 bg-white/10 rounded">?</kbd> anytime to show this panel
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
