"use client";

import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Pause, Heart, Repeat, Shuffle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Placeholder song data - easy to swap
const SONG = {
    title: "Metakritik",
    artist: ".Feast",
    album: "Membangun & Menghancurkan",
    cover: "https://images.genius.com/39a6673bf8791097893c5c9604118ea5.1000x1000x1.jpg",
    duration: "4:16",
    lyrics: [
        "Apa kabar para pengadil?",
        "Yang menghakimi tanpa adil",
        "Duduk manis di balik layar",
        "Menyebar benci tanpa harus bayar",
        "",
        "Satu salah, semua menyerang",
        "Lupa cermin, lupa hari terang",
        "Kritikmu suci, kritikku dosa",
        "Kita semua terjebak rasa",
        "",
        "Oh, metakritik",
        "Debat kusir yang makin pelik",
        "Oh, metakritik",
        "Logika mati, ego pun naik",
        "Siapa paling benar?",
        "Siapa paling pintar?",
        "Dalam lingkaran setan yang terus berpijar",
        "",
        "Koreksi ini, koreksi itu",
        "Tapi dirimu tak pernah mau tahu",
        "Standar ganda jadi senjata",
        "Kebenaran cuma soal kata-kata",
        "",
        "Membangun dengan cela",
        "Menghancurkan dengan doa",
        "Kita semua sama saja",
        "Pemuja bising tanpa jeda",
        "",
        "Oh, metakritik",
        "Debat kusir yang makin pelik",
        "Oh, metakritik",
        "Logika mati, ego pun naik",
        "Siapa paling benar?",
        "Siapa paling pintar?",
        "Dalam lingkaran setan yang terus berpijar",
    ]
};

export function FavoriteSong() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(30);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll lyrics
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current && isPlaying) {
                scrollRef.current.scrollTop += 1;
                // Loop scroll
                if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight) {
                    scrollRef.current.scrollTop = 0;
                }
            }
        }, 50);
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Simulate progress bar movement
    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setProgress(prev => (prev >= 100 ? 0 : prev + 0.1));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full max-w-4xl mx-auto my-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.794-.962-.335.077-.67-.133-.746-.468-.077-.335.132-.67.468-.746 3.864-.883 7.155-.506 9.875 1.155.294.18.386.563.206.857zm1.226-2.73c-.226.372-.71.492-1.08.266-2.71-1.666-6.845-2.148-10.05-1.178-.417.127-.855-.115-.98-.532-.126-.417.116-.855.533-.98 3.657-1.106 8.243-.565 11.31 1.32.37.225.49.71.265 1.08zm.135-2.88c-3.253-1.93-8.62-2.108-11.725-1.165-.487.148-1.006-.13-1.154-.617-.148-.487.13-1.006.617-1.154 3.593-1.09 9.536-.88 13.31 1.36.438.26.58.828.32 1.266-.26.437-.828.58-1.266.32z" />
                    </svg>
                </span>
                On Repeat
            </h2>

            <div className="grid md:grid-cols-2 gap-8 p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl overflow-hidden relative group">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-purple-500/20 transition-colors" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-cyan-500/20 transition-colors" />

                {/* Left Side: Art & Controls */}
                <div className="flex flex-col gap-6">
                    {/* Album Art (Vinyl Style with Animation) */}
                    <div className="relative aspect-square w-full max-w-[300px] mx-auto group/art">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                            className="w-full h-full rounded-full overflow-hidden border-4 border-neutral-900 shadow-2xl relative z-10"
                        >
                            <Image
                                src={SONG.cover}
                                alt={SONG.album}
                                fill
                                className="object-cover"
                            />
                            {/* Vinyl Center Hole */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 rounded-full border border-white/10 z-20" />
                        </motion.div>
                        {/* Vinyl Glow */}
                        <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/30 scale-95 -z-0 group-hover/art:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Metadata & Progress */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{SONG.title}</h3>
                                <p className="text-neutral-400">{SONG.artist}</p>
                            </div>
                            <Heart className={cn("text-green-500 fill-green-500 cursor-pointer hover:scale-110 transition-transform")} />
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group/bar">
                                <div
                                    className="h-full bg-white group-hover/bar:bg-green-500 transition-colors relative"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow" />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-neutral-500">
                                <span>{Math.floor((parseInt(SONG.duration.split(":")[0]) * 60 + parseInt(SONG.duration.split(":")[1])) * (progress / 100) / 60)}:{Math.floor((parseInt(SONG.duration.split(":")[0]) * 60 + parseInt(SONG.duration.split(":")[1])) * (progress / 100) % 60).toString().padStart(2, '0')}</span>
                                <span>{SONG.duration}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-6">
                            <Shuffle size={20} className="text-neutral-500 hover:text-white cursor-pointer transition-colors" />
                            <SkipBack size={24} className="text-neutral-300 hover:text-white cursor-pointer transition-colors" />
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                            >
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                            </button>
                            <SkipForward size={24} className="text-neutral-300 hover:text-white cursor-pointer transition-colors" />
                            <Repeat size={20} className="text-green-500 cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Lyrics */}
                <div className="relative bg-black/20 rounded-2xl p-6 border border-white/5 overflow-hidden">
                    <div className="absolute top-4 right-4 bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Lyrics
                    </div>

                    {/* Gradient Masks for Scroll Fade */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="h-full overflow-y-auto space-y-6 pr-2 custom-scrollbar mask-image-gradient"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {SONG.lyrics.map((line, i) => (
                            <p
                                key={i}
                                className={cn(
                                    "text-xl md:text-2xl font-bold transition-all duration-300 cursor-default hover:text-white",
                                    // Highlight stylistic logic simulation
                                    i === Math.floor(progress / 5) % SONG.lyrics.length
                                        ? "text-white scale-100 opacity-100 origin-left"
                                        : "text-neutral-500 scale-95 opacity-50 blur-[0.5px]"
                                )}
                            >
                                {line}
                            </p>
                        ))}
                        {/* Buffer space at bottom */}
                        <div className="h-24" />
                    </div>
                </div>
            </div>
        </div>
    );
}
