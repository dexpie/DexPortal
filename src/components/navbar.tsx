"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StatusMonitor } from "@/components/status-monitor";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5 shadow-2xl shadow-cyan-900/20">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-shadow duration-300">
                        <span className="text-black font-bold">D</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 group-hover:from-cyan-400 group-hover:to-white transition-all duration-300">
                        DexPortal
                    </span>
                </Link>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground items-center">
                    <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
                    <Link href="/guestbook" className="hover:text-cyan-400 transition-colors">Guestbook</Link>
                    <StatusMonitor />
                </div>
            </div>
        </nav>
    );
}
