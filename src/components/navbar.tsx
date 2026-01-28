"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { StatusMonitor } from "@/components/status-monitor";
import { ThemeToggle } from "@/components/theme-toggle";
import Magnetic from "@/components/magnetic";
import { cn } from "@/lib/utils";
import { useClickSound } from "@/lib/use-click-sound";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const { playClick, playHover } = useClickSound();
    const pathname = usePathname();

    return (
        <nav
            data-component="Navbar"
            data-type="Client Component"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 sm:px-0"
        >
            <div className="mx-auto flex h-14 items-center justify-between rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-6 shadow-2xl shadow-cyan-900/20 ring-1 ring-white/5 transition-all duration-300 hover:bg-black/60 hover:ring-white/10 hover:shadow-cyan-900/30">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group mr-8">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-shadow duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-black font-bold font-mono text-sm">D</span>
                    </motion.div>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 group-hover:from-cyan-400 group-hover:to-white transition-all duration-300 hidden sm:block font-heading">
                        DexPortal
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-1 text-sm font-medium text-neutral-400 items-center">
                    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                            return (
                                <Magnetic key={link.href}>
                                    <Link
                                        href={link.href}
                                        onMouseEnter={() => playHover()}
                                        onClick={() => playClick()}
                                        className={cn(
                                            "relative px-4 py-1.5 rounded-full transition-all duration-300 block",
                                            isActive
                                                ? "text-white bg-white/10 shadow-sm"
                                                : "hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </Magnetic>
                            );
                        })}
                    </div>

                    {/* Mobile Only Menu - Simplified for now, relying on MobileNav component generally but this is the top bar */}

                    {/* Divider */}
                    <div className="hidden sm:block h-4 w-px bg-white/10 mx-4" />

                    {/* Theme Toggle & Status */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                import("@/components/easter-eggs").then(mod => mod.triggerConfetti());
                            }}
                            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-yellow-400 transition-colors"
                            title="Party Mode!"
                        >
                            <span className="text-lg">🎉</span>
                        </button>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new Event("toggle-terminal"));
                            }}
                            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-green-400 transition-colors hidden sm:block"
                            title="Terminal (Press `)"
                        >
                            <span className="text-lg font-mono">{">_"}</span>
                        </button>
                        <button
                            onClick={() => {
                                import("@/components/achievements-modal").then(() => {
                                    window.dispatchEvent(new Event("toggle-achievements"));
                                });
                            }}
                            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-yellow-400 transition-colors hidden sm:block"
                            title="Achievements"
                        >
                            <Trophy size={18} />
                        </button>
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>
                        <StatusMonitor />
                    </div>
                </div>
            </div>

            {/* Lazily load Achievements Modal listening to event, or we can put it in Layout. 
                For cleaner code in Navbar, let's just emit event, and handle rendering in Layout 
                like we did with nothing yet. Actually, let's put the Modal in Layout. 
            */}
        </nav>
    );
}
