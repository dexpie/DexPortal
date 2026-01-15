"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Twitter, Facebook, Linkedin, Link, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
    title: string;
    url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            color: "#1da1f2",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "#1877f2",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "#0a66c2",
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
        },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Share2 size={16} className="text-neutral-400 hover:text-cyan-400" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 z-50 p-2 rounded-lg bg-black/90 border border-white/10 backdrop-blur-md min-w-[160px]"
                        >
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-neutral-300 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <link.icon size={14} style={{ color: link.color }} />
                                    {link.name}
                                </a>
                            ))}
                            <div className="h-px bg-white/10 my-1" />
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-neutral-300 hover:text-white w-full"
                            >
                                {copied ? (
                                    <Check size={14} className="text-green-400" />
                                ) : (
                                    <Link size={14} className="text-cyan-400" />
                                )}
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
