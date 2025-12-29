"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Sound URLs (using free sound effects)
const sounds = {
    hover: "/sounds/hover.mp3",
    click: "/sounds/click.mp3",
    boot: "/sounds/boot.mp3",
};

export function useSoundEffects() {
    const [enabled, setEnabled] = useState(false);
    const audioCache = useRef<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        // Preload sounds
        Object.entries(sounds).forEach(([key, src]) => {
            const audio = new Audio(src);
            audio.volume = 0.3;
            audioCache.current[key] = audio;
        });
    }, []);

    const play = useCallback((sound: keyof typeof sounds) => {
        if (!enabled) return;
        const audio = audioCache.current[sound];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => { });
        }
    }, [enabled]);

    return { play, enabled, setEnabled };
}

// Global sound context provider
import { createContext, useContext, ReactNode } from "react";

const SoundContext = createContext<ReturnType<typeof useSoundEffects> | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
    const soundEffects = useSoundEffects();

    return (
        <SoundContext.Provider value={soundEffects}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useSound must be used within SoundProvider");
    }
    return context;
}

// Sound toggle button component
export function SoundToggle() {
    const { enabled, setEnabled } = useSound();

    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-neutral-400 hover:text-cyan-400 transition-colors"
            title={enabled ? "Mute sounds" : "Enable sounds"}
        >
            {enabled ? "🔊" : "🔇"}
        </button>
    );
}
