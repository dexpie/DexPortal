"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function BlogFilters({ categories, activeCategory, onCategoryChange }: BlogFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <FilterButton
                label="All"
                isActive={activeCategory === "all"}
                onClick={() => onCategoryChange("all")}
            />
            {categories.map((category) => (
                <FilterButton
                    key={category}
                    label={category}
                    isActive={activeCategory === category}
                    onClick={() => onCategoryChange(category)}
                />
            ))}
        </div>
    );
}

function FilterButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                    ? "text-cyan-400"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {isActive && (
                <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{label}</span>
        </motion.button>
    );
}
