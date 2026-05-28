"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Clapperboard,
  FileText,
  FolderOpen,
  Heart,
  Play,
  Receipt,
  ScanSearch,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const projectIcons = {
  dexkomik: BookOpen,
  dexanime: Play,
  dexfilm: Clapperboard,
  dexpdf: FileText,
  dexfilemanager: FolderOpen,
  dexautoeda: BarChart3,
  dexkasir: Receipt,
  laperin: UtensilsCrossed,
  dexscrapper: ScanSearch,
};

const panelColors = [
  "bg-[var(--primary)]",
  "bg-[var(--secondary)]",
  "bg-[#8ab6ff]",
  "bg-[var(--accent)]",
  "bg-[#c7b7ff]",
  "bg-[#ffb3c2]",
];

const statusStyles = {
  Live: "border-[var(--primary)]/35 bg-[var(--primary)]/14 text-[var(--foreground)]",
  Development: "border-[var(--secondary)]/35 bg-[var(--secondary)]/14 text-[var(--foreground)]",
  Archived: "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]",
  Concept: "border-[var(--accent)]/40 bg-[var(--accent)]/18 text-[var(--foreground)]",
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? ArrowUpRight;
  const panelColor = panelColors[index % panelColors.length];
  const detailHref = `/projects/${project.id}`;

  const handleLike = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isLiked) return;

    setIsLiked(true);
    setLikes((prev) => prev + 1);

    try {
      const response = await fetch("/api/projects/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to like project");
      }
    } catch {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/45 hover:shadow-xl hover:shadow-black/10",
        featured && "md:grid md:grid-cols-[minmax(0,1fr)_minmax(300px,0.78fr)]"
      )}
    >
      <Link
        href={detailHref}
        className={cn(
          "relative block min-h-[230px] overflow-hidden",
          featured ? "md:min-h-[360px]" : "md:min-h-[250px]"
        )}
        aria-label={`Open ${project.title} project`}
      >
        <div className={cn("absolute inset-0 flex items-center justify-center", panelColor)}>
          {project.previewImage ? (
            <Image
              src={project.previewImage}
              alt={project.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 30vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Icon className="h-20 w-20 text-white/35 transition-all duration-500 group-hover:scale-110 group-hover:text-white/60" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/16" />
        <span className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-xs font-bold text-black shadow-sm backdrop-blur-md">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/88 text-black shadow-sm backdrop-blur-md transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      <div className={cn("flex min-h-[285px] flex-col p-6", featured && "md:p-8")}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
                statusStyles[project.status]
              )}
            >
              {project.status}
            </span>
            <Link href={detailHref} className="mt-4 block">
              <h3 className="font-heading text-2xl font-extrabold leading-none text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] md:text-3xl">
                {project.title}
              </h3>
            </Link>
          </div>

          <button
            onClick={handleLike}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
              isLiked
                ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--foreground)]"
            )}
            aria-label={`Like ${project.title}`}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            {likes}
          </button>
        </div>

        <p className="mt-4 line-clamp-4 text-base leading-7 text-[var(--muted-foreground)]">
          {project.description}
        </p>

        {project.techStack && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, featured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] bg-[var(--background)]/45 px-3 py-1 text-xs font-semibold text-[var(--muted-foreground)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <Link
          href={detailHref}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
        >
          Open case
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
