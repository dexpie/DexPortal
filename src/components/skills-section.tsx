"use client";

import { motion } from "framer-motion";
import { TechBadge } from "@/components/tech-badge";

const SKILLS = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "Tailwind", "PostgreSQL", "MongoDB", "Docker",
    "Git", "Figma", "Three.js", "Framer Motion", "Supabase"
];

export function SkillsSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-muted/20 dark:bg-black/20 border-y border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                        Tech Stack
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                        The technologies and tools I use to build digital experiences.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                        {SKILLS.map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <TechBadge name={skill} className="text-sm px-4 py-1.5" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
