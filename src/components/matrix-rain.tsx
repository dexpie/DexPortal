"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Respect user preference for reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ハヒフヘホマミムメモ23ヤユヨラリルレロ45ワヲン67ABCDEF89";
        const charArray = chars.split("");
        const fontSize = 14;
        let columns = 0;
        let drops: number[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        };
        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(document.documentElement);

        let animationId: number;
        let lastFrameTime = 0;
        const targetFPS = 20;
        const frameInterval = 1000 / targetFPS;

        const draw = (timestamp: number) => {
            animationId = requestAnimationFrame(draw);

            if (document.hidden) return;

            const elapsed = timestamp - lastFrameTime;
            if (elapsed < frameInterval) return;
            lastFrameTime = timestamp - (elapsed % frameInterval);

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0ff";
            ctx.font = `${fontSize}px monospace`;
            ctx.globalAlpha = 0.1;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            ctx.globalAlpha = 1;
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none opacity-25"
            aria-hidden="true"
        />
    );
}
