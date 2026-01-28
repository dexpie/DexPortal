import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { TechBadge } from "@/components/tech-badge";
import { MDXRemote } from "next-mdx-remote/rsc";
import { GiscusComments } from "@/components/giscus-comments";

const components = {
    h1: (props: any) => <h1 {...props} className="text-3xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2 font-heading" />,
    h2: (props: any) => <h2 {...props} className="text-2xl font-bold text-white mt-12 mb-6 font-heading" />,
    h3: (props: any) => <h3 {...props} className="text-xl font-bold text-cyan-400 mt-8 mb-4 font-heading" />,
    p: (props: any) => <p {...props} className="text-neutral-300 leading-relaxed mb-6 text-lg" />,
    ul: (props: any) => <ul {...props} className="list-disc list-inside text-neutral-300 mb-6 space-y-2 ml-4" />,
    ol: (props: any) => <ol {...props} className="list-decimal list-inside text-neutral-300 mb-6 space-y-2 ml-4" />,
    li: (props: any) => <li {...props} className="pl-1" />,
    blockquote: (props: any) => <blockquote {...props} className="border-l-4 border-cyan-500 pl-6 italic text-neutral-400 my-8 bg-white/5 py-4 pr-4 rounded-r-lg" />,
    code: (props: any) => <code {...props} className="bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono border border-white/10" />,
    pre: (props: any) => <pre {...props} className="bg-[#0a0a0a] p-6 rounded-xl overflow-x-auto border border-white/10 mb-8 text-sm shadow-inner" />,
    a: (props: any) => <a {...props} className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4" target="_blank" rel="noopener noreferrer" />,
    img: (props: any) => <img {...props} className="rounded-xl border border-white/10 my-8 w-full" />,
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
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <Navbar />

            {/* Parallax-like Header */}
            <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {project.previewImage && (
                        <div className="relative w-full h-full">
                            <img
                                src={project.previewImage}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-30 blur-sm scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
                        </div>
                    )}
                </div>

                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-8 backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/10">
                            <ArrowLeft size={14} />
                            <span>Back</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-neutral-400 border border-white/10 uppercase tracking-wider flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                {project.status}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-2xl font-light">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 sticky top-32 backdrop-blur-sm"
                        >
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/5">Project Data</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-neutral-500 mb-2">
                                        <Layers size={16} />
                                        <span className="text-xs font-mono uppercase">Tech Stack</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack?.map((tech) => (
                                            <TechBadge key={tech} name={tech} />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-neutral-500 mb-2">
                                        <Calendar size={16} />
                                        <span className="text-xs font-mono uppercase">Timeline</span>
                                    </div>
                                    <p className="text-white font-medium">2024 - Present</p>
                                </div>

                                <div className="pt-6 flex flex-col gap-3">
                                    {project.href && project.href !== "#" && (
                                        <a
                                            href={project.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-900/20 w-full group"
                                        >
                                            Launch System <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </a>
                                    )}

                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all w-full"
                                        >
                                            <Github size={18} /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {project.content ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="prose prose-xl prose-invert prose-neutral max-w-none">
                                    <MDXRemote source={project.content} components={components} />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-neutral-500 border border-dashed border-white/10 rounded-2xl bg-white/5">
                                <p>Case study content pending declassification.</p>
                            </div>
                        )}

                        <div className="mt-20 pt-10 border-t border-white/10">
                            <h3 className="text-2xl font-bold font-heading mb-8">System Communications</h3>
                            <GiscusComments />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
