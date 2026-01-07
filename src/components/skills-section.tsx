"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "TypeScript", level: 90, category: "Languages" },
    { name: "JavaScript", level: 95, category: "Languages" },
    { name: "Python", level: 75, category: "Languages" },
    { name: "React / Next.js", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Framer Motion", level: 80, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "PostgreSQL", level: 70, category: "Backend" },
    { name: "MongoDB", level: 75, category: "Backend" },
    { name: "Git / GitHub", level: 90, category: "Tools" },
    { name: "Docker", level: 65, category: "Tools" },
    { name: "Vercel", level: 85, category: "Tools" },
];

const categories = ["Languages", "Frontend", "Backend", "Tools"];

export function SkillsSection() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {categories.map((category) => (
                    <div key={category} className="p-6 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold text-cyan-400 mb-6">{category}</h3>
                        <div className="space-y-4">
                            {skills
                                .filter((s) => s.category === category)
                                .map((skill, i) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white">{skill.name}</span>
                                            <span className="text-neutral-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
