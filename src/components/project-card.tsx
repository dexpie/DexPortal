"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/tech-badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Card3D } from "@/components/ui/card-3d";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [likes, setLikes] = useState(project.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLiked) return;

        setIsLiked(true);
        setLikes(prev => prev + 1);

        try {
            await fetch("/api/projects/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: project.id }),
            });
        } catch (error) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full perspective-1000"
        >
            <Card3D className="h-full">
                <Link href={`/projects/${project.id}`} className="block group h-full">
                    <HoverBorderGradient
                        containerClassName="rounded-2xl h-full"
                        className="h-full bg-black p-0 overflow-hidden flex flex-col"
                        duration={1.5}
                        as="div"
                    >
                        {/* Card Content Wrapper */}
                        <div className="relative z-10 p-6 flex flex-col h-full bg-black/40 backdrop-blur-sm">

                            {/* Header: Category & Arrow */}
                            <div className="flex justify-between items-center mb-6">
                                <span className={cn(
                                    "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border",
                                    project.status === "Live" ? "text-green-400 border-green-500/20 bg-green-500/5" :
                                        project.status === "Development" ? "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" :
                                            "text-blue-400 border-blue-500/20 bg-blue-500/5"
                                )}>
                                    {project.category}
                                </span>
                                <ArrowUpRight className="text-neutral-500 group-hover:text-cyan-400 transition-colors duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                            </div>

                            {/* Title & Description */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors font-heading">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-auto mb-6">
                                {project.techStack && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.slice(0, 3).map(tech => (
                                            <TechBadge key={tech} name={tech} />
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <span className="text-xs text-neutral-500 py-1">+ {project.techStack.length - 3}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer: Status & Like */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                                <span className="text-xs text-neutral-600 font-mono flex items-center gap-1.5">
                                    <span className={cn("w-1.5 h-1.5 rounded-full",
                                        project.status === "Live" ? "bg-green-500 animate-pulse" :
                                            project.status === "Development" ? "bg-yellow-500" :
                                                "bg-blue-500"
                                    )} />
                                    {project.status.toUpperCase()}
                                </span>

                                <button
                                    onClick={handleLike}
                                    className={cn(
                                        "flex items-center gap-1.5 text-xs font-medium transition-all px-3 py-1.5 rounded-full border border-transparent",
                                        isLiked
                                            ? "text-red-400 bg-red-500/10 border-red-500/20"
                                            : "text-neutral-500 hover:text-white hover:bg-white/5 hover:border-white/10"
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
                                        className={cn("transition-transform duration-300", isLiked && "scale-110")}
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                    {likes}
                                </button>
                            </div>
                        </div>
                    </HoverBorderGradient>
                </Link>
            </Card3D>
        </motion.div>
    );
}
