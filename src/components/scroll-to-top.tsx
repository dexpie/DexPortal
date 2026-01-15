"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Rocket } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        setIsAnimating(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setTimeout(() => setIsAnimating(false), 1000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 z-30 hidden md:flex w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isAnimating ? (
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: -20, opacity: 0 }}
                            transition={{ repeat: 2, duration: 0.3 }}
                        >
                            <Rocket size={20} className="text-white transform -rotate-45" />
                        </motion.div>
                    ) : (
                        <ArrowUp size={20} className="text-white group-hover:-translate-y-0.5 transition-transform" />
                    )}

                    {/* Pulse Ring */}
                    <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
