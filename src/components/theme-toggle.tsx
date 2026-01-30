"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        const isDark = newTheme === "dark";

        root.classList.toggle("light", !isDark);
        root.classList.toggle("dark", isDark);
    };

    const cycleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    };

    if (!mounted) return null;

    const icons = {
        dark: Moon,
        light: Sun,
    };

    const Icon = icons[theme];

    return (
        <motion.button
            onClick={cycleTheme}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Theme: ${theme}`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icon size={18} className="text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                </motion.div>
            </AnimatePresence>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity pointer-events-none" />
        </motion.button>
    );
}
