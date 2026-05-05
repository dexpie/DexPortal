"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { Project } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface FeaturedCarouselProps {
    projects: Project[];
}

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const featuredProjects = projects.filter(p => p.status === "Live").slice(0, 5);

    useEffect(() => {
        if (isPaused || featuredProjects.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, featuredProjects.length]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

    if (featuredProjects.length === 0) return null;

    const project = featuredProjects[currentIndex];

    return (
        <section className="container mx-auto px-6 py-20 border-t border-white/5">
            <div className="flex flex-col items-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-6" />
                <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    <Star className="text-yellow-400" size={24} />
                    Featured Projects
                </h2>
            </div>

            <div
                className="relative max-w-5xl mx-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Navigation Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-10 hidden lg:block"
                >
                    <ChevronLeft size={24} className="text-neutral-400" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-10 hidden lg:block"
                >
                    <ChevronRight size={24} className="text-neutral-400" />
                </button>

                {/* Carousel Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        {/* Image */}
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
                            {project.previewImage ? (
                                <Image
                                    src={project.previewImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority={currentIndex === 0}
                                    loading={currentIndex === 0 ? "eager" : "lazy"}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono">
                                    NO PREVIEW
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 border border-green-500/30 text-green-400">
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-4">
                            <span className="text-sm text-cyan-400 font-mono">
                                {project.category}
                            </span>
                            <h3 className="text-3xl font-bold text-white">
                                {project.title}
                            </h3>
                            <p className="text-neutral-400 leading-relaxed">
                                {project.description}
                            </p>

                            {project.techStack && (
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-neutral-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
                                >
                                    View Details
                                </Link>
                                {project.href && project.href !== "#" && (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {featuredProjects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-cyan-400 w-6" : "bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
