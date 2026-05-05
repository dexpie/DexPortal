import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";

const floatingProjects = ["DexKomik", "DexAnime", "DexFilm", "DexPDF"];

export function Hero() {
  return (
    <section className="relative w-full max-w-full overflow-hidden px-6 pb-10 pt-32 md:min-h-[820px] md:pt-36">
      <div className="absolute right-[-10vw] top-28 h-[38vw] min-h-72 w-[38vw] min-w-72 rounded-full bg-[var(--primary)]/20 blur-3xl" />
      <div className="absolute bottom-12 left-[-12vw] h-[30vw] min-h-64 w-[30vw] min-w-64 rounded-full bg-[var(--secondary)]/16 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-between gap-10 md:min-h-[640px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] lg:items-center lg:gap-16">
          <div className="relative z-10 min-w-0 max-w-[21rem] sm:max-w-full">
            <p className="mb-6 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-4 py-2 text-sm font-semibold text-[var(--muted-foreground)] backdrop-blur-md">
              Full-stack developer from Jakarta
            </p>
            <h1 className="display-tight font-heading text-[clamp(4rem,9vw,9.25rem)] font-extrabold text-[var(--foreground)]">
              DexPie
            </h1>
            <p className="mt-7 max-w-[21rem] text-lg leading-8 text-[var(--muted-foreground)] sm:max-w-2xl md:text-xl md:leading-9">
              Simple web products with a little stage presence. I build readers, media apps, tools, and data utilities that feel clean, fast, and personal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5"
              >
                See projects
                <ArrowDownRight size={17} />
              </a>
              <a
                href="mailto:d.dexpiee@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-5 py-3 text-sm font-bold text-[var(--foreground)] backdrop-blur-md transition-colors hover:border-[var(--primary)]"
              >
                <Mail size={17} />
                Contact
              </a>
            </div>
          </div>

          <div className="relative mx-auto min-h-[360px] w-full max-w-[22rem] lg:min-h-[520px] lg:max-w-[440px]">
            <div className="absolute inset-x-8 bottom-0 top-8 rounded-[2.5rem] bg-[var(--primary)]" />
            <div className="absolute inset-x-0 bottom-10 top-0 overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/10">
              <Image
                src="https://github.com/dexpie.png"
                alt="DexPie portrait"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-1/2 flex w-[88%] -translate-x-1/2 items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--background)]/92 p-4 backdrop-blur-xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Currently</p>
                <p className="mt-1 text-lg font-bold text-[var(--foreground)]">Building the Dex ecosystem</p>
              </div>
              <ArrowUpRight className="text-[var(--primary)]" size={24} />
            </div>
          </div>
        </div>

        <div className="flex max-w-[22rem] flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6 sm:max-w-full">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Featured</span>
          {floatingProjects.map((project) => (
            <span
              key={project}
              className="rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-4 py-2 text-sm font-bold text-[var(--foreground)] backdrop-blur-md"
            >
              {project}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
