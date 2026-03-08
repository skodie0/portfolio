import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface HeroData {
  name: string;
  role: string;
  description: string;
  statusText: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  bgImageUrl?: string;
}

export interface AboutData {
  paragraphs: string[];
  codeBlock: { name: string; role: string; loves: string[] };
  highlights: { icon: string; title: string; description: string }[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

export interface SkillsData {
  categories: SkillCategory[];
  additionalTech: string[];
}

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  imageUrl?: string;
}

export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
  imageUrl?: string;
}

export interface ProjectsData {
  featured: FeaturedProject[];
  other: OtherProject[];
}

export interface ContactData {
  email: string;
  location: string;
}

export interface FooterData {
  name: string;
  tagline: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  email: string;
}

export interface SiteData {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}

const COLLECTION = "siteContent";

export async function getSectionData<T>(section: string): Promise<T | null> {
  try {
    const docRef = doc(db, COLLECTION, section);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as T) : null;
  } catch (error) {
    console.error(`Error fetching ${section}:`, error);
    return null;
  }
}

export async function setSectionData<T extends Record<string, any>>(
  section: string,
  data: T
): Promise<void> {
  const docRef = doc(db, COLLECTION, section);
  await setDoc(docRef, data);
}
