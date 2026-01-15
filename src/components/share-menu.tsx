"use client";

import { motion } from "framer-motion";
import { Share2, Twitter, Facebook, Linkedin, Link2, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ShareMenuProps {
    url?: string;
    title?: string;
    description?: string;
}

export function ShareMenu({ url, title = "Check this out!", description = "" }: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const shareOptions = [
        {
            name: "Twitter",
            icon: Twitter,
            color: "hover:text-blue-400",
            action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank"),
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "hover:text-blue-600",
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank"),
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "hover:text-blue-500",
            action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank"),
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            color: "hover:text-green-400",
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`, "_blank"),
        },
        {
            name: "Email",
            icon: Mail,
            color: "hover:text-yellow-400",
            action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${shareUrl}`)}`, "_blank"),
        },
        {
            name: "Copy Link",
            icon: Link2,
            color: "hover:text-cyan-400",
            action: async () => {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied!");
                setIsOpen(false);
            },
        },
    ];

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-neutral-500 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Share2 size={18} />
            </motion.button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 z-50 bg-black/95 border border-white/10 rounded-xl p-2 min-w-[180px] shadow-xl"
                    >
                        {shareOptions.map((option) => (
                            <button
                                key={option.name}
                                onClick={option.action}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-400 ${option.color} hover:bg-white/5 rounded-lg transition-colors`}
                            >
                                <option.icon size={16} />
                                <span>{option.name}</span>
                            </button>
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    );
}
