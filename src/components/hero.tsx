"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { CreatorCard } from "./creator-card";
import { GlitchText } from "./glitch-text";
import { TypewriterText } from "./typewriter-text";
import { AuroraBackground } from "./ui/aurora-background";
import { Button } from "./ui/button";
import { ArrowDown, Command } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <AuroraBackground>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 h-full w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                        className="flex flex-col items-start gap-6 max-w-2xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-neutral-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            v2.0 SYSTEM ONLINE
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                            Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                Alchemist
                            </span>
                        </h1>

                        <div className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed">
                            <TypewriterText
                                text="Crafting heavy-duty web experiences with a touch of magic. Full-stack developer based in Jakarta."
                                delay={1000}
                                speed={20}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-neutral-200 rounded-full px-8 text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { shiftKey: true, key: "k" }))}
                            >
                                <Command className="mr-2 h-4 w-4" /> Open Command
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 border-white/20 hover:bg-white/10 text-white backdrop-blur-sm"
                                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                View Projects
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Content - 3D Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden md:block"
                    >
                        <CreatorCard />
                    </motion.div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                    <ArrowDown className="animate-bounce" size={16} />
                </motion.div>

            </AuroraBackground>
        </section>
    );
}
