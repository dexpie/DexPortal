"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

const socials = [
    { icon: Github, href: "https://github.com/dexpie", label: "GitHub", color: "#ffffff" },
    { icon: Twitter, href: "https://twitter.com/dexpie", label: "Twitter", color: "#1da1f2" },
    { icon: Linkedin, href: "https://linkedin.com/in/dexpie", label: "LinkedIn", color: "#0a66c2" },
    { icon: Instagram, href: "https://instagram.com/dexpie", label: "Instagram", color: "#e4405f" },
    { icon: Youtube, href: "https://youtube.com/@dexpie", label: "YouTube", color: "#ff0000" },
    { icon: Mail, href: "mailto:hello@dexpie.dev", label: "Email", color: "#06b6d4" },
];

export function SocialDock() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
        >
            <div className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl shadow-cyan-900/10">
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    const isHovered = hoveredIndex === index;
                    const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
                    const scale = isHovered ? 1.5 : distance === 1 ? 1.2 : distance === 2 ? 1.1 : 1;

                    return (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center justify-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            animate={{
                                scale,
                                y: isHovered ? -8 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <div
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
                                style={{
                                    boxShadow: isHovered ? `0 0 20px ${social.color}40` : "none",
                                }}
                            >
                                <Icon
                                    size={20}
                                    style={{ color: isHovered ? social.color : "#a3a3a3" }}
                                    className="transition-colors duration-200"
                                />
                            </div>

                            {/* Tooltip */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black border border-white/10 text-[10px] text-white whitespace-nowrap"
                                >
                                    {social.label}
                                </motion.div>
                            )}
                        </motion.a>
                    );
                })}
            </div>
        </motion.div>
    );
}
