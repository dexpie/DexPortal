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
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        activeCategory === category
                            ? "text-[var(--primary-foreground)]"
                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 rounded-lg border border-[var(--primary)] bg-[var(--primary)]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
}
