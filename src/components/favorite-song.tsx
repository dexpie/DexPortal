"use client";

import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Pause, Heart, Repeat, Shuffle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Placeholder song data - easy to swap
// Timestamps are in seconds
const SONG = {
    title: "Metakritik",
    artist: ".Feast",
    album: "Membangun & Menghancurkan",
    cover: "/images/metakritik-cover.png",
    duration: "4:16",
    lyrics: [
        { time: 14, text: "Malam kesekian memperdebatkan" },
        { time: 17, text: "Tutur perkataan dan gaya penulisan" },
        { time: 21, text: "Ada ketakutan dicaci karena" },
        { time: 24, text: "Punya kesalahan dan gaya berpakaian" },
        { time: 28, text: "Waswas cemas lihat yang lain, habis dilibas, aku membatin" },
        { time: 35, text: "Apakah ku terlalu peduli dengan standarmu yang beku dan sangat tinggi?" },
        { time: 42, text: "Bertanya-tanya apa kau benar-benar nilai dirimu dengan cara yang sama?" },
        { time: 49, text: "Atau apa aku takut dengan aibku dan lingkunganku?" },
        { time: 54, text: "Hidup di masa kecemasan, kita tumbang bergantian" },
        { time: 61, text: "Penantian menyiksa, terpaksa kubungkam diriku" },
        { time: 68, text: "Kali ini, harus main aman" },
        { time: 71, text: "Meninggalkan yang kubicarakan" },
        { time: 75, text: "Kehilangan jati diriku" },
        { time: 82, text: "" }, // Instrumental break
        { time: 96, text: "Malam kesekian mempertanyakan" },
        { time: 99, text: "Semua keputusan yang telah diamalkan" },
        { time: 103, text: "Ada ketakutan sewaktu tiba" },
        { time: 106, text: "Sebuah penyesalan yang harus dijalankan" },
        { time: 110, text: "Waswas cеmas lihat diriku, mulai kesulitan dalam menulis" },
        { time: 117, text: "Apakah ku terlalu nyaman dеngan hidupku yang kini kian meninggi?" },
        { time: 124, text: "Bertanya-tanya apa ku benar-benar hilang amarah karena mulai menua?" },
        { time: 131, text: "Atau apa aku takut dengan aibku dan lingkunganku?" },
        { time: 136, text: "Hidup di masa kecemasan kita tumbang bergantian" },
        { time: 143, text: "Penantian menyiksa, terpaksa kubungkam diriku" },
        { time: 150, text: "Kali ini, harus main aman" },
        { time: 153, text: "Meninggalkan yang kubicarakan" },
        { time: 157, text: "Terpaksa kutinggal diriku yang dahulu, runtuh dan percuma" },
        { time: 164, text: "Meninggalkan yang kubicarakan" },
        { time: 167, text: "Susun dan jatuhkan" },
        { time: 171, text: "Kehilangan jati diriku" }
    ]
};

export function FavoriteSong() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeLine, setActiveLine] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lyricsRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    // Local file path
    const AUDIO_SRC = "/music/metakritik.mp3";

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Update progress & active line from audio element
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (duration) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-20">
            <audio
                ref={audioRef}
                src={AUDIO_SRC}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

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
                            <div
                                className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group/bar"
                                onClick={(e) => {
                                    if (audioRef.current) {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const width = rect.width;
                                        const percent = x / width;
                                        audioRef.current.currentTime = percent * audioRef.current.duration;
                                    }
                                }}
                            >
                                <div
                                    className="h-full bg-white group-hover/bar:bg-green-500 transition-colors relative"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow" />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-neutral-500">
                                <span>
                                    {audioRef.current ?
                                        `${Math.floor(audioRef.current.currentTime / 60)}:${Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')}`
                                        : "0:00"}
                                </span>
                                <span>{SONG.duration}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-6">
                            <Shuffle size={20} className="text-neutral-500 hover:text-white cursor-pointer transition-colors" />
                            <SkipBack size={24} className="text-neutral-300 hover:text-white cursor-pointer transition-colors" />
                            <button
                                onClick={togglePlay}
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
                                ref={(el: HTMLParagraphElement | null) => { lyricsRefs.current[i] = el; }}
                                onClick={() => {
                                    // Click line to jump to time
                                    if (audioRef.current) {
                                        audioRef.current.currentTime = line.time;
                                        audioRef.current.play();
                                        setIsPlaying(true);
                                    }
                                }}
                                className={cn(
                                    "text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:text-white",
                                    i === activeLine
                                        ? "text-white scale-100 opacity-100 origin-left"
                                        : "text-neutral-500 scale-95 opacity-50 blur-[0.5px]"
                                )}
                            >
                                {line.text}
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
