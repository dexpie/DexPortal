"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, ExternalLink } from "lucide-react";

interface ChangelogItem {
    id: string;
    date: string;
    title: string;
    description: string;
    project: string;
    type: string;
    url?: string;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const [items, setItems] = useState<ChangelogItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChangelog() {
            try {
                const response = await fetch(`/api/github/changelog?t=${Date.now()}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchChangelog();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto py-20 px-6" ref={containerRef}>
            <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                Live Changelog
            </h2>
            <p className="text-center text-neutral-500 text-sm mb-16 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Real-time from GitHub
            </p>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                </div>
            ) : (
                <div className="relative">
                    {/* Vertical Line Background */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 -translate-x-1/2" />

                    {/* Vertical Line Fill (Animated) */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-[20px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-600 via-cyan-900 to-transparent -translate-x-1/2 origin-top"
                    />

                    <div className="space-y-12">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={cn(
                                    "relative flex items-start md:items-center gap-8 md:gap-0",
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                )}
                            >
                                {/* Dot */}
                                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-500 rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

                                {/* Content Card */}
                                <div className={cn(
                                    "w-[calc(100%-60px)] md:w-[calc(50%-40px)] ml-12 md:ml-0",
                                    index % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8 md:text-left"
                                )}>
                                    <div className="p-6 rounded-xl bg-black/80 border border-white/10 hover:border-cyan-500/50 transition-colors backdrop-blur-sm group shadow-lg shadow-cyan-900/5">
                                        <div className={cn(
                                            "flex flex-col gap-1 mb-2",
                                            index % 2 === 0 ? "md:items-end" : "md:items-start"
                                        )}>
                                            <span className="text-xs font-mono text-cyan-500">{formatDate(item.date)}</span>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/5 text-neutral-300 w-fit">{item.project}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.url && (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-cyan-400 transition-colors"
                                            >
                                                View Commit <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
