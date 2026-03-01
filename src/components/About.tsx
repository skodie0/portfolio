import { Code2, Coffee, Rocket, Users, LucideIcon } from "lucide-react";
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
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">{"// about me"}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Turning Ideas Into <span className="gradient-text">Reality</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate fullstack developer who loves creating impactful digital solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {data.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}

              <div className="bg-secondary/50 rounded-lg p-4 border border-border/50 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-destructive/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <code className="text-muted-foreground">
                  <span className="text-primary">const</span> developer = {"{"}<br />
                  <span className="pl-4">name: <span className="text-green-400">"{data.codeBlock.name}"</span>,</span><br />
                  <span className="pl-4">role: <span className="text-green-400">"{data.codeBlock.role}"</span>,</span><br />
                  <span className="pl-4">loves: [{data.codeBlock.loves.map((l, i) => (
                    <span key={i}><span className="text-green-400">"{l}"</span>{i < data.codeBlock.loves.length - 1 ? ", " : ""}</span>
                  ))}]</span><br />
                  {"}"};
                </code>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.highlights.map((item, index) => {
                const Icon = iconMap[item.icon] || Code2;
                return (
                  <div key={item.title} className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
