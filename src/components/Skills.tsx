import { EditorFrame } from "@/components/EditorFrame";
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

const fileName = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ts`;

const LevelMarks = ({ level }: { level: number }) => {
  const filled = Math.max(0, Math.min(10, Math.round(level / 10)));
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 10 }, (_, index) => (
        <span key={index} className={`h-3 w-1 rounded-[1px] ${index < filled ? "bg-primary" : "bg-muted"}`} />
      ))}
    </div>
  );
};

export const Skills = () => {
  const { data } = useSiteData<SkillsData>("skills", fallback);

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-xs text-primary mb-2">02 — skills.json</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              My <span className="gradient-text">Tech Stack</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm md:text-right">
            Technologies I work with to build modern, scalable applications
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {data.categories.map((category) => (
            <EditorFrame key={category.title} title={fileName(category.title)} bodyClassName="px-5 py-2">
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between gap-3 py-3 border-b border-border/40 last:border-0">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="flex items-center gap-3 shrink-0">
                      <LevelMarks level={skill.level} />
                      <span className="font-mono text-[11px] text-muted-foreground w-7 text-right tabular-nums">{skill.level}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </EditorFrame>
          ))}
        </div>

        <div className="mt-10">
          <p className="font-mono text-xs text-muted-foreground mb-4">{"// also experienced with"}</p>
          <div className="flex flex-wrap gap-2">
            {data.additionalTech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-md bg-secondary/60 border border-border/60 font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
