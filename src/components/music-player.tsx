"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Use a reliable non-copyright Lofi track
    const TRACK_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

    const togglePlay = () => {
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

    // Set initial volume low so it doesn't blast user
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <audio ref={audioRef} src={TRACK_URL} loop />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl shadow-cyan-900/10"
            >
                {/* Animated Visualizer */}
                <div className="hidden sm:flex items-end gap-1 h-4 mx-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: isPlaying ? [4, 16, 4] : 4,
                                minHeight: 4,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }}
                            className={cn(
                                "w-1 rounded-full",
                                isPlaying ? "bg-cyan-500" : "bg-neutral-600"
                            )}
                        />
                    ))}
                </div>

                {/* Track Info (Hidden on mobile) */}
                <div className="hidden sm:block mr-2">
                    <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Now Playing</p>
                    <p className="text-xs font-medium text-white">Chill Lofi Beats</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-cyan-600 hover:text-white transition-colors text-white"
                    >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>

                    <button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
