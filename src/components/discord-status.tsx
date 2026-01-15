"use client";

import { useLanyard } from "use-lanyard";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Music, Code, Monitor, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DISCORD_ID = "461830617131384833";

export function DiscordStatus() {
    const { data: presence, isLoading } = useLanyard(DISCORD_ID);

    if (isLoading) {
        return (
            <div className="h-[200px] w-full rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
                <Loader2 className="animate-spin text-neutral-500" />
            </div>
        );
    }

    // Default values if presence is null (Offline state)
    const defaultUser = {
        username: "DexPie", // Fallback username
        avatar: "default", // You might want to handle this validation or use a static image
        id: DISCORD_ID
    };

    const user = presence?.discord_user || defaultUser;
    const status = presence?.discord_status || "offline";
    const statusColor = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-neutral-500"
    }[status];

    const spotify = presence?.spotify;
    const activity = presence?.activities.find(a => a.name !== "Spotify");

    // Helper for avatar URL
    const avatarUrl = "https://github.com/dexpie.png";

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Main Status Cards */}
            <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden group h-full">
                {/* Background Glow */}
                <div className={cn(
                    "absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[50px] transition-colors duration-500 opacity-20 group-hover:opacity-40",
                    statusColor
                )} />

                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                            <Image
                                src={avatarUrl}
                                alt="Discord Avatar"
                                width={64}
                                height={64}
                            />
                        </div>
                        <div className={cn(
                            "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black",
                            statusColor
                        )} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">
                            {user.username}
                        </h3>
                        <p className="text-sm text-neutral-400 font-mono capitalize">
                            {status === "dnd" ? "Do Not Disturb" : status}
                        </p>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="mt-6 space-y-3">
                    {/* Spotify */}
                    <AnimatePresence mode="wait">
                        {spotify ? (
                            <motion.div
                                key="spotify"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20"
                            >
                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 animate-spin-slow">
                                    <Image
                                        src={spotify.album_art_url ?? ""}
                                        alt="Album Art"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold mb-0.5">
                                        <Music size={10} />
                                        LISTENING TO SPOTIFY
                                    </div>
                                    <p className="text-sm font-medium text-white truncate">{spotify.song}</p>
                                    <p className="text-xs text-neutral-400 truncate">by {spotify.artist}</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle-music"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 opacity-50"
                            >
                                <div className="w-12 h-12 rounded bg-neutral-800 flex items-center justify-center">
                                    <Disc size={20} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-400">Not listening</p>
                                    <p className="text-xs text-neutral-600">Spotify is idle</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Coding / Activity */}
                    {activity ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20"
                        >
                            <div className="w-12 h-12 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Code size={20} />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold mb-0.5">
                                    <Monitor size={10} />
                                    ACTIVITY
                                </div>
                                <p className="text-sm font-medium text-white truncate">{activity.name}</p>
                                <p className="text-xs text-neutral-400 truncate">{activity.state || activity.details}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 opacity-30">
                            <div className="w-12 h-12 rounded bg-neutral-800 flex items-center justify-center">
                                <Monitor size={20} className="text-neutral-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-400">No Activity</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
