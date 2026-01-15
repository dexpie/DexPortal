"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Code, Coffee, Star, Rocket, Heart, PartyPopper } from "lucide-react";
import { toast } from "sonner";

const tips = [
    { icon: Sparkles, text: "Press ? to see keyboard shortcuts", color: "cyan" },
    { icon: Zap, text: "Try the Konami code for a surprise!", color: "yellow" },
    { icon: Code, text: "Type 'dexpie' anywhere for an easter egg", color: "purple" },
    { icon: Coffee, text: "Enjoying the site? Consider supporting!", color: "orange" },
    { icon: Star, text: "Star the repo on GitHub!", color: "yellow" },
    { icon: Rocket, text: "Press ⌘K to open command menu", color: "cyan" },
    { icon: Heart, text: "Sign the guestbook to leave your mark", color: "pink" },
    { icon: PartyPopper, text: "Check out the Projects section!", color: "green" },
];

export function RandomTip() {
    const [currentTip, setCurrentTip] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a delay
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Rotate tips
        const rotateTimer = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 10000);

        // Auto-hide after some time
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 60000);

        return () => {
            clearTimeout(showTimer);
            clearInterval(rotateTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const tip = tips[currentTip];
    const Icon = tip.icon;

    const colorClasses: Record<string, string> = {
        cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
        yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
        purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
        orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400",
        pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
        green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 50, x: "-50%" }}
                    className="fixed bottom-24 left-1/2 z-30 hidden lg:block"
                >
                    <motion.div
                        key={currentTip}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${colorClasses[tip.color]} border backdrop-blur-md`}
                    >
                        <Icon size={16} />
                        <span className="text-sm font-medium">{tip.text}</span>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
