"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Sparkles, ArrowRight } from "lucide-react";

interface Announcement {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "promo";
    link?: string;
    linkText?: string;
}

const announcements: Announcement[] = [
    {
        id: 1,
        message: "🚀 DexPortal has been upgraded with 25+ new features!",
        type: "success",
    },
    {
        id: 2,
        message: "✨ New: Try the easter eggs - type 'dexpie' anywhere!",
        type: "promo",
        link: "/guestbook",
        linkText: "Sign Guestbook",
    },
    {
        id: 3,
        message: "🎯 Check out the latest projects in the portfolio",
        type: "info",
        link: "/#projects",
        linkText: "View Projects",
    },
];

const typeStyles = {
    info: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    success: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    warning: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400",
    promo: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
};

export function AnnouncementBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [hasClosedBefore, setHasClosedBefore] = useState(false);

    useEffect(() => {
        // Check if user has closed before
        const closed = localStorage.getItem("dexportal_announcement_closed");
        if (closed) {
            setHasClosedBefore(true);
            setIsVisible(false);
        }

        // Rotate announcements
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("dexportal_announcement_closed", "true");
    };

    const announcement = announcements[currentIndex];

    if (!isVisible || hasClosedBefore) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="fixed top-16 left-0 right-0 z-40 overflow-hidden"
            >
                <div className={`bg-gradient-to-r ${typeStyles[announcement.type]} border-b backdrop-blur-md`}>
                    <div className="container mx-auto px-6 py-2">
                        <div className="flex items-center justify-center gap-4">
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 text-sm"
                            >
                                <Sparkles size={14} className="animate-pulse" />
                                <span>{announcement.message}</span>
                                {announcement.link && (
                                    <a
                                        href={announcement.link}
                                        className="flex items-center gap-1 font-medium hover:underline"
                                    >
                                        {announcement.linkText}
                                        <ArrowRight size={12} />
                                    </a>
                                )}
                            </motion.div>

                            <button
                                onClick={handleClose}
                                className="p-1 hover:bg-white/10 rounded transition-colors ml-4"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
