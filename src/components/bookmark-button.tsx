"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

interface BookmarkButtonProps {
    itemId: string;
    itemType: "blog" | "project";
    className?: string;
}

export function BookmarkButton({ itemId, itemType, className }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem("dexportal_bookmarks") || "{}");
        setIsBookmarked(!!bookmarks[`${itemType}-${itemId}`]);
    }, [itemId, itemType]);

    const toggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const bookmarks = JSON.parse(localStorage.getItem("dexportal_bookmarks") || "{}");
        const key = `${itemType}-${itemId}`;

        if (bookmarks[key]) {
            delete bookmarks[key];
            setIsBookmarked(false);
            toast.success("Removed from bookmarks");
        } else {
            bookmarks[key] = { id: itemId, type: itemType, addedAt: new Date().toISOString() };
            setIsBookmarked(true);
            toast.success("Added to bookmarks! 🔖");
        }

        localStorage.setItem("dexportal_bookmarks", JSON.stringify(bookmarks));
    };

    return (
        <motion.button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-colors ${isBookmarked
                    ? "text-yellow-400 bg-yellow-500/10"
                    : "text-neutral-500 hover:text-yellow-400 hover:bg-white/5"
                } ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </motion.button>
    );
}

// Hook to get all bookmarks
export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Record<string, { id: string; type: string; addedAt: string }>>({});

    useEffect(() => {
        const saved = localStorage.getItem("dexportal_bookmarks");
        if (saved) {
            setBookmarks(JSON.parse(saved));
        }
    }, []);

    return bookmarks;
}
