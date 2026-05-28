"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, Layers, MapPin, Sparkles, Wand2 } from "lucide-react";
import type { Project } from "@/lib/types";
import { coreTechStack } from "@/lib/tech-stack";

const services = [
  {
    icon: Code2,
    title: "Full-stack web apps",
    body: "Interfaces, APIs, dashboards, auth, and project flows that are practical to maintain.",
  },
  {
    icon: Wand2,
    title: "Clean interaction design",
    body: "Motion and micro-interactions that make a simple product feel intentional.",
  },
  {
    icon: Brain,
    title: "Automation and data tools",
    body: "Scrapers, file utilities, EDA helpers, and AI-assisted workflows.",
  },
];

export function BentoGrid({ projects }: { projects: Project[] }) {
  const stack = Array.from(new Set([...coreTechStack, ...projects.flatMap((project) => project.techStack ?? [])]));
  const liveProjects = projects.filter((project) => project.status === "Live").length;

  return (
    <section id="stack" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl border-t border-[var(--border)] pt-10">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Stack and style</p>
          <h2 className="section-heading font-heading font-extrabold text-[var(--foreground)]">
            Less noise. More signal.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-[var(--foreground)] p-8 text-[var(--background)] md:col-span-3 md:min-h-[360px]"
          >
            <Sparkles className="mb-8 text-[var(--primary)]" size={28} />
            <h3 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
              I like portfolios that feel like products, not brochures.
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-8 opacity-75">
              DexPortal is shaped around real builds: manga, anime, film, PDF, POS, campus delivery, scraping, and data tooling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-[2rem] bg-[var(--card)] p-8 md:col-span-3"
          >
            <Layers className="mb-8 text-[var(--primary)]" size={28} />
            <h3 className="font-heading text-3xl font-bold text-[var(--foreground)]">Tools in rotation</h3>
            <div className="mt-7 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm font-semibold text-[var(--muted-foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] bg-[var(--primary)] p-8 text-white md:col-span-2"
          >
            <Database className="mb-8" size={28} />
            <p className="font-heading text-6xl font-extrabold">{projects.length}</p>
            <p className="mt-3 text-lg font-semibold">Dex projects in the showcase</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-[2rem] bg-[var(--secondary)] p-8 text-[var(--secondary-foreground)] md:col-span-2"
          >
            <Code2 className="mb-8" size={28} />
            <p className="font-heading text-6xl font-extrabold">{liveProjects}</p>
            <p className="mt-3 text-lg font-semibold">Live products ready to open</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[2rem] bg-[var(--card)] p-8 md:col-span-2"
          >
            <MapPin className="mb-8 text-[var(--primary)]" size={28} />
            <p className="font-heading text-4xl font-bold text-[var(--foreground)]">Surabaya</p>
            <p className="mt-4 text-lg leading-8 text-[var(--muted-foreground)]">Available for remote product work and collaboration.</p>
          </motion.div>

          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="rounded-[2rem] bg-[var(--card)] p-7 md:col-span-2"
              >
                <Icon className="mb-7 text-[var(--primary)]" size={26} />
                <h3 className="font-heading text-2xl font-bold text-[var(--foreground)]">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">{service.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
