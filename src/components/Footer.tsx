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

const iconClass = "text-muted-foreground hover:text-primary transition-colors";

export const Footer = () => {
  const { data } = useSiteData<FooterData>("footer", fallback);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-14 py-3 font-mono text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="#top" className="text-primary font-semibold">
              ~/dev
            </a>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              main
            </span>
            <span>{data.tagline}</span>
          </div>
          <p>
            © {currentYear} {data.name}
          </p>
          <div className="flex items-center gap-4">
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={data.twitterUrl} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href={`mailto:${data.email}`} className={iconClass} aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
