"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setShowReconnected(true);
            toast.success("Back online! 🌐");
            setTimeout(() => setShowReconnected(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            toast.error("You're offline. Some features may not work.");
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {(!isOnline || showReconnected) && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
                >
                    <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${isOnline
                                ? "bg-green-500/10 border-green-500/30 text-green-400"
                                : "bg-red-500/10 border-red-500/30 text-red-400"
                            }`}
                    >
                        {isOnline ? (
                            <>
                                <Wifi size={14} />
                                <span className="text-sm font-medium">Reconnected!</span>
                            </>
                        ) : (
                            <>
                                <WifiOff size={14} />
                                <span className="text-sm font-medium">You're offline</span>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                    <RefreshCw size={12} />
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
