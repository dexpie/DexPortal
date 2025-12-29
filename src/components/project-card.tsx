"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={project.href} className="block group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-75 transition duration-500 blur-lg group-hover:blur-xl" />
                <div className="relative h-full bg-neutral-900 border border-white/10 rounded-xl p-6 hover:bg-neutral-800 transition-colors duration-300 flex flex-col justify-between overflow-hidden">

                    {/* Shine Effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border",
                                project.status === "Live" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                    project.status === "Development" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                        "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            )}>
                                {project.category}
                            </span>
                            <ArrowUpRight className="text-neutral-500 group-hover:text-red-400 transition-colors duration-300" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-neutral-500 font-mono">
                            STATUS: <span className="text-neutral-300">{project.status.toUpperCase()}</span>
                        </span>
                    </div>
                </div>
            </Link>

            {/* Preview Modal on Hover */}
            <AnimatePresence>
                {isHovered && project.previewImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-4 w-72 pointer-events-none"
                    >
                        <div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-neutral-900">
                            <Image
                                src={project.previewImage}
                                alt={`${project.title} preview`}
                                width={288}
                                height={180}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-2 text-center text-xs text-neutral-400 bg-black/50">
                                Live Preview
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
