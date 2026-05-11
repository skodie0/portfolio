import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg-1.jpeg";
import { useSiteData } from "@/hooks/useSiteData";
import type { HeroData } from "@/lib/firestore";

const fallback: HeroData = {
  name: "Samuel Kodie",
  role: "Fullstack Software Engineer",
  description: "I craft elegant digital experiences with clean code and modern technologies. Passionate about building scalable applications that make a difference.",
  statusText: "Available for new opportunities",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  email: "samuelmkodie@gmail.com",
};

export const Hero = () => {
  const { data } = useSiteData<HeroData>("hero", fallback);
  const bgImage = data.bgImageUrl || heroBg;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-background/80 dark:bg-background/70" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">{data.statusText}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Hi, I'm <span className="gradient-text">{data.name}</span>
            <span className="terminal-cursor text-primary">_</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {data.role}
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg" asChild><a href="#projects">View My Work</a></Button>
            <Button variant="hero-outline" size="lg" asChild><a href="#contact">Get In Touch</a></Button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300"><Github size={24} /></a>
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300"><Linkedin size={24} /></a>
            <a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary transition-colors duration-300"><Mail size={24} /></a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors"><ArrowDown size={24} /></a>
      </div>
    </section>
  );
};
