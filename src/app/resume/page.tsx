import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Mail, Award, Book } from "lucide-react";

export const metadata = {
    title: "Resume | DexPie Portfolio",
    description: "View and download my professional resume.",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="container mx-auto px-6 pt-32 pb-20">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to About</span>
                </Link>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-2">
                                Resume
                            </h1>
                            <p className="text-neutral-400">
                                Professional experience, education, and skills.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
                            >
                                <Download size={18} />
                                Download PDF
                            </a>
                        </div>
                    </div>

                    {/* Resume Preview / Content Placeholder */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 relative overflow-hidden">

                        {/* Header */}
                        <div className="border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Gading (DexPie)</h2>
                                <p className="text-cyan-400 text-lg mb-4">Creative Technologist & Full-Stack Developer</p>
                                <div className="text-sm text-neutral-400 space-y-1">
                                    <p>Indonesia</p>
                                    <a href="mailto:d.dexpiee@gmail.com" className="hover:text-white transition-colors">d.dexpiee@gmail.com</a>
                                    <p>dexpie.dev</p>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <FileText className="text-cyan-400" size={20} />
                                Experience
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">Freelance Full-Stack Developer</h4>
                                        <span className="text-sm text-neutral-500">2023 - Present</span>
                                    </div>
                                    <p className="text-neutral-400 mb-2">Self-Employed</p>
                                    <ul className="list-disc list-inside text-neutral-400 text-sm space-y-1 ml-2">
                                        <li>Built and deployed multiple web applications using Next.js and TypeScript.</li>
                                        <li>Collaborated with clients to deliver custom solutions for their business needs.</li>
                                        <li>Optimized application performance and SEO for better visibility.</li>
                                    </ul>
                                </div>
                                {/* Add more experience here */}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Book className="text-cyan-400" size={20} />
                                Education
                            </h3>
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg">Computer Science</h4>
                                    <span className="text-sm text-neutral-500">2022 - Present</span>
                                </div>
                                <p className="text-neutral-400">University Name</p>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Award className="text-cyan-400" size={20} />
                                Certifications
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <h4 className="font-bold mb-1">AWS Certified Cloud Practitioner</h4>
                                    <p className="text-xs text-neutral-500">Amazon Web Services</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <h4 className="font-bold mb-1">Meta Front-End Developer</h4>
                                    <p className="text-xs text-neutral-500">Coursera</p>
                                </div>
                            </div>
                        </section>

                        {/* watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-[-15deg]">
                            <h1 className="text-9xl font-bold uppercase whitespace-nowrap">DexPie Portfolio</h1>
                        </div>
                    </div>

                    <div className="mt-12 text-center p-8 border border-dashed border-white/10 rounded-xl">
                        <h3 className="text-lg font-bold mb-2">Want to work together?</h3>
                        <p className="text-neutral-400 mb-6">I am currently open for freelance projects and job opportunities.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-200 text-black rounded-lg font-medium transition-colors"
                        >
                            <Mail size={18} />
                            Contact Me
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
