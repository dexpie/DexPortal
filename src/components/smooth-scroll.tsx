"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Respect prefers-reduced-motion - skip smooth scroll for accessibility
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Pause when tab hidden to save resources
        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenis.stop();
            } else {
                lenis.start();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
