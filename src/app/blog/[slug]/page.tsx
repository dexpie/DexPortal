import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getBlogPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | DexPie Blog`,
    description: post.excerpt,
  };
}

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
    <blockquote {...props} className="my-8 rounded-3xl border border-[var(--border)] bg-[var(--muted)] p-6 text-lg italic text-[var(--muted-foreground)]" />
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
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mb-8 overflow-x-auto rounded-3xl border border-[var(--border)]">
      <table {...props} className="w-full border-collapse text-left" />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th {...props} className="border-b border-[var(--border)] bg-[var(--muted)] p-4 font-bold text-[var(--foreground)]" />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="border-b border-[var(--border)] p-4 text-[var(--muted-foreground)]" />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const morePosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <article className="relative mx-auto max-w-4xl px-6 pb-24 pt-32">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
            Back to notes
          </Link>

          <header className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-10">
            <span className="rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              {post.category}
            </span>
            <h1 className="mt-8 font-heading text-5xl font-black leading-none md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-9 text-[var(--muted-foreground)]">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </header>

          <div className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-10">
            <MDXRemote source={post.content} components={components} />
          </div>

          {morePosts.length > 0 && (
            <section className="mt-8 grid gap-4 md:grid-cols-2">
              {morePosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--primary)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{item.category}</p>
                  <h2 className="mt-4 font-heading text-2xl font-black leading-tight">{item.title}</h2>
                </Link>
              ))}
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
