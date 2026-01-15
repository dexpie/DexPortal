"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUp, Moon, Sun, Volume2, VolumeX, Share2, Home } from "lucide-react";
import { useSounds } from "./sound-system";

export function FabMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { enabled: soundEnabled, toggle: toggleSound } = useSounds();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
    };

    const goHome = () => {
        window.location.href = "/";
        setIsOpen(false);
    };

    const shareUrl = () => {
        if (navigator.share) {
            navigator.share({
                title: "DexPortal",
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
        setIsOpen(false);
    };

    const menuItems = [
        { icon: ArrowUp, label: "Scroll to Top", onClick: scrollToTop, color: "cyan" },
        { icon: soundEnabled ? Volume2 : VolumeX, label: soundEnabled ? "Sound On" : "Sound Off", onClick: toggleSound, color: "purple" },
        { icon: Share2, label: "Share", onClick: shareUrl, color: "pink" },
        { icon: Home, label: "Home", onClick: goHome, color: "green" },
    ];

    return (
        <div className="fixed bottom-24 right-6 z-40 md:hidden">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-3"
                    >
                        {menuItems.map((item, i) => (
                            <motion.button
                                key={item.label}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={item.onClick}
                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/90 border border-white/10 backdrop-blur-md shadow-lg group"
                            >
                                <item.icon size={16} className={`text-${item.color}-400`} />
                                <span className="text-xs text-white whitespace-nowrap">{item.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                <Plus size={24} className="text-white" />
            </motion.button>
        </div>
    );
}
