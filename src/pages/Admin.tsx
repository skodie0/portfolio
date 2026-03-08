import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Save, Plus, Trash2, ChevronDown, ChevronUp, Upload, Image } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getSectionData,
  setSectionData,
  HeroData,
  AboutData,
  SkillsData,
  ProjectsData,
  ContactData,
  FooterData,
  FeaturedProject,
  OtherProject,
  SkillCategory,
} from "@/lib/firestore";

// Default data matching current hardcoded values
const defaultHero: HeroData = {
  name: "Alex Chen",
  role: "Fullstack Software Engineer",
  description: "I craft elegant digital experiences with clean code and modern technologies. Passionate about building scalable applications that make a difference.",
  statusText: "Available for new opportunities",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  email: "alex@example.com",
};

const defaultAbout: AboutData = {
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

const defaultSkills: SkillsData = {
  categories: [
    { title: "Frontend", skills: [{ name: "React", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Next.js", level: 88 }, { name: "Tailwind CSS", level: 92 }, { name: "Vue.js", level: 75 }] },
    { title: "Backend", skills: [{ name: "Node.js", level: 92 }, { name: "Python", level: 85 }, { name: "PostgreSQL", level: 88 }, { name: "GraphQL", level: 82 }, { name: "Redis", level: 78 }] },
    { title: "DevOps & Cloud", skills: [{ name: "AWS", level: 85 }, { name: "Docker", level: 88 }, { name: "Kubernetes", level: 75 }, { name: "CI/CD", level: 90 }, { name: "Terraform", level: 72 }] },
  ],
  additionalTech: ["Git", "REST APIs", "MongoDB", "Firebase", "Supabase", "Prisma", "Jest", "Cypress", "Figma", "Agile/Scrum"],
};

const defaultProjects: ProjectsData = {
  featured: [
    { title: "E-Commerce Platform", description: "A full-featured e-commerce solution with real-time inventory management.", tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"], github: "https://github.com", live: "https://example.com" },
    { title: "AI Task Manager", description: "Smart task management app with AI-powered prioritization.", tech: ["React", "Python", "FastAPI", "OpenAI", "MongoDB"], github: "https://github.com", live: "https://example.com" },
    { title: "Real-time Analytics Dashboard", description: "Enterprise-grade analytics platform processing millions of events.", tech: ["React", "D3.js", "Kafka", "ClickHouse", "Docker"], github: "https://github.com", live: "https://example.com" },
  ],
  other: [
    { title: "CLI Productivity Tool", description: "A command-line tool for developers.", tech: ["Go", "Cobra", "SQLite"], github: "https://github.com" },
    { title: "Open Source UI Library", description: "Modern React component library.", tech: ["React", "TypeScript", "Storybook"], github: "https://github.com" },
    { title: "Blockchain Wallet", description: "Secure cryptocurrency wallet.", tech: ["React Native", "Ethers.js", "Node.js"], github: "https://github.com" },
    { title: "DevOps Automation", description: "Infrastructure as code templates.", tech: ["Terraform", "Ansible", "Python"], github: "https://github.com" },
  ],
};

const defaultContact: ContactData = { email: "alex@example.com", location: "San Francisco, CA" };

const defaultFooter: FooterData = {
  name: "Alex Chen",
  tagline: "Built with passion.",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  email: "alex@example.com",
};

type SectionName = "hero" | "about" | "skills" | "projects" | "contact" | "footer";

const Admin = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [skills, setSkills] = useState<SkillsData>(defaultSkills);
  const [projects, setProjects] = useState<ProjectsData>(defaultProjects);
  const [contact, setContact] = useState<ContactData>(defaultContact);
  const [footer, setFooter] = useState<FooterData>(defaultFooter);
  const [saving, setSaving] = useState<SectionName | null>(null);
  const [openSection, setOpenSection] = useState<SectionName | null>("hero");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const load = async () => {
      const [h, a, s, p, c, f] = await Promise.all([
        getSectionData<HeroData>("hero"),
        getSectionData<AboutData>("about"),
        getSectionData<SkillsData>("skills"),
        getSectionData<ProjectsData>("projects"),
        getSectionData<ContactData>("contact"),
        getSectionData<FooterData>("footer"),
      ]);
      if (h) setHero(h);
      if (a) setAbout(a);
      if (s) setSkills(s);
      if (p) setProjects(p);
      if (c) setContact(c);
      if (f) setFooter(f);
      setDataLoading(false);
    };
    load();
  }, []);

  const saveSection = async (section: SectionName) => {
    setSaving(section);
    try {
      const dataMap: Record<SectionName, any> = { hero, about, skills, projects, contact, footer };
      await setSectionData(section, dataMap[section]);
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} saved!`);
    } catch {
      toast.error(`Failed to save ${section}`);
    } finally {
      setSaving(null);
    }
  };

  const toggleSection = (s: SectionName) => setOpenSection(openSection === s ? null : s);

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground text-sm";
  const labelClass = "block text-sm font-medium mb-1.5 text-foreground";

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const SectionHeader = ({ title, section }: { title: string; section: SectionName }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-secondary/30 transition-colors"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {openSection === section ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  const SaveButton = ({ section }: { section: SectionName }) => (
    <div className="flex justify-end pt-4">
      <Button variant="hero" onClick={() => saveSection(section)} disabled={saving === section}>
        <Save size={16} />
        {saving === section ? "Saving..." : "Save"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="font-mono text-lg font-semibold text-primary">{"<"}dev{" />"}</a>
            <span className="text-sm text-muted-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Edit Portfolio Content</h1>

        <div className="space-y-4">
          {/* HERO */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="🏠 Hero Section" section="hero" />
            {openSection === "hero" && (
              <div className="px-6 pb-6 space-y-4">
                {/* Background Image Upload */}
                <div>
                  <label className={labelClass}>Background Image</label>
                  <div className="flex items-center gap-4">
                    {hero.bgImageUrl ? (
                      <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border">
                        <img src={hero.bgImageUrl} alt="Hero background" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-40 h-24 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
                        <Image size={24} />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              toast.info("Uploading image...");
                              const storageRef = ref(storage, `images/hero-bg-${Date.now()}`);
                              await uploadBytes(storageRef, file);
                              const url = await getDownloadURL(storageRef);
                              setHero({ ...hero, bgImageUrl: url });
                              toast.success("Image uploaded! Click Save to apply.");
                            } catch (err) {
                              console.error(err);
                              toast.error("Failed to upload image");
                            }
                          }}
                        />
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
                          <Upload size={14} /> Upload New Image
                        </span>
                      </label>
                      <p className="text-xs text-muted-foreground">Recommended: 1920×1080 or larger</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Role / Title</label>
                  <input className={inputClass} value={hero.role} onChange={(e) => setHero({ ...hero, role: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea className={inputClass + " resize-none"} rows={3} value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Status Text</label>
                  <input className={inputClass} value={hero.statusText} onChange={(e) => setHero({ ...hero, statusText: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <input className={inputClass} value={hero.githubUrl} onChange={(e) => setHero({ ...hero, githubUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn URL</label>
                    <input className={inputClass} value={hero.linkedinUrl} onChange={(e) => setHero({ ...hero, linkedinUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} value={hero.email} onChange={(e) => setHero({ ...hero, email: e.target.value })} />
                  </div>
                </div>
                <SaveButton section="hero" />
              </div>
            )}
          </div>

          {/* ABOUT */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="👤 About Section" section="about" />
            {openSection === "about" && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className={labelClass}>Paragraphs</label>
                  {about.paragraphs.map((p, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <textarea className={inputClass + " resize-none"} rows={2} value={p} onChange={(e) => {
                        const updated = [...about.paragraphs];
                        updated[i] = e.target.value;
                        setAbout({ ...about, paragraphs: updated });
                      }} />
                      <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => {
                        setAbout({ ...about, paragraphs: about.paragraphs.filter((_, j) => j !== i) });
                      }}><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setAbout({ ...about, paragraphs: [...about.paragraphs, ""] })}>
                    <Plus size={14} /> Add Paragraph
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Code Block Name</label>
                    <input className={inputClass} value={about.codeBlock.name} onChange={(e) => setAbout({ ...about, codeBlock: { ...about.codeBlock, name: e.target.value } })} />
                  </div>
                  <div>
                    <label className={labelClass}>Code Block Role</label>
                    <input className={inputClass} value={about.codeBlock.role} onChange={(e) => setAbout({ ...about, codeBlock: { ...about.codeBlock, role: e.target.value } })} />
                  </div>
                  <div>
                    <label className={labelClass}>Loves (comma separated)</label>
                    <input className={inputClass} value={about.codeBlock.loves.join(", ")} onChange={(e) => setAbout({ ...about, codeBlock: { ...about.codeBlock, loves: e.target.value.split(",").map(s => s.trim()) } })} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Highlights</label>
                  {about.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-center">
                      <input className={inputClass} placeholder="Title" value={h.title} onChange={(e) => {
                        const updated = [...about.highlights];
                        updated[i] = { ...h, title: e.target.value };
                        setAbout({ ...about, highlights: updated });
                      }} />
                      <input className={inputClass} placeholder="Description" value={h.description} onChange={(e) => {
                        const updated = [...about.highlights];
                        updated[i] = { ...h, description: e.target.value };
                        setAbout({ ...about, highlights: updated });
                      }} />
                      <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => {
                        setAbout({ ...about, highlights: about.highlights.filter((_, j) => j !== i) });
                      }}><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setAbout({ ...about, highlights: [...about.highlights, { icon: "Code2", title: "", description: "" }] })}>
                    <Plus size={14} /> Add Highlight
                  </Button>
                </div>
                <SaveButton section="about" />
              </div>
            )}
          </div>

          {/* SKILLS */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="⚡ Skills Section" section="skills" />
            {openSection === "skills" && (
              <div className="px-6 pb-6 space-y-6">
                {skills.categories.map((cat, ci) => (
                  <div key={ci} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <input className={inputClass + " max-w-[200px] font-semibold"} value={cat.title} onChange={(e) => {
                        const updated = [...skills.categories];
                        updated[ci] = { ...cat, title: e.target.value };
                        setSkills({ ...skills, categories: updated });
                      }} />
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                        setSkills({ ...skills, categories: skills.categories.filter((_, j) => j !== ci) });
                      }}><Trash2 size={16} /></Button>
                    </div>
                    {cat.skills.map((skill, si) => (
                      <div key={si} className="flex gap-2 mb-2 items-center">
                        <input className={inputClass} placeholder="Skill name" value={skill.name} onChange={(e) => {
                          const updated = [...skills.categories];
                          const updatedSkills = [...cat.skills];
                          updatedSkills[si] = { ...skill, name: e.target.value };
                          updated[ci] = { ...cat, skills: updatedSkills };
                          setSkills({ ...skills, categories: updated });
                        }} />
                        <input type="number" min="0" max="100" className={inputClass + " max-w-[80px]"} value={skill.level} onChange={(e) => {
                          const updated = [...skills.categories];
                          const updatedSkills = [...cat.skills];
                          updatedSkills[si] = { ...skill, level: Number(e.target.value) };
                          updated[ci] = { ...cat, skills: updatedSkills };
                          setSkills({ ...skills, categories: updated });
                        }} />
                        <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => {
                          const updated = [...skills.categories];
                          updated[ci] = { ...cat, skills: cat.skills.filter((_, j) => j !== si) };
                          setSkills({ ...skills, categories: updated });
                        }}><Trash2 size={16} /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      const updated = [...skills.categories];
                      updated[ci] = { ...cat, skills: [...cat.skills, { name: "", level: 80 }] };
                      setSkills({ ...skills, categories: updated });
                    }}><Plus size={14} /> Add Skill</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  setSkills({ ...skills, categories: [...skills.categories, { title: "New Category", skills: [] }] });
                }}><Plus size={14} /> Add Category</Button>
                <div>
                  <label className={labelClass}>Additional Technologies (comma separated)</label>
                  <input className={inputClass} value={skills.additionalTech.join(", ")} onChange={(e) => setSkills({ ...skills, additionalTech: e.target.value.split(",").map(s => s.trim()) })} />
                </div>
                <SaveButton section="skills" />
              </div>
            )}
          </div>

          {/* PROJECTS */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="🚀 Projects Section" section="projects" />
            {openSection === "projects" && (
              <div className="px-6 pb-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Featured Projects</h3>
                  {projects.featured.map((proj, i) => (
                    <div key={i} className="p-4 border border-border/50 rounded-lg mb-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <input className={inputClass + " font-semibold"} placeholder="Title" value={proj.title} onChange={(e) => {
                          const updated = [...projects.featured];
                          updated[i] = { ...proj, title: e.target.value };
                          setProjects({ ...projects, featured: updated });
                        }} />
                        <Button variant="ghost" size="icon" className="shrink-0 text-destructive ml-2" onClick={() => {
                          setProjects({ ...projects, featured: projects.featured.filter((_, j) => j !== i) });
                        }}><Trash2 size={16} /></Button>
                      </div>
                      {/* Project Image Upload */}
                      <div className="flex items-center gap-3">
                        {proj.imageUrl ? (
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-border shrink-0">
                            <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-32 h-20 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0">
                            <Image size={20} />
                          </div>
                        )}
                        <label className="cursor-pointer">
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              toast.info("Uploading...");
                              const storageRef = ref(storage, `images/project-featured-${i}-${Date.now()}`);
                              await uploadBytes(storageRef, file);
                              const url = await getDownloadURL(storageRef);
                              const updated = [...projects.featured];
                              updated[i] = { ...proj, imageUrl: url };
                              setProjects({ ...projects, featured: updated });
                              toast.success("Image uploaded! Click Save to apply.");
                            } catch { toast.error("Upload failed"); }
                          }} />
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors">
                            <Upload size={12} /> Upload Image
                          </span>
                        </label>
                      </div>
                      <textarea className={inputClass + " resize-none"} rows={2} placeholder="Description" value={proj.description} onChange={(e) => {
                        const updated = [...projects.featured];
                        updated[i] = { ...proj, description: e.target.value };
                        setProjects({ ...projects, featured: updated });
                      }} />
                      <input className={inputClass} placeholder="Tech (comma separated)" value={proj.tech.join(", ")} onChange={(e) => {
                        const updated = [...projects.featured];
                        updated[i] = { ...proj, tech: e.target.value.split(",").map(s => s.trim()) };
                        setProjects({ ...projects, featured: updated });
                      }} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className={inputClass} placeholder="GitHub URL" value={proj.github} onChange={(e) => {
                          const updated = [...projects.featured];
                          updated[i] = { ...proj, github: e.target.value };
                          setProjects({ ...projects, featured: updated });
                        }} />
                        <input className={inputClass} placeholder="Live URL" value={proj.live} onChange={(e) => {
                          const updated = [...projects.featured];
                          updated[i] = { ...proj, live: e.target.value };
                          setProjects({ ...projects, featured: updated });
                        }} />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    setProjects({ ...projects, featured: [...projects.featured, { title: "", description: "", tech: [], github: "", live: "" }] });
                  }}><Plus size={14} /> Add Featured Project</Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Other Projects</h3>
                  {projects.other.map((proj, i) => (
                    <div key={i} className="p-4 border border-border/50 rounded-lg mb-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <input className={inputClass + " font-semibold"} placeholder="Title" value={proj.title} onChange={(e) => {
                          const updated = [...projects.other];
                          updated[i] = { ...proj, title: e.target.value };
                          setProjects({ ...projects, other: updated });
                        }} />
                        <Button variant="ghost" size="icon" className="shrink-0 text-destructive ml-2" onClick={() => {
                          setProjects({ ...projects, other: projects.other.filter((_, j) => j !== i) });
                        }}><Trash2 size={16} /></Button>
                      </div>
                      {/* Project Image Upload */}
                      <div className="flex items-center gap-3">
                        {proj.imageUrl ? (
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-border shrink-0">
                            <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-32 h-20 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0">
                            <Image size={20} />
                          </div>
                        )}
                        <label className="cursor-pointer">
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              toast.info("Uploading...");
                              const storageRef = ref(storage, `images/project-other-${i}-${Date.now()}`);
                              await uploadBytes(storageRef, file);
                              const url = await getDownloadURL(storageRef);
                              const updated = [...projects.other];
                              updated[i] = { ...proj, imageUrl: url };
                              setProjects({ ...projects, other: updated });
                              toast.success("Image uploaded! Click Save to apply.");
                            } catch { toast.error("Upload failed"); }
                          }} />
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors">
                            <Upload size={12} /> Upload Image
                          </span>
                        </label>
                      </div>
                      <textarea className={inputClass + " resize-none"} rows={2} placeholder="Description" value={proj.description} onChange={(e) => {
                        const updated = [...projects.other];
                        updated[i] = { ...proj, description: e.target.value };
                        setProjects({ ...projects, other: updated });
                      }} />
                      <input className={inputClass} placeholder="Tech (comma separated)" value={proj.tech.join(", ")} onChange={(e) => {
                        const updated = [...projects.other];
                        updated[i] = { ...proj, tech: e.target.value.split(",").map(s => s.trim()) };
                        setProjects({ ...projects, other: updated });
                      }} />
                      <input className={inputClass} placeholder="GitHub URL" value={proj.github} onChange={(e) => {
                        const updated = [...projects.other];
                        updated[i] = { ...proj, github: e.target.value };
                        setProjects({ ...projects, other: updated });
                      }} />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    setProjects({ ...projects, other: [...projects.other, { title: "", description: "", tech: [], github: "" }] });
                  }}><Plus size={14} /> Add Project</Button>
                </div>
                <SaveButton section="projects" />
              </div>
            )}
          </div>

          {/* CONTACT */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="📧 Contact Section" section="contact" />
            {openSection === "contact" && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input className={inputClass} value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} />
                </div>
                <SaveButton section="contact" />
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="glass-card rounded-xl overflow-hidden">
            <SectionHeader title="📋 Footer Section" section="footer" />
            {openSection === "footer" && (
              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input className={inputClass} value={footer.name} onChange={(e) => setFooter({ ...footer, name: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Tagline</label>
                    <input className={inputClass} value={footer.tagline} onChange={(e) => setFooter({ ...footer, tagline: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <input className={inputClass} value={footer.githubUrl} onChange={(e) => setFooter({ ...footer, githubUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn URL</label>
                    <input className={inputClass} value={footer.linkedinUrl} onChange={(e) => setFooter({ ...footer, linkedinUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Twitter URL</label>
                    <input className={inputClass} value={footer.twitterUrl} onChange={(e) => setFooter({ ...footer, twitterUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} />
                  </div>
                </div>
                <SaveButton section="footer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
