"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SoundContextType {
    enabled: boolean;
    toggle: () => void;
    playClick: () => void;
    playHover: () => void;
    playSuccess: () => void;
    playError: () => void;
    playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

// Web Audio API based sound generation (no external files needed)
function createOscillator(frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.1) {
    if (typeof window === "undefined") return;

    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        // Audio context not available
    }
}

export function SoundProvider({ children }: { children: ReactNode }) {
    const [enabled, setEnabled] = useState(false);

    const toggle = useCallback(() => {
        setEnabled(prev => !prev);
    }, []);

    const playClick = useCallback(() => {
        if (!enabled) return;
        createOscillator(800, 0.08, "square", 0.05);
    }, [enabled]);

    const playHover = useCallback(() => {
        if (!enabled) return;
        createOscillator(400, 0.05, "sine", 0.03);
    }, [enabled]);

    const playSuccess = useCallback(() => {
        if (!enabled) return;
        createOscillator(523, 0.1, "sine", 0.08);
        setTimeout(() => createOscillator(659, 0.1, "sine", 0.08), 100);
        setTimeout(() => createOscillator(784, 0.15, "sine", 0.08), 200);
    }, [enabled]);

    const playError = useCallback(() => {
        if (!enabled) return;
        createOscillator(200, 0.15, "sawtooth", 0.05);
    }, [enabled]);

    const playWhoosh = useCallback(() => {
        if (!enabled) return;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createOscillator(200 + i * 100, 0.05, "sine", 0.02), i * 20);
        }
    }, [enabled]);

    return (
        <SoundContext.Provider value={{ enabled, toggle, playClick, playHover, playSuccess, playError, playWhoosh }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSounds() {
    const context = useContext(SoundContext);
    if (!context) {
        return {
            enabled: false,
            toggle: () => { },
            playClick: () => { },
            playHover: () => { },
            playSuccess: () => { },
            playError: () => { },
            playWhoosh: () => { },
        };
    }
    return context;
}
