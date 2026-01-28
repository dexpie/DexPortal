"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { CreatorCard } from "./creator-card";
import { GlitchText } from "./glitch-text";
import { TypewriterText } from "./typewriter-text";
import { AuroraBackground } from "./ui/aurora-background";
import { Button } from "./ui/button";
import { ArrowDown, Command } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
    return (
        <section
            data-component="Hero"
            data-type="Server Component (Async)"
            className="relative min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center"
        >
            <AuroraBackground className="absolute inset-0 z-0">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 h-full w-full max-w-7xl mx-auto">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start gap-8 max-w-3xl"
                    >
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest text-neutral-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-shadow">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            v2.0 System Online
                        </div>

                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] font-heading">
                            Digital <br />
                            <GlitchText text="Alchemist" />
                        </h1>

                        <div className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed font-light">
                            <TypewriterText
                                text="Crafting heavy-duty web experiences with a touch of magic. Full-stack developer based in Jakarta."
                                delay={1000}
                                speed={20}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 mt-2">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-neutral-200 rounded-full px-8 h-12 text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 active:scale-95"
                                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { shiftKey: true, key: "k" }))}
                            >
                                <Command className="mr-2 h-4 w-4" /> Open Command
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 h-12 border-white/10 hover:bg-white/5 text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
                                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                View Projects
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Content - 3D Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 1, type: "spring" }}
                        className="hidden lg:block relative z-20"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
                            <CreatorCard />
                        </div>
                    </motion.div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll to Explore</span>
                    <ArrowDown className="animate-bounce" size={16} />
                </motion.div>

            </AuroraBackground>
        </section>
    );
}
