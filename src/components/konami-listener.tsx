"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { AdminOverlay } from "@/components/admin-overlay";

export function KonamiListener() {
    const [input, setInput] = useState<string[]>([]);
    const [showOverlay, setShowOverlay] = useState(false);

    // The Sequence: Up Up Down Down Left Right Left Right B A
    const KONAMI_CODE = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newItem = e.key;

            setInput((prev) => {
                const newHelper = [...prev, newItem];

                // Keep only the last N keys where N is length of code
                if (newHelper.length > KONAMI_CODE.length) {
                    newHelper.shift();
                }

                // Check if matches
                if (JSON.stringify(newHelper) === JSON.stringify(KONAMI_CODE)) {
                    triggerEasterEgg();
                    return []; // Reset after success
                }

                return newHelper;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const triggerEasterEgg = () => {
        // 1. Play sound effect
        const audio = new Audio("https://www.myinstants.com/media/sounds/tada_1.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed", e));

        // 2. Fire Cannons!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // 3. Show Admin Overlay
        setShowOverlay(true);
    };

    return (
        <>
            <AdminOverlay isOpen={showOverlay} onClose={() => setShowOverlay(false)} />

            {/* Secret Hint */}
            <div className="fixed bottom-2 right-2 opacity-0 hover:opacity-10 transition-opacity pointer-events-none">
                <span className="text-[10px] text-white">↑↑↓↓←→←→BA</span>
            </div>
        </>
    );
}
