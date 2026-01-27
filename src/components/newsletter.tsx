"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }

        setStatus("loading");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, replace with actual API call
        setStatus("success");
        toast.success("Successfully subscribed! 🎉");
        setEmail("");

        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative max-w-2xl mx-auto text-center"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl opacity-50 dark:opacity-100" />

                <div className="relative bg-card dark:bg-black/50 border border-border dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-lg dark:shadow-none">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                            <Mail className="w-6 h-6 text-cyan-400" />
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-3">
                        Stay in the Loop
                    </h3>
                    <p className="text-muted-foreground dark:text-neutral-400 mb-8 max-w-md mx-auto">
                        Get notified about new projects, blog posts, and exclusive content. No spam, ever.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                disabled={status === "loading" || status === "success"}
                                className="w-full px-4 py-3 pl-11 bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-neutral-500" />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === "loading" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : status === "success" ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Subscribed!
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Subscribe
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Success Animation */}
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            Welcome to the community!
                        </motion.div>
                    )}

                    <p className="mt-6 text-[10px] text-muted-foreground dark:text-neutral-600">
                        By subscribing, you agree to receive updates. Unsubscribe anytime.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
