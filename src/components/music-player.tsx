"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [spotifyData, setSpotifyData] = useState<any>(null);

    // Reliable non-copyright Lofi track for fallback
    const FALLBACK_TRACK = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

    useEffect(() => {
        // Poll Spotify status
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const data = await res.json();
                if (data.isPlaying) {
                    setSpotifyData(data);
                    // If Spotify is playing, pause local audio
                    if (audioRef.current && isPlaying) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                    }
                } else {
                    setSpotifyData(null);
                }
            } catch (e) {
                // Ignore errors
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 10000); // Check every 10s
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        if (spotifyData) {
            window.open(spotifyData.songUrl, '_blank');
            return;
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-40">
            <audio ref={audioRef} src={FALLBACK_TRACK} loop />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 p-3 pr-6 rounded-full bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl shadow-cyan-900/10 hover:border-cyan-500/30 transition-colors group"
                title={spotifyData ? "Playing on Spotify" : "Local Lofi Radio"}
            >
                {/* Visualizer / Image */}
                {spotifyData ? (
                    <motion.img
                        src={spotifyData.albumImageUrl}
                        alt="Album"
                        className="w-10 h-10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ ease: "linear", duration: 10, repeat: Infinity }}
                    />
                ) : (
                    <div className="hidden sm:flex items-end gap-[1px] h-6 mx-2">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: isPlaying ? [4, Math.random() * 24 + 4, 4] : 4,
                                    backgroundColor: isPlaying ? ["#06b6d4", "#3b82f6", "#06b6d4"] : "#52525b",
                                }}
                                transition={{
                                    duration: 0.2,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    repeatType: "mirror",
                                    ease: "easeInOut"
                                }}
                                className={cn(
                                    "w-1 rounded-full",
                                    isPlaying ? "shadow-[0_0_5px_rgba(6,182,212,0.8)]" : ""
                                )}
                            />
                        ))}
                    </div>
                )}

                {/* Track Info */}
                <div className="hidden sm:block mr-2 w-32 overflow-hidden">
                    <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-1">
                        {spotifyData ? <><Music size={10} /> Spotify</> : <><Radio size={10} /> Local Radio</>}
                    </p>
                    <div className="relative overflow-hidden h-4">
                        <p className="text-xs font-medium text-white whitespace-nowrap">
                            {spotifyData ? `${spotifyData.title} - ${spotifyData.artist}` : "Chill Lofi Beats"}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full transition-colors text-white",
                            spotifyData ? "bg-green-500 hover:bg-green-400" : "bg-white/10 hover:bg-cyan-600"
                        )}
                    >
                        {spotifyData ? (
                            <ExternalLinkIcon size={14} />
                        ) : (
                            isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />
                        )}
                    </button>

                    {!spotifyData && (
                        <button
                            onClick={toggleMute}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

function ExternalLinkIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    )
}
