"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Twitter, Linkedin, MapPin, Zap, Fingerprint, Music, Code, Disc } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";

const DISCORD_ID = "461830617131384833";

export function CreatorCard() {
    const x = useMotionValue(0);
    const rotate = useSpring(x, { stiffness: 150, damping: 15, mass: 1.2 });
    const [mounted, setMounted] = useState(false);
    const { data: presence } = useLanyard(DISCORD_ID);

    useEffect(() => setMounted(true), []);

    function onMouseMove({ currentTarget, clientX }: React.MouseEvent) {
        const { left, width } = currentTarget.getBoundingClientRect();
        const offset = clientX - (left + width / 2);
        x.set(offset / 8);
    }

    function onMouseLeave() {
        x.set(0);
    }

    // Dynamic Data Helpers
    const statusColor = presence?.discord_status === "online" ? "bg-green-500" :
        presence?.discord_status === "idle" ? "bg-yellow-500" :
            presence?.discord_status === "dnd" ? "bg-red-500" : "bg-neutral-500";

    const avatarUrl = "https://github.com/dexpie.png";

    const spotify = presence?.spotify;
    const activity = presence?.activities.find(a => a.name !== "Spotify");

    // Status Text Logic
    let statusText = "NEXUS OPERATOR";
    let statusIcon = null;

    if (spotify) {
        statusText = spotify.song.length > 20 ? spotify.song.slice(0, 20) + "..." : spotify.song;
        statusIcon = <Music size={10} className="animate-pulse" />;
    } else if (activity) {
        statusText = activity.name;
        statusIcon = <Code size={10} />;
    } else if (presence) {
        statusText = presence.discord_status.toUpperCase();
    }

    return (
        <div
            className="relative h-[550px] w-full flex justify-center overflow-visible z-10"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotate, transformOrigin: "top center" }}
                className="relative flex flex-col items-center top-4"
            >
                {/* 🧵 Lanyard Strap */}
                <div className={`w-8 h-[220px] relative z-0 origin-top flex justify-center ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Strap Texture */}
                    <div className="absolute inset-x-2 h-full bg-neutral-900 border-x border-white/5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />
                    {/* Branding on Strap */}
                    <div className="absolute top-1/3 -rotate-90 text-[10px] font-bold tracking-[0.3em] text-white/20 whitespace-nowrap">
                        CYBERPUNK // ACCESS // GRANTED
                    </div>
                </div>

                {/* 🔗 Metal Hardware Assembly */}
                <div className="relative z-10 flex flex-col items-center -mt-2">
                    {/* Top Loop */}
                    <div className="w-12 h-8 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-md border border-neutral-600 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                    </div>
                    {/* Connection Ring */}
                    <div className="w-8 h-8 rounded-full border-4 border-neutral-500 -mt-4 shadow-sm" />
                    {/* Bottom Clip */}
                    <div className="w-10 h-10 bg-gradient-to-b from-neutral-600 to-neutral-700 -mt-4 clip-path-polygon rounded-sm border border-neutral-500 flex items-center justify-center shadow-lg">
                        <div className="w-full h-1 bg-black/50" />
                    </div>
                </div>

                {/* 🪪 The Premium ID Card */}
                <div className="relative z-20 -mt-2">
                    {/* Card Container */}
                    <div className="w-[300px] h-[420px] bg-[#050505] rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(6,182,212,0.15)] flex flex-col relative overflow-hidden group">

                        {/* 🌟 Holographic Overlay & Reflections */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                        {/* Top Header Section */}
                        <div className="h-32 bg-neutral-900/50 backdrop-blur-sm border-b border-white/5 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)]" />

                            {/* Slot Hole */}
                            <div className="absolute -top-4 w-16 h-8 bg-[#050505] rounded-b-xl border-x border-b border-white/10" />

                            <div className="mt-4 flex items-center gap-2 text-cyan-400/80 font-mono text-[10px] tracking-[0.2em]">
                                <Fingerprint size={12} />
                                IDENTITY VERIFIED
                            </div>
                        </div>

                        {/* Main Profile Section */}
                        <div className="flex-1 p-6 flex flex-col items-center text-center relative">
                            {/* Profile Image with Ring */}
                            <div className="-mt-16 relative">
                                <div className={`absolute inset-0 ${presence?.discord_status === 'online' ? 'bg-green-500' : 'bg-cyan-500'} rounded-full blur-md opacity-20 animate-pulse`} />
                                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-cyan-500/50 to-blue-600/50 backdrop-blur-md relative z-10">
                                    <img
                                        src={avatarUrl}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-black"
                                    />
                                    {/* Status Dot */}
                                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                        <div className={`w-2.5 h-2.5 rounded-full animate-ping absolute opacity-75 ${statusColor}`} />
                                        <div className={`w-2.5 h-2.5 rounded-full relative ${statusColor}`} />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-white mt-4 tracking-tight group-hover:text-cyan-400 transition-colors">DEXPIE</h2>

                            <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <span className="text-cyan-400">{statusIcon}</span>
                                <p className="text-xs text-neutral-300 font-mono tracking-widest uppercase">
                                    {statusText}
                                </p>
                            </div>

                            {/* Tags/Badges */}
                            <div className="flex gap-2 mt-4 justify-center">
                                <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono">DEV</span>
                                {spotify ? (
                                    <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-mono flex items-center gap-1">
                                        <Disc size={8} className="animate-spin" /> SPOTIFY
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-mono">PRO</span>
                                )}
                                <a
                                    href="https://saweria.co/dexpie"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-400 font-mono hover:bg-yellow-500/20 transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    <Zap size={8} /> SUPPORT
                                </a>
                            </div>
                        </div>

                        {/* Barcode Footer */}
                        <div className="p-6 pt-0 mt-auto">
                            <div className="w-full h-12 bg-white flex items-center justify-between px-2 overflow-hidden rounded opacity-80 group-hover:opacity-100 transition-opacity">
                                <span className="text-black font-mono text-xs font-bold tracking-tighter">ID: D3X-P13-001</span>
                                <div className="flex gap-0.5 h-8 items-end">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className={`w-0.5 bg-black ${i % 3 === 0 || i % 5 === 0 ? 'h-full' : 'h-1/2'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Animated Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-4 w-full -translate-y-full group-hover:translate-y-[400px] transition-transform duration-1000 ease-in-out pointer-events-none blur-sm" />
                    </div>
                </div>
            </motion.div>

            {/* Custom Clip Path definition for metal parts */}
            <style jsx global>{`
                .clip-path-polygon {
                    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
                }
            `}</style>
        </div>
    );
}
