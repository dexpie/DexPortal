import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";
import { ArrowLeft, ArrowUpRight, Calendar, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Footer } from "@/components/footer";
import { GiscusComments } from "@/components/giscus-comments";
import { Navbar } from "@/components/navbar";
import { TechBadge } from "@/components/tech-badge";
import { getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const statusStyles = {
  Live: "border-[var(--primary)]/40 bg-[var(--primary)]/14",
  Development: "border-[var(--secondary)]/40 bg-[var(--secondary)]/14",
  Archived: "border-[var(--border)] bg-[var(--muted)]",
  Concept: "border-[var(--accent)]/40 bg-[var(--accent)]/16",
};

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 {...props} className="mb-5 mt-10 border-b border-[var(--border)] pb-4 font-heading text-4xl font-black text-[var(--foreground)]" />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="mb-5 mt-12 font-heading text-3xl font-black text-[var(--foreground)]" />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="mb-4 mt-8 font-heading text-2xl font-bold text-[var(--foreground)]" />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-6 text-lg leading-8 text-[var(--muted-foreground)]" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-8 ml-5 list-disc space-y-3 text-lg leading-8 text-[var(--muted-foreground)]" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-8 ml-5 list-decimal space-y-3 text-lg leading-8 text-[var(--muted-foreground)]" />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} className="pl-1" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className="my-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-lg italic text-[var(--muted-foreground)]" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code {...props} className="rounded-md border border-[var(--border)] bg-[var(--muted)] px-1.5 py-0.5 text-sm text-[var(--foreground)]" />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} className="mb-8 overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm" />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="font-semibold text-[var(--primary)] underline underline-offset-4" target="_blank" rel="noopener noreferrer" />
  ),
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

type Props = { params: Promise<{ id: string }> };

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />

        <section className="relative mx-auto grid min-h-[86vh] max-w-6xl gap-10 px-6 pb-16 pt-32 lg:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.62fr)] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            <Link
              href="/#projects"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft size={16} />
              Back to projects
            </Link>

            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                {project.category}
              </span>
              <span className={cn("rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]", statusStyles[project.status])}>
                {project.status}
              </span>
            </div>

            <h1 className="display-tight font-heading text-[clamp(4.5rem,12vw,10rem)] font-black">
              {project.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--muted-foreground)] md:text-2xl">
              {project.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {project.href && project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5"
                >
                  Launch project
                  <ExternalLink size={17} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]"
                >
                  <Github size={17} />
                  Source
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl shadow-black/10"
          >
            <div className="relative aspect-[1.05/1] overflow-hidden rounded-[1.5rem] bg-[var(--primary)]">
              {project.previewImage ? (
                <Image
                  src={project.previewImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Sparkles className="h-24 w-24 text-white/45" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/18 bg-black/55 p-5 text-white backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Current focus</p>
                <p className="mt-2 font-heading text-2xl font-black">{project.title}</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto grid max-w-6xl gap-8 px-6 pb-24 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                <Layers size={16} />
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                <Calendar size={16} />
                Timeline
              </div>
              <p className="font-heading text-2xl font-black">2024 - Present</p>
            </div>
          </aside>

          <div>
            <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:p-10">
              {project.content ? (
                <MDXRemote source={project.content} components={components} />
              ) : (
                <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--muted)] p-10 text-center text-[var(--muted-foreground)]">
                  Case study content is being refined.
                </div>
              )}
            </article>

            <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <h2 className="font-heading text-3xl font-black">More from the Dex stack</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.id}
                    href={`/projects/${item.id}`}
                    className="group rounded-3xl border border-[var(--border)] bg-[var(--background)]/45 p-5 transition-colors hover:border-[var(--primary)]"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{item.category}</p>
                    <h3 className="mt-3 font-heading text-xl font-black">{item.title}</h3>
                    <ArrowUpRight className="mt-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <h2 className="font-heading text-3xl font-black">Notes and comments</h2>
              <div className="mt-6">
                <GiscusComments />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
