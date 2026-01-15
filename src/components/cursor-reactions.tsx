"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MousePointer2, Sparkles, Eye, Heart, Coffee, Clock } from "lucide-react";

interface Reaction {
    id: string;
    emoji: string;
    x: number;
    y: number;
}

const emojis = ["❤️", "🔥", "👏", "🎉", "✨", "💯", "🚀", "💜"];

export function CursorReactions() {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        const handleDoubleClick = (e: MouseEvent) => {
            if (!isEnabled) return;

            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            const newReaction: Reaction = {
                id: `${Date.now()}-${Math.random()}`,
                emoji: randomEmoji,
                x: e.clientX,
                y: e.clientY,
            };

            setReactions(prev => [...prev, newReaction]);

            // Remove after animation
            setTimeout(() => {
                setReactions(prev => prev.filter(r => r.id !== newReaction.id));
            }, 1500);
        };

        window.addEventListener("dblclick", handleDoubleClick);
        return () => window.removeEventListener("dblclick", handleDoubleClick);
    }, [isEnabled]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
            <AnimatePresence>
                {reactions.map((reaction) => (
                    <motion.div
                        key={reaction.id}
                        initial={{
                            opacity: 1,
                            scale: 0,
                            x: reaction.x - 16,
                            y: reaction.y - 16
                        }}
                        animate={{
                            opacity: 0,
                            scale: 1.5,
                            y: reaction.y - 100
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="fixed text-3xl"
                    >
                        {reaction.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
