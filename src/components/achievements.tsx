"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { toast } from "sonner";
import { Trophy, Eye, BookOpen, MessageSquare, Star, Zap } from "lucide-react";

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: typeof Trophy;
    unlocked: boolean;
    unlockedAt?: string;
}

const defaultAchievements: Achievement[] = [
    { id: "first_visit", name: "First Steps", description: "Welcome to DexPortal!", icon: Star, unlocked: false },
    { id: "explorer", name: "Explorer", description: "Visit 5 different pages", icon: Eye, unlocked: false },
    { id: "reader", name: "Bookworm", description: "Read 3 blog posts", icon: BookOpen, unlocked: false },
    { id: "chatter", name: "Social Butterfly", description: "Sign the guestbook", icon: MessageSquare, unlocked: false },
    { id: "night_owl", name: "Night Owl", description: "Browse at midnight", icon: Zap, unlocked: false },
    { id: "speed_demon", name: "Speed Demon", description: "Use keyboard shortcuts", icon: Zap, unlocked: false },
];

interface AchievementContextType {
    achievements: Achievement[];
    unlock: (id: string) => void;
    progress: { pagesVisited: string[]; blogsRead: string[] };
    trackPage: (path: string) => void;
    trackBlogRead: (slug: string) => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function AchievementsProvider({ children }: { children: ReactNode }) {
    const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
    const [progress, setProgress] = useState({ pagesVisited: [] as string[], blogsRead: [] as string[] });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("dexportal_achievements");
        if (saved) {
            try {
                const parsed: Achievement[] = JSON.parse(saved);
                // Merge saved unlock status with default icons
                setAchievements(prev => prev.map(def => {
                    const savedItem = parsed.find(p => p.id === def.id);
                    return savedItem ? { ...def, unlocked: savedItem.unlocked, unlockedAt: savedItem.unlockedAt } : def;
                }));
            } catch (e) {
                console.error("Failed to parse achievements", e);
            }
        }
        const savedProgress = localStorage.getItem("dexportal_progress");
        if (savedProgress) {
            try {
                setProgress(JSON.parse(savedProgress));
            } catch (e) { /* ignore */ }
        }
    }, []);

    // First visit achievement
    useEffect(() => {
        const hasVisited = localStorage.getItem("dexportal_first_visit");
        if (!hasVisited) {
            localStorage.setItem("dexportal_first_visit", "true");
            setTimeout(() => unlock("first_visit"), 2000);
        }
    }, []);

    const unlock = useCallback((id: string) => {
        setAchievements(prev => {
            const achievement = prev.find(a => a.id === id);
            if (achievement && !achievement.unlocked) {
                toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
                    description: achievement.description,
                    duration: 5000,
                });

                const updated = prev.map(a =>
                    a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
                );

                // Persist only safe data (exclude icons)
                const safeToSave = updated.map(({ icon, ...rest }) => rest);
                localStorage.setItem("dexportal_achievements", JSON.stringify(safeToSave));

                return updated;
            }
            return prev;
        });
    }, []);

    const trackPage = useCallback((path: string) => {
        setProgress(prev => {
            if (!prev.pagesVisited.includes(path)) {
                const updated = { ...prev, pagesVisited: [...prev.pagesVisited, path] };
                localStorage.setItem("dexportal_progress", JSON.stringify(updated));

                if (updated.pagesVisited.length >= 5) {
                    setTimeout(() => unlock("explorer"), 500);
                }
                return updated;
            }
            return prev;
        });
    }, [unlock]);

    const trackBlogRead = useCallback((slug: string) => {
        setProgress(prev => {
            if (!prev.blogsRead.includes(slug)) {
                const updated = { ...prev, blogsRead: [...prev.blogsRead, slug] };
                localStorage.setItem("dexportal_progress", JSON.stringify(updated));

                if (updated.blogsRead.length >= 3) {
                    setTimeout(() => unlock("reader"), 500);
                }
                return updated;
            }
            return prev;
        });
    }, [unlock]);

    return (
        <AchievementContext.Provider value={{ achievements, unlock, progress, trackPage, trackBlogRead }}>
            {children}
        </AchievementContext.Provider>
    );
}

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (!context) {
        return {
            achievements: defaultAchievements,
            unlock: () => { },
            progress: { pagesVisited: [], blogsRead: [] },
            trackPage: () => { },
            trackBlogRead: () => { },
        };
    }
    return context;
}
