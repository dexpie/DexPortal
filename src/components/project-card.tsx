"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/tech-badge";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [likes, setLikes] = useState(project.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLiked) return; // Prevent multiple likes for now (simple implementation)

        setIsLiked(true);
        setLikes(prev => prev + 1);

        try {
            await fetch("/api/projects/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: project.id }),
            });
        } catch (error) {
            // Revert on failure
            setLikes(prev => prev - 1);
            setIsLiked(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/projects/${project.id}`} className="block group relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-75 transition duration-500 blur-lg group-hover:blur-xl" />
                <div className="relative h-full bg-black border border-white/10 rounded-xl p-6 hover:bg-neutral-950 transition-colors duration-300 flex flex-col justify-between overflow-hidden">

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
                            <ArrowUpRight className="text-neutral-500 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                            {project.description}
                        </p>

                        {project.techStack && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map(tech => (
                                    <TechBadge key={tech} name={tech} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-neutral-500 font-mono">
                            STATUS: <span className="text-neutral-300">{project.status.toUpperCase()}</span>
                        </span>
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center gap-1.5 text-xs font-medium transition-colors px-2 py-1 rounded-full",
                                isLiked ? "text-red-400 bg-red-500/10" : "text-neutral-500 hover:text-red-400 hover:bg-white/5"
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn("transition-transform", isLiked && "scale-110")}
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            {likes}
                        </button>
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
                        <div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/50 bg-black">
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
