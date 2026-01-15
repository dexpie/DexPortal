"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Laptop, Palette } from "lucide-react";

type Theme = "dark" | "light" | "system" | "cyber";

const themes = [
    { id: "dark", name: "Dark", icon: Moon, color: "from-neutral-700 to-neutral-900" },
    { id: "light", name: "Light", icon: Sun, color: "from-yellow-100 to-white" },
    { id: "system", name: "System", icon: Laptop, color: "from-blue-500 to-purple-500" },
    { id: "cyber", name: "Cyber", icon: Palette, color: "from-cyan-500 to-purple-500" },
] as const;

export function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState<Theme>("dark");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("dexportal_theme") as Theme;
        if (saved) {
            setCurrentTheme(saved);
            applyTheme(saved);
        }
    }, []);

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;
        root.classList.remove("dark", "light", "cyber");

        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(prefersDark ? "dark" : "light");
        } else {
            root.classList.add(theme);
        }
    };

    const selectTheme = (theme: Theme) => {
        setCurrentTheme(theme);
        localStorage.setItem("dexportal_theme", theme);
        applyTheme(theme);
        setIsOpen(false);
    };

    const CurrentIcon = themes.find(t => t.id === currentTheme)?.icon || Moon;

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <CurrentIcon size={18} className="text-cyan-400" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute right-0 top-full mt-2 z-50 bg-black/95 border border-white/10 rounded-xl p-2 min-w-[160px] shadow-xl"
                        >
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => selectTheme(theme.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${currentTheme === theme.id
                                            ? "text-cyan-400 bg-cyan-500/10"
                                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${theme.color}`} />
                                    <theme.icon size={14} />
                                    <span>{theme.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
