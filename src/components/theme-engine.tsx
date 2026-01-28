"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

const THEMES = [
    { name: "Cyan Protocol", color: "#06b6d4" },
    { name: "Neon Genesis", color: "#a855f7" },
    { name: "Matrix Core", color: "#22c55e" },
    { name: "Crimson Guard", color: "#ef4444" },
    { name: "Golden Age", color: "#eab308" },
    { name: "Vaporwave", color: "#ec4899" }, // Special Logic needed? Just color for now.
];

export function ThemeEngine() {
    const [active, setActive] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
    const { zenMode } = useSysConfig();

    // Toggle with CSS Variables
    const applyTheme = (theme: typeof THEMES[0]) => {
        setCurrentTheme(theme);
        const root = document.documentElement;

        // Convert hex to rgb for tailwind opacity support if needed, 
        // but for now relying on direct substitution of primary colors.
        // NOTE: Tailwind 4 might be strict, but we are hacking the :root variables defined in globals.css
        root.style.setProperty("--primary", theme.color);

        // Optional: Change selection color
        const style = document.createElement("style");
        style.innerText = `::selection { background-color: ${theme.color} !important; color: black; }`;
        document.head.appendChild(style);
    };

    if (zenMode) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-full right-0 mb-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 w-48 shadow-2xl"
                    >
                        <h3 className="text-xs font-mono text-neutral-500 mb-3 uppercase tracking-widest">
                            System Theme
                        </h3>
                        <div className="space-y-2">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.name}
                                    onClick={() => applyTheme(theme)}
                                    className="w-full flex items-center justify-between text-left text-sm p-1.5 rounded hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
                                            style={{ backgroundColor: theme.color, color: theme.color }}
                                        />
                                        <span className={currentTheme.name === theme.name ? "text-white" : "text-neutral-400 group-hover:text-white"}>
                                            {theme.name}
                                        </span>
                                    </div>
                                    {currentTheme.name === theme.name && <Check size={12} className="text-white" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setActive(!active)}
                className={`p-3 rounded-full transition-all duration-300 border ${active
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        : "bg-black/50 text-neutral-400 border-white/10 hover:text-white hover:border-white/30"
                    }`}
            >
                <Palette size={20} />
            </button>
        </div>
    );
}
