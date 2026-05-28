import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ProjectsSection } from "@/components/projects-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";
import { BentoGrid } from "@/components/bento-grid";
import { ExperienceSection } from "@/components/experience-section";

export default async function Home() {
  const projects = await getProjects();
  const recentPosts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <Hero />
        <ProjectsSection initialProjects={projects} />
        <ExperienceSection />
        <BentoGrid projects={projects} />

        <section id="notes" className="relative py-20 md:py-28">
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Notes</p>
                <h2 className="section-heading font-heading font-extrabold text-[var(--foreground)]">
                  Small logs from the lab.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                View blog
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {recentPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 transition-transform hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-[var(--primary)]">{post.category}</p>
                  <h3 className="mt-5 font-heading text-2xl font-bold leading-tight text-[var(--foreground)]">
                    {post.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base leading-7 text-[var(--muted-foreground)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-8 flex items-center justify-between text-sm font-bold text-[var(--foreground)]">
                    <span>{post.readTime}</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="soft-grid relative overflow-hidden rounded-t-[2.5rem] bg-[var(--foreground)] py-24 text-[var(--background)] md:py-32">
          <div className="grain-overlay pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="mb-8 h-px w-full max-w-xl bg-current opacity-20" />
              <h2 className="section-heading max-w-4xl font-heading font-extrabold">
                Want a site that feels less generic?
              </h2>
              <p className="mt-8 max-w-2xl text-xl leading-9 opacity-75">
                Send the idea, the messy brief, or the half-built project. I can help turn it into something cleaner.
              </p>
            </div>
            <a
              href="mailto:d.dexpiee@gmail.com"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--background)]/15 bg-[var(--primary)] px-6 py-4 text-base font-black text-[#101312] shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
            >
              <Mail size={19} />
              d.dexpiee@gmail.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
