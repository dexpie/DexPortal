import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  cvDownloadPath,
  resumeEducation,
  resumeExperience,
  resumeProfile,
  resumeSkills,
  resumeStrengths,
} from "@/lib/resume";

export const metadata = {
  title: "Resume | DexPie Portfolio",
  description: "Professional experience, education, and CV download for Gading Putra Priyanto.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />

        <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
          <Link
            href="/about"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
            Back to About
          </Link>

          <div className="grid gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(330px,0.44fr)]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Resume</p>
              <h1 className="section-heading font-heading font-extrabold">{resumeProfile.name}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[var(--muted-foreground)]">
                {resumeProfile.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={cvDownloadPath}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5"
                >
                  <Download size={17} />
                  Download CV
                </a>
                <a
                  href={`mailto:${resumeProfile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]"
                >
                  <Mail size={17} />
                  Contact
                </a>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <Sparkles className="mb-5 text-[var(--primary)]" size={24} />
                <h2 className="font-heading text-2xl font-black">{resumeProfile.title}</h2>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)]">
                  <MapPin size={15} />
                  {resumeProfile.location}
                </p>
                <a
                  href={`mailto:${resumeProfile.email}`}
                  className="mt-2 block text-sm font-semibold text-[var(--primary)]"
                >
                  {resumeProfile.email}
                </a>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  <GraduationCap size={16} />
                  Education
                </div>
                <h2 className="font-heading text-2xl font-black">{resumeEducation.institution}</h2>
                <p className="mt-2 text-sm font-semibold text-[var(--primary)]">{resumeEducation.degree}</p>
                <p className="mt-4 text-sm text-[var(--muted-foreground)]">{resumeEducation.period}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{resumeEducation.location}</p>
              </div>
            </aside>
          </div>

          <section className="mt-12 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Professional Experience</p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-none">Campus teams, web systems, and mentoring.</h2>
            </div>

            <div className="space-y-4">
              {resumeExperience.map((item) => (
                <article
                  key={`${item.organization}-${item.role}`}
                  className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                        <BriefcaseBusiness size={14} />
                        {item.period}
                      </p>
                      <h3 className="font-heading text-2xl font-black">{item.role}</h3>
                      <p className="mt-2 text-base font-bold text-[var(--primary)]">{item.organization}</p>
                    </div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)]">
                      <MapPin size={15} />
                      {item.location}
                    </p>
                  </div>
                  <p className="mt-5 text-base leading-7 text-[var(--muted-foreground)]">{item.summary}</p>
                  <ul className="mt-5 grid gap-2 text-sm leading-6 text-[var(--muted-foreground)] md:grid-cols-3">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/45 p-3">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-8">
              <h2 className="flex items-center gap-2 font-heading text-3xl font-black">
                <Award className="text-[var(--primary)]" size={24} />
                Skills
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {resumeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-4 py-2 text-sm font-semibold text-[var(--muted-foreground)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--foreground)] p-7 text-[var(--background)] md:p-8">
              <h2 className="font-heading text-3xl font-black">Strengths</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {resumeStrengths.map((strength) => (
                  <div key={strength.title}>
                    <h3 className="font-heading text-xl font-black">{strength.title}</h3>
                    <p className="mt-3 text-sm leading-6 opacity-75">{strength.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
