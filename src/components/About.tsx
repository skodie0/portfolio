import { Code2, Coffee, Rocket, Users, LucideIcon } from "lucide-react";
import { EditorFrame } from "@/components/EditorFrame";
import { useSiteData } from "@/hooks/useSiteData";
import type { AboutData } from "@/lib/firestore";

const iconMap: Record<string, LucideIcon> = { Code2, Rocket, Users, Coffee };

const fallback: AboutData = {
  paragraphs: [
    "I'm a fullstack software engineer based in San Francisco with a passion for building exceptional digital experiences.",
    "My journey in tech started with curiosity about how things work under the hood. Today, I specialize in React, Node.js, and cloud technologies.",
    "When I'm not coding, you'll find me contributing to open source, mentoring aspiring developers, or exploring the latest tech trends.",
  ],
  codeBlock: { name: "Alex Chen", role: "Fullstack Engineer", loves: ["clean code", "coffee", "open source"] },
  highlights: [
    { icon: "Code2", title: "5+ Years", description: "Building web applications" },
    { icon: "Rocket", title: "50+ Projects", description: "Delivered successfully" },
    { icon: "Users", title: "20+ Clients", description: "Worldwide collaboration" },
    { icon: "Coffee", title: "∞ Coffee", description: "Cups consumed" },
  ],
};

export const About = () => {
  const { data } = useSiteData<AboutData>("about", fallback);

  return (
    <section id="about" className="py-20 md:py-28 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-xs text-primary mb-2">01 — about.md</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Turning Ideas Into <span className="gradient-text">Reality</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm md:text-right">
            A passionate fullstack developer who loves creating impactful digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <EditorFrame title="developer.ts">
              <pre className="font-mono text-[13px] leading-7 whitespace-pre-wrap text-muted-foreground">
                <span className="text-primary">const</span> developer = {"{\n"}
                {"  "}name: <span className="code-string">"{data.codeBlock.name}"</span>,{"\n"}
                {"  "}role: <span className="code-string">"{data.codeBlock.role}"</span>,{"\n"}
                {"  "}loves: [
                {data.codeBlock.loves.map((love, index) => (
                  <span key={love}>
                    <span className="code-string">"{love}"</span>
                    {index < data.codeBlock.loves.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]{"\n"}
                {"}"};
              </pre>
            </EditorFrame>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 border-l-2 border-primary/40 pl-5">
              {data.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70">
              {data.highlights.map((item) => {
                const Icon = iconMap[item.icon] || Code2;
                return (
                  <div key={item.title} className="bg-card/80 p-5 flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
