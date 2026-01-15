"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PartyPopper, Rocket, Gift, Star } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface EasterEgg {
    id: string;
    name: string;
    icon: typeof Sparkles;
    message: string;
    unlocked: boolean;
}

export function EasterEggs() {
    const [clickCount, setClickCount] = useState(0);
    const [secretWord, setSecretWord] = useState("");
    const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([
        { id: "clicker", name: "Rapid Clicker", icon: Sparkles, message: "You clicked 10 times fast!", unlocked: false },
        { id: "secret", name: "Secret Code", icon: Star, message: "You typed the secret word!", unlocked: false },
        { id: "night", name: "Night Owl", icon: PartyPopper, message: "Browsing at midnight! 🦉", unlocked: false },
    ]);

    const unlockEasterEgg = useCallback((id: string) => {
        setEasterEggs(prev => {
            const egg = prev.find(e => e.id === id);
            if (egg && !egg.unlocked) {
                // Trigger confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#06b6d4', '#8b5cf6', '#ec4899'],
                });

                toast.success(`🎉 Easter Egg Found: ${egg.name}!`, {
                    description: egg.message,
                });

                return prev.map(e => e.id === id ? { ...e, unlocked: true } : e);
            }
            return prev;
        });
    }, []);

    // Click counter easter egg
    useEffect(() => {
        let resetTimer: NodeJS.Timeout;

        const handleClick = () => {
            setClickCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 10) {
                    unlockEasterEgg("clicker");
                    return 0;
                }
                return newCount;
            });

            // Reset count after 2 seconds of no clicks
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => setClickCount(0), 2000);
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
            clearTimeout(resetTimer);
        };
    }, [unlockEasterEgg]);

    // Secret word easter egg
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            setSecretWord(prev => {
                const newWord = (prev + e.key).slice(-6);
                if (newWord.toLowerCase() === "dexpie") {
                    unlockEasterEgg("secret");
                    return "";
                }
                return newWord;
            });
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => window.removeEventListener("keypress", handleKeyPress);
    }, [unlockEasterEgg]);

    // Night owl easter egg
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) {
            setTimeout(() => unlockEasterEgg("night"), 3000);
        }
    }, [unlockEasterEgg]);

    return null; // Easter eggs are invisible but active
}

// Export for external use
export function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}
