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
    const mouseRef = useRef({ x: 0, y: 0 });
    const pointsRef = useRef<Point[]>([]);

    const initPoints = useCallback((width: number, height: number) => {
        const points: Point[] = [];
        const numPoints = Math.floor((width * height) / 25000);

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
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let lastFrameTime = 0;
        const targetFPS = 30; // Limit to 30 FPS for performance
        const frameInterval = 1000 / targetFPS;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Reduce particle density for better performance
            pointsRef.current = initPoints(canvas.width, canvas.height);
        };
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        const animate = (timestamp: number) => {
            if (document.hidden) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            const elapsed = timestamp - lastFrameTime;

            if (elapsed > frameInterval) {
                lastFrameTime = timestamp - (elapsed % frameInterval);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const points = pointsRef.current;
                const mouse = mouseRef.current;

                // PERFORMANCE: Check if we are in light mode (canvas hidden via CSS) or checking a global state? 
                // Since this component is inside a div hidden by CSS in light mode, the JS still runs.
                // Let's check computed style for visibility/display, but that is expensive.
                // Instead, rely on the fact that if it's hidden, we shouldn't draw.
                // For now, let's just stick to 30FPS and reduced count.

                // Update and draw points
                points.forEach((point, i) => {
                    // Move
                    point.x += point.vx;
                    point.y += point.vy;

                    // Bounce off walls
                    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                    // Draw point
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
                    ctx.fill();

                    // Draw connections - OPTIMIZED DISTANCE CHECK
                    // Only check points nearby to avoid O(N^2) checks if possible? 
                    // No, simple distance check is O(N^2), but N is small.
                    // Just reduce max distance to draw less lines.

                    for (let j = i + 1; j < points.length; j++) {
                        const other = points[j];
                        const dx = point.x - other.x;
                        const dy = point.y - other.y;
                        const distSq = dx * dx + dy * dy;

                        // 150*150 = 22500
                        if (distSq < 22500) {
                            const dist = Math.sqrt(distSq);
                            ctx.beginPath();
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 150)})`;
                            ctx.stroke();
                        }
                    }

                    // Mouse interaction
                    const mdx = point.x - mouse.x;
                    const mdy = point.y - mouse.y;
                    const mDistSq = mdx * mdx + mdy * mdy;

                    // 100*100 = 10000
                    if (mDistSq < 10000) {
                        const mDist = Math.sqrt(mDistSq);
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 * (1 - mDist / 100)})`;
                        ctx.stroke();
                    }
                });
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [initPoints]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 pointer-events-none"
        />
    );
}
