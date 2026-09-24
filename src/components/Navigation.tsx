import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "about", ext: ".md", href: "#about", id: "about" },
  { name: "skills", ext: ".json", href: "#skills", id: "skills" },
  { name: "projects", ext: "/", href: "#projects", id: "projects" },
  { name: "contact", ext: ".sh", href: "#contact", id: "contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const marker = window.innerHeight * 0.35;
      let current = "";
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (!section) continue;
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= marker && bottom > marker) current = link.id;
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="font-mono text-sm font-semibold text-primary tracking-tight">
            ~/dev
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`font-mono text-sm px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  <span className="text-primary/50 mr-1.5">{String(index + 1).padStart(2, "0")}</span>
                  {link.name}
                  <span className="text-muted-foreground/70">{link.ext}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="hero" size="sm" className="font-mono hover:scale-100" asChild>
              <a href="#contact">Let's Talk</a>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="text-foreground w-10 h-10 inline-flex items-center justify-center rounded-md border border-border/70 bg-secondary/40"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 border-t border-border/60 pt-3">
              {navLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="font-mono text-sm text-muted-foreground hover:text-primary hover:bg-secondary/60 rounded-md px-3 py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-primary/50 mr-2">{String(index + 1).padStart(2, "0")}</span>
                  {link.name}
                  {link.ext}
                </a>
              ))}
              <Button variant="hero" size="sm" className="w-fit mt-2 font-mono hover:scale-100" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Let's Talk
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
