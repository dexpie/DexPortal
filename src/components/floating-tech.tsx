"use client";

import { motion } from "framer-motion";
import {
    SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
    SiNodedotjs, SiPython, SiDocker, SiGit, SiVercel, SiMongodb, SiPostgresql
} from "react-icons/si";
import { useState, useEffect } from "react";

const techIcons = [
    { Icon: SiTypescript, color: "#3178c6", name: "TypeScript" },
    { Icon: SiJavascript, color: "#f7df1e", name: "JavaScript" },
    { Icon: SiReact, color: "#61dafb", name: "React" },
    { Icon: SiNextdotjs, color: "#ffffff", name: "Next.js" },
    { Icon: SiTailwindcss, color: "#06b6d4", name: "Tailwind" },
    { Icon: SiNodedotjs, color: "#339933", name: "Node.js" },
    { Icon: SiPython, color: "#3776ab", name: "Python" },
    { Icon: SiDocker, color: "#2496ed", name: "Docker" },
    { Icon: SiGit, color: "#f05032", name: "Git" },
    { Icon: SiVercel, color: "#ffffff", name: "Vercel" },
    { Icon: SiMongodb, color: "#47a248", name: "MongoDB" },
    { Icon: SiPostgresql, color: "#4169e1", name: "PostgreSQL" },
];

export function FloatingTech() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {techIcons.map((tech, i) => {
                const angle = (i / techIcons.length) * Math.PI * 2;
                const radius = 200 + (i % 3) * 50;
                const duration = 20 + (i % 5) * 5;
                const delay = i * 0.5;

                return (
                    <motion.div
                        key={tech.name}
                        className="absolute left-1/2 top-1/2"
                        initial={{
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius,
                            opacity: 0,
                        }}
                        animate={{
                            x: [
                                Math.cos(angle) * radius,
                                Math.cos(angle + Math.PI) * radius,
                                Math.cos(angle + Math.PI * 2) * radius,
                            ],
                            y: [
                                Math.sin(angle) * radius,
                                Math.sin(angle + Math.PI) * radius,
                                Math.sin(angle + Math.PI * 2) * radius,
                            ],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.8, 1.1, 0.8],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay,
                        }}
                    >
                        <motion.div
                            className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            style={{
                                boxShadow: `0 0 20px ${tech.color}20`,
                            }}
                        >
                            <tech.Icon
                                size={24}
                                style={{ color: tech.color }}
                                className="drop-shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}
