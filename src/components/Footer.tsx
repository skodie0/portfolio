import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useSiteData } from "@/hooks/useSiteData";
import type { FooterData } from "@/lib/firestore";

const fallback: FooterData = {
  name: "Alex Chen",
  tagline: "Built with passion.",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  email: "alex@example.com",
};

export const Footer = () => {
  const { data } = useSiteData<FooterData>("footer", fallback);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <a href="#" className="font-mono text-lg font-semibold text-primary mb-2 inline-block">{"<"}dev{" />"}</a>
              <p className="text-muted-foreground text-sm">© {currentYear} {data.name}. {data.tagline}</p>
            </div>
            <div className="flex items-center gap-6">
              <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub"><Github size={20} /></a>
              <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href={data.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Twitter"><Twitter size={20} /></a>
              <a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
