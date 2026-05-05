"use client";

import { useEffect, useRef, useCallback } from "react";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const pointsRef = useRef<Point[]>([]);
    const isVisibleRef = useRef(false);

    const initPoints = useCallback((width: number, height: number) => {
        const points: Point[] = [];
        // Reduce density on weaker devices (low CPU core count)
        const densityDivisor = (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4) ? 40000 : 25000;
        const numPoints = Math.floor((width * height) / densityDivisor);

        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }
        return points;
    }, []);

    useEffect(() => {
        // Respect user preference for reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let lastFrameTime = 0;
        const targetFPS = 24; // 24fps is fine for background effect
        const frameInterval = 1000 / targetFPS;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            pointsRef.current = initPoints(canvas.width, canvas.height);
        };
        resize();

        // Use IntersectionObserver to stop rendering when not visible
        const observer = new IntersectionObserver(
            (entries) => { isVisibleRef.current = entries[0].isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(document.documentElement);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        const animate = (timestamp: number) => {
            animationId = requestAnimationFrame(animate);

            // Pause when tab is hidden or canvas not in viewport
            if (document.hidden || !isVisibleRef.current) return;

            const elapsed = timestamp - lastFrameTime;
            if (elapsed < frameInterval) return;
            lastFrameTime = timestamp - (elapsed % frameInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const points = pointsRef.current;
            const mouse = mouseRef.current;
            const maxDist = 130;
            const maxDistSq = maxDist * maxDist;

            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                point.x += point.vx;
                point.y += point.vy;

                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
                ctx.fill();

                // Draw connections to nearby points
                for (let j = i + 1; j < points.length; j++) {
                    const other = points[j];
                    const dx = point.x - other.x;
                    const dy = point.y - other.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / maxDist)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                const mdx = point.x - mouse.x;
                const mdy = point.y - mouse.y;
                const mDistSq = mdx * mdx + mdy * mdy;
                if (mDistSq < 10000) {
                    const mDist = Math.sqrt(mDistSq);
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.35 * (1 - mDist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            observer.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [initPoints]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 pointer-events-none"
            aria-hidden="true"
        />
    );
}
