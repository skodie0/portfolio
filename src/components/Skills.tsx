import { useSiteData } from "@/hooks/useSiteData";
import type { SkillsData } from "@/lib/firestore";

const fallback: SkillsData = {
  categories: [
    { title: "Frontend", skills: [{ name: "React", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Next.js", level: 88 }, { name: "Tailwind CSS", level: 92 }, { name: "Vue.js", level: 75 }] },
    { title: "Backend", skills: [{ name: "Node.js", level: 92 }, { name: "Python", level: 85 }, { name: "PostgreSQL", level: 88 }, { name: "GraphQL", level: 82 }, { name: "Redis", level: 78 }] },
    { title: "DevOps & Cloud", skills: [{ name: "AWS", level: 85 }, { name: "Docker", level: 88 }, { name: "Kubernetes", level: 75 }, { name: "CI/CD", level: 90 }, { name: "Terraform", level: 72 }] },
  ],
  additionalTech: ["Git", "REST APIs", "MongoDB", "Firebase", "Supabase", "Prisma", "Jest", "Cypress", "Figma", "Agile/Scrum"],
};

export const Skills = () => {
  const { data } = useSiteData<SkillsData>("skills", fallback);

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">{"// skills & technologies"}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My <span className="gradient-text">Tech Stack</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Technologies I work with to build modern, scalable applications</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.categories.map((category, categoryIndex) => (
              <div key={category.title} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000 ease-out" style={{ width: `${skill.level}%`, animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Also experienced with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.additionalTech.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-default">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
