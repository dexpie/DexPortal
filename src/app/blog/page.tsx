"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-red-400 transition-colors mb-6">
                        <ArrowLeft size={16} />
                        <span>Back to Portal</span>
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
                    >
                        Blog & Changelog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400 mt-4 max-w-xl"
                    >
                        Stay updated with the latest news, tutorials, and changelogs from the Dex Ecosystem.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
