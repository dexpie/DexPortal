"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, Type, Sun, MessageSquare, Zap } from "lucide-react";

export function AccessibilityMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.style.fontSize = `${fontSize}%`;

        if (reducedMotion) {
            document.body.classList.add("reduced-motion");
        } else {
            document.body.classList.remove("reduced-motion");
        }

        if (highContrast) {
            document.body.classList.add("high-contrast");
        } else {
            document.body.classList.remove("high-contrast");
        }
    }, [fontSize, reducedMotion, highContrast]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
                title="Accessibility Settings"
            >
                <Accessibility size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 z-50 w-64 bg-black/95 border border-white/10 rounded-xl p-4 shadow-xl backdrop-blur-md"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Accessibility size={16} className="text-cyan-400" />
                                Accessibility
                            </h3>

                            <div className="space-y-4">
                                {/* Font Size */}
                                <div>
                                    <div className="flex justify-between text-xs text-neutral-400 mb-2">
                                        <span className="flex items-center gap-1"><Type size={12} /> Font Size</span>
                                        <span>{fontSize}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="90"
                                        max="120"
                                        step="5"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Number(e.target.value))}
                                        className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                {/* Toggles */}
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setReducedMotion(!reducedMotion)}
                                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-xs text-neutral-300 flex items-center gap-2">
                                            <Zap size={14} /> Reduced Motion
                                        </span>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${reducedMotion ? "bg-cyan-500" : "bg-white/10"}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${reducedMotion ? "left-4.5" : "left-0.5"}`} />
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setHighContrast(!highContrast)}
                                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-xs text-neutral-300 flex items-center gap-2">
                                            <Sun size={14} /> High Contrast
                                        </span>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${highContrast ? "bg-cyan-500" : "bg-white/10"}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${highContrast ? "left-4.5" : "left-0.5"}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
