"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Mail, Heart, Coffee, ExternalLink, MapPin, ArrowUpRight } from "lucide-react";
import { useVisitorCount } from "@/hooks/use-visitor-count";
import { useState, useEffect } from "react";
import Magnetic from "./magnetic";
import { Button } from "./ui/button";

const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/#projects" },
    { label: "Guestbook", href: "/guestbook" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    { icon: Github, href: "https://github.com/dexpie", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/dexpie", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@dexpie.dev", label: "Email" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { count, loading } = useVisitorCount();
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Asia/Jakarta" // Set your timezone
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer
            data-component="Footer"
            data-type="Server Component"
            className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden border-t border-white/5"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">

                    {/* Brand & CTA */}
                    <div className="max-w-xl">
                        <Magnetic>
                            <Link href="/contact" className="group inline-block">
                                <h2 className="text-6xl md:text-8xl font-bold font-heading leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-400 to-neutral-700 transition-all group-hover:to-white mb-6">
                                    Let's<br />Connect
                                </h2>
                            </Link>
                        </Magnetic>
                        <p className="text-xl text-neutral-400 max-w-md leading-relaxed mt-4">
                            Ready to start your next project? Drop a line or check out my resume.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <a href="mailto:hello@dexpie.dev">
                                <Button className="rounded-full bg-cyan-600 hover:bg-cyan-500 text-white px-8 h-12">
                                    Send an Email
                                </Button>
                            </a>
                            <a href="/resume">
                                <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10 text-white px-8 h-12">
                                    View Resume
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Columns */}
                    <div className="flex gap-16 md:gap-24 flex-wrap">
                        <div className="space-y-6">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Navigation</h4>
                            <ul className="space-y-4">
                                {footerLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors text-lg font-medium relative group">
                                            {link.label}
                                            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500 scale-0 group-hover:scale-100 transition-transform" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Socials</h4>
                            <ul className="space-y-4">
                                {socialLinks.map((social) => (
                                    <li key={social.href}>
                                        <a href={social.href} target="_blank" rel="noopener" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors text-lg group">
                                            {social.label}
                                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mainframe Stats Bar */}
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            SYSTEM_ONLINE
                        </div>
                        <div className="flex items-center gap-6 text-xs font-mono text-neutral-600">
                            <span>ID: DEXP_V2.5</span>
                            <span>LOC: JAKARTA, ID</span>
                            <span>TIME: {time}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="font-mono text-xs tracking-widest border border-cyan-900/30 px-3 py-1 bg-cyan-950/10 text-cyan-600/70 rounded">
                            VISITOR_COUNT: {loading ? "INITIALIZING..." : count.toString().padStart(7, "0")}
                        </div>
                        <p className="text-xs text-neutral-600">
                            &copy; {currentYear} DexPie. Built with various caffeine sources.
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent h-40 bottom-0 z-0" />
        </footer>
    );
}
