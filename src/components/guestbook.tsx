"use client";

import { useState, useEffect } from "react";
import { Send, Trash2, User, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface GuestbookEntry {
    id: string;
    name: string;
    message: string;
    date: string;
}

export function Guestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchEntries();
    }, []);

    async function fetchEntries() {
        try {
            const res = await fetch("/api/guestbook");
            if (res.ok) {
                setEntries(await res.json());
            }
        } catch (error) {
            console.error("Failed to load guestbook");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setIsSending(true);
        try {
            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });

            if (res.ok) {
                setMessage("");
                toast.success("Message transmitted successfully! 🚀");
                fetchEntries();
            } else {
                toast.error("Failed to transmit message");
            }
        } catch (error) {
            toast.error("Connection failed");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Sign Form */}
            <div className="mb-8 p-6 bg-neutral-900/50 border border-cyan-500/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare size={20} className="text-cyan-400" />
                    Leave a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name / Codename"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-colors"
                            maxLength={50}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 min-h-[100px] focus:border-cyan-500 outline-none transition-colors resize-none"
                            maxLength={280}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSending}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? "Transmitting..." : <>Send Message <Send size={16} /></>}
                        </button>
                    </div>
                </form>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center text-neutral-500 py-8">Loading transmission...</div>
                ) : entries.length === 0 ? (
                    <div className="text-center text-neutral-500 py-8">No messages yet. Be the first!</div>
                ) : (
                    <AnimatePresence>
                        {entries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center border border-white/10">
                                            <User size={14} className="text-neutral-400" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-cyan-400">{entry.name}</div>
                                            <div className="text-[10px] text-neutral-500">{new Date(entry.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-300 text-sm pl-10 leading-relaxed">{entry.message}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
