"use client";

import { motion } from "framer-motion";
import { TechBadge } from "@/components/tech-badge";

const SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "Tailwind", "PostgreSQL", "MongoDB", "Docker",
  "Git", "Figma", "Framer Motion", "Supabase", "Three.js"
];

export function SkillsSection() {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-center">
        Tech Stack
      </h2>
      <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 text-center">
        The technologies and tools I use to build digital experiences.
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04 }}
            viewport={{ once: true }}
          >
            <TechBadge name={skill} className="text-sm px-4 py-1.5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}