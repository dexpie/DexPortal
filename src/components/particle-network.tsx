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
        const numPoints = Math.floor((width * height) / 15000);

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

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            pointsRef.current = initPoints(canvas.width, canvas.height);
        };
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const points = pointsRef.current;
            const mouse = mouseRef.current;

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

                // Draw connections
                for (let j = i + 1; j < points.length; j++) {
                    const other = points[j];
                    const dx = point.x - other.x;
                    const dy = point.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
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
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 * (1 - mDist / 100)})`;
                    ctx.stroke();
                }
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

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
