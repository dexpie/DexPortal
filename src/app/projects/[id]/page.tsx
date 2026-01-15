import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { TechBadge } from "@/components/tech-badge";
import { MDXRemote } from "next-mdx-remote/rsc";
import { GiscusComments } from "@/components/giscus-comments";

// Reuse components from blog (or import them if extracted)
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
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to Portal</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative group h-fit"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900 aspect-video flex items-center justify-center">
                            {project.previewImage ? (
                                <img src={project.previewImage} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-neutral-600 font-mono text-sm">NO SIGNAL INPUT</div>
                            )}
                        </div>
                    </motion.div>

                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.status === "Live" ? "bg-green-900/20 border-green-500/30 text-green-400" : "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"}`}>
                                {project.status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-400">
                                {project.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                            {project.title}
                        </h1>

                        <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        {project.techStack && (
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-neutral-300 mb-3 uppercase tracking-wider">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <TechBadge key={tech} name={tech} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 mt-auto">
                            {project.href && project.href !== "#" && (
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-900/20"
                                >
                                    <ExternalLink size={18} /> Launch System
                                </a>
                            )}

                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all"
                                >
                                    <Github size={18} /> Source Code
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Rich Content Section */}
                {project.content && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto border-t border-white/10 pt-16 mb-20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                            <span className="w-1 h-8 bg-cyan-500 rounded-full" />
                            Project Details
                        </h2>
                        <div className="prose prose-invert prose-cyan max-w-none bg-neutral-900/30 p-8 rounded-2xl border border-white/5">
                            <MDXRemote source={project.content} components={components} />
                        </div>
                    </motion.div>
                )}

                {/* Comments Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto pt-10 border-t border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Discussion</h3>
                    <GiscusComments />
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
