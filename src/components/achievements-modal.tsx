"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lock, X } from "lucide-react";
import { useAchievements, Achievement } from "@/components/achievements";
import { cn } from "@/lib/utils";

export function AchievementsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { achievements } = useAchievements();
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const progress = (unlockedCount / achievements.length) * 100;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/90 border border-yellow-500/20 rounded-2xl p-6 shadow-2xl shadow-yellow-900/20 z-[201] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Trophy className="text-yellow-500" />
                                    Achievements
                                </h2>
                                <p className="text-sm text-neutral-400">
                                    Unlocked: {unlockedCount}/{achievements.length}
                                </p>
                            </div>
                            <button onClick={onClose} className="text-neutral-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-yellow-500"
                            />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={cn(
                                        "flex items-center gap-4 p-3 rounded-xl border transition-all",
                                        achievement.unlocked
                                            ? "bg-yellow-500/5 border-yellow-500/20"
                                            : "bg-white/5 border-white/5 opacity-50 grayscale"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                        achievement.unlocked ? "bg-yellow-500/20 text-yellow-500" : "bg-white/10 text-white"
                                    )}>
                                        {achievement.unlocked ? <achievement.icon size={20} /> : <Lock size={16} />}
                                    </div>
                                    <div>
                                        <h3 className={cn("font-bold text-sm", achievement.unlocked ? "text-white" : "text-neutral-400")}>
                                            {achievement.name}
                                        </h3>
                                        <p className="text-xs text-neutral-500">{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
