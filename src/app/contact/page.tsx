"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Send, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSending(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                toast.success("Message sent! I'll get back to you soon 🚀");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            toast.error("Connection failed");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to Portal</span>
                </Link>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-neutral-400 mb-12">
                        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <Mail className="text-cyan-400 mb-3" size={24} />
                                <h3 className="font-bold mb-1">Email</h3>
                                <a href="mailto:contact@dexpie.dev" className="text-sm text-neutral-400 hover:text-cyan-400 transition-colors">
                                    contact@dexpie.dev
                                </a>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <MapPin className="text-cyan-400 mb-3" size={24} />
                                <h3 className="font-bold mb-1">Location</h3>
                                <p className="text-sm text-neutral-400">Indonesia 🇮🇩</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <Clock className="text-cyan-400 mb-3" size={24} />
                                <h3 className="font-bold mb-1">Response Time</h3>
                                <p className="text-sm text-neutral-400">Usually within 24 hours</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell me about your project..."
                                    rows={6}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-colors resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSending ? "Sending..." : <><Send size={18} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
