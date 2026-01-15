"use client";

import { motion } from "framer-motion";
import { Code, Palette, Wrench, Rocket, Brain, Zap } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "Web Development",
        description: "Modern, responsive websites and web applications built with React, Next.js, and TypeScript.",
        color: "cyan",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Beautiful, intuitive interfaces with attention to detail and user experience.",
        color: "purple",
    },
    {
        icon: Wrench,
        title: "API Integration",
        description: "Seamless integration with third-party services and custom API development.",
        color: "orange",
    },
    {
        icon: Rocket,
        title: "Performance Optimization",
        description: "Speed up your website with modern optimization techniques and best practices.",
        color: "green",
    },
    {
        icon: Brain,
        title: "AI Solutions",
        description: "Leverage AI and machine learning to enhance your applications.",
        color: "pink",
    },
    {
        icon: Zap,
        title: "Consulting",
        description: "Technical guidance and architecture planning for your projects.",
        color: "yellow",
    },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", glow: "group-hover:shadow-orange-500/20" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", glow: "group-hover:shadow-green-500/20" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", glow: "group-hover:shadow-pink-500/20" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", glow: "group-hover:shadow-yellow-500/20" },
};

export function ServicesSection() {
    return (
        <section className="container mx-auto px-6 py-20 border-t border-white/5">
            <div className="flex flex-col items-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-600 to-transparent mb-6" />
                <h2 className="text-3xl font-bold text-center">What I Do</h2>
                <p className="text-neutral-400 text-center mt-2 max-w-md">
                    Transforming ideas into digital reality with modern technologies.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    const colors = colorClasses[service.color];

                    return (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:shadow-lg ${colors.glow}`}
                        >
                            <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                                <Icon className={`${colors.text}`} size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
