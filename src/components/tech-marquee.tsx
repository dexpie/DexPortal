"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const technologies = [
    { name: "Next.js", title: "Framework", quote: "The React Framework for the Web" },
    { name: "React", title: "Library", quote: "A JavaScript library for building user interfaces" },
    { name: "TypeScript", title: "Language", quote: "JavaScript with syntax for types" },
    { name: "Tailwind CSS", title: "Styling", quote: "Rapidly build modern websites without ever leaving your HTML" },
    { name: "Framer Motion", title: "Animation", quote: "A production-ready motion library for React" },
    { name: "Node.js", title: "Runtime", quote: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
    { name: "PostgreSQL", title: "Database", quote: "The World's Most Advanced Open Source Relational Database" },
    { name: "Supabase", title: "Backend", quote: "The Open Source Firebase Alternative" },
    { name: "Three.js", title: "3D", quote: "JavaScript 3D library" },
];

export function TechMarquee() {
    return (
        <div className="py-10 bg-black relative flex flex-col items-center justify-center overflow-hidden">
            <h3 className="text-center text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
                Powered by Modern Tech Stack
            </h3>
            <InfiniteMovingCards
                items={technologies}
                direction="right"
                speed="slow"
                className="bg-transparent"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black z-10" />
        </div>
    );
}
