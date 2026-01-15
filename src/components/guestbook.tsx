"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Terminal, Hash, Clock, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    const [terminalLines, setTerminalLines] = useState<string[]>(["Initializing secure connection..."]);

    useEffect(() => {
        fetchEntries();
        // Simulate terminal startup sequence
        setTimeout(() => setTerminalLines(prev => [...prev, "Estabilishing handshake..."]), 500);
        setTimeout(() => setTerminalLines(prev => [...prev, "Connection secure. Ready for transmission."]), 1200);
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
        setTerminalLines(prev => [...prev, `Encrypting outgoing message from [${name}]...`]);

        try {
            // Simulate processing time
            await new Promise(r => setTimeout(r, 800));

            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });

            if (res.ok) {
                setMessage("");
                setTerminalLines(prev => [...prev, "Transmission successful. Data logged."]);
                toast.success("Packet delivered.");
                fetchEntries();
            } else {
                setTerminalLines(prev => [...prev, "ERR: Transmission rejected."]);
                toast.error("Packet lost.");
            }
        } catch (error) {
            setTerminalLines(prev => [...prev, "ERR: Connection timed out."]);
            toast.error("Connection failed");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Visual Terminal / Log */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black/80 border border-neutral-800 rounded-lg p-4 h-[500px] overflow-y-auto custom-scrollbar relative">
                        <div className="absolute top-2 right-4 flex gap-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest pointer-events-none">
                            <div className="flex items-center gap-1"><Cpu size={10} /> MEM: 64%</div>
                            <div className="flex items-center gap-1"><Clock size={10} /> UPTIME: 99.9%</div>
                        </div>

                        {isLoading ? (
                            <div className="space-y-2">
                                {terminalLines.map((line, i) => (
                                    <div key={i} className="text-sm text-green-500/80 font-mono">
                                        <span className="text-neutral-600 mr-2">{">"}</span>
                                        {line}
                                    </div>
                                ))}
                                <span className="inline-block w-2 h-4 bg-green-500 animate-pulse" />
                            </div>
                        ) : (
                            <AnimatePresence>
                                {entries.map((entry, i) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="mb-4 border-l-2 border-neutral-800 pl-4 py-1 hover:border-cyan-500/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                                            <span className="text-cyan-600 font-bold">[{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                                            <span className="text-neutral-400">USR::{entry.name.toUpperCase()}</span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-neutral-600">ID::{entry.id.substring(0, 8)}</span>
                                        </div>
                                        <p className="text-neutral-300 text-sm">{entry.message}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}

                        {!isLoading && entries.length === 0 && (
                            <div className="text-neutral-600 italic text-sm mt-4">System Log Empty. Waiting for input...</div>
                        )}
                    </div>
                </div>

                {/* Input Panel */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral-900/50 border border-cyan-500/20 rounded-lg p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <Terminal size={100} className="text-cyan-500" />
                        </div>

                        <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2 relative z-10">
                            <Hash size={18} />
                            TRANSMIT_DATA
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1 block">Identity</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="CODENAME"
                                    className="w-full bg-black/50 border border-neutral-800 rounded px-3 py-2 text-sm text-cyan-100 focus:border-cyan-500/50 outline-none transition-colors font-mono"
                                    maxLength={30}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1 block">Payload</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter encrypted message..."
                                    className="w-full bg-black/50 border border-neutral-800 rounded px-3 py-2 text-sm text-cyan-100 focus:border-cyan-500/50 outline-none transition-colors font-mono min-h-[120px] resize-none"
                                    maxLength={280}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className={cn(
                                    "w-full bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                    isSending && "opacity-50 cursor-wait bg-cyan-900/10"
                                )}
                            >
                                {isSending ? (
                                    <span className="animate-pulse">UPLOADING...</span>
                                ) : (
                                    <>INITIALIZE_UPLOAD <Send size={12} /></>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-900/10 border border-yellow-500/10 rounded-lg">
                        <p className="text-[10px] text-yellow-500/60 leading-relaxed uppercase">
                            Warning: All transmissions are monitored by the Public Network. Do not upload classified credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
