"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full min-h-[310px] flex-col rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/45 hover:shadow-xl hover:shadow-black/10"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            {post.category}
          </span>
          <span className="text-xs font-semibold text-[var(--muted-foreground)]">{post.date}</span>
        </div>

        <h3 className="mt-7 font-heading text-2xl font-black leading-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
          {post.title}
        </h3>
        <p className="mt-4 line-clamp-4 text-base leading-7 text-[var(--muted-foreground)]">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)]">
            <Clock size={16} />
            {post.readTime}
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
