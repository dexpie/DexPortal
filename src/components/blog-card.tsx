"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { ArrowRight, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Deterministic "fake" likes based on slug length to make it look active
        const baseLikes = post.slug.length * 12 + index * 5;
        const stored = localStorage.getItem(`blog_like_${post.slug}`);
        setLikes(baseLikes + (stored ? 1 : 0));
        setLiked(!!stored);
    }, [post.slug, index]);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (liked) {
            setLikes(prev => prev - 1);
            setLiked(false);
            localStorage.removeItem(`blog_like_${post.slug}`);
        } else {
            setLikes(prev => prev + 1);
            setLiked(true);
            localStorage.setItem(`blog_like_${post.slug}`, "true");
            // Trigger a mini burst if possible, or just visual feedback
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/blog/${post.slug}`} className="block group">
                <div className="relative p-6 rounded-xl bg-card dark:bg-neutral-900/50 border border-border dark:border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:bg-muted/50 dark:hover:bg-neutral-900 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                            "text-xs font-medium px-2.5 py-1 rounded-full",
                            post.category === "Changelog" ? "bg-green-500/10 text-green-400" :
                                post.category === "Tutorial" ? "bg-blue-500/10 text-blue-400" :
                                    "bg-yellow-500/10 text-yellow-400"
                        )}>
                            {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-card-foreground dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-neutral-400 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                            </div>
                            <button
                                onClick={handleLike}
                                className={cn(
                                    "flex items-center gap-1.5 transition-all hover:scale-110",
                                    liked ? "text-pink-500" : "hover:text-pink-400"
                                )}
                            >
                                <Heart size={14} className={cn(liked && "fill-current")} />
                                <span>{likes}</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform">
                            <span>Read More</span>
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
