"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Heart, Coffee, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useVisitorCount } from "@/hooks/use-visitor-count";

const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/#projects" },
    { label: "Guestbook", href: "/guestbook" },
    { label: "Contact", href: "/contact" },
    { label: "Resume", href: "/resume" },
];

const socialLinks = [
    { icon: Github, href: "https://github.com/dexpie", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/dexpie", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@dexpie.dev", label: "Email" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { count, loading } = useVisitorCount();


    return (<footer className="border-t border-border dark:border-white/5 bg-muted/30 dark:bg-gradient-to-b dark:from-black dark:to-neutral-950">
        <div className="container mx-auto px-6 py-16">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Brand */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
                            DexPie
                        </span>
                        <p className="text-muted-foreground dark:text-neutral-500 text-sm mt-2 max-w-xs">
                            Creative Technologist exploring the frontiers of web development, AI, and digital experiences.
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-muted-foreground dark:text-neutral-600 text-xs">
                            <MapPin size={12} />
                            <span>Indonesia 🇮🇩</span>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground dark:text-white uppercase tracking-wider">Quick Links</h4>
                    <ul className="grid grid-cols-2 gap-2">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-muted-foreground dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm flex items-center gap-1"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support & Connect */}
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground dark:text-white uppercase tracking-wider">Connect</h4>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Support Button */}
                    <motion.a
                        href="https://saweria.co/dexpie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400 hover:border-yellow-500/40 transition-all text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Coffee size={16} />
                        Support My Work
                        <ExternalLink size={12} className="opacity-50" />
                    </motion.a>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border dark:via-white/10 to-transparent mb-8" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground dark:text-neutral-500">
                <p className="flex items-center gap-1">
                    Built with <Heart size={12} className="text-red-400" /> and lots of <Coffee size={12} className="text-yellow-400" />
                </p>
                <p>
                    &copy; {currentYear} DexPie. All rights reserved.
                </p>

                {/* Visitor Counter Badge */}
                <div className="hidden md:block">
                    <div className="font-mono text-[10px] tracking-widest border border-cyan-900/50 px-3 py-1 bg-black/40 text-cyan-700/50 rounded shadow-[inset_0_0_10px_rgba(8,145,178,0.1)] select-none hover:text-cyan-500 hover:border-cyan-500/30 transition-colors">
                        [ VISITOR_COUNT: <span className="text-cyan-500/80">{loading ? "INITIALIZING..." : count.toString().padStart(7, "0")}</span> ]
                    </div>
                </div>

                <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    All systems operational
                </p>
            </div>
        </div>

        {/* Animated Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50" />
    </footer>
    );
}
