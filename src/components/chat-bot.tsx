"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    id: number;
    role: "bot" | "user";
    content: string;
}

// Brain of the bot
const knowledgeBase = [
    { keywords: ["hello", "hi", "hey", "pagi", "sore", "malam"], response: "System online. Greetings, user. How may CORTEX assist you?" },
    { keywords: ["who", "what are you", "identity"], response: "I am CORTEX_AI (v2.4), a neural interface designed to navigate DexPie's digital construct." },
    { keywords: ["project", "work", "portfolio", "build"], response: "Accessing project database... DexPie has deployed multiple high-value assets. Use the 'Projects' command or ask for specifics." },
    { keywords: ["contact", "email", "hire", "reach"], response: "Comm-link available. You can transmit data via the Contact form or send a direct signal to his email." },
    { keywords: ["skill", "tech", "stack"], response: "Core competencies loaded: TypeScript, Next.js, React, Three.js, and System Architecture." },
    { keywords: ["help", "menu", "assist"], response: "Available commands:\n- /projects\n- /contact\n- /skills\n- /status" },
    { keywords: ["joke", "funny"], response: "Why do programmers prefer dark mode? Because light attracts bugs. [LAUGH_TRACK_MISSING]" },
    { keywords: ["matrix", "neo"], response: "The Matrix is everywhere. It is all around us. Even now, in this very room." },
];

function getBotResponse(input: string): string {
    const lower = input.toLowerCase();

    // Check knowledge base
    for (const entry of knowledgeBase) {
        if (entry.keywords.some(k => lower.includes(k))) {
            return entry.response;
        }
    }

    // Default fallback
    const fallbacks = [
        "Query not recognized. Please rephrase.",
        "Data packet corrupted. Try again.",
        "I need more context to process that request.",
        "Access denied. Just kidding, I simply don't understand.",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, role: "bot", content: "CORTEX_AI Initialized. Waiting for input..." },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate typing delay
        await new Promise((r) => setTimeout(r, 1000));

        const botMessage: Message = {
            id: Date.now() + 1,
            role: "bot",
            content: getBotResponse(input),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, botMessage]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={20} className="text-white" /> : <MessageCircle size={20} className="text-white" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 left-6 z-40 w-80 sm:w-96 h-[400px] bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-black relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                            {/* Scanline */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50 animate-scan" />

                            <div className="relative flex items-center gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <div className="absolute inset-0 border border-cyan-500/50 rounded-full animate-[spin_4s_linear_infinite]" />
                                    <div className="absolute inset-2 border border-cyan-500/30 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                                    <Bot size={18} className="text-cyan-400 relative z-10" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm font-mono tracking-wider">CORTEX_AI</h3>
                                    <p className="text-[10px] text-cyan-500 flex items-center gap-1 font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                        SYSTEM ONLINE
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                                >
                                    {msg.role === "bot" && (
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                            <Bot size={12} className="text-cyan-400" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${msg.role === "user"
                                            ? "bg-cyan-500/20 text-cyan-100"
                                            : "bg-white/5 text-neutral-300"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                            <User size={12} className="text-purple-400" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Bot size={12} className="text-cyan-400" />
                                    </div>
                                    <div className="px-3 py-2 bg-white/5 rounded-lg">
                                        <Loader2 size={14} className="animate-spin text-neutral-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything..."
                                    className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 rounded-lg transition-colors"
                                >
                                    <Send size={16} className="text-black" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
