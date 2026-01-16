"use client";

import { motion } from "framer-motion";
import {
    Github, Twitter, Linkedin, Mail, MapPin,
    Music, ExternalLink, Coffee, Code2, Terminal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Sub-components for Bento Cells ---

function ProfileCell() {
    return (
        <div className="relative h-full flex flex-col justify-between p-6 overflow-hidden group">
            <div className="z-10">
                <div className="w-20 h-20 rounded-full border-2 border-cyan-500/30 overflow-hidden mb-4 relative">
                    <Image
                        src="/avatar.png"
                        alt="Profile"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <h3 className="text-2xl font-bold text-white">Gading (DexPie)</h3>
                <p className="text-cyan-400 font-medium">Creative Technologist</p>
            </div>
            <div className="z-10 mt-4">
                <p className="text-sm text-neutral-400 leading-relaxed">
                    Building digital experiences at the intersection of design and code.
                    Obsessed with pixel perfection and motion.
                </p>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
    );
}

function MapCell() {
    return (
        <div className="relative h-full w-full bg-neutral-900 flex items-center justify-center overflow-hidden">
            {/* Abstract Map UI */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                    <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
                    </span>
                </div>
                <div className="mt-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <MapPin size={14} className="text-red-500" />
                    <span className="text-xs font-mono text-white">Jakarta, ID</span>
                </div>
            </div>
        </div>
    );
}

function SpotifyCell() {
    return (
        <div className="h-full bg-gradient-to-br from-[#1DB954]/20 to-black p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4">
                <Music size={24} className="text-[#1DB954] animate-pulse" />
            </div>
            <div>
                <p className="text-xs font-bold text-[#1DB954] uppercase tracking-wider mb-2">Recently Played</p>
                <h4 className="text-lg font-bold text-white leading-tight">Midnight City</h4>
                <p className="text-sm text-neutral-400">M83</p>
            </div>

            {/* Visualizer bars */}
            <div className="flex gap-1 items-end h-8">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-[#1DB954]"
                        animate={{ height: ["20%", "80%", "40%"] }}
                        transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                    />
                ))}
            </div>
        </div>
    )
}

function TechStackCell() {
    const stack = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Three.js", "Framer", "Supabase"];
    return (
        <div className="h-full flex flex-col justify-center bg-neutral-900/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

            <div className="flex flex-col gap-4 -rotate-12 scale-110 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-2 animate-infinite-scroll">
                    {stack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-neutral-400 whitespace-nowrap">
                            {tech}
                        </span>
                    ))}
                    {stack.map((tech, i) => (
                        <span key={`dup-${i}`} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-neutral-400 whitespace-nowrap">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 animate-infinite-scroll-reverse">
                    {stack.reverse().map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-neutral-400 whitespace-nowrap">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">Tech Stack</h4>
            </div>
        </div>
    )
}

function SocialsCell() {
    const socials = [
        { icon: Github, href: "https://github.com/dexpie", color: "hover:text-white" },
        { icon: Twitter, href: "https://twitter.com/dexpie", color: "hover:text-blue-400" },
        { icon: Linkedin, href: "https://linkedin.com/in/dexpie", color: "hover:text-blue-600" },
        { icon: Mail, href: "mailto:hello@dexpie.dev", color: "hover:text-red-400" },
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 gap-4">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Connect</p>
            <div className="flex gap-4">
                {socials.map((s, i) => (
                    <Link
                        key={i}
                        href={s.href}
                        target="_blank"
                        className={`p-3 bg-white/5 rounded-full border border-white/10 transition-colors ${s.color}`}
                    >
                        <s.icon size={20} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

function StatusCell() {
    return (
        <div className="h-full flex items-center justify-between px-6 bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-400">Open to Work</span>
            </div>
            <Link href="/contact" className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20 transition-colors">
                Hire Me
            </Link>
        </div>
    )
}

// --- Main Grid Component ---

const BentoItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
            "relative rounded-3xl bg-neutral-900/50 border border-white/10 overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors group",
            className
        )}
    >
        {children}
    </motion.div>
);

export function BentoGrid() {
    return (
        <section className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[1200px] md:h-[600px]">

                {/* 1. Profile - Large (2x2) */}
                <BentoItem className="md:col-span-2 md:row-span-2 bg-gradient-to-b from-neutral-900 to-black">
                    <ProfileCell />
                </BentoItem>

                {/* 2. Map - (1x1) */}
                <BentoItem className="md:col-span-1 md:row-span-1">
                    <MapCell />
                </BentoItem>

                {/* 3. Spotify - (1x1) */}
                <BentoItem className="md:col-span-1 md:row-span-1">
                    <SpotifyCell />
                </BentoItem>

                {/* 4. Socials - (2x1) */}
                <BentoItem className="md:col-span-2 md:row-span-1">
                    <SocialsCell />
                </BentoItem>

                {/* 5. Tech Stack - (1x1) */}
                <BentoItem className="md:col-span-1 md:row-span-1">
                    <TechStackCell />
                </BentoItem>

                {/* 6. Status - (2x1) Wide bottom */}
                <BentoItem className="md:col-span-2 md:col-start-1 md:row-start-3">
                    <StatusCell />
                </BentoItem>

                {/* 7. Filler/Portfolio Link - (1x1) */}
                <BentoItem className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-white/5 hover:bg-white/10 cursor-pointer group">
                    <Link href="/projects" className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-cyan-500/20 rounded-full text-cyan-400 group-hover:scale-110 transition-transform">
                            <Code2 size={24} />
                        </div>
                        <span className="font-bold">View Projects</span>
                    </Link>
                </BentoItem>

                {/* 8. Another filler (1x1) - Guestbook */}
                <BentoItem className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 cursor-pointer group">
                    <Link href="/guestbook" className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-purple-500/20 rounded-full text-purple-400 group-hover:scale-110 transition-transform">
                            <Terminal size={24} />
                        </div>
                        <span className="font-bold">Sign Guestbook</span>
                    </Link>
                </BentoItem>

            </div>
        </section>
    );
}
