import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative group"
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
                        className="flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-4">
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

                        <div className="flex gap-4">
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
                            {/* Hypothetical GitHub link if we added it to the model */}
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all">
                                <Github size={18} /> Source Code
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
