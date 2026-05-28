import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Download, Github, Linkedin, Mail } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TechBadge } from "@/components/tech-badge";
import { cvDownloadPath, resumeExperience } from "@/lib/resume";
import { coreTechStack } from "@/lib/tech-stack";

export const metadata = {
  title: "About | DexPie Portfolio",
  description: "Learn more about DexPie, a full-stack developer from Jakarta building simple web products with personality.",
};

export default function AboutPage() {
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

          <div className="grid gap-10 border-t border-[var(--border)] pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,0.55fr)] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">About</p>
              <h1 className="section-heading font-heading font-extrabold">
                I build small products with a clear pulse.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--muted-foreground)]">
                I am DexPie, an Information Systems student and web developer from Indonesia. I build web products, event systems, and team workflows with a focus on clarity, collaboration, and useful interfaces.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="mailto:d.dexpiee@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5"
                >
                  <Mail size={17} />
                  Get in touch
                </a>
                <a
                  href={cvDownloadPath}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]"
                >
                  <Download size={17} />
                  Download CV
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl shadow-black/10">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[var(--muted)]">
                <Image
                  src="https://github.com/dexpie.png"
                  alt="DexPie"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Focus</p>
              <p className="mt-4 font-heading text-3xl font-black">Readers, media apps, tools</p>
            </div>
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Style</p>
              <p className="mt-4 font-heading text-3xl font-black">Simple, polished, fast</p>
            </div>
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Base</p>
              <p className="mt-4 font-heading text-3xl font-black">Jakarta, Indonesia</p>
            </div>
          </div>

          <section className="mt-10 grid gap-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Stack</p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-none">Tools I keep reaching for.</h2>
            </div>
            <div className="flex flex-wrap gap-2 self-center">
              {coreTechStack.map((item) => (
                <TechBadge key={item} name={item} className="px-4 py-2 text-sm" />
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--foreground)] p-7 text-[var(--background)] md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Process</p>
              <h2 className="mt-5 font-heading text-5xl font-black leading-none">
                Build the thing, then make it feel inevitable.
              </h2>
              <p className="mt-6 text-lg leading-8 opacity-75">
                I usually start from the real workflow, trim the noisy parts, then add just enough motion and visual character so the product feels alive without getting in the way.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-8">
              <h2 className="font-heading text-3xl font-black">Experience</h2>
              <div className="mt-7 space-y-6">
                {resumeExperience.slice(0, 4).map((item) => (
                  <div key={`${item.organization}-${item.role}`} className="grid grid-cols-[70px_minmax(0,1fr)] gap-4">
                    <div className="font-heading text-sm font-black text-[var(--primary)]">{item.period}</div>
                    <div>
                      <h3 className="font-heading text-xl font-black">{item.role}</h3>
                      <p className="mt-1 text-sm font-bold text-[var(--primary)]">{item.organization}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/resume"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]"
              >
                <BriefcaseBusiness size={16} />
                Full resume
              </Link>
            </div>
          </section>

          <section className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Elsewhere</p>
              <h2 className="mt-3 font-heading text-3xl font-black">Find me around the web.</h2>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/dexpie" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/gading-putra-priyanto/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]">
                <Linkedin size={22} />
              </a>
              <a href="mailto:d.dexpiee@gmail.com" className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]">
                <Mail size={22} />
              </a>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
