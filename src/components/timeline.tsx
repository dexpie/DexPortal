"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timelineData } from "@/lib/timeline";
import { cn } from "@/lib/utils";

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="w-full max-w-4xl mx-auto py-20 px-6" ref={containerRef}>
            <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                Ecosystem Timeline
            </h2>

            <div className="relative">
                {/* Vertical Line Background */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 -translate-x-1/2" />

                {/* Vertical Line Fill (Animated) */}
                <motion.div
                    style={{ height }}
                    className="absolute left-[20px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-600 via-cyan-900 to-transparent -translate-x-1/2 origin-top"
                />

                <div className="space-y-12">
                    {timelineData.map((item, index) => (
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
                                        <span className="text-xs font-mono text-cyan-500">{item.date}</span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/5 text-neutral-300 w-fit">{item.project}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
