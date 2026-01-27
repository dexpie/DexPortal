"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";

interface ProjectsSectionProps {
    initialProjects: Project[];
}

import { Search, Filter } from "lucide-react";

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState("All Stack");

    // Extract unique categories and tech stacks
    const categories = ["All", ...Array.from(new Set(initialProjects.map(p => p.category)))];
    const techStacks = ["All Stack", ...Array.from(new Set(initialProjects.flatMap(p => p.techStack || [])))];

    const filteredProjects = initialProjects.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = selectedTech === "All Stack" || p.techStack?.includes(selectedTech);

        return matchesCategory && matchesSearch && matchesTech;
    });

    return (
        <section className="container mx-auto px-6 py-20 relative">
            <div className="flex flex-col items-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-600 to-transparent mb-6"
                />
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center"
                >
                    Explore Projects
                </motion.h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
                <ProjectFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                <div className="flex gap-4 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground dark:text-white focus:border-cyan-500 outline-none transition-colors"
                        />
                    </div>

                    {/* Tech Stack Filter */}
                    <div className="relative">
                        <select
                            value={selectedTech}
                            onChange={(e) => setSelectedTech(e.target.value)}
                            className="appearance-none bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-foreground dark:text-white focus:border-cyan-500 outline-none transition-colors cursor-pointer"
                        >
                            {techStacks.map(tech => (
                                <option key={tech} value={tech} className="bg-popover dark:bg-neutral-900 text-foreground dark:text-white">{tech}</option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No projects found matching your criteria.
                </div>
            )}
        </section>
    );
}
