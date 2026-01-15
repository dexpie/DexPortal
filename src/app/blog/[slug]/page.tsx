import { getBlogPosts } from "@/lib/blog";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

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

const components = {
    h1: (props: any) => <h1 {...props} className="text-3xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2" />,
    h2: (props: any) => <h2 {...props} className="text-2xl font-bold text-white mt-8 mb-4" />,
    h3: (props: any) => <h3 {...props} className="text-xl font-bold text-cyan-400 mt-6 mb-3" />,
    p: (props: any) => <p {...props} className="text-neutral-300 leading-relaxed mb-4" />,
    ul: (props: any) => <ul {...props} className="list-disc list-inside text-neutral-300 mb-4 space-y-1 ml-4" />,
    ol: (props: any) => <ol {...props} className="list-decimal list-inside text-neutral-300 mb-4 space-y-1 ml-4" />,
    li: (props: any) => <li {...props} className="pl-1" />,
    blockquote: (props: any) => <blockquote {...props} className="border-l-4 border-cyan-500 pl-4 italic text-neutral-400 my-6 bg-white/5 py-2 pr-2 rounded-r-lg" />,
    code: (props: any) => <code {...props} className="bg-black/50 text-cyan-300 px-1 py-0.5 rounded text-sm font-mono border border-white/10" />,
    pre: (props: any) => <pre {...props} className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10 mb-6 text-sm" />,
    a: (props: any) => <a {...props} className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-2" target="_blank" rel="noopener noreferrer" />,
    table: (props: any) => <div className="overflow-x-auto mb-6"><table {...props} className="w-full text-left border-collapse border border-white/10" /></div>,
    th: (props: any) => <th {...props} className="bg-white/5 border border-white/10 p-2 font-bold text-white" />,
    td: (props: any) => <td {...props} className="border border-white/10 p-2 text-neutral-300" />,
};

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
                    <MDXRemote source={post.content} components={components} />
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
