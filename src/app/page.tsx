"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/projects";
import { blogPosts } from "@/lib/blog";
import { Timeline } from "@/components/timeline";
import { GitHubRepos } from "@/components/github-repos";
import { GitHubStatsWidget } from "@/components/github-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <Navbar />

      <Hero />

      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-600 to-transparent mb-6"
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

      <GitHubRepos repos={[
        { name: "readmegenerator", description: "AI-powered README Generator for your projects.", html_url: "https://github.com/dexpie/readmegenerator", stargazers_count: 3, forks_count: 0, language: "TypeScript", homepage: "https://readmegenerator-three.vercel.app" },
        { name: "DexScrapper", description: "Advanced web scraping automation with AI integration.", html_url: "https://github.com/dexpie/DexScrapper", stargazers_count: 1, forks_count: 0, language: "Python", homepage: null },
        { name: "portfolio", description: "Personal portfolio website.", html_url: "https://github.com/dexpie/portfolio", stargazers_count: 1, forks_count: 0, language: "HTML", homepage: null },
        { name: "dexpie", description: "GitHub Profile README.", html_url: "https://github.com/dexpie/dexpie", stargazers_count: 1, forks_count: 0, language: null, homepage: null },
        { name: "DexAutoEDA", description: "Automated Exploratory Data Analysis tool.", html_url: "https://github.com/dexpie/DexAutoEDA", stargazers_count: 0, forks_count: 0, language: "Python", homepage: null },
        { name: "DexFileManager", description: "Smart file organization and management system.", html_url: "https://github.com/dexpie/DexFileManager", stargazers_count: 0, forks_count: 0, language: "Python", homepage: null },
        { name: "DexKasir", description: "Point of Sale (POS) application with inventory management.", html_url: "https://github.com/dexpie/DexKasir", stargazers_count: 0, forks_count: 0, language: "Python", homepage: null },
        { name: "wajik-anime-api", description: "Anime streaming API service.", html_url: "https://github.com/dexpie/wajik-anime-api", stargazers_count: 0, forks_count: 0, language: "TypeScript", homepage: null },
      ]} />

      {/* GitHub Stats & Activity Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GitHubStatsWidget username="dexpie" />
          <ActivityFeed />
        </div>
      </section>

      <Footer />
    </main>
  );
}
