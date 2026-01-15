"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X, ExternalLink, ArrowRight } from "lucide-react";

interface Spotlight {
    id: string;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
    type: "tip" | "feature" | "promo";
}

const spotlights: Spotlight[] = [
    {
        id: "1",
        title: "🎮 Try the Konami Code!",
        description: "↑↑↓↓←→←→BA - Unlock a hidden surprise!",
        type: "tip",
    },
    {
        id: "2",
        title: "💬 Leave Your Mark",
        description: "Sign the guestbook and join the community!",
        link: "/guestbook",
        linkText: "Visit Guestbook",
        type: "feature",
    },
    {
        id: "3",
        title: "⌨️ Keyboard Fan?",
        description: "Press ? to see all available shortcuts",
        type: "tip",
    },
    {
        id: "4",
        title: "🤖 Chat with DexBot",
        description: "Click the chat button to ask questions about my work!",
        type: "feature",
    },
];

export function SpotlightCard() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSpotlight, setCurrentSpotlight] = useState(0);

    useEffect(() => {
        // Show after delay
        const showTimer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem("spotlight_seen");
            if (!hasSeen) {
                setIsVisible(true);
            }
        }, 10000);

        return () => clearTimeout(showTimer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("spotlight_seen", "true");
    };

    const handleNext = () => {
        if (currentSpotlight < spotlights.length - 1) {
            setCurrentSpotlight(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const spotlight = spotlights[currentSpotlight];

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-1"
                    >
                        <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-[1px]">
                            <div className="bg-black/95 rounded-2xl p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-cyan-400">
                                        <Lightbulb size={18} />
                                        <span className="text-sm font-medium">Did you know?</span>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-1 hover:bg-white/10 rounded transition-colors"
                                    >
                                        <X size={16} className="text-neutral-400" />
                                    </button>
                                </div>

                                {/* Content */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSpotlight}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {spotlight.title}
                                        </h3>
                                        <p className="text-neutral-400 text-sm mb-4">
                                            {spotlight.description}
                                        </p>

                                        {spotlight.link && (
                                            <a
                                                href={spotlight.link}
                                                className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:underline"
                                            >
                                                {spotlight.linkText}
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                    <div className="flex gap-1">
                                        {spotlights.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full transition-colors ${i === currentSpotlight ? "bg-cyan-400" : "bg-white/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {currentSpotlight < spotlights.length - 1 ? (
                                            <>
                                                Next <ArrowRight size={14} />
                                            </>
                                        ) : (
                                            "Got it!"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
