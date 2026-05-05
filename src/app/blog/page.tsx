import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
            Back to portal
          </Link>

          <div className="grid gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Notes</p>
              <h1 className="section-heading font-heading font-extrabold">
                Small logs from the lab.
              </h1>
            </div>
            <p className="text-lg leading-8 text-[var(--muted-foreground)]">
              Short updates, product notes, and experiments from the Dex ecosystem.
            </p>
          </div>

          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group mt-12 grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--foreground)] text-[var(--background)] shadow-2xl shadow-black/10 lg:grid-cols-[minmax(0,1fr)_340px]"
            >
              <div className="p-7 md:p-10">
                <span className="rounded-full border border-[var(--background)]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] opacity-70">
                  Featured
                </span>
                <h2 className="mt-8 max-w-3xl font-heading text-4xl font-black leading-none md:text-6xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 opacity-75">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-10 inline-flex items-center gap-2 text-sm font-bold">
                  Read note
                  <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
              <div className="soft-grid hidden border-l border-[var(--background)]/10 bg-[var(--primary)] p-8 lg:flex lg:flex-col lg:justify-between">
                <p className="font-heading text-7xl font-black text-[var(--primary-foreground)]/30">LOG</p>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] opacity-65">{featuredPost.category}</p>
                  <p className="mt-2 text-2xl font-black">{featuredPost.readTime}</p>
                </div>
              </div>
            </Link>
          )}

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
