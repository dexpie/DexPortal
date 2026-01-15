"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, RefreshCw } from "lucide-react";

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Good code is its own best documentation.", author: "Steve McConnell" },
    { text: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
];

export function QuoteOfTheDay() {
    const [quote, setQuote] = useState(quotes[0]);
    const [isLoading, setIsLoading] = useState(false);

    // Get quote based on day to keep it consistent throughout the day
    useEffect(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        setQuote(quotes[dayOfYear % quotes.length]);
    }, []);

    const shuffle = () => {
        setIsLoading(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
            {/* Decorative Quote Icon */}
            <Quote className="absolute top-4 right-4 w-16 h-16 text-cyan-500/10" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                        Quote of the Day
                    </h3>
                    <motion.button
                        onClick={shuffle}
                        className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-cyan-400 transition-colors"
                        whileTap={{ rotate: 180 }}
                    >
                        <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    </motion.button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={quote.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                    >
                        <p className="text-lg text-white leading-relaxed italic">
                            "{quote.text}"
                        </p>
                        <p className="text-sm text-cyan-400">
                            — {quote.author}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
