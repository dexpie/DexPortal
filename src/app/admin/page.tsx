"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { Trash2, AlertTriangle, Lock, LogOut, Loader2, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

// Use environment variables in real app. For this demo we use browser prompting or simple state.
// We will assume Supabase client is available via common lib or recreate here for admin simplicity.
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

const ADMIN_PIN = "1337"; // Simple client-side gate for demo. In real app, use Auth/Middleware.

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ visitors: 0, messages: 0 });

    useEffect(() => {
        // Recover session if possible or valid
        if (sessionStorage.getItem("admin_session") === "true") {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch messages
            const { data: msgData, error: msgError } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false });

            if (msgError) throw msgError;
            setMessages(msgData || []);
            setStats(s => ({ ...s, messages: (msgData || []).length }));

            // Simulate visitor stat fetch (or real table if you have one)
            // const { count } = await supabase.from('page_views').select('*', { count: 'exact' });
            setStats(s => ({ ...s, visitors: 12450 })); // Mock for now

        } catch (error) {
            toast.error("Failed to load data");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pinInput === ADMIN_PIN) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_session", "true");
            fetchData();
            toast.success("Welcome back, Commander.");
        } else {
            toast.error("Access Denied: Invalid PIN");
            setPinInput("");
        }
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Nuke this message? This cannot be undone.");
        if (!confirm) return;

        try {
            const { error } = await supabase
                .from('guestbook')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(prev => prev.filter(m => m.id !== id));
            toast.success("Message neutralized.");
        } catch (error) {
            toast.error("Deletion failed");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <Lock size={48} className="mx-auto text-red-500 mb-4 animate-pulse" />
                        <h1 className="text-2xl font-bold text-white">Restricted Access</h1>
                        <p className="text-neutral-400 text-sm">Nexus Command Center</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-center text-white text-xl tracking-widest focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="ENTER PIN"
                            autoFocus
                        />
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12">
                            AUTHENTICATE
                        </Button>
                    </form>
                </div>
                <Toaster />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
            <Toaster theme="dark" />

            {/* Header */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-neutral-800">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-red-500">
                        <AlertTriangle /> COMMAND CENTER
                    </h1>
                    <p className="text-neutral-500 mt-1">System Status: OPERATIONAL</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => {
                        setIsAuthenticated(false);
                        sessionStorage.removeItem("admin_session");
                    }}
                    className="gap-2 border-neutral-700 hover:bg-neutral-800"
                >
                    <LogOut size={16} /> Logout
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Eye size={20} /></div>
                        <span className="text-xs text-neutral-500">TOTAL TRAFFIC</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stats.visitors.toLocaleString()}</div>
                    <div className="text-xs text-green-400">+12% vs last week</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><MessageSquare size={20} /></div>
                        <span className="text-xs text-neutral-500">GUESTBOOK ENTRIES</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stats.messages}</div>
                    <div className="text-xs text-neutral-400">Total stored messages</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-900/10 animate-pulse" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-red-500/10 rounded-lg text-red-400"><AlertTriangle size={20} /></div>
                            <span className="text-xs text-neutral-500">SYSTEM HEALTH</span>
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">98.9%</div>
                        <div className="text-xs text-green-600">All systems nominal</div>
                    </div>
                </div>
            </div>

            {/* Message Management */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Inbox Stream</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchData}
                        disabled={isLoading}
                        className="text-neutral-400 hover:text-white"
                    >
                        <Loader2 className={`mr-2 h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                <div className="divide-y divide-neutral-800">
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -100, height: 0 }}
                                className="p-6 flex items-start gap-4 hover:bg-neutral-800/50 transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-xs font-bold shrink-0">
                                    {msg.name?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-white truncate">{msg.name}</h3>
                                        <span className="text-xs text-neutral-500 font-mono">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-neutral-300 text-sm leading-relaxed break-words">{msg.message}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(msg.id)}
                                    className="text-neutral-600 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {!isLoading && messages.length === 0 && (
                        <div className="p-12 text-center text-neutral-500">
                            No active signals detected.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
