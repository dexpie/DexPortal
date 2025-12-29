"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    // Generate random delays for a chaotic effect
    const layers = useMemo(() => [
        { color: "text-red-500", delay: "0s", translate: "translate-[2px,0]" },
        { color: "text-cyan-500", delay: "0.05s", translate: "translate-[-2px,0]" },
    ], []);

    return (
        <span className={cn("relative inline-block group", className)}>
            <span className="relative z-10">{text}</span>

            {/* Glitch Layers */}
            {layers.map((layer, i) => (
                <span
                    key={i}
                    className={cn(
                        "absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-100",
                        "animate-pulse",
                        layer.color
                    )}
                    style={{
                        animation: `glitch 0.4s cubic-bezier(.25, .46, .45, .94) both infinite`,
                        animationDelay: layer.delay,
                        transform: layer.translate,
                    }}
                >
                    {text}
                </span>
            ))}

            <style jsx>{`
                @keyframes glitch {
                    0% { transform: translate(0) }
                    20% { transform: translate(-2px, 2px) }
                    40% { transform: translate(-2px, -2px) }
                    60% { transform: translate(2px, 2px) }
                    80% { transform: translate(2px, -2px) }
                    100% { transform: translate(0) }
                }
            `}</style>
        </span>
    );
}
