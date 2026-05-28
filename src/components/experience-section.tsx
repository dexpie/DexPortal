import { BriefcaseBusiness, Download, GraduationCap, MapPin, Sparkles } from "lucide-react";
import {
  cvDownloadPath,
  resumeEducation,
  resumeExperience,
  resumeProfile,
  resumeSkills,
} from "@/lib/resume";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 border-t border-[var(--border)] pt-10 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Experience</p>
            <h2 className="section-heading font-heading font-extrabold text-[var(--foreground)]">
              Work shaped by real teams.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
              A mix of web development, event technology, mentoring, and cross-functional delivery from ITS and student organization work.
            </p>
          </div>

          <a
            href={cvDownloadPath}
            download
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5 md:mt-0"
          >
            <Download size={17} />
            Download CV
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <Sparkles className="mb-5 text-[var(--primary)]" size={24} />
              <h3 className="font-heading text-2xl font-black">{resumeProfile.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">{resumeProfile.summary}</p>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                <GraduationCap size={16} />
                Education
              </div>
              <h3 className="font-heading text-2xl font-black">{resumeEducation.institution}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--primary)]">{resumeEducation.degree}</p>
              <p className="mt-4 text-sm text-[var(--muted-foreground)]">{resumeEducation.period}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{resumeEducation.location}</p>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Core skills</p>
              <div className="flex flex-wrap gap-2">
                {resumeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            {resumeExperience.map((item) => (
              <article
                key={`${item.organization}-${item.role}`}
                className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--primary)]/45"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                      <BriefcaseBusiness size={14} />
                      {item.period}
                    </p>
                    <h3 className="font-heading text-2xl font-black text-[var(--foreground)]">{item.role}</h3>
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
        </div>
      </div>
    </section>
  );
}
