"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(initialProjects.map((project) => project.category)))],
    [initialProjects]
  );

  const filteredProjects = initialProjects.filter((project) => (
    activeCategory === "All" || project.category === activeCategory
  ));

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 border-t border-[var(--border)] pt-10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] md:items-end md:gap-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Projects</p>
            <h2 className="section-heading font-heading font-extrabold text-[var(--foreground)]">
              Dex ecosystem, cleaned up.
            </h2>
          </div>

          <p className="mt-5 text-base leading-7 text-[var(--muted-foreground)] md:mt-0">
            A curated set of media apps, readers, tools, and utilities shaped around the Dex product line.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 md:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                activeCategory === category
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--foreground)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured = activeCategory === "All" && index === 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={cn(isFeatured && "md:col-span-2")}
                >
                  <ProjectCard project={project} index={index} featured={isFeatured} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
