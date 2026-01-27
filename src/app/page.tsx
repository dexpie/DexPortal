import { ProjectsSection } from "@/components/projects-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";
import { Timeline } from "@/components/timeline";
import { GitHubRepos } from "@/components/github-repos";
import { GitHubStatsWidget } from "@/components/github-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { DiscordStatus } from "@/components/discord-status";
import { BentoGrid } from "@/components/bento-grid";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { VisitorCounter } from "@/components/visitor-counter";
import { LocalTime } from "@/components/local-time";
import { ServicesSection } from "@/components/services-section";
import { QuoteOfTheDay } from "@/components/quote-of-the-day";
import { AnimatedStats } from "@/components/animated-stats";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { getGithubRepos } from "@/lib/github";

import { SkillsSection } from "@/components/skills-section";

export default async function Home() {
  const projects = await getProjects();
  const recentPosts = await getBlogPosts();
  const githubRepos = await getGithubRepos("dexpie");

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <Navbar />

      <Hero />

      {/* Status Bar - Visitor & Time */}
      <section className="container mx-auto px-6 -mt-8 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <VisitorCounter />
          <LocalTime />
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 border-b border-border dark:border-white/5">
        <BentoGrid />
      </section>

      {/* Skills Universe (3D) */}
      <SkillsSection />

      {/* Animated Stats - NEW Wave 3 */}
      <AnimatedStats />

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Projects Carousel - NEW Wave 3 */}
      <FeaturedCarousel projects={projects} />

      {/* Projects Section (Interactive) */}
      <ProjectsSection initialProjects={projects} />

      {/* Latest Updates Section */}
      <section className="container mx-auto px-6 py-20 border-t border-border dark:border-white/5">
        <div className="flex flex-col items-center mb-16">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-600 to-transparent mb-6" />
          <h2 className="text-3xl font-bold text-center">Latest Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 dark:bg-neutral-950/30 border-y border-border dark:border-white/5">
        <Timeline />
      </section>

      <GitHubRepos repos={githubRepos} />

      {/* GitHub Stats & Activity Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <DiscordStatus />
            <QuoteOfTheDay />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <GitHubStatsWidget username="dexpie" />
            <ActivityFeed />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </main>
  );
}
