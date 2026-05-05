"use client";

import { motion } from "framer-motion";
import { Code, Palette, Wrench, Rocket, Brain, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with React, Next.js, and TypeScript.",
    color: "primary",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces with attention to detail and user experience.",
    color: "secondary",
  },
  {
    icon: Wrench,
    title: "API Integration",
    description: "Seamless integration with third-party services and custom API development.",
    color: "accent",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Speed up your website with modern optimization techniques and best practices.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Leverage AI and machine learning to enhance your applications.",
    color: "secondary",
  },
  {
    icon: MessageCircle,
    title: "Consulting",
    description: "Technical guidance and architecture planning for your projects.",
    color: "accent",
  },
];

export function ServicesSection() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-6" />
      <h2 className="text-3xl font-bold text-center mb-4 font-heading">What I Do</h2>
      <p className="text-[var(--muted-foreground)] text-center mt-2 max-w-md mb-12">
        Transforming ideas into digital reality with modern technologies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/10"
            >
              <div className={`w-12 h-12 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                {service.title}
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}