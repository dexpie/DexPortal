"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    id: number;
    role: "bot" | "user";
    content: string;
}

const botResponses: Record<string, string> = {
    "hello": "Hey there! 👋 Welcome to DexPortal. How can I help you today?",
    "hi": "Hello! 👋 Nice to meet you. What would you like to know?",
    "who are you": "I'm DexBot, a friendly assistant for DexPortal! I can help you navigate the site or answer questions about DexPie's work.",
    "projects": "DexPie has worked on several cool projects! Check out the Projects section on the homepage, or press ⌘K to search for specific ones.",
    "contact": "You can reach DexPie through the Contact page, or send an email directly. There's also a Guestbook if you want to leave a message!",
    "skills": "DexPie specializes in TypeScript, React, Next.js, and enjoys working with Tailwind CSS and Framer Motion. Check out the Skills section!",
    "hire": "Interested in working together? Head to the Contact page and let's discuss your project!",
    "help": "I can help you with:\n• 🔍 Finding projects\n• 📧 Contact information\n• 💼 Skills & experience\n• ☕ How to support DexPie\n\nJust ask!",
    "support": "If you enjoy DexPie's work, you can support via Saweria! There's a link in the footer or on the creator card.",
    "default": "Hmm, I'm not sure about that. Try asking about projects, skills, contact, or type 'help' for options!",
};

function getBotResponse(input: string): string {
    const lower = input.toLowerCase();
    for (const key of Object.keys(botResponses)) {
        if (lower.includes(key)) {
            return botResponses[key];
        }
    }
    return botResponses["default"];
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, role: "bot", content: "Hey! 👋 I'm DexBot. Ask me anything about DexPie's work!" },
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
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">DexBot</h3>
                                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        Always online
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
