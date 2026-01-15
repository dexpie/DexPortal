"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { StatusMonitor } from "@/components/status-monitor";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5 shadow-2xl shadow-cyan-900/20">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-shadow duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-black font-bold">D</span>
                    </motion.div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 group-hover:from-cyan-400 group-hover:to-white transition-all duration-300">
                        DexPortal
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-1 text-sm font-medium text-muted-foreground items-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-3 py-2 rounded-lg transition-all hidden sm:block",
                                    isActive
                                        ? "text-cyan-400"
                                        : "hover:text-cyan-400 hover:bg-white/5"
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="hidden sm:block h-4 w-px bg-white/10 mx-2" />

                    {/* Theme Toggle */}
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    {/* Status Monitor */}
                    <StatusMonitor />
                </div>
            </div>
        </nav>
    );
}
