import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg-1.jpeg";
import { useSiteData } from "@/hooks/useSiteData";
import type { ContactData, HeroData } from "@/lib/firestore";

const fallback: HeroData = {
  name: "Samuel Kodie",
  role: "Fullstack Software Engineer",
  description: "I craft elegant digital experiences with clean code and modern technologies. Passionate about building scalable applications that make a difference.",
  statusText: "Available for new opportunities",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  email: "samuelmkodie@gmail.com",
};

const contactFallback: ContactData = { email: "samuelmkodie@gmail.com", location: "Accra, Ghana" };

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary";

const imageMask = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.28) 18%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.82) 42%, #000 56%, #000 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.28) 18%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.82) 42%, #000 56%, #000 100%)",
};

const splitName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { first: name.trim(), last: "" };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
};

export const Hero = () => {
  const { data } = useSiteData<HeroData>("hero", fallback);
  const { data: contact } = useSiteData<ContactData>("contact", contactFallback);
  const bgImage = data.bgImageUrl || heroBg;
  const { first, last } = splitName(data.name);
  const place = contact.location?.split(",")[0]?.trim();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-24 sm:items-center sm:pb-0 sm:pt-20">
      <div className="absolute right-0 top-0 h-full w-full sm:w-[78vw]" style={imageMask}>
        <img src={bgImage} alt="" className="h-full w-full object-cover object-[center_18%]" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-background from-0% via-background/80 via-40% to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25 sm:hidden" />

      <div className="container relative z-10 mx-auto w-full px-6">
        <div className="max-w-xl animate-slide-up">
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary">
            {data.role}
            {place ? ` · ${place}` : ""}
          </p>
          <h1 className="text-[clamp(2.6rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight">
            {first}
            {last ? <span className="block text-primary">{last}</span> : null}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{data.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="hero" size="lg" className="rounded-full px-6 hover:scale-100" asChild>
              <a href="#projects">
                View projects
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="rounded-full" asChild>
              <a href="#contact">Contact</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${data.email}`} className={socialClass} aria-label="Email">
              <Mail size={16} />
            </a>
            <span className="ml-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {data.statusText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
