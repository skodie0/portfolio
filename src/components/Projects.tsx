import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/useSiteData";
import type { ProjectsData } from "@/lib/firestore";

const fallback: ProjectsData = {
  featured: [
    { title: "E-Commerce Platform", description: "A full-featured e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.", tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"], github: "https://github.com", live: "https://example.com" },
    { title: "AI Task Manager", description: "Smart task management app with AI-powered prioritization and natural language processing.", tech: ["React", "Python", "FastAPI", "OpenAI", "MongoDB"], github: "https://github.com", live: "https://example.com" },
    { title: "Real-time Analytics Dashboard", description: "Enterprise-grade analytics platform processing millions of events daily.", tech: ["React", "D3.js", "Kafka", "ClickHouse", "Docker"], github: "https://github.com", live: "https://example.com" },
  ],
  other: [
    { title: "CLI Productivity Tool", description: "A command-line tool for developers to automate repetitive tasks.", tech: ["Go", "Cobra", "SQLite"], github: "https://github.com" },
    { title: "Open Source UI Library", description: "Modern React component library with accessibility-first design.", tech: ["React", "TypeScript", "Storybook"], github: "https://github.com" },
    { title: "Blockchain Wallet", description: "Secure cryptocurrency wallet with multi-chain support.", tech: ["React Native", "Ethers.js", "Node.js"], github: "https://github.com" },
    { title: "DevOps Automation", description: "Infrastructure as code templates and automation scripts.", tech: ["Terraform", "Ansible", "Python"], github: "https://github.com" },
  ],
};

export const Projects = () => {
  const { data } = useSiteData<ProjectsData>("projects", fallback);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">{"// featured work"}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Things I've <span className="gradient-text">Built</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A selection of projects that showcase my skills and passion for development</p>
          </div>

          <div className="space-y-24 mb-24">
            {data.featured.map((project, index) => (
              <div key={project.title} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`relative group ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-card border border-border/50 group-hover:border-primary/50 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Folder className="text-primary" size={32} /></div>
                        <span className="font-mono text-muted-foreground text-sm">{project.title}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
                  <span className="font-mono text-primary text-sm">Featured Project</span>
                  <h3 className="text-2xl font-bold mt-2 mb-4">{project.title}</h3>
                  <div className="glass-card rounded-lg p-6 mb-4"><p className="text-muted-foreground">{project.description}</p></div>
                  <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                    {project.tech.map((tech) => (<span key={tech} className="font-mono text-xs text-muted-foreground">{tech}</span>))}
                  </div>
                  <div className={`flex gap-4 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={22} /></a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={22} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-center mb-8">Other Noteworthy Projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.other.map((project) => (
                <div key={project.title} className="glass-card rounded-xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="text-primary" size={28} />
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (<span key={tech} className="font-mono text-xs text-muted-foreground">{tech}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="hero-outline" size="lg" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">View More on GitHub</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
