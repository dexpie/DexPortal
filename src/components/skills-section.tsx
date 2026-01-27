"use client";

import { motion } from "framer-motion";
import { SkillGalaxy } from "@/components/skill-galaxy";

export function SkillsSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-black text-white">

            {/* Header */}
            <div className="container mx-auto px-6 mb-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                        &lt;Skill_Universe /&gt;
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A constellation of technologies orbiting my core expertise. Interact to explore relations.
                    </p>
                </motion.div>
            </div>

            {/* 3D Galaxy */}
            <div className="w-full relative z-0">
                <SkillGalaxy />
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
