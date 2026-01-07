"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/blog/${post.slug}`} className="block group">
                <div className="relative p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:bg-neutral-900">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                            "text-xs font-medium px-2.5 py-1 rounded-full",
                            post.category === "Changelog" ? "bg-green-500/10 text-green-400" :
                                post.category === "Tutorial" ? "bg-blue-500/10 text-blue-400" :
                                    "bg-yellow-500/10 text-yellow-400"
                        )}>
                            {post.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-mono">{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                        <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
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
