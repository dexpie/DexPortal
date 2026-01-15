"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export function ProjectFilter({ categories, activeCategory, onSelect }: ProjectFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        activeCategory === category
                            ? "text-white"
                            : "text-neutral-400 hover:text-white"
                    )}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
}
