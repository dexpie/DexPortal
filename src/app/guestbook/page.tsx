"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Guestbook } from "@/components/guestbook";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GuestbookPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-red-400 transition-colors mb-8">
                        <ArrowLeft size={16} />
                        <span>Back to Portal</span>
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-4"
                    >
                        Sign the Guestbook
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400"
                    >
                        Leave a mark! Share your thoughts, suggestions, or just say hello.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Guestbook />
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
