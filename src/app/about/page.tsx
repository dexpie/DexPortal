import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SkillsSection } from "@/components/skills-section";
import Link from "next/link";
import { ArrowLeft, Mail, Github, Linkedin, Download } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "About | DexPie Portfolio",
    description: "Learn more about DexPie - a creative technologist passionate about building digital experiences.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to Portal</span>
                </Link>

                {/* Hero About */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6">
                            Hey, I&apos;m DexPie 👋
                        </h1>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                            A creative technologist and full-stack developer based in Indonesia.
                            I love building digital experiences that are both beautiful and functional.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                            contributing to open source, or watching anime. I believe in learning by building
                            and sharing knowledge with the community.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="mailto:d.dexpiee@gmail.com"
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
                            >
                                <Mail size={18} />
                                Get in Touch
                            </a>
                            <a
                                href="/resume.pdf"
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                            >
                                <Download size={18} />
                                Resume
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-2xl" />
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                            <Image
                                src="https://github.com/dexpie.png"
                                alt="DexPie"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <SkillsSection />

                {/* Journey Timeline */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
                    <div className="max-w-2xl mx-auto space-y-8">
                        {[
                            { year: "2024", title: "Full-Stack Developer", desc: "Building production-ready web applications with Next.js, TypeScript, and modern tooling." },
                            { year: "2023", title: "Open Source Contributor", desc: "Started contributing to open source projects and building developer tools." },
                            { year: "2022", title: "Learning Journey", desc: "Deep dive into React ecosystem, Node.js, and cloud technologies." },
                            { year: "2021", title: "First Line of Code", desc: "Discovered programming and fell in love with building things." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-sm group-hover:bg-cyan-500/20 transition-colors">
                                        {item.year}
                                    </div>
                                    {i < 3 && <div className="w-px h-full bg-white/10 mt-2" />}
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                    <p className="text-neutral-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold mb-8">Let&apos;s Connect</h2>
                    <div className="flex justify-center gap-6">
                        <a href="https://github.com/dexpie" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/gading-putra-priyanto/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:d.dexpiee@gmail.com" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
