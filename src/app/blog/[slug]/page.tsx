import { getBlogPosts } from "@/lib/blog";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | DexPie Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to Blog</span>
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.category === "Changelog" ? "bg-green-500/10 text-green-400" :
                                post.category === "Tutorial" ? "bg-blue-500/10 text-blue-400" :
                                    "bg-yellow-500/10 text-yellow-400"
                            }`}>
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-cyan max-w-none">
                    <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Placeholder content - In a real app, you'd have full markdown content */}
                    <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-neutral-400">
                            📝 Full blog content would be rendered here.<br />
                            <span className="text-sm">Consider adding a <code>content</code> field to your blog posts.</span>
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                        <ArrowLeft size={16} />
                        View all posts
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
