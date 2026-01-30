import { ProjectsSection } from "@/components/projects-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";
import { BentoGrid } from "@/components/bento-grid";
import { ServicesSection } from "@/components/services-section";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { SkillsSection } from "@/components/skills-section";

export default async function Home() {
  const projects = await getProjects();
  const recentPosts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <Navbar />

      <Hero />

      {/* Quick Overview */}
      <section className="container mx-auto px-6 py-20 border-b border-border dark:border-white/5">
        <BentoGrid />
      </section>

      {/* Featured Projects Carousel */}
      <FeaturedCarousel projects={projects} />

      {/* Skills & Expertise */}
      <SkillsSection />

      {/* Services */}
      <ServicesSection />

      {/* All Projects (Interactive) */}
      <ProjectsSection initialProjects={projects} />

      {/* Latest Updates */}
      <section className="container mx-auto px-6 py-20 border-t border-border dark:border-white/5">
        <div className="flex flex-col items-center mb-16">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-600 to-transparent mb-6" />
          <h2 className="text-3xl font-bold text-center">Latest Updates</h2>
          <p className="text-muted-foreground mt-2 text-center max-w-lg">
            Thoughts, tutorials, and insights from my journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
