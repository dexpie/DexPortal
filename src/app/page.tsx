"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";
import { Timeline } from "@/components/timeline";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-red-500/30">
      <Navbar />

      <Hero />

      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-gradient-to-r from-transparent via-red-600 to-transparent mb-6"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-950/30 border-y border-white/5">
        <Timeline />
      </section>

      <Footer />
    </main>
  );
}
