"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Repo {
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    homepage: string | null;
}

// Language color mapping
const languageColors: Record<string, string> = {
    Python: "bg-blue-500",
    TypeScript: "bg-blue-400",
    JavaScript: "bg-yellow-400",
    Java: "bg-orange-500",
    HTML: "bg-orange-400",
    CSS: "bg-purple-500",
};

interface GitHubRepoCardProps {
    repo: Repo;
    index: number;
}

function GitHubRepoCard({ repo, index }: GitHubRepoCardProps) {
    return (
        <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group block p-4 rounded-xl bg-card dark:bg-black/80 border border-border dark:border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-card-foreground dark:text-white group-hover:text-cyan-400 transition-colors truncate">
                    {repo.name}
                </h3>
                <ExternalLink size={14} className="text-muted-foreground dark:text-neutral-500 group-hover:text-cyan-400 flex-shrink-0" />
            </div>

            <p className="text-sm text-muted-foreground dark:text-neutral-400 line-clamp-2 mb-3 min-h-[40px]">
                {repo.description || "No description provided."}
            </p>

            <div className="flex items-center gap-4 text-xs text-neutral-500">
                {repo.language && (
                    <div className="flex items-center gap-1">
                        <span className={cn("w-2 h-2 rounded-full", languageColors[repo.language] || "bg-neutral-500")} />
                        <span>{repo.language}</span>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <Star size={12} />
                    <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork size={12} />
                    <span>{repo.forks_count}</span>
                </div>
            </div>
        </motion.a>
    );
}

interface GitHubReposProps {
    repos: Repo[];
}

export function GitHubRepos({ repos }: GitHubReposProps) {
    return (
        <section className="container mx-auto px-6 py-20">
            <div className="flex flex-col items-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-4"
                >
                    <Code2 className="text-cyan-500" />
                    <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">Open Source</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-foreground dark:text-white"
                >
                    GitHub Repositories
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground dark:text-neutral-400 text-center mt-2 max-w-lg"
                >
                    Explore my open source projects. Feel free to fork, star, or contribute!
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {repos.map((repo, index) => (
                    <GitHubRepoCard key={repo.name} repo={repo} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-8"
            >
                <a
                    href="https://github.com/dexpie?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm font-medium"
                >
                    View All Repositories →
                </a>
            </motion.div>
        </section>
    );
}
